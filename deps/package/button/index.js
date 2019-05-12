"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Focus_1 = require("@dojo/framework/widget-core/mixins/Focus");
var d_1 = require("@dojo/framework/widget-core/d");
var css = require("../theme/button.m.css");
var util_1 = require("../common/util");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var index_1 = require("../icon/index");
var registerCustomElement_1 = require("@dojo/framework/widget-core/registerCustomElement");
var Button = /** @class */ (function (_super) {
    tslib_1.__extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype._onBlur = function (event) {
        this.properties.onBlur && this.properties.onBlur();
    };
    Button.prototype._onClick = function (event) {
        event.stopPropagation();
        this.properties.onClick && this.properties.onClick();
    };
    Button.prototype._onFocus = function (event) {
        this.properties.onFocus && this.properties.onFocus();
    };
    Button.prototype._onKeyDown = function (event) {
        event.stopPropagation();
        this.properties.onKeyDown &&
            this.properties.onKeyDown(event.which, function () {
                event.preventDefault();
            });
    };
    Button.prototype._onKeyPress = function (event) {
        event.stopPropagation();
        this.properties.onKeyPress &&
            this.properties.onKeyPress(event.which, function () {
                event.preventDefault();
            });
    };
    Button.prototype._onKeyUp = function (event) {
        event.stopPropagation();
        this.properties.onKeyUp &&
            this.properties.onKeyUp(event.which, function () {
                event.preventDefault();
            });
    };
    Button.prototype._onMouseDown = function (event) {
        event.stopPropagation();
        this.properties.onMouseDown && this.properties.onMouseDown();
    };
    Button.prototype._onMouseUp = function (event) {
        event.stopPropagation();
        this.properties.onMouseUp && this.properties.onMouseUp();
    };
    Button.prototype._onTouchStart = function (event) {
        event.stopPropagation();
        this.properties.onTouchStart && this.properties.onTouchStart();
    };
    Button.prototype._onTouchEnd = function (event) {
        event.stopPropagation();
        this.properties.onTouchEnd && this.properties.onTouchEnd();
    };
    Button.prototype._onTouchCancel = function (event) {
        event.stopPropagation();
        this.properties.onTouchCancel && this.properties.onTouchCancel();
    };
    Button.prototype.getContent = function () {
        return this.children;
    };
    Button.prototype.getModifierClasses = function () {
        var _a = this.properties, disabled = _a.disabled, _b = _a.popup, popup = _b === void 0 ? false : _b, pressed = _a.pressed;
        return [
            disabled ? css.disabled : null,
            popup ? css.popup : null,
            pressed ? css.pressed : null
        ];
    };
    Button.prototype.render = function () {
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, disabled = _a.disabled, widgetId = _a.widgetId, _c = _a.popup, popup = _c === void 0 ? false : _c, name = _a.name, pressed = _a.pressed, type = _a.type, value = _a.value, theme = _a.theme, classes = _a.classes;
        if (popup === true) {
            popup = { expanded: false, id: '' };
        }
        return d_1.v('button', tslib_1.__assign({ classes: this.theme(tslib_1.__spread([css.root], this.getModifierClasses())), disabled: disabled, id: widgetId, focus: this.shouldFocus, name: name,
            type: type,
            value: value, onblur: this._onBlur, onclick: this._onClick, onfocus: this._onFocus, onkeydown: this._onKeyDown, onkeypress: this._onKeyPress, onkeyup: this._onKeyUp, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel }, util_1.formatAriaProperties(aria), { 'aria-haspopup': popup ? 'true' : null, 'aria-controls': popup ? popup.id : null, 'aria-expanded': popup ? popup.expanded + '' : null, 'aria-pressed': typeof pressed === 'boolean' ? pressed.toString() : null }), tslib_1.__spread(this.getContent(), [
            popup
                ? d_1.v('span', { classes: this.theme(css.addon) }, [
                    d_1.w(index_1.default, { type: 'downIcon', theme: theme, classes: classes })
                ])
                : null
        ]));
    };
    Button = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-button',
            childType: registerCustomElement_1.CustomElementChildType.TEXT,
            properties: ['disabled', 'pressed', 'popup', 'theme', 'aria', 'extraClasses', 'classes'],
            attributes: ['widgetId', 'name', 'type', 'value'],
            events: [
                'onBlur',
                'onChange',
                'onClick',
                'onFocus',
                'onInput',
                'onKeyDown',
                'onKeyPress',
                'onKeyUp',
                'onMouseDown',
                'onMouseUp',
                'onTouchCancel',
                'onTouchEnd',
                'onTouchStart'
            ]
        })
    ], Button);
    return Button;
}(Themed_1.ThemedMixin(Focus_1.FocusMixin(WidgetBase_1.WidgetBase))));
exports.Button = Button;
exports.default = Button;

/*# sourceMappingURL=index.js.map*/