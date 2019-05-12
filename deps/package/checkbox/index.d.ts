import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin, FocusProperties } from '@dojo/framework/widget-core/mixins/Focus';
import { CustomAriaProperties, LabeledProperties, InputProperties, CheckboxRadioEventProperties, KeyEventProperties, PointerEventProperties } from '../common/interfaces';
/**
 * @type CheckboxProperties
 *
 * Properties that can be set on a Checkbox component
 *
 * @property checked        Checked/unchecked property of the radio
 * @property mode           The type of user interface to show for this Checkbox
 * @property offLabel       Label to show in the "off" positin of a toggle
 * @property onLabel        Label to show in the "on" positin of a toggle
 * @property value           The current value
 */
export interface CheckboxProperties extends ThemedProperties, InputProperties, FocusProperties, LabeledProperties, KeyEventProperties, PointerEventProperties, CustomAriaProperties, CheckboxRadioEventProperties {
    checked?: boolean;
    mode?: Mode;
    offLabel?: DNode;
    onLabel?: DNode;
    value?: string;
}
/**
 * The type of UI to show for this Checkbox
 */
export declare enum Mode {
    normal = "normal",
    toggle = "toggle",
}
declare const Checkbox_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => FocusMixin);
export declare class Checkbox extends Checkbox_base<CheckboxProperties> {
    private _onBlur(event);
    private _onChange(event);
    private _onClick(event);
    private _onFocus(event);
    private _onMouseDown(event);
    private _onMouseUp(event);
    private _onTouchStart(event);
    private _onTouchEnd(event);
    private _onTouchCancel(event);
    private _uuid;
    protected getRootClasses(): (string | null)[];
    protected renderToggle(): DNode[];
    protected render(): DNode;
}
export default Checkbox;
