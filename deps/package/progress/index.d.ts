import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { CustomAriaProperties } from '../common/interfaces';
import { DNode } from '@dojo/framework/widget-core/interfaces';
/**
 * @type ProgressProperties
 *
 * Properties that can be set on a Progress component
 *
 * @property value          The current value
 * @property output         A function used to determine the output display
 * @property showOutput     Toggles visibility of progess bar output
 * @property max            Value used to calculate percent width
 * @property min            Value used to calculate percent width
 * @property widgetId       Value used to supply a dom id to the element with role="progressbar"
 */
export interface ProgressProperties extends ThemedProperties, CustomAriaProperties {
    value: number;
    output?(value: number, percent: number): string;
    showOutput?: boolean;
    max?: number;
    min?: number;
    widgetId?: string;
}
declare const Progress_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export declare class Progress extends Progress_base<ProgressProperties> {
    private _output(value, percent);
    protected renderProgress(percent: number): DNode[];
    protected render(): DNode;
}
export default Progress;
