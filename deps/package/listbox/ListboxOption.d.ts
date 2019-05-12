import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
export interface ListboxOptionProperties extends ThemedProperties {
    active?: boolean;
    css?: (string | null)[];
    disabled?: boolean;
    id: string;
    index: number;
    label: DNode;
    option: any;
    selected?: boolean;
    onClick?(option: any, index: number, key?: string | number): void;
}
declare const ListboxOption_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export declare class ListboxOption extends ListboxOption_base<ListboxOptionProperties> {
    private _onClick(event);
    protected render(): DNode;
}
export default ListboxOption;
