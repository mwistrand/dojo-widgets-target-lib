import { DNode, WNode } from '@dojo/framework/widget-core/interfaces';
import Tab from '../tab/index';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin, FocusProperties } from '@dojo/framework/widget-core/mixins/Focus';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { CustomAriaProperties } from '../common/interfaces';
/**
 * Enum for tab button alignment
 */
export declare enum Align {
    bottom = "bottom",
    left = "left",
    right = "right",
    top = "top",
}
/**
 * @type TabControllerProperties
 *
 * Properties that can be set on a TabController component
 *
 * @property activeIndex           Position of the currently active tab
 * @property alignButtons          Orientation of the tab buttons
 * @property onRequestTabChange    Called when a new tab button is clicked
 * @property onRequestTabClose     Called when a tab close button is clicked
 */
export interface TabControllerProperties extends ThemedProperties, FocusProperties, CustomAriaProperties {
    activeIndex: number;
    alignButtons?: Align;
    onRequestTabChange?(index: number, key: string): void;
    onRequestTabClose?(index: number, key: string): void;
}
declare const TabController_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => FocusMixin);
export declare class TabController extends TabController_base<TabControllerProperties, WNode<Tab>> {
    private _id;
    private readonly _tabs;
    private _onDownArrowPress();
    private _onLeftArrowPress();
    private _onRightArrowPress();
    private _onUpArrowPress();
    /**
     * Determines if the tab at `currentIndex` is enabled. If disabled,
     * returns the next valid index, or null if no enabled tabs exist.
     */
    private _validateIndex(currentIndex, backwards?);
    protected closeIndex(index: number): void;
    protected renderButtonContent(label?: DNode): DNode[];
    protected renderTabButtons(): DNode[];
    protected renderTabs(): DNode[];
    protected selectFirstIndex(): void;
    protected selectIndex(index: number, backwards?: boolean): void;
    protected selectLastIndex(): void;
    protected selectNextIndex(): void;
    protected selectPreviousIndex(): void;
    render(): DNode;
}
export default TabController;
