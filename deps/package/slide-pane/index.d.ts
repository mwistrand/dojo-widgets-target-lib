import { DNode } from '@dojo/framework/widget-core/interfaces';
import { I18nMixin } from '@dojo/framework/widget-core/mixins/I18n';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { CustomAriaProperties } from '../common/interfaces';
/**
 * Enum for left / right alignment
 */
export declare enum Align {
    bottom = "bottom",
    left = "left",
    right = "right",
    top = "top",
}
/**
 * @type SlidePaneProperties
 *
 * Properties that can be set on a SlidePane component
 *
 * @property align            The position of the pane on the screen
 * @property closeText        Hidden text used by screen readers to display for the close button
 * @property onOpen           Called when the pane opens
 * @property onRequestClose   Called when the pane is swiped closed or the underlay is clicked or tapped
 * @property open             Determines whether the pane is open or closed
 * @property title            Title to display in the pane
 * @property underlay         Determines whether a semi-transparent background shows behind the pane
 * @property width            Width of the pane in pixels
 */
export interface SlidePaneProperties extends ThemedProperties, CustomAriaProperties {
    align?: Align;
    closeText?: string;
    onOpen?(): void;
    onRequestClose?(): void;
    open?: boolean;
    title?: string;
    underlay?: boolean;
    width?: number;
}
declare const SlidePane_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => I18nMixin);
export declare class SlidePane extends SlidePane_base<SlidePaneProperties> {
    private _initialPosition;
    private _slide;
    private _swiping;
    private _titleId;
    private _transform;
    private _hasMoved;
    private readonly plane;
    protected _onOpenChange(oldProperties: Partial<SlidePaneProperties>, newProperties: Partial<SlidePaneProperties>): void;
    private _getDelta(event, eventType);
    private _onCloseClick(event);
    private _onSwipeStart(event);
    private _onSwipeMove(event);
    private _onSwipeEnd(event);
    private _onUnderlayMouseUp(event);
    protected getContent(): DNode;
    protected getStyles(): {
        [index: string]: string | null;
    };
    protected getFixedModifierClasses(): (string | null)[];
    protected getModifierClasses(): (string | null)[];
    protected renderTitle(): DNode;
    protected renderUnderlay(): DNode;
    protected render(): DNode;
}
export default SlidePane;
