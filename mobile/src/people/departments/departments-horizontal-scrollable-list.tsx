import React, { Component } from 'react';
import { Animated, View, ScrollView, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { EmployeeCardWithAvatar } from './employee-card-with-avatar';
import { Employee } from '../../reducers/organization/employee.model';
import { EmployeesStore } from '../../reducers/organization/employees.reducer';
import { Department } from '../../reducers/organization/department.model';

interface DepartmentsHScrollableListProps {
    headDepartment: Department;
    departments: Department[];
    departmentsLists: DepartmentsListStateDescriptor;
    employees: EmployeesStore;
    updateDepartmentsBranch: (departmentId: string) => void;
    requestEmployeesForDepartment: (departmentId: string) => void;
    onItemClicked: (e: Employee) => void;
}

interface ScrollViewComponent extends Component {
    scrollTo(to : {y?: number, x?: number, animated?: boolean}): void;
    scrollToEnd(): void;
}

export interface DepartmentsListStateDescriptor {
    currentPage: number;
}

export class DepartmentsHScrollableList extends Component<DepartmentsHScrollableListProps> {
    private employeeCards: EmployeeCardWithAvatar[];

    public shouldComponentUpdate(nextProps: DepartmentsHScrollableListProps) {	
        return this.props.departmentsLists.currentPage !== nextProps.departmentsLists.currentPage || 
            !this.props.employees.employeesById.equals(nextProps.employees.employeesById);
    }

    public render() {
        const { headDepartment, departments } = this.props;
        const subDepartments = headDepartment != null && departments.length > 0 ? departments : null;
        this.employeeCards = [];
        const cur = this;

        const view = <View>
            <ScrollView 
                horizontal 
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={this.onMomentumScrollEnd.bind(this)}
                onScrollBeginDrag={this.onScrollBeginDrag.bind(this)}
                ref='_scrollView'
            >
                {
                    subDepartments != null ? subDepartments.map((subDepartment, index) => 
                    <EmployeeCardWithAvatar 
                        employee={this.props.employees.employeesById.get(subDepartment.chiefId)}
                        departmentAbbreviation={subDepartment.abbreviation}
                        leftNeighbor={(index > 0) ? this.props.employees.employeesById.get(subDepartments[index - 1].chiefId) : null } 
                        rightNeighbor={(index < subDepartments.length - 1) ? this.props.employees.employeesById.get(subDepartments[index + 1].chiefId) : null} 
                        ref={(employeeCard) => { 
                            if (employeeCard != null) {
                                cur.employeeCards.push(employeeCard);
                            }
                        }} 
                        key={subDepartment.departmentId} 
                        onItemClicked={this.props.onItemClicked}
                    />) : null
                }
            </ScrollView>
        </View>;
        this.setScroll();
        return view;
    }

    private setScroll() {
        let x;
        if (this.props.departmentsLists !== undefined) {
            x = this.props.departmentsLists.currentPage;
            this.props.requestEmployeesForDepartment(
                this.props.departments[this.props.departmentsLists.currentPage].departmentId);
        } else {
            x = this.props.departments.length;
        }
        const curOffsetX = Dimensions.get('window').width * x;

        setTimeout(() => {
            const view = this.refs._scrollView as ScrollViewComponent;
            if (view) {
                view.scrollTo({y: 0, x: curOffsetX});
            }
        });
    }

    private onMomentumScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
        const offset = event.nativeEvent.contentOffset;
        if (offset) {
            const currentPage = Math.round(offset.x / Dimensions.get('window').width) + 1;

            if (currentPage > this.employeeCards.length) {
                this.props.requestEmployeesForDepartment(this.props.headDepartment.departmentId);
                this.props.updateDepartmentsBranch(this.props.headDepartment.departmentId);
            } else {
                const visibleCard: EmployeeCardWithAvatar = this.employeeCards[currentPage - 1];
                visibleCard.revealNeighboursAvatars(true);

                const visibleDepartment = this.props.departments[currentPage - 1];
                this.props.updateDepartmentsBranch(visibleDepartment.departmentId);
                this.props.requestEmployeesForDepartment(visibleDepartment.departmentId);
            }
        }
    }

    private onScrollBeginDrag(event: NativeSyntheticEvent<NativeScrollEvent>) {
        this.employeeCards.forEach(card => {
            card.revealNeighboursAvatars(false);
        });
    }
}