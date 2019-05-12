import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import ThemedMixin, { ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { Store } from '@dojo/framework/stores/Store';
import { Fetcher, ColumnConfig, Updater } from './interfaces';
import { SortRenderer, FilterRenderer } from './Header';
export interface CustomRenderers {
    sortRenderer?: SortRenderer;
    filterRenderer?: FilterRenderer;
}
export interface GridProperties<S> extends ThemedProperties {
    columnConfig: ColumnConfig[];
    fetcher: Fetcher<S>;
    height: number;
    updater?: Updater<S>;
    store?: Store<S>;
    storeId?: string;
    customRenderers?: CustomRenderers;
}
declare const Grid_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export default class Grid<S> extends Grid_base<GridProperties<S>> {
    private _store;
    private _handle;
    private _scrollLeft;
    private _pageSize;
    constructor();
    protected onStoreProperty(previous: any, current: any): void;
    private _getProperties();
    private _getBodyHeight();
    private _fetcher(page, pageSize);
    private _sorter(columnId, direction);
    private _filterer(columnId, value);
    private _updater(page, rowNumber, columnId, value);
    private _pageChange(page);
    private _onScroll(value);
    protected render(): DNode;
}
