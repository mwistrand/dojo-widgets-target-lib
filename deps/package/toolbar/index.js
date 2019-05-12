"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Dimensions_1 = require("@dojo/framework/widget-core/meta/Dimensions");
var I18n_1 = require("@dojo/framework/widget-core/mixins/I18n");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var d_1 = require("@dojo/framework/widget-core/d");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var index_1 = require("../icon/index");
var index_2 = require("../slide-pane/index");
exports.Align = index_2.Align;
var common_1 = require("../common/nls/common");
var fixedCss = require("./styles/toolbar.m.css");
var css = require("../theme/toolbar.m.css");
var index_3 = require("../global-event/index");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var Toolbar = /** @class */ (function (_super) {
    tslib_1.__extends(Toolbar, _super);
    function Toolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._collapsed = false;
        _this._open = false;
        _this._collapseIfNecessary = function () {
            var _a = _this.properties, _b = _a.collapseWidth, collapseWidth = _b === void 0 ? 800 : _b, onCollapse = _a.onCollapse;
            var width = _this.meta(Dimensions_1.Dimensions).get('root').size.width;
            if (width > collapseWidth && _this._collapsed === true) {
                _this._collapsed = false;
                onCollapse && onCollapse(_this._collapsed);
                _this.invalidate();
            }
            else if (width <= collapseWidth && _this._collapsed === false) {
                _this._collapsed = true;
                onCollapse && onCollapse(_this._collapsed);
                _this.invalidate();
            }
        };
        return _this;
    }
    Toolbar.prototype._closeMenu = function () {
        this._open = false;
        this.invalidate();
    };
    Toolbar.prototype._toggleMenu = function (event) {
        event.stopPropagation();
        this._open = !this._open;
        this.invalidate();
    };
    Toolbar.prototype.onAttach = function () {
        this._collapseIfNecessary();
    };
    Toolbar.prototype.renderActions = function () {
        var close = this.localizeBundle(common_1.default).messages.close;
        var _a = this.properties, _b = _a.align, align = _b === void 0 ? index_2.Align.right : _b, theme = _a.theme, classes = _a.classes, heading = _a.heading;
        var actions = d_1.v('div', {
            classes: this.theme(css.actions),
            key: 'menu'
        }, this.children);
        return this._collapsed
            ? d_1.w(index_2.default, {
                align: align,
                closeText: close,
                key: 'slide-pane-menu',
                onRequestClose: this._closeMenu,
                open: this._open,
                theme: theme,
                classes: classes,
                title: heading
            }, [actions])
            : actions;
    };
    Toolbar.prototype.renderButton = function () {
        var open = this.localizeBundle(common_1.default).messages.open;
        var _a = this.properties, theme = _a.theme, classes = _a.classes;
        return d_1.v('button', {
            classes: this.theme(css.menuButton),
            type: 'button',
            onclick: this._toggleMenu
        }, [open, d_1.w(index_1.default, { type: 'barsIcon', theme: theme, classes: classes })]);
    };
    Toolbar.prototype.render = function () {
        var heading = this.properties.heading;
        var hasActions = this.children && this.children.length;
        return d_1.v('div', {
            key: 'root',
            classes: tslib_1.__spread([
                fixedCss.rootFixed
            ], this.theme([css.root, this._collapsed ? css.collapsed : null]))
        }, [
            d_1.w(index_3.GlobalEvent, { key: 'global', window: { resize: this._collapseIfNecessary } }),
            heading
                ? d_1.v('div', {
                    classes: this.theme(css.title)
                }, [heading])
                : null,
            hasActions ? this.renderActions() : null,
            hasActions && this._collapsed ? this.renderButton() : null
        ]);
    };
    Toolbar = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-toolbar',
            properties: ['theme', 'classes', 'extraClasses', 'collapseWidth'],
            attributes: ['key', 'heading'],
            events: ['onCollapse']
        })
    ], Toolbar);
    return Toolbar;
}(I18n_1.I18nMixin(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase))));
exports.Toolbar = Toolbar;
exports.default = Toolbar;

/*# sourceMappingURL=index.js.map*/