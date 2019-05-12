import { DNode } from '@dojo/framework/widget-core/interfaces';
import { I18nMixin } from '@dojo/framework/widget-core/mixins/I18n';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { Align } from '../slide-pane/index';
export { Align };
/**
 * @type ToolbarProperties
 *
 * Properties that can be set on a Toolbar component
 *
 * @property collapseWidth     Width at which to collapse actions into a SlidePane
 * @property onCollapse        Called when action items change their layout
 * @property heading           The toolbar heading
 */
export interface ToolbarProperties extends ThemedProperties {
    align?: Align;
    collapseWidth?: number;
    onCollapse?(collapsed: boolean): void;
    heading?: string;
}
declare const Toolbar_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => I18nMixin);
export declare class Toolbar extends Toolbar_base<ToolbarProperties> {
    private _collapsed;
    private _open;
    private _closeMenu();
    private _collapseIfNecessary;
    private _toggleMenu(event);
    protected onAttach(): void;
    protected renderActions(): DNode;
    protected renderButton(): DNode;
    protected render(): DNode;
}
export default Toolbar;
