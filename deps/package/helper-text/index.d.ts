import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';
import { VNode } from '@dojo/framework/widget-core/interfaces';
export interface HelperTextProperties {
    text?: string;
    valid?: boolean;
}
declare const HelperText_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export default class HelperText extends HelperText_base<HelperTextProperties> {
    protected render(): VNode;
}
