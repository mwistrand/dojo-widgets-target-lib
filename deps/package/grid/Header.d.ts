import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import ThemedMixin from '@dojo/framework/widget-core/mixins/Themed';
import { ColumnConfig, SortOptions } from './interfaces';
import { DNode } from '@dojo/framework/widget-core/interfaces';
export interface SortRenderer {
    (column: ColumnConfig, direction: undefined | 'asc' | 'desc', sorter: () => void): DNode;
}
export interface FilterRenderer {
    (column: ColumnConfig, filterValue: string, doFilter: (value: string) => void, title?: string | DNode): DNode;
}
export interface HeaderProperties {
    columnConfig: ColumnConfig[];
    sorter: (columnId: string, direction: 'asc' | 'desc') => void;
    filterer: (columnId: string, value: any) => void;
    filter?: {
        [index: string]: string;
    };
    sort?: SortOptions;
    sortRenderer?: SortRenderer;
    filterRenderer?: FilterRenderer;
}
declare const Header_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export default class Header extends Header_base<HeaderProperties> {
    private _getColumnTitle(column);
    private _sortColumn(id);
    private _sortRenderer;
    private _filterRenderer;
    protected render(): DNode;
}
