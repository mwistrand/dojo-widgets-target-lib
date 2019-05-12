import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin, FocusProperties } from '@dojo/framework/widget-core/mixins/Focus';
import { CustomAriaProperties, PointerEventProperties, KeyEventProperties, InputEventProperties } from '../common/interfaces';
export declare type TextInputType = 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';
/**
 * @type IconProperties
 *
 * Properties that can be set on a TextInput component
 *
 * @property controls       ID of an element that this input controls
 * @property type           Input type, e.g. text, email, tel, etc.
 * @property maxLength      Maximum number of characters allowed in the input
 * @property minLength      Minimum number of characters allowed in the input
 * @property placeholder    Placeholder text
 * @property value           The current value
 * @property leading		Renderer for leading icon content
 * @property trailing		Renderer for trailing icon content
 */
export interface TextInputProperties extends ThemedProperties, FocusProperties, PointerEventProperties, KeyEventProperties, InputEventProperties, CustomAriaProperties {
    disabled?: boolean;
    widgetId?: string;
    name?: string;
    readOnly?: boolean;
    required?: boolean;
    controls?: string;
    type?: TextInputType;
    maxLength?: number | string;
    minLength?: number | string;
    placeholder?: string;
    helperText?: string;
    value?: string;
    valid?: {
        valid?: boolean;
        message?: string;
    } | boolean;
    customValidator?: (value: string) => {
        valid?: boolean;
        message?: string;
    } | void;
    pattern?: string | RegExp;
    autocomplete?: boolean | string;
    onClick?(value: string): void;
    onValidate?: (valid: boolean | undefined, message: string) => void;
    leading?: () => DNode;
    trailing?: () => DNode;
    labelHidden?: boolean;
    label?: string;
}
declare const TextInput_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => FocusMixin);
export declare class TextInput extends TextInput_base<TextInputProperties> {
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
    private _validate();
    protected readonly validity: {
        valid: boolean | undefined;
        message: string | undefined;
    };
    private _uuid;
    private _state;
    protected getRootClasses(): (string | null)[];
    protected render(): DNode;
}
export default TextInput;
