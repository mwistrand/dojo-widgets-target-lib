"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var I18n_1 = require("@dojo/framework/widget-core/mixins/I18n");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Focus_1 = require("@dojo/framework/widget-core/mixins/Focus");
var d_1 = require("@dojo/framework/widget-core/d");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var common_1 = require("../common/nls/common");
var util_1 = require("../common/util");
var css = require("../theme/tab-controller.m.css");
exports.ThemedBase = I18n_1.I18nMixin(Themed_1.ThemedMixin(Focus_1.FocusMixin(WidgetBase_1.WidgetBase)));
var TabButtonBase = /** @class */ (function (_super) {
    tslib_1.__extends(TabButtonBase, _super);
    function TabButtonBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabButtonBase.prototype._onClick = function (event) {
        event.stopPropagation();
        var _a = this.properties, disabled = _a.disabled, index = _a.index, onClick = _a.onClick;
        !disabled && onClick && onClick(index);
    };
    TabButtonBase.prototype._onCloseClick = function (event) {
        event.stopPropagation();
        var _a = this.properties, index = _a.index, onCloseClick = _a.onCloseClick;
        onCloseClick && onCloseClick(index);
    };
    TabButtonBase.prototype._onKeyDown = function (event) {
        event.stopPropagation();
        var _a = this.properties, closeable = _a.closeable, disabled = _a.disabled, index = _a.index, onCloseClick = _a.onCloseClick, onDownArrowPress = _a.onDownArrowPress, onEndPress = _a.onEndPress, onHomePress = _a.onHomePress, onLeftArrowPress = _a.onLeftArrowPress, onRightArrowPress = _a.onRightArrowPress, onUpArrowPress = _a.onUpArrowPress;
        if (disabled) {
            return;
        }
        // Accessibility
        switch (event.which) {
            // Escape
            case util_1.Keys.Escape:
                closeable && onCloseClick && onCloseClick(index);
                break;
            // Left arrow
            case util_1.Keys.Left:
                onLeftArrowPress && onLeftArrowPress();
                break;
            // Right arrow
            case util_1.Keys.Right:
                onRightArrowPress && onRightArrowPress();
                break;
            // Up arrow
            case util_1.Keys.Up:
                onUpArrowPress && onUpArrowPress();
                break;
            // Down arrow
            case util_1.Keys.Down:
                onDownArrowPress && onDownArrowPress();
                break;
            // Home
            case util_1.Keys.Home:
                onHomePress && onHomePress();
                break;
            // End
            case util_1.Keys.End:
                onEndPress && onEndPress();
                break;
        }
    };
    TabButtonBase.prototype.getContent = function (messages) {
        var _a = this.properties, active = _a.active, closeable = _a.closeable;
        return tslib_1.__spread(this.children, [
            closeable
                ? d_1.v('button', {
                    tabIndex: active ? 0 : -1,
                    classes: this.theme(css.close),
                    type: 'button',
                    onclick: this._onCloseClick
                }, [messages.close])
                : null
        ]);
    };
    TabButtonBase.prototype.getModifierClasses = function () {
        var _a = this.properties, active = _a.active, closeable = _a.closeable, disabled = _a.disabled;
        return [
            active ? css.activeTabButton : null,
            closeable ? css.closeable : null,
            disabled ? css.disabledTabButton : null
        ];
    };
    TabButtonBase.prototype.render = function () {
        var _a = this.properties, active = _a.active, controls = _a.controls, disabled = _a.disabled, id = _a.id;
        var messages = this.localizeBundle(common_1.default).messages;
        return d_1.v('div', {
            'aria-controls': controls,
            'aria-disabled': disabled ? 'true' : 'false',
            'aria-selected': active === true ? 'true' : 'false',
            classes: this.theme(tslib_1.__spread([css.tabButton], this.getModifierClasses())),
            focus: this.shouldFocus,
            id: id,
            key: 'tab-button',
            onclick: this._onClick,
            onkeydown: this._onKeyDown,
            role: 'tab',
            tabIndex: active === true ? 0 : -1
        }, this.getContent(messages));
    };
    TabButtonBase = tslib_1.__decorate([
        Themed_1.theme(css)
    ], TabButtonBase);
    return TabButtonBase;
}(exports.ThemedBase));
exports.TabButtonBase = TabButtonBase;
var TabButton = /** @class */ (function (_super) {
    tslib_1.__extends(TabButton, _super);
    function TabButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TabButton;
}(TabButtonBase));
exports.default = TabButton;

/*# sourceMappingURL=TabButton.js.map*/