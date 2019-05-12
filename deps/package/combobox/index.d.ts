import { DNode } from '@dojo/framework/widget-core/interfaces';
import { I18nMixin } from '@dojo/framework/widget-core/mixins/I18n';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin, FocusProperties } from '@dojo/framework/widget-core/mixins/Focus';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { TextInputProperties } from '../text-input/index';
import { CommonMessages, LabeledProperties } from '../common/interfaces';
/**
 * @type ComboBoxProperties
 *
 * Properties that can be set on a ComboBox component
 *
 * @property clearable          Determines whether the input should be able to be cleared
 * @property disabled           Prevents user interaction and styles content accordingly
 * @property getResultLabel     Can be used to get the text label of a result based on the underlying result object
 * @property getResultSelected  Can be used to highlight the selected result. Defaults to checking the result label
 * @property getResultValue     Can be used to define a value returned by onChange when a given result is selected. Defaults to getResultLabel
 * @property widgetId           Optional id string for the combobox, set on the text input
 * @property inputProperties    TextInput properties to set on the underlying input
 * @property invalid            Determines if this input is valid
 * @property isResultDisabled   Used to determine if an item should be disabled
 * @property label              Label to show for this input
 * @property onBlur             Called when the input is blurred
 * @property onChange           Called when the value changes
 * @property onFocus            Called when the input is focused
 * @property onMenuChange       Called when menu visibility changes
 * @property onRequestResults   Called when results are shown; should be used to set `results`
 * @property onResultSelect     Called when result is selected
 * @property openOnFocus        Determines whether the result list should open when the input is focused
 * @property readOnly           Prevents user interaction
 * @property required           Determines if this input is required, styles accordingly
 * @property results            Results for the current search term; should be set in response to `onRequestResults`
 * @property value              Value to set on the input
 */
export interface ComboBoxProperties extends ThemedProperties, LabeledProperties, FocusProperties {
    clearable?: boolean;
    disabled?: boolean;
    getResultLabel?(result: any): DNode;
    getResultSelected?(result: any): boolean;
    getResultValue?(result: any): string;
    widgetId?: string;
    inputProperties?: TextInputProperties;
    invalid?: boolean;
    isResultDisabled?(result: any): boolean;
    onBlur?(value: string, key?: string | number): void;
    onChange?(value: string, key?: string | number): void;
    onFocus?(value: string, key?: string | number): void;
    onMenuChange?(open: boolean, key?: string | number): void;
    onRequestResults?(key?: string | number): void;
    onResultSelect?(result: any, key?: string | number): void;
    openOnFocus?: boolean;
    readOnly?: boolean;
    required?: boolean;
    results?: any[];
    value?: string;
}
export declare enum Operation {
    increase = 1,
    decrease = -1,
}
declare const ComboBox_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => FocusMixin) & (new (...args: any[]) => I18nMixin);
export declare class ComboBox extends ComboBox_base<ComboBoxProperties> {
    private _activeIndex;
    private _ignoreBlur;
    private _idBase;
    private _menuHasVisualFocus;
    private _open;
    private _wasOpen;
    private _closeMenu();
    private _getMenuId();
    private _getResultLabel(result);
    private _getResultSelected(result);
    private _getResultValue(result);
    private _getResultId(result, index);
    private _onArrowClick(event);
    private _onClearClick(event);
    private _onInput(value);
    private _onInputBlur(value);
    private _onInputFocus(value);
    private _onInputKeyDown(key, preventDefault);
    private _onMenuChange();
    private _onResultHover();
    private _onResultMouseDown(event);
    private _openMenu();
    private _selectIndex(index);
    private _moveActiveIndex(operation);
    protected getRootClasses(): (string | null)[];
    protected renderInput(results: any[]): DNode;
    protected renderClearButton(messages: CommonMessages): DNode;
    protected renderMenuButton(messages: CommonMessages): DNode;
    protected renderMenu(results: any[]): DNode;
    render(): DNode;
}
export default ComboBox;
