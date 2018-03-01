import { TabNavigatorConfig, NavigationRouteConfigMap } from 'react-navigation';
import React from 'react';
import { PeopleDepartment } from '../people-department';
import { PeopleRoom } from '../people-room';
import { PeopleCompany } from '../people-company';
import { EmployeesList } from '../employees-list';
import { TabNavigationOptionsFactory } from '../../tabbar/tab-navigation-options-factory';

const navOptionsFactory = new TabNavigationOptionsFactory();

const peopleScreenNavigatorModel: NavigationRouteConfigMap = {

    Department: {
        screen: PeopleDepartment,
        path: '/people/department',
        navigationOptions: navOptionsFactory.create('Department', null)
    },
    Room: {
        screen: PeopleRoom,
        path: '/people/room',
        navigationOptions: navOptionsFactory.create('Room', null)
    },
    Company: {
        screen: PeopleCompany,
        path: '/people/company',
        navigationOptions: navOptionsFactory.create('Company', null)
    }
};

export default peopleScreenNavigatorModel;