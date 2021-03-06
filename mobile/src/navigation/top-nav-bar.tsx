import React from 'react';
import { View, StatusBar } from 'react-native';
import topNavBarStyles from './top-nav-bar-styles';
import { StyledText } from '../override/styled-text';
import { LogoutView } from './logout-view';

export class TopNavBar {
    private name: string;
    constructor(theName: string) {
        this.name = theName;
    }
    public configurate() {
        return {
            header: <View style={topNavBarStyles.headerView}>
                <StatusBar backgroundColor='#2FAFCC' barStyle='light-content' />
                <StyledText style={topNavBarStyles.navTitle}>{this.name}</StyledText>
             </View>
        };
    }
}