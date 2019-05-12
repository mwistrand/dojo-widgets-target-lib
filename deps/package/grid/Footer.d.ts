import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import ThemedMixin from '@dojo/framework/widget-core/mixins/Themed';
import { DNode } from '@dojo/framework/widget-core/interfaces';
export interface FooterProperties {
    total?: number;
    page: number;
    pageSize: number;
}
declare const Footer_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export default class Footer extends Footer_base<FooterProperties> {
    protected render(): DNode;
}
