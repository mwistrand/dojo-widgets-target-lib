import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { CustomAriaProperties } from '../common/interfaces';
/**
 * @type TabProperties
 *
 * Properties that can be set on a Tab component
 *
 * @property closeable    Determines whether this tab can be closed
 * @property disabled     Determines whether this tab can become active
 * @property widgetId       ID of this underlying DOM element
 * @property key          A unique identifier for this Tab within the TabController
 * @property label        Content to show in the TabController control bar for this tab
 * @property labelledBy   ID of DOM element that serves as a label for this tab
 */
export interface TabProperties extends ThemedProperties, CustomAriaProperties {
    closeable?: boolean;
    disabled?: boolean;
    widgetId?: string;
    key: string;
    label?: DNode;
    show?: boolean;
    labelledBy?: string;
}
declare const Tab_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export declare class Tab extends Tab_base<TabProperties> {
    render(): DNode;
}
export default Tab;
