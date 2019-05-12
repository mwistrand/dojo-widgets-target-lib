import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin, FocusProperties } from '@dojo/framework/widget-core/mixins/Focus';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { CustomAriaProperties, LabeledProperties, InputEventProperties, InputProperties, PointerEventProperties, KeyEventProperties } from '../common/interfaces';
/**
 * @type SliderProperties
 *
 * Properties that can be set on a Slider component
 *
 * @property max               The maximum value for the slider
 * @property min               The minimum value for the slider
 * @property output            An optional function that returns a string or DNode for custom output format
 * @property showOutput        Toggles visibility of slider output
 * @property step              Size of the slider increment
 * @property vertical          Orients the slider vertically, false by default.
 * @property verticalHeight    Length of the vertical slider (only used if vertical is true)
 * @property value           The current value
 */
export interface SliderProperties extends ThemedProperties, LabeledProperties, InputProperties, FocusProperties, InputEventProperties, PointerEventProperties, KeyEventProperties, CustomAriaProperties {
    max?: number;
    min?: number;
    output?(value: number): DNode;
    outputIsTooltip?: boolean;
    showOutput?: boolean;
    step?: number;
    vertical?: boolean;
    verticalHeight?: string;
    value?: number;
    onClick?(value: number): void;
    inputStyles?: Partial<CSSStyleDeclaration>;
}
declare const Slider_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => FocusMixin);
export declare class Slider extends Slider_base<SliderProperties> {
    private _widgetId;
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
    protected getRootClasses(): (string | null)[];
    protected renderControls(percentValue: number): DNode;
    protected renderOutput(value: number, percentValue: number): DNode;
    render(): DNode;
}
export default Slider;
