import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { AppState } from '../reducers/app.reducer';
import { connect, Dispatch } from 'react-redux';
import { startSearch, endSearch, activeFilter } from '../reducers/search/search.action';
import { ApplicationIcon } from '../override/application-icon';
import { searchViewStyles as styles } from './search-view-styles';
import { StyledText } from '../override/styled-text';

//============================================================================
export enum SearchType {
    Feeds = 'Feeds',
    People = 'People',
}

//============================================================================
interface SearchViewStateProps {
    filter: string;
    type: SearchType;
}

const mapStateToPropsPeople = (state: AppState): SearchViewStateProps => ({
    filter: state.people.filter,
    type: SearchType.People,
});

//============================================================================
interface SearchViewDispatchProps {
    setFilter: (filter: string, type: SearchType) => void;
    clearFilter: (type: SearchType) => void;
    activeFilter: (type: SearchType, isActive: boolean) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<any>): SearchViewDispatchProps => ({
    setFilter: (filter, type) => dispatch(startSearch(filter, type)),
    clearFilter: (type) => dispatch(endSearch(type)),
    activeFilter: (type, isActive: boolean) => dispatch(activeFilter(type, isActive))
});

//============================================================================
class SearchViewImpl extends Component<SearchViewDispatchProps & SearchViewStateProps> {
    //----------------------------------------------------------------------------
    public render() {
        const textInputStyles = StyleSheet.flatten([
            styles.input
        ]);

        return <View style={styles.container}>
            <View style={styles.iconsContainer}>
                <ApplicationIcon
                    name={'search'}
                    style={styles.icon}
                />
            </View>
            <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={'Search'}
                        style={textInputStyles}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={this.changeText}
                        value={this.props.filter}
                    />
            </View>
            <View style={styles.buttonContainer}>
            {
                this.props.filter.length > 0 &&
                <TouchableOpacity onPress={this.cancelSearch}>
                    <StyledText style={styles.cancel}>Cancel</StyledText>
                </TouchableOpacity>
            }
            </View>
        </View>;
    }

    //----------------------------------------------------------------------------
    private changeText = (filter: string) => {
        this.props.setFilter(filter, this.props.type);
    };

    //----------------------------------------------------------------------------
    private cancelSearch = () => {
        Keyboard.dismiss();
        this.props.clearFilter(this.props.type);
    };
}

export const SearchViewPeople = connect(mapStateToPropsPeople, mapDispatchToProps)(SearchViewImpl);
