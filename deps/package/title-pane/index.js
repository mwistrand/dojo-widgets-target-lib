"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@dojo/framework/core/util");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Focus_1 = require("@dojo/framework/widget-core/mixins/Focus");
var d_1 = require("@dojo/framework/widget-core/d");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var index_1 = require("../icon/index");
var fixedCss = require("./styles/title-pane.m.css");
var css = require("../theme/title-pane.m.css");
var Dimensions_1 = require("@dojo/framework/widget-core/meta/Dimensions");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var index_2 = require("../global-event/index");
var TitlePane = /** @class */ (function (_super) {
    tslib_1.__extends(TitlePane, _super);
    function TitlePane() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._id = util_1.uuid();
        _this._onWindowResize = function () {
            _this.invalidate();
        };
        return _this;
    }
    TitlePane.prototype._onTitleClick = function (event) {
        event.stopPropagation();
        this._toggle();
    };
    TitlePane.prototype._toggle = function () {
        var _a = this.properties, _b = _a.closeable, closeable = _b === void 0 ? true : _b, key = _a.key, onRequestClose = _a.onRequestClose, onRequestOpen = _a.onRequestOpen, _c = _a.open, open = _c === void 0 ? true : _c;
        if (!closeable) {
            return;
        }
        if (open) {
            onRequestClose && onRequestClose(key);
        }
        else {
            onRequestOpen && onRequestOpen(key);
        }
    };
    TitlePane.prototype.getButtonContent = function () {
        return this.properties.title;
    };
    TitlePane.prototype.getFixedModifierClasses = function () {
        var _a = this.properties.closeable, closeable = _a === void 0 ? true : _a;
        return [closeable ? fixedCss.closeableFixed : null];
    };
    TitlePane.prototype.getModifierClasses = function () {
        var _a = this.properties.closeable, closeable = _a === void 0 ? true : _a;
        return [closeable ? css.closeable : null];
    };
    TitlePane.prototype.getPaneContent = function () {
        return this.children;
    };
    TitlePane.prototype.renderExpandIcon = function () {
        var _a = this.properties, _b = _a.open, open = _b === void 0 ? true : _b, theme = _a.theme, classes = _a.classes;
        return d_1.v('span', { classes: this.theme(css.arrow) }, [
            d_1.w(index_1.default, { type: open ? 'downIcon' : 'rightIcon', theme: theme, classes: classes })
        ]);
    };
    TitlePane.prototype.getPaneStyles = function () {
        var _a = this.properties.open, open = _a === void 0 ? true : _a;
        var contentDimensions = this.meta(Dimensions_1.Dimensions).get('content');
        return { marginTop: open ? '0px' : "-" + contentDimensions.offset.height + "px" };
    };
    TitlePane.prototype.render = function () {
        var _a = this.properties, _b = _a.closeable, closeable = _b === void 0 ? true : _b, headingLevel = _a.headingLevel, _c = _a.open, open = _c === void 0 ? true : _c;
        var transition = false;
        if (open !== this._open) {
            transition = true;
            this._open = open;
        }
        return d_1.v('div', {
            classes: tslib_1.__spread(this.theme([css.root, open ? css.open : null]), [fixedCss.rootFixed])
        }, [
            d_1.w(index_2.default, { key: 'global', window: { resize: this._onWindowResize } }),
            d_1.v('div', {
                'aria-level': headingLevel ? "" + headingLevel : null,
                classes: tslib_1.__spread(this.theme(tslib_1.__spread([css.title], this.getModifierClasses())), [
                    fixedCss.titleFixed
                ], this.getFixedModifierClasses()),
                role: 'heading'
            }, [
                d_1.v('button', {
                    'aria-controls': this._id + "-content",
                    'aria-expanded': "" + open,
                    disabled: !closeable,
                    classes: tslib_1.__spread([
                        fixedCss.titleButtonFixed
                    ], this.theme([css.titleButton])),
                    focus: this.shouldFocus,
                    id: this._id + "-title",
                    type: 'button',
                    onclick: this._onTitleClick
                }, [this.renderExpandIcon(), this.getButtonContent()])
            ]),
            d_1.v('div', {
                'aria-hidden': open ? null : 'true',
                'aria-labelledby': this._id + "-title",
                classes: tslib_1.__spread(this.theme([css.content, transition ? css.contentTransition : null]), [
                    fixedCss.contentFixed
                ]),
                id: this._id + "-content",
                key: 'content',
                styles: this.getPaneStyles()
            }, this.getPaneContent())
        ]);
    };
    TitlePane = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-title-pane',
            properties: ['theme', 'classes', 'extraClasses', 'open', 'closeable', 'headingLevel'],
            attributes: ['title', 'key'],
            events: ['onRequestClose', 'onRequestOpen']
        })
    ], TitlePane);
    return TitlePane;
}(Themed_1.ThemedMixin(Focus_1.FocusMixin(WidgetBase_1.WidgetBase))));
exports.TitlePane = TitlePane;
exports.default = TitlePane;

/*# sourceMappingURL=index.js.map*/