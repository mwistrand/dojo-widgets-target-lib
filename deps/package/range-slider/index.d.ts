import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { CustomAriaProperties, InputProperties, KeyEventProperties, LabeledProperties, PointerEventProperties } from '../common/interfaces';
export interface RangeSliderProperties extends ThemedProperties, LabeledProperties, InputProperties, PointerEventProperties, KeyEventProperties, CustomAriaProperties {
    max?: number;
    min?: number;
    output?(min: number, max: number): DNode;
    outputIsTooltip?: boolean;
    showOutput?: boolean;
    step?: number;
    minValue?: number;
    maxValue?: number;
    minName?: string;
    maxName?: string;
    minimumLabel?: string;
    maximumLabel?: string;
    onClick?(minValue: number, maxValue: number): void;
    onInput?(minValue: number, maxValue: number): void;
    onChange?(minValue: number, maxValue: number): void;
    onBlur?(value?: string | number | boolean): void;
    onFocus?(value?: string | number | boolean): void;
}
declare const RangeSlider_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export declare class RangeSlider extends RangeSlider_base<RangeSliderProperties> {
    private _widgetId;
    private _minLabelId;
    private _maxLabelId;
    protected getRootClasses(): (string | null)[];
    private _genericCallback(callback?, minEvent?, maxEvent?);
    private _genericChangeCallback(callback?, minEvent?, maxEvent?);
    private _onKeyDown(event);
    private _onKeyPress(event);
    private _onKeyUp(event);
    private _onMouseDown(event);
    private _onMouseUp(event);
    private _onTouchStart(event);
    private _onTouchEnd(event);
    private _onTouchCancel(event);
    private _getInputProperties(isSlider1);
    protected renderOutput(minValue: number, maxValue: number, percentValue: number[]): DNode;
    render(): DNode;
}
export default RangeSlider;
