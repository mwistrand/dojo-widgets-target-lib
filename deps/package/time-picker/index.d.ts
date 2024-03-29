import { DNode } from '@dojo/framework/widget-core/interfaces';
import ThemedMixin, { ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin, FocusProperties } from '@dojo/framework/widget-core/mixins/Focus';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { LabeledProperties, InputProperties } from '../common/interfaces';
import { TextInputProperties } from '../text-input/index';
/**
 * @type TimePickerProperties
 *
 * Properties that can be set on a TimePicker component
 *
 * @property autoBlur           Determines whether the input should blur after value selection
 * @property clearable          Determines whether the custom input should be able to be cleared
 * @property CustomOptionItem   Can be used to render a custom option
 * @property CustomOptionMenu   Can be used to render a custom option menu
 * @property end                The maximum time to display in the menu (defaults to '23:59:59')
 * @property getOptionLabel     Can be used to get the text label of an option based on the underlying option object
 * @property inputProperties    TextInput properties to set on the underlying input
 * @property isOptionDisabled   Used to determine if an item should be disabled
 * @property onBlur             Called when the input is blurred
 * @property onChange           Called when the value changes
 * @property onFocus            Called when the input is focused
 * @property onMenuChange       Called when menu visibility changes
 * @property onRequestOptions   Called when options are shown; should be used to set `options`
 * @property openOnFocus        Determines whether the result list should open when the input is focused
 * @property options            Options for the current input; should be set in response to `onRequestOptions`
 * @property start              The minimum time to display in the menu (defaults to '00:00:00')
 * @property step               The number of seconds between each option in the menu (defaults to 60)
 * @property useNativeElement   Use the native <input type="time"> element if true
 * @property value           The current value
 */
export interface TimePickerProperties extends ThemedProperties, FocusProperties, InputProperties, LabeledProperties {
    autoBlur?: boolean;
    clearable?: boolean;
    end?: string;
    getOptionLabel?(option: TimeUnits): string;
    inputProperties?: TextInputProperties;
    isOptionDisabled?(result: any): boolean;
    onBlur?(value: string, key?: string | number): void;
    onChange?(value: string, key?: string | number): void;
    onFocus?(value: string, key?: string | number): void;
    onMenuChange?(open: boolean, key?: string | number): void;
    onRequestOptions?(key?: string | number): void;
    openOnFocus?: boolean;
    options?: TimeUnits[];
    start?: string;
    step?: number;
    useNativeElement?: boolean;
    value?: string;
}
/**
 * An object representing a dateless time (without milliseconds).
 *
 * @property hour    The number of hours.
 * @property minute  An optional number of minutes.
 * @property second  An optional number of seconds.
 */
export interface TimeUnits {
    hour: number;
    minute?: number;
    second?: number;
}
/**
 * Generate an array of time unit objects from the specified start date to the specified end date.
 *
 * @param start    The start time. Defaults to midnight.
 * @param end      The end time. Defaults to 23:59:59.
 * @param step     The amount of time in seconds between each step. Defaults to 60.
 * @return         An array of time unit objects.
 */
export declare function getOptions(start?: string, end?: string, step?: number): TimeUnits[];
/**
 * Convert a standard time string into an object with `hour`, `minute`, and `second` number properties.
 *
 * For example, '12:30' is converted to `{ hour: 12, minute: 30, second: 0 }`, and '19:03:27' is converted
 * to `{ hour: 19, minute: 3, second: 27 }`.
 *
 * @param value   A standard time string or an object with `hour`, `minute`, and `second` properties.
 * @return        An object containing `hour`, `second`, and `number` properties.
 */
export declare function parseUnits(value: string | TimeUnits): TimeUnits;
declare const TimePicker_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => FocusMixin);
export declare class TimePicker extends TimePicker_base<TimePickerProperties> {
    protected options: TimeUnits[] | null;
    private _uuid;
    constructor();
    private _formatUnits(units);
    private _getOptionLabel(value);
    private _onBlur(value);
    private _onChange(value);
    private _onFocus(value);
    private _onMenuChange(open);
    private _onNativeBlur(event);
    private _onNativeChange(event);
    private _onNativeFocus(event);
    private _onRequestOptions();
    protected getRootClasses(): (string | null)[];
    protected getOptions(): TimeUnits[];
    protected onPropertiesChanged(): void;
    protected renderCustomInput(): DNode;
    protected renderNativeInput(): DNode;
    render(): DNode;
}
export default TimePicker;
