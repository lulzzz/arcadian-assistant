import { Action } from 'redux';
import { SearchType } from '../../navigation/search-view';
import { Department } from '../organization/department.model';

export interface SetFilter extends Action {
    type: 'SEARCH-BY-TEXT-FILTER';
    filter: string;
    searchType: SearchType;
}

export const startSearch = (filter: string, searchType: SearchType): SetFilter => {
    return { type: 'SEARCH-BY-TEXT-FILTER', filter, searchType };
};

export const endSearch = (searchType: SearchType): SetFilter => {
    return { type: 'SEARCH-BY-TEXT-FILTER', filter: '', searchType};
};

export interface ActiveFilter extends Action {
    type: 'ACTIVE-SEARCH-BY-TEXT-FILTER';
    searchType: SearchType;
    isActive: boolean;
}

export const activeFilter = (searchType: SearchType, isActive: boolean): ActiveFilter => ({ type: 'ACTIVE-SEARCH-BY-TEXT-FILTER', searchType, isActive });

export type SearchActions = ActiveFilter | SetFilter;