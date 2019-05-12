import * as tslib_1 from "tslib";
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { diffProperty } from '@dojo/framework/widget-core/decorators/diffProperty';
import * as fixedCss from './styles/split-pane.m.css';
import * as css from '../theme/split-pane.m.css';
import { Dimensions } from '@dojo/framework/widget-core/meta/Dimensions';
import { Resize } from '@dojo/framework/widget-core/meta/Resize';
import { GlobalEvent } from '../global-event/index';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
/**
 * Direction of this SplitPane
 */
export var Direction;
(function (Direction) {
    Direction["column"] = "column";
    Direction["row"] = "row";
})(Direction || (Direction = {}));
const DEFAULT_SIZE = 100;
let SplitPane = class SplitPane extends ThemedMixin(WidgetBase) {
    constructor() {
        super(...arguments);
        this._position = 0;
        this._collapsed = false;
        this._resizeResultOverridden = false;
        this._width = 0;
        this._onDragMove = (event) => {
            event.stopPropagation();
            if (!this._dragging) {
                return;
            }
            const { direction = Direction.column, onResize, size = DEFAULT_SIZE } = this.properties;
            const currentPosition = this._getPosition(event);
            let newSize = (this._lastSize === undefined ? size : this._lastSize) +
                currentPosition -
                this._position;
            const rootDimensions = this.meta(Dimensions).get('root');
            const dividerDimensions = this.meta(Dimensions).get('divider');
            const maxSize = direction === Direction.column
                ? rootDimensions.offset.width - dividerDimensions.offset.width
                : rootDimensions.offset.height - dividerDimensions.offset.height;
            this._lastSize = newSize;
            newSize = newSize < 0 ? 0 : newSize;
            newSize = newSize > maxSize ? maxSize : newSize;
            this._position = currentPosition;
            onResize && onResize(newSize);
        };
        this._onDragEnd = (event) => {
            event.stopPropagation();
            this._dragging = false;
            this._lastSize = undefined;
        };
    }
    collapseWidthDiff(oldProperties, { collapseWidth, direction, onCollapse }) {
        if (direction === Direction.row ||
            (collapseWidth && collapseWidth < this._width && this._collapsed)) {
            this._collapsed = false;
            this._resizeResultOverridden = true;
            onCollapse && onCollapse(false);
        }
        else if (collapseWidth && (collapseWidth > this._width && !this._collapsed)) {
            this._collapsed = true;
            this._resizeResultOverridden = true;
            onCollapse && onCollapse(true);
        }
    }
    _getPosition(event) {
        event.stopPropagation();
        const { direction = Direction.column } = this.properties;
        if (direction === Direction.column) {
            return event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
        }
        else {
            return event.changedTouches ? event.changedTouches[0].clientY : event.clientY;
        }
    }
    _onDragStart(event) {
        event.stopPropagation();
        event.preventDefault();
        this._dragging = true;
        this._position = this._getPosition(event);
    }
    getPaneContent(content) {
        return content ? [content] : [];
    }
    _shouldCollapse(dimensions, collapseWidth) {
        const { onCollapse, direction } = this.properties;
        if (direction === Direction.row) {
            return false;
        }
        const { width } = dimensions;
        const shouldCollapse = width <= collapseWidth;
        if (shouldCollapse !== this._collapsed) {
            onCollapse && onCollapse(shouldCollapse);
        }
        return shouldCollapse;
    }
    render() {
        const { direction = Direction.column, size = DEFAULT_SIZE, collapseWidth } = this.properties;
        const rootDimensions = this.meta(Dimensions).get('root');
        this._width = rootDimensions.size.width;
        if (collapseWidth) {
            const { shouldCollapse } = this.meta(Resize).get('root', {
                shouldCollapse: (dimensions) => {
                    this._resizeResultOverridden = false;
                    return this._shouldCollapse(dimensions, collapseWidth);
                }
            });
            if (!this._resizeResultOverridden) {
                // update this._collapsed for check in next render
                this._collapsed = shouldCollapse;
            }
        }
        const paneStyles = {};
        let computedSize = this._collapsed ? 'auto' : `${size}px`;
        paneStyles[direction === Direction.column ? 'width' : 'height'] = computedSize;
        return v('div', {
            classes: [
                ...this.theme([
                    css.root,
                    this._collapsed ? css.collapsed : null,
                    direction === Direction.row ? css.row : css.column
                ]),
                fixedCss.rootFixed,
                direction === Direction.row ? fixedCss.rowFixed : fixedCss.columnFixed,
                this._collapsed ? fixedCss.collapsedFixed : null
            ],
            key: 'root'
        }, [
            w(GlobalEvent, {
                key: 'global',
                window: {
                    mouseup: this._onDragEnd,
                    mousemove: this._onDragMove,
                    touchmove: this._onDragMove
                }
            }),
            v('div', {
                classes: [this.theme(css.leading), fixedCss.leadingFixed],
                key: 'leading',
                styles: paneStyles
            }, this.getPaneContent(this.children[0])),
            v('div', {
                classes: [this.theme(css.divider), fixedCss.dividerFixed],
                key: 'divider',
                onmousedown: this._onDragStart,
                ontouchend: this._onDragEnd,
                ontouchstart: this._onDragStart
            }),
            v('div', {
                classes: [this.theme(css.trailing), fixedCss.trailingFixed],
                key: 'trailing'
            }, this.getPaneContent(this.children[1]))
        ]);
    }
};
tslib_1.__decorate([
    diffProperty('collapseWidth'),
    diffProperty('direction'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SplitPane.prototype, "collapseWidthDiff", null);
SplitPane = tslib_1.__decorate([
    theme(css),
    customElement({
        tag: 'dojo-split-pane',
        properties: ['theme', 'classes', 'extraClasses', 'size', 'collapseWidth'],
        attributes: ['direction'],
        events: ['onCollapse', 'onResize']
    })
], SplitPane);
export { SplitPane };
export default SplitPane;

/*# sourceMappingURL=index.mjs.map*/