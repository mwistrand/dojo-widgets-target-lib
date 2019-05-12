"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Focus_1 = require("@dojo/framework/widget-core/mixins/Focus");
var Focus_2 = require("@dojo/framework/widget-core/meta/Focus");
var index_1 = require("../label/index");
var util_1 = require("../common/util");
var d_1 = require("@dojo/framework/widget-core/d");
var util_2 = require("@dojo/framework/core/util");
var css = require("../theme/radio.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var Radio = /** @class */ (function (_super) {
    tslib_1.__extends(Radio, _super);
    function Radio() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._uuid = util_2.uuid();
        return _this;
    }
    Radio.prototype._onBlur = function (event) {
        var radio = event.target;
        this.properties.onBlur && this.properties.onBlur(radio.value, radio.checked);
    };
    Radio.prototype._onChange = function (event) {
        event.stopPropagation();
        var radio = event.target;
        this.properties.onChange && this.properties.onChange(radio.value, radio.checked);
    };
    Radio.prototype._onClick = function (event) {
        event.stopPropagation();
        var radio = event.target;
        this.properties.onClick && this.properties.onClick(radio.value, radio.checked);
    };
    Radio.prototype._onFocus = function (event) {
        var radio = event.target;
        this.properties.onFocus && this.properties.onFocus(radio.value, radio.checked);
    };
    Radio.prototype._onMouseDown = function (event) {
        event.stopPropagation();
        this.properties.onMouseDown && this.properties.onMouseDown();
    };
    Radio.prototype._onMouseUp = function (event) {
        event.stopPropagation();
        this.properties.onMouseUp && this.properties.onMouseUp();
    };
    Radio.prototype._onTouchStart = function (event) {
        event.stopPropagation();
        this.properties.onTouchStart && this.properties.onTouchStart();
    };
    Radio.prototype._onTouchEnd = function (event) {
        event.stopPropagation();
        this.properties.onTouchEnd && this.properties.onTouchEnd();
    };
    Radio.prototype._onTouchCancel = function (event) {
        event.stopPropagation();
        this.properties.onTouchCancel && this.properties.onTouchCancel();
    };
    Radio.prototype.getRootClasses = function () {
        var _a = this.properties, _b = _a.checked, checked = _b === void 0 ? false : _b, disabled = _a.disabled, invalid = _a.invalid, readOnly = _a.readOnly, required = _a.required;
        var focus = this.meta(Focus_2.default).get('root');
        return [
            css.root,
            checked ? css.checked : null,
            disabled ? css.disabled : null,
            focus.containsFocus ? css.focused : null,
            invalid === true ? css.invalid : null,
            invalid === false ? css.valid : null,
            readOnly ? css.readonly : null,
            required ? css.required : null
        ];
    };
    Radio.prototype.render = function () {
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, _c = _a.checked, checked = _c === void 0 ? false : _c, disabled = _a.disabled, _d = _a.widgetId, widgetId = _d === void 0 ? this._uuid : _d, invalid = _a.invalid, label = _a.label, _e = _a.labelAfter, labelAfter = _e === void 0 ? true : _e, labelHidden = _a.labelHidden, theme = _a.theme, classes = _a.classes, name = _a.name, readOnly = _a.readOnly, required = _a.required, value = _a.value;
        var focus = this.meta(Focus_2.default).get('root');
        var children = [
            d_1.v('div', { classes: this.theme(css.inputWrapper) }, [
                d_1.v('input', tslib_1.__assign({ id: widgetId }, util_1.formatAriaProperties(aria), { classes: this.theme(css.input), checked: checked,
                    disabled: disabled, focus: this.shouldFocus, 'aria-invalid': invalid === true ? 'true' : null, name: name,
                    readOnly: readOnly, 'aria-readonly': readOnly === true ? 'true' : null, required: required, type: 'radio', value: value, onblur: this._onBlur, onchange: this._onChange, onclick: this._onClick, onfocus: this._onFocus, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel })),
                d_1.v('div', {
                    classes: this.theme(css.radioBackground)
                }, [
                    d_1.v('div', { classes: this.theme(css.radioOuter) }),
                    d_1.v('div', { classes: this.theme(css.radioInner) })
                ])
            ]),
            label
                ? d_1.w(index_1.default, {
                    theme: theme,
                    classes: classes,
                    disabled: disabled,
                    focused: focus.containsFocus,
                    invalid: invalid,
                    readOnly: readOnly,
                    required: required,
                    hidden: labelHidden,
                    forId: widgetId,
                    secondary: true
                }, [label])
                : null
        ];
        return d_1.v('div', {
            key: 'root',
            classes: this.theme(this.getRootClasses())
        }, labelAfter ? children : children.reverse());
    };
    Radio = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-radio',
            properties: [
                'required',
                'invalid',
                'readOnly',
                'disabled',
                'theme',
                'classes',
                'aria',
                'extraClasses',
                'checked',
                'labelAfter',
                'labelHidden'
            ],
            attributes: ['widgetId', 'label', 'value', 'name'],
            events: [
                'onBlur',
                'onChange',
                'onClick',
                'onFocus',
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
    ], Radio);
    return Radio;
}(Themed_1.ThemedMixin(Focus_1.FocusMixin(WidgetBase_1.WidgetBase))));
exports.Radio = Radio;
exports.default = Radio;

/*# sourceMappingURL=index.js.map*/