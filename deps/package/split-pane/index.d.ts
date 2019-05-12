import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
/**
 * Direction of this SplitPane
 */
export declare enum Direction {
    column = "column",
    row = "row",
}
/**
 * @type SplitPaneProperties
 *
 * Properties that can be set on a SplitPane component
 *
 * @property direction      Orientation of this SplitPane, can be `row` or `column`
 * @property onResize       Called when the divider is dragged; should be used to update `size`
 * @property size           Size of the primary pane
 */
export interface SplitPaneProperties extends ThemedProperties {
    direction?: Direction;
    onResize?(size: number): void;
    size?: number;
    collapseWidth?: number;
    onCollapse?(collapsed: boolean): void;
}
declare const SplitPane_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export declare class SplitPane extends SplitPane_base<SplitPaneProperties> {
    private _dragging;
    private _lastSize?;
    private _position;
    private _collapsed;
    private _resizeResultOverridden;
    private _width;
    protected collapseWidthDiff(oldProperties: SplitPaneProperties, {collapseWidth, direction, onCollapse}: SplitPaneProperties): void;
    private _getPosition(event);
    private _onDragStart(event);
    private _onDragMove;
    private _onDragEnd;
    protected getPaneContent(content: DNode | undefined): DNode[];
    private _shouldCollapse(dimensions, collapseWidth);
    protected render(): DNode;
}
export default SplitPane;
