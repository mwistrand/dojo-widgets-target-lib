import { DNode } from '@dojo/framework/widget-core/interfaces';
import { I18nMixin } from '@dojo/framework/widget-core/mixins/I18n';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin, FocusProperties } from '@dojo/framework/widget-core/mixins/Focus';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { CommonMessages } from '../common/interfaces';
/**
 * @type TabButtonProperties
 *
 * Properties that can be set on a TabButton component
 *
 * @property active             Determines whether this tab button is active
 * @property closeable          Determines whether this tab can be closed
 * @property controls           ID of the DOM element this tab button controls
 * @property disabled           Determines whether this tab can become active
 * @property id                 ID of this tab button DOM element
 * @property index              The position of this tab button
 * @property onClick            Called when this tab button is clicked
 * @property onCloseClick       Called when this tab button's close icon is clicked
 * @property onDownArrowPress   Called when the down arrow button is pressed
 * @property onEndPress         Called when the end button is pressed
 * @property onHomePress        Called when the home button is pressed
 * @property onLeftArrowPress   Called when the left arrow button is pressed
 * @property onRightArrowPress  Called when the right arrow button is pressed
 * @property onUpArrowPress     Called when the up arrow button is pressed
 */
export interface TabButtonProperties extends ThemedProperties, FocusProperties {
    active?: boolean;
    closeable?: boolean;
    controls: string;
    disabled?: boolean;
    id: string;
    index: number;
    onClick?: (index: number) => void;
    onCloseClick?: (index: number) => void;
    onDownArrowPress?: () => void;
    onEndPress?: () => void;
    onHomePress?: () => void;
    onLeftArrowPress?: () => void;
    onRightArrowPress?: () => void;
    onUpArrowPress?: () => void;
}
export declare const ThemedBase: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => FocusMixin) & (new (...args: any[]) => I18nMixin);
export declare class TabButtonBase<P extends TabButtonProperties = TabButtonProperties> extends ThemedBase<P> {
    private _onClick(event);
    private _onCloseClick(event);
    private _onKeyDown(event);
    protected getContent(messages: CommonMessages): DNode[];
    protected getModifierClasses(): (string | null)[];
    render(): DNode;
}
export default class TabButton extends TabButtonBase<TabButtonProperties> {
}
