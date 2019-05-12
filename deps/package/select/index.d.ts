import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin, FocusProperties } from '@dojo/framework/widget-core/mixins/Focus';
import { CustomAriaProperties, InputProperties } from '../common/interfaces';
/**
 * @type SelectProperties
 *
 * Properties that can be set on a Select component
 *
 * @property getOptionDisabled Function that accepts an option's data and index and returns a boolean
 * @property getOptionId       Function that accepts an option's data and index and returns a string id
 * @property getOptionLabel    Function that accepts an option's data and returns a DNode label
 * @property getOptionText     Function that accepts an option's data and returns a string, used for matching an option on keydown
 * @property getOptionSelected Function that accepts an option's data and index and returns a boolean
 * @property getOptionValue    Function that accepts an option's data and index and returns a string value
 * @property options           Array of any type of data for the options
 * @property placeholder       Optional placeholder text, only valid for custom select widgets (useNativeElement must be false or undefined)
 * @property useNativeElement  Use the native <select> element if true
 * @property value           The current value
 */
export interface SelectProperties extends ThemedProperties, InputProperties, FocusProperties, CustomAriaProperties {
    getOptionDisabled?(option: any, index: number): boolean;
    getOptionId?(option: any, index: number): string;
    getOptionLabel?(option: any): DNode;
    getOptionText?(option: any): string;
    getOptionSelected?(option: any, index: number): boolean;
    getOptionValue?(option: any, index: number): string;
    helperText?: string;
    options?: any[];
    placeholder?: string;
    useNativeElement?: boolean;
    onBlur?(key?: string | number): void;
    onChange?(option: any, key?: string | number): void;
    onFocus?(key?: string | number): void;
    value?: string;
    labelHidden?: boolean;
    label?: string;
}
declare const Select_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => FocusMixin);
export declare class Select extends Select_base<SelectProperties> {
    private _focusedIndex;
    private _focusNode;
    private _ignoreBlur;
    private _open;
    private _baseId;
    private _inputText;
    private _resetInputTextTimer;
    private _getOptionLabel(option);
    private _getOptionSelected;
    private _getSelectedIndexOnInput(event);
    private _onBlur(event);
    private _onFocus(event);
    private _onNativeChange(event);
    private _openSelect();
    private _closeSelect();
    private _onDropdownKeyDown(event);
    private _onTriggerClick(event);
    private _onTriggerBlur(event);
    private _onTriggerKeyDown(event);
    private _onTriggerMouseDown();
    private _onListboxBlur(event);
    protected renderExpandIcon(): DNode;
    protected renderNativeSelect(): DNode;
    protected renderCustomSelect(): DNode;
    protected renderCustomTrigger(): DNode[];
    protected render(): DNode;
}
export default Select;
