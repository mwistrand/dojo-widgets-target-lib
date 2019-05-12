import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { CustomAriaProperties } from '../common/interfaces';
/**
 * @type TooltipProperties
 *
 * Properties that can be set on Tooltip components
 *
 * @property content           Information to show within the tooltip
 * @property orientation       Where this tooltip should render relative to its child
 * @property open              Determines if this tooltip is visible
 */
export interface TooltipProperties extends ThemedProperties, CustomAriaProperties {
    content: DNode;
    orientation?: Orientation;
    open?: boolean;
}
export declare enum Orientation {
    bottom = "bottom",
    left = "left",
    right = "right",
    top = "top",
}
declare const Tooltip_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export declare class Tooltip extends Tooltip_base<TooltipProperties> {
    protected getFixedModifierClasses(): (string | null)[];
    protected getModifierClasses(): (string | null)[];
    protected renderContent(): DNode;
    protected renderTarget(): DNode;
    render(): DNode;
}
export default Tooltip;
