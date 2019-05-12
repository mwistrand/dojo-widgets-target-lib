import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin, FocusProperties } from '@dojo/framework/widget-core/mixins/Focus';
import { CustomAriaProperties, InputProperties, InputEventProperties, PointerEventProperties, KeyEventProperties } from '../common/interfaces';
/**
 * @type TextareaProperties
 *
 * Properties that can be set on a TextInput component
 *
 * @property columns         Number of columns, controls the width of the textarea
 * @property rows            Number of rows, controls the height of the textarea
 * @property wrapText        Controls text wrapping. Can be "hard", "soft", or "off"
 * @property maxLength      Maximum number of characters allowed in the input
 * @property minLength      Minimum number of characters allowed in the input
 * @property placeholder    Placeholder text
 * @property value           The current value
 */
export interface TextareaProperties extends ThemedProperties, InputProperties, FocusProperties, InputEventProperties, KeyEventProperties, PointerEventProperties, CustomAriaProperties {
    columns?: number;
    rows?: number;
    wrapText?: 'hard' | 'soft' | 'off';
    maxLength?: number | string;
    minLength?: number | string;
    placeholder?: string;
    value?: string;
    onClick?(value: string): void;
    label?: string;
    labelHidden?: boolean;
    helperText?: string;
}
declare const Textarea_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => FocusMixin);
export declare class Textarea extends Textarea_base<TextareaProperties> {
    private _onBlur(event);
    private _onChange(event);
    private _onClick(event);
    private _onFocus(event);
    private _onInput(event);
    private _onKeyDown(event);
    private _onKeyPress(event);
    private _onKeyUp(event);
    private _onMouseDown(event);
    private _onMouseUp(event);
    private _onTouchStart(event);
    private _onTouchEnd(event);
    private _onTouchCancel(event);
    private _uuid;
    protected getRootClasses(): (string | null)[];
    render(): DNode;
}
export default Textarea;
