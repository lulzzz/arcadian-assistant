import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import topNavBarStyles from './top-nav-bar-styles';
import tabBarStyles from '../tabbar/tab-bar-styles';
import { ArcadiaText } from '../override/acradia-text';

export class TopNavBar {
    private name: string;
    constructor(theName: string) {
        this.name = theName;
    }
    public configurate() {
        return {
            header: <View style={topNavBarStyles.headerView}>
                <StatusBar backgroundColor = '#2FAFCC' barStyle = 'light-content' />
                <ArcadiaText style={topNavBarStyles.navTitle}>{this.name}</ArcadiaText>
            </View>,
        };
    }
}