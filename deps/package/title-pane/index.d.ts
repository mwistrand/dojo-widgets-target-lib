import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin, FocusProperties } from '@dojo/framework/widget-core/mixins/Focus';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
/**
 * @type TitlePaneProperties
 *
 * Properties that can be set on a TitlePane component
 *
 * @property closeable          If false the pane will not collapse in response to clicking the title
 * @property headingLevel       'aria-level' for the title's DOM node
 * @property onRequestClose     Called when the title of an open pane is clicked
 * @property onRequestOpen      Called when the title of a closed pane is clicked
 * @property open               If true the pane is opened and content is visible
 * @property title              Title to display above the content
 */
export interface TitlePaneProperties extends ThemedProperties, FocusProperties {
    closeable?: boolean;
    headingLevel?: number;
    onRequestClose?(key: string | number | undefined): void;
    onRequestOpen?(key: string | number | undefined): void;
    open?: boolean;
    title: string;
}
declare const TitlePane_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => FocusMixin);
export declare class TitlePane extends TitlePane_base<TitlePaneProperties> {
    private _id;
    private _open;
    private _onWindowResize;
    private _onTitleClick(event);
    private _toggle();
    protected getButtonContent(): DNode;
    protected getFixedModifierClasses(): (string | null)[];
    protected getModifierClasses(): (string | null)[];
    protected getPaneContent(): DNode[];
    protected renderExpandIcon(): DNode;
    protected getPaneStyles(): any;
    protected render(): DNode;
}
export default TitlePane;
