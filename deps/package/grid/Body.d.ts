import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import ThemedMixin from '@dojo/framework/widget-core/mixins/Themed';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { GridPages, ColumnConfig } from './interfaces';
export interface BodyProperties<S> {
    totalRows?: number;
    pageSize: number;
    pages: GridPages<S>;
    height: number;
    columnConfig: ColumnConfig[];
    placeholderRowRenderer?: (index: number) => DNode;
    fetcher: (page: number, pageSize: number) => void;
    updater: (page: number, rowNumber: number, columnId: string, value: string) => void;
    pageChange: (page: number) => void;
    onScroll: (value: number) => void;
}
declare const Body_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export default class Body<S> extends Body_base<BodyProperties<S>> {
    private _rowHeight;
    private _rowsInView;
    private _renderPageSize;
    private _start;
    private _end;
    private _resetScroll;
    private _updater(rowNumber, columnId, value);
    private _onScroll(event);
    protected _onDiffTotalRows(): void;
    private _renderRows(start, end);
    protected render(): DNode;
}
