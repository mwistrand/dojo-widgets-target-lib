"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@dojo/framework/core/util");
var I18n_1 = require("@dojo/framework/widget-core/mixins/I18n");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var d_1 = require("@dojo/framework/widget-core/d");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var util_2 = require("../common/util");
var animations = require("../common/styles/animations.m.css");
var common_1 = require("../common/nls/common");
var index_1 = require("../icon/index");
var fixedCss = require("./styles/slide-pane.m.css");
var css = require("../theme/slide-pane.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
/**
 * Enum for left / right alignment
 */
var Align;
(function (Align) {
    Align["bottom"] = "bottom";
    Align["left"] = "left";
    Align["right"] = "right";
    Align["top"] = "top";
})(Align = exports.Align || (exports.Align = {}));
/**
 * The default width of the slide pane
 */
var DEFAULT_WIDTH = 320;
var Plane;
(function (Plane) {
    Plane[Plane["x"] = 0] = "x";
    Plane[Plane["y"] = 1] = "y";
})(Plane || (Plane = {}));
var Slide;
(function (Slide) {
    Slide[Slide["in"] = 0] = "in";
    Slide[Slide["out"] = 1] = "out";
})(Slide || (Slide = {}));
var SlidePane = /** @class */ (function (_super) {
    tslib_1.__extends(SlidePane, _super);
    function SlidePane() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._initialPosition = 0;
        _this._titleId = util_1.uuid();
        _this._transform = 0;
        _this._hasMoved = false;
        return _this;
    }
    Object.defineProperty(SlidePane.prototype, "plane", {
        get: function () {
            var _a = this.properties.align, align = _a === void 0 ? Align.left : _a;
            return align === Align.left || align === Align.right ? Plane.x : Plane.y;
        },
        enumerable: true,
        configurable: true
    });
    SlidePane.prototype._onOpenChange = function (oldProperties, newProperties) {
        var wasOpen = oldProperties.open;
        var open = newProperties.open, onOpen = newProperties.onOpen;
        if (open && !wasOpen) {
            this._slide = Slide.in;
            onOpen && onOpen();
        }
        else if (!open && wasOpen) {
            this._slide = Slide.out;
        }
    };
    SlidePane.prototype._getDelta = function (event, eventType) {
        var _a = this.properties.align, align = _a === void 0 ? Align.left : _a;
        if (this.plane === Plane.x) {
            var currentX = event.type === eventType ? event.changedTouches[0].screenX : event.pageX;
            return align === Align.right
                ? currentX - this._initialPosition
                : this._initialPosition - currentX;
        }
        else {
            var currentY = event.type === eventType ? event.changedTouches[0].screenY : event.pageY;
            return align === Align.bottom
                ? currentY - this._initialPosition
                : this._initialPosition - currentY;
        }
    };
    SlidePane.prototype._onCloseClick = function (event) {
        event.stopPropagation();
        var onRequestClose = this.properties.onRequestClose;
        onRequestClose && onRequestClose();
    };
    SlidePane.prototype._onSwipeStart = function (event) {
        event.stopPropagation();
        this._swiping = true;
        // Cache initial pointer position
        if (this.plane === Plane.x) {
            this._initialPosition =
                event.type === 'touchstart' ? event.changedTouches[0].screenX : event.pageX;
        }
        else {
            this._initialPosition =
                event.type === 'touchstart' ? event.changedTouches[0].screenY : event.pageY;
        }
        // Clear out the last transform applied
        this._transform = 0;
    };
    SlidePane.prototype._onSwipeMove = function (event) {
        event.stopPropagation();
        // Ignore mouse movement when not swiping
        if (!this._swiping) {
            return;
        }
        this._hasMoved = true;
        var _a = this.properties.width, width = _a === void 0 ? DEFAULT_WIDTH : _a;
        var delta = this._getDelta(event, 'touchmove');
        // Prevent pane from sliding past screen edge
        if (delta >= 0) {
            this._transform = (100 * delta) / width;
            this.invalidate();
        }
    };
    SlidePane.prototype._onSwipeEnd = function (event) {
        event.stopPropagation();
        this._swiping = false;
        this._hasMoved = false;
        var _a = this.properties, onRequestClose = _a.onRequestClose, _b = _a.width, width = _b === void 0 ? DEFAULT_WIDTH : _b;
        var delta = this._getDelta(event, 'touchend');
        // If the pane was swiped far enough to close
        if (delta > width / 2) {
            onRequestClose && onRequestClose();
        }
        else if (delta > 0) {
            // Animate the pane back open
            this._slide = Slide.in;
            this.invalidate();
        }
    };
    SlidePane.prototype._onUnderlayMouseUp = function (event) {
        var onRequestClose = this.properties.onRequestClose;
        if (this._hasMoved === false) {
            onRequestClose && onRequestClose();
        }
    };
    SlidePane.prototype.getContent = function () {
        return d_1.v('div', { classes: [this.theme(css.content), fixedCss.contentFixed] }, this.children);
    };
    SlidePane.prototype.getStyles = function () {
        var _a = this.properties, _b = _a.align, align = _b === void 0 ? Align.left : _b, _c = _a.width, width = _c === void 0 ? DEFAULT_WIDTH : _c;
        var translate = '';
        var translateAxis = this.plane === Plane.x ? 'X' : 'Y';
        if (this._swiping) {
            translate =
                align === Align.left || align === Align.top
                    ? "-" + this._transform
                    : "" + this._transform;
        }
        return {
            transform: translate ? "translate" + translateAxis + "(" + translate + "%)" : null,
            width: this.plane === Plane.x ? width + "px" : null,
            height: this.plane === Plane.y ? width + "px" : null
        };
    };
    SlidePane.prototype.getFixedModifierClasses = function () {
        var _a = this.properties, _b = _a.align, align = _b === void 0 ? Align.left : _b, _c = _a.open, open = _c === void 0 ? false : _c;
        var alignCss = fixedCss;
        return [
            open ? fixedCss.openFixed : null,
            alignCss[align + "Fixed"],
            this._slide === Slide.in ? fixedCss.slideInFixed : null,
            this._slide === Slide.out ? fixedCss.slideOutFixed : null
        ];
    };
    SlidePane.prototype.getModifierClasses = function () {
        var _a = this.properties, _b = _a.align, align = _b === void 0 ? Align.left : _b, _c = _a.open, open = _c === void 0 ? false : _c;
        var alignCss = css;
        return [
            alignCss[align],
            open ? css.open : null,
            this._slide === Slide.in ? css.slideIn : null,
            this._slide === Slide.out ? css.slideOut : null
        ];
    };
    SlidePane.prototype.renderTitle = function () {
        var _a = this.properties.title, title = _a === void 0 ? '' : _a;
        return d_1.v('div', { id: this._titleId }, [title]);
    };
    SlidePane.prototype.renderUnderlay = function () {
        var _a = this.properties.underlay, underlay = _a === void 0 ? false : _a;
        return d_1.v('div', {
            classes: [this.theme(underlay ? css.underlayVisible : null), fixedCss.underlay],
            enterAnimation: animations.fadeIn,
            exitAnimation: animations.fadeOut,
            onmouseup: this._onUnderlayMouseUp,
            ontouchend: this._onUnderlayMouseUp,
            key: 'underlay'
        });
    };
    SlidePane.prototype.render = function () {
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, closeText = _a.closeText, _c = _a.open, open = _c === void 0 ? false : _c, _d = _a.title, title = _d === void 0 ? '' : _d, theme = _a.theme, classes = _a.classes;
        var contentStyles = this.getStyles();
        var contentClasses = this.getModifierClasses();
        var fixedContentClasses = this.getFixedModifierClasses();
        if (!closeText) {
            var messages = this.localizeBundle(common_1.default).messages;
            closeText = messages.close + " " + title;
        }
        // This is a side-effect of rendering, it clears the slide styles for the next render.
        this._slide = undefined;
        return d_1.v('div', {
            'aria-labelledby': this._titleId,
            classes: this.theme(css.root),
            onmousedown: this._onSwipeStart,
            onmousemove: this._onSwipeMove,
            onmouseup: this._onSwipeEnd,
            ontouchend: this._onSwipeEnd,
            ontouchmove: this._onSwipeMove,
            ontouchstart: this._onSwipeStart
        }, [
            open ? this.renderUnderlay() : null,
            d_1.v('div', tslib_1.__assign({}, util_2.formatAriaProperties(aria), { key: 'content', classes: tslib_1.__spread(this.theme(tslib_1.__spread([css.pane], contentClasses)), [
                    fixedCss.paneFixed
                ], fixedContentClasses), transitionend: this.invalidate, styles: contentStyles }), [
                title
                    ? d_1.v('div', {
                        classes: this.theme(css.title),
                        key: 'title'
                    }, [
                        this.renderTitle(),
                        d_1.v('button', {
                            classes: this.theme(css.close),
                            type: 'button',
                            onclick: this._onCloseClick
                        }, [
                            closeText,
                            d_1.w(index_1.default, { type: 'closeIcon', theme: theme, classes: classes })
                        ])
                    ])
                    : null,
                this.getContent()
            ])
        ]);
    };
    tslib_1.__decorate([
        diffProperty_1.default('open'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], SlidePane.prototype, "_onOpenChange", null);
    SlidePane = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-slide-pane',
            properties: ['theme', 'aria', 'extraClasses', 'open', 'underlay', 'classes'],
            attributes: ['align', 'closeText', 'title'],
            events: ['onOpen', 'onRequestClose']
        })
    ], SlidePane);
    return SlidePane;
}(I18n_1.I18nMixin(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase))));
exports.SlidePane = SlidePane;
exports.default = SlidePane;

/*# sourceMappingURL=index.js.map*/