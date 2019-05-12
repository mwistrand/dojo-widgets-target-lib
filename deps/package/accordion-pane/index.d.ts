import { DNode, WNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import TitlePane from '../title-pane/index';
/**
 * @type AccordionPaneProperties
 *
 * Properties that can be set on AccordionPane components
 *
 * @property onRequestClose   Called when the title of an open pane is clicked
 * @property onRequestOpen    Called when the title of a closed pane is clicked
 * @property openKeys         Array of TitlePane keys indicating which panes should be open
 */
export interface AccordionPaneProperties extends ThemedProperties {
    onRequestClose?(key: string): void;
    onRequestOpen?(key: string): void;
    openKeys?: string[];
}
declare const AccordionPane_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export declare class AccordionPane extends AccordionPane_base<AccordionPaneProperties, WNode<TitlePane>> {
    private _assignCallback(child, functionName, callback);
    protected onRequestClose(key: string): void;
    protected onRequestOpen(key: string): void;
    protected renderChildren(): DNode[];
    protected render(): DNode;
}
export default AccordionPane;
