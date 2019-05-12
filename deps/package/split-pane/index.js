"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var d_1 = require("@dojo/framework/widget-core/d");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
var fixedCss = require("./styles/split-pane.m.css");
var css = require("../theme/split-pane.m.css");
var Dimensions_1 = require("@dojo/framework/widget-core/meta/Dimensions");
var Resize_1 = require("@dojo/framework/widget-core/meta/Resize");
var index_1 = require("../global-event/index");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
/**
 * Direction of this SplitPane
 */
var Direction;
(function (Direction) {
    Direction["column"] = "column";
    Direction["row"] = "row";
})(Direction = exports.Direction || (exports.Direction = {}));
var DEFAULT_SIZE = 100;
var SplitPane = /** @class */ (function (_super) {
    tslib_1.__extends(SplitPane, _super);
    function SplitPane() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._position = 0;
        _this._collapsed = false;
        _this._resizeResultOverridden = false;
        _this._width = 0;
        _this._onDragMove = function (event) {
            event.stopPropagation();
            if (!_this._dragging) {
                return;
            }
            var _a = _this.properties, _b = _a.direction, direction = _b === void 0 ? Direction.column : _b, onResize = _a.onResize, _c = _a.size, size = _c === void 0 ? DEFAULT_SIZE : _c;
            var currentPosition = _this._getPosition(event);
            var newSize = (_this._lastSize === undefined ? size : _this._lastSize) +
                currentPosition -
                _this._position;
            var rootDimensions = _this.meta(Dimensions_1.Dimensions).get('root');
            var dividerDimensions = _this.meta(Dimensions_1.Dimensions).get('divider');
            var maxSize = direction === Direction.column
                ? rootDimensions.offset.width - dividerDimensions.offset.width
                : rootDimensions.offset.height - dividerDimensions.offset.height;
            _this._lastSize = newSize;
            newSize = newSize < 0 ? 0 : newSize;
            newSize = newSize > maxSize ? maxSize : newSize;
            _this._position = currentPosition;
            onResize && onResize(newSize);
        };
        _this._onDragEnd = function (event) {
            event.stopPropagation();
            _this._dragging = false;
            _this._lastSize = undefined;
        };
        return _this;
    }
    SplitPane.prototype.collapseWidthDiff = function (oldProperties, _a) {
        var collapseWidth = _a.collapseWidth, direction = _a.direction, onCollapse = _a.onCollapse;
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
    };
    SplitPane.prototype._getPosition = function (event) {
        event.stopPropagation();
        var _a = this.properties.direction, direction = _a === void 0 ? Direction.column : _a;
        if (direction === Direction.column) {
            return event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
        }
        else {
            return event.changedTouches ? event.changedTouches[0].clientY : event.clientY;
        }
    };
    SplitPane.prototype._onDragStart = function (event) {
        event.stopPropagation();
        event.preventDefault();
        this._dragging = true;
        this._position = this._getPosition(event);
    };
    SplitPane.prototype.getPaneContent = function (content) {
        return content ? [content] : [];
    };
    SplitPane.prototype._shouldCollapse = function (dimensions, collapseWidth) {
        var _a = this.properties, onCollapse = _a.onCollapse, direction = _a.direction;
        if (direction === Direction.row) {
            return false;
        }
        var width = dimensions.width;
        var shouldCollapse = width <= collapseWidth;
        if (shouldCollapse !== this._collapsed) {
            onCollapse && onCollapse(shouldCollapse);
        }
        return shouldCollapse;
    };
    SplitPane.prototype.render = function () {
        var _this = this;
        var _a = this.properties, _b = _a.direction, direction = _b === void 0 ? Direction.column : _b, _c = _a.size, size = _c === void 0 ? DEFAULT_SIZE : _c, collapseWidth = _a.collapseWidth;
        var rootDimensions = this.meta(Dimensions_1.Dimensions).get('root');
        this._width = rootDimensions.size.width;
        if (collapseWidth) {
            var shouldCollapse = this.meta(Resize_1.Resize).get('root', {
                shouldCollapse: function (dimensions) {
                    _this._resizeResultOverridden = false;
                    return _this._shouldCollapse(dimensions, collapseWidth);
                }
            }).shouldCollapse;
            if (!this._resizeResultOverridden) {
                // update this._collapsed for check in next render
                this._collapsed = shouldCollapse;
            }
        }
        var paneStyles = {};
        var computedSize = this._collapsed ? 'auto' : size + "px";
        paneStyles[direction === Direction.column ? 'width' : 'height'] = computedSize;
        return d_1.v('div', {
            classes: tslib_1.__spread(this.theme([
                css.root,
                this._collapsed ? css.collapsed : null,
                direction === Direction.row ? css.row : css.column
            ]), [
                fixedCss.rootFixed,
                direction === Direction.row ? fixedCss.rowFixed : fixedCss.columnFixed,
                this._collapsed ? fixedCss.collapsedFixed : null
            ]),
            key: 'root'
        }, [
            d_1.w(index_1.GlobalEvent, {
                key: 'global',
                window: {
                    mouseup: this._onDragEnd,
                    mousemove: this._onDragMove,
                    touchmove: this._onDragMove
                }
            }),
            d_1.v('div', {
                classes: [this.theme(css.leading), fixedCss.leadingFixed],
                key: 'leading',
                styles: paneStyles
            }, this.getPaneContent(this.children[0])),
            d_1.v('div', {
                classes: [this.theme(css.divider), fixedCss.dividerFixed],
                key: 'divider',
                onmousedown: this._onDragStart,
                ontouchend: this._onDragEnd,
                ontouchstart: this._onDragStart
            }),
            d_1.v('div', {
                classes: [this.theme(css.trailing), fixedCss.trailingFixed],
                key: 'trailing'
            }, this.getPaneContent(this.children[1]))
        ]);
    };
    tslib_1.__decorate([
        diffProperty_1.diffProperty('collapseWidth'),
        diffProperty_1.diffProperty('direction'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], SplitPane.prototype, "collapseWidthDiff", null);
    SplitPane = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-split-pane',
            properties: ['theme', 'classes', 'extraClasses', 'size', 'collapseWidth'],
            attributes: ['direction'],
            events: ['onCollapse', 'onResize']
        })
    ], SplitPane);
    return SplitPane;
}(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase)));
exports.SplitPane = SplitPane;
exports.default = SplitPane;

/*# sourceMappingURL=index.js.map*/