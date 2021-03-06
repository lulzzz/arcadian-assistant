import React from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo, View } from 'react-native';
import { TopNavBar } from '../navigation/top-nav-bar';

import { Employee } from '../reducers/organization/employee.model';
import { EmployeesStore } from '../reducers/organization/employees.reducer';
import { Feed } from '../reducers/feeds/feed.model';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../reducers/app.reducer';

import { FeedMessage } from './feed-message';
import { LoadingView } from '../navigation/loading';

import { baseColor, ListStyle, ScreenStyle } from './home-feeds-screen.styles';
import { openEmployeeDetailsAction } from '../employee-details/employee-details-dispatcher';
import { fetchNewFeeds, fetchOldFeeds } from '../reducers/feeds/feeds.action';
import { FeedsById } from '../reducers/feeds/feeds.reducer';
import { Moment } from 'moment';

//============================================================================
const navBar = new TopNavBar('Feeds');

//============================================================================
interface FeedsScreenProps {
    feeds: FeedsById;
    employees: EmployeesStore;
    toDate: Moment;
    fromDate: Moment;
    user: string;
}

//============================================================================
interface FeedScreenDispatchProps {
    onAvatarClicked: (employee: Employee) => void;
    fetchNewFeeds: () => void;
    fetchOldFeeds: () => void;
}

const mapStateToProps = (state: AppState): FeedsScreenProps => ({
    feeds: state.feeds.feeds,
    employees: state.organization.employees,
    toDate: state.feeds.toDate,
    fromDate: state.feeds.fromDate,
    user: state.userInfo.employeeId,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): FeedScreenDispatchProps => ({
    onAvatarClicked: (employee: Employee) => dispatch(openEmployeeDetailsAction(employee)),
    fetchNewFeeds: () => dispatch(fetchNewFeeds()),
    fetchOldFeeds: () => dispatch(fetchOldFeeds()),
});

//============================================================================
class HomeFeedsScreenImpl extends React.Component<FeedsScreenProps & FeedScreenDispatchProps> {
    public static navigationOptions = navBar.configurate();

    //----------------------------------------------------------------------------
    public render() {
        const feeds = this.sortedFeeds();

        return this.props.feeds.size > 0 ?
            <FlatList
                style={ScreenStyle.view}
                keyExtractor={HomeFeedsScreenImpl.keyExtractor}
                ItemSeparatorComponent={HomeFeedsScreenImpl.itemSeparator}
                data={feeds}
                extraData={this.props.employees}
                renderItem={this.renderItem}
                onEndReached={this.endReached}
                onEndReachedThreshold={0.2}
                refreshing={false}
                onRefresh={this.onRefresh}
                ListFooterComponent={this.footer}
            /> :
            <LoadingView/>;
    }

    //----------------------------------------------------------------------------
    private sortedFeeds() {
        return this.props.feeds.toArray().sort((x, y) => {
            return ((y.datePosted.valueOf() - x.datePosted.valueOf()) || (y.employeeId < x.employeeId ? -1 : 1));
        });
    }

    //----------------------------------------------------------------------------
    private footer = (): React.ReactElement<any> => {
        return (
            <View style={ListStyle.footer}>
                <ActivityIndicator color={baseColor}/>
            </View>
        );
    };

    //----------------------------------------------------------------------------
    private renderItem = (itemInfo: ListRenderItemInfo<Feed>) => {
        const { item } = itemInfo;
        const employee: Employee = this.props.employees.employeesById.get(item.employeeId, null);
        return <FeedMessage message={item} employee={employee} onAvatarClicked={this.props.onAvatarClicked}/>;
    };

    //----------------------------------------------------------------------------
    private endReached = () => {
        if (this.props.user) {
            this.props.fetchOldFeeds();
        }
    };

    //----------------------------------------------------------------------------
    private onRefresh = () => {
        if (this.props.user) {
            this.props.fetchNewFeeds();
        }
    };

    //----------------------------------------------------------------------------
    private static keyExtractor(item: Feed): string {
        return item ? item.messageId : '';
    }

    //----------------------------------------------------------------------------
    private static itemSeparator(): React.ReactElement<any> {
        return <View style={ScreenStyle.separator}/>;
    }
}

export const HomeFeedsScreen = connect(mapStateToProps, mapDispatchToProps)(HomeFeedsScreenImpl);
