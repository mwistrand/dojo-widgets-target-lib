import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import ThemedMixin from '@dojo/framework/widget-core/mixins/Themed';
import { DNode } from '@dojo/framework/widget-core/interfaces';
declare const PlaceholderRow_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export default class PlaceholderRow extends PlaceholderRow_base {
    protected render(): DNode;
}
