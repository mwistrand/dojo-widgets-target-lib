import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import ThemedMixin from '@dojo/framework/widget-core/mixins/Themed';
import { ColumnConfig } from './interfaces';
export interface RowProperties {
    id: number;
    item: {
        [index: string]: any;
    };
    columnConfig: ColumnConfig[];
    updater: (rowNumber: number, columnId: string, value: any) => void;
}
declare const Row_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export default class Row extends Row_base<RowProperties> {
    protected render(): DNode;
}
