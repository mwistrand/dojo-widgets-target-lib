import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin, FocusProperties } from '@dojo/framework/widget-core/mixins/Focus';
import { CustomAriaProperties, InputEventProperties, PointerEventProperties, KeyEventProperties } from '../common/interfaces';
export declare type ButtonType = 'submit' | 'reset' | 'button' | 'menu';
/**
 * @type ButtonProperties
 *
 * Properties that can be set on a Button component
 *
 * @property disabled       Whether the button is disabled or clickable
 * @property widgetId       DOM id set on the root button node
 * @property popup       		Controls aria-haspopup, aria-expanded, and aria-controls for popup buttons
 * @property name           The button's name attribute
 * @property pressed        Indicates status of a toggle button
 * @property type           Button type can be "submit", "reset", "button", or "menu"
 * @property value          Defines a value for the button submitted with form data
 */
export interface ButtonProperties extends ThemedProperties, InputEventProperties, FocusProperties, PointerEventProperties, KeyEventProperties, CustomAriaProperties {
    disabled?: boolean;
    widgetId?: string;
    popup?: {
        expanded?: boolean;
        id?: string;
    } | boolean;
    name?: string;
    pressed?: boolean;
    type?: ButtonType;
    value?: string;
    onClick?(): void;
}
declare const Button_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => FocusMixin);
export declare class Button extends Button_base<ButtonProperties> {
    private _onBlur(event);
    private _onClick(event);
    private _onFocus(event);
    private _onKeyDown(event);
    private _onKeyPress(event);
    private _onKeyUp(event);
    private _onMouseDown(event);
    private _onMouseUp(event);
    private _onTouchStart(event);
    private _onTouchEnd(event);
    private _onTouchCancel(event);
    protected getContent(): DNode[];
    protected getModifierClasses(): (string | null)[];
    render(): DNode;
}
export default Button;
