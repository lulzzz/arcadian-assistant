import { TokenResponse, AccessCodeRequest } from './access-code-request';
import { OauthError } from './oauth-error';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { LoginRequest } from './login-request';
import { RefreshTokenStorage } from './refresh-token-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LogoutRequest } from './logout-request';
import { NotAuthenticatedState, AuthenticationState } from './authentication-state';

//https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-protocols-oauth-code

const notAuthenticatedInstance: NotAuthenticatedState = { isAuthenticated: false }; //save a reference, so distinct works

export class OAuthProcess {

    public get authenticationState() { return this.authenticationStateSource.asObservable().distinctUntilChanged(); }

    private readonly refreshIntervalSeconds = 15; //once in 5 minutes

    private readonly authorizationCode: Subject<string> = new Subject<string>();

    private readonly refreshTokenSource: Subject<RefreshTokenRequest> = new Subject<RefreshTokenRequest>();
 
    private readonly authenticationStateSource = new BehaviorSubject<AuthenticationState>(notAuthenticatedInstance);

    private readonly accessCodeSubscription: Subscription;

    private readonly loginRequest: LoginRequest;

    private readonly logoutRequest: LogoutRequest;

    private readonly accessCodeRequest: AccessCodeRequest;

    constructor(
        clientId: string,
        authorizationUrl: string,
        tokenUrl: string,
        logoutUrl: string,
        redirectUri: string,
        private readonly refreshTokenStorage: RefreshTokenStorage) {        

        this.loginRequest = new LoginRequest(clientId, redirectUri, authorizationUrl);
        this.logoutRequest = new LogoutRequest(logoutUrl);
        this.accessCodeRequest = new AccessCodeRequest(clientId, redirectUri, tokenUrl);

        const accessCodeResponse = this.authorizationCode
            .switchMap(code => this.accessCodeRequest.fetchNew(code));

        const refreshTokenObtainedAccessCodes = this.refreshTokenSource
            .switchMap(request => this.getPeriodicalRefreshTokens(request))
            .switchMap(token => {
                if (token === null) {
                    return Observable.of<TokenResponse>(null);
                }

                return this.accessCodeRequest.refresh(token);
            });

        this.accessCodeSubscription = Observable.merge(accessCodeResponse, refreshTokenObtainedAccessCodes)
            .subscribe(x => this.onNewTokenObtained(x), e => this.onTokenError(e));
    }

    public handleAuthorizationCodeResponse(responseUrl: string) {
        try {
            const code = this.loginRequest.getAuthorizationCodeFromResponse(responseUrl);
            this.authorizationCode.next(code);
        } catch (e) {
            this.authorizationCode.error(e);
        }
    }

    public async login() {
        const value = await this.refreshTokenStorage.getRefreshToken();
        if (!value) {
            console.debug('Refresh token is not found in storage, opening login page...');
            //no refresh token is stored
            await this.loginRequest.openLoginPage(false); //TODO: catch exception
        } else {
            console.debug('Using refresh token from the application storage');
            //request refresh            
            this.refreshTokenSource.next( { immediateRefresh: true, tokenValue: value });
        }
    }

    public dispose() {
        this.accessCodeSubscription.unsubscribe();
    }

    public async forgetUser() {
        await this.storeRefreshToken(null);
        this.refreshTokenSource.next(null);
        //await this.logoutRequest.perform();
    }

    private onNewTokenObtained(tokenResponse: TokenResponse) {
        this.storeRefreshToken(tokenResponse ? tokenResponse.refreshToken : null);

        if (tokenResponse === null) {
            this.authenticationStateSource.next(notAuthenticatedInstance);
        } else {
            this.refreshTokenSource.next( { tokenValue: tokenResponse.refreshToken, immediateRefresh: false });
            this.authenticationStateSource.next({ isAuthenticated: true, jwtToken: tokenResponse.accessToken, refreshToken: tokenResponse.refreshToken });
        }
    }

    private onTokenError(error: any) {
        if (error && error.status === 0) {
            //ignore, no internet connection
            console.warn('OAuth connectivity error occurred', error);
        } else {
            this.storeRefreshToken(null); // there was an error with /token endpoint so we delete existing token

            const errorText =
                error
                    ? error.message
                        ? error.message.toString()
                        : error.toString()
                    : 'unknown error';
            this.authenticationStateSource.error(new OauthError(error));
        }
    }

    private async storeRefreshToken(token: string | null) {
        try {
            await this.refreshTokenStorage.storeToken(token);
        } catch (e) {
            console.error("Couldn't change refresh token in the storage", e);
        }
    }

    private getPeriodicalRefreshTokens(request: RefreshTokenRequest) {
        const scheduledEmition = Observable.interval(this.refreshIntervalSeconds * 1000).map(() => request.tokenValue);
        if (request.immediateRefresh) {
            return Observable.concat( Observable.of(request.tokenValue), scheduledEmition);
        } else {
            return scheduledEmition;
        }
    }
}

interface RefreshTokenRequest {
    tokenValue: string;
    immediateRefresh: boolean;
}