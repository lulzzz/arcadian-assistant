import React from 'react';
import { FlatList, View, ListRenderItemInfo } from 'react-native';

import { Employee } from '../reducers/organization/employee.model';
import { EmployeesListItem } from './employees-list-item';
import { employeesListStyles as styles } from './styles';
import { employeesAZComparer } from './employee-comparer';

export interface EmployeesListProps {
    employees: Employee[];
    onItemClicked: (e: Employee) => void;
}

export class EmployeesList extends React.Component<EmployeesListProps> {
    public render() {
        const employees = this.props.employees.sort(employeesAZComparer);

        return <View style={styles.view}>
                    <FlatList
                        data={employees}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem} />
                </View>;
    }

    private keyExtractor = (item: Employee) => item.employeeId;

    private renderItem = (itemInfo: ListRenderItemInfo<Employee>) => {
        const { item } = itemInfo;

        return <EmployeesListItem id={item.employeeId} employee={item} onItemClicked={this.props.onItemClicked}/>;
    };
}
