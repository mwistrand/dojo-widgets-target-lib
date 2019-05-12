import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin, FocusProperties } from '@dojo/framework/widget-core/mixins/Focus';
import { CustomAriaProperties, LabeledProperties, InputProperties, KeyEventProperties, CheckboxRadioEventProperties, PointerEventProperties } from '../common/interfaces';
/**
 * @type RadioProperties
 *
 * Properties that can be set on a Radio component
 *
 * @property checked          Checked/unchecked property of the radio
 * @property value           The current value
 */
export interface RadioProperties extends ThemedProperties, LabeledProperties, InputProperties, FocusProperties, KeyEventProperties, PointerEventProperties, CustomAriaProperties, CheckboxRadioEventProperties {
    checked?: boolean;
    value?: string;
}
declare const Radio_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => FocusMixin);
export declare class Radio extends Radio_base<RadioProperties> {
    private _uuid;
    private _onBlur(event);
    private _onChange(event);
    private _onClick(event);
    private _onFocus(event);
    private _onMouseDown(event);
    private _onMouseUp(event);
    private _onTouchStart(event);
    private _onTouchEnd(event);
    private _onTouchCancel(event);
    protected getRootClasses(): (string | null)[];
    render(): DNode;
}
export default Radio;
