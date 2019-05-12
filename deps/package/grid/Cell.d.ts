import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { FocusMixin, FocusProperties } from '@dojo/framework/widget-core/mixins/Focus';
import ThemedMixin from '@dojo/framework/widget-core/mixins/Themed';
import { DNode } from '@dojo/framework/widget-core/interfaces';
export interface CellProperties extends FocusProperties {
    value: string | DNode;
    editable?: boolean;
    rawValue: string;
    updater: (value: any) => void;
}
declare const Cell_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => FocusMixin);
export default class Cell extends Cell_base<CellProperties> {
    private _editing;
    private _editingValue;
    private _focusKey;
    private _idBase;
    private _callFocus(key);
    private _onEdit;
    private _onBlur();
    private _onInput(value);
    private _onKeyDown(key);
    private _onSave();
    protected renderContent(): DNode;
    protected render(): DNode;
}
