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
var css = require("../theme/checkbox.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
/**
 * The type of UI to show for this Checkbox
 */
var Mode;
(function (Mode) {
    Mode["normal"] = "normal";
    Mode["toggle"] = "toggle";
})(Mode = exports.Mode || (exports.Mode = {}));
var Checkbox = /** @class */ (function (_super) {
    tslib_1.__extends(Checkbox, _super);
    function Checkbox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._uuid = util_2.uuid();
        return _this;
    }
    Checkbox.prototype._onBlur = function (event) {
        var checkbox = event.target;
        this.properties.onBlur && this.properties.onBlur(checkbox.value, checkbox.checked);
    };
    Checkbox.prototype._onChange = function (event) {
        event.stopPropagation();
        var checkbox = event.target;
        this.properties.onChange && this.properties.onChange(checkbox.value, checkbox.checked);
    };
    Checkbox.prototype._onClick = function (event) {
        event.stopPropagation();
        var checkbox = event.target;
        this.properties.onClick && this.properties.onClick(checkbox.value, checkbox.checked);
    };
    Checkbox.prototype._onFocus = function (event) {
        var checkbox = event.target;
        this.properties.onFocus && this.properties.onFocus(checkbox.value, checkbox.checked);
    };
    Checkbox.prototype._onMouseDown = function (event) {
        event.stopPropagation();
        this.properties.onMouseDown && this.properties.onMouseDown();
    };
    Checkbox.prototype._onMouseUp = function (event) {
        event.stopPropagation();
        this.properties.onMouseUp && this.properties.onMouseUp();
    };
    Checkbox.prototype._onTouchStart = function (event) {
        event.stopPropagation();
        this.properties.onTouchStart && this.properties.onTouchStart();
    };
    Checkbox.prototype._onTouchEnd = function (event) {
        event.stopPropagation();
        this.properties.onTouchEnd && this.properties.onTouchEnd();
    };
    Checkbox.prototype._onTouchCancel = function (event) {
        event.stopPropagation();
        this.properties.onTouchCancel && this.properties.onTouchCancel();
    };
    Checkbox.prototype.getRootClasses = function () {
        var _a = this.properties, _b = _a.checked, checked = _b === void 0 ? false : _b, disabled = _a.disabled, invalid = _a.invalid, mode = _a.mode, readOnly = _a.readOnly, required = _a.required;
        var focus = this.meta(Focus_2.default).get('root');
        return [
            css.root,
            mode === Mode.toggle ? css.toggle : null,
            checked ? css.checked : null,
            disabled ? css.disabled : null,
            focus.containsFocus ? css.focused : null,
            invalid === true ? css.invalid : null,
            invalid === false ? css.valid : null,
            readOnly ? css.readonly : null,
            required ? css.required : null
        ];
    };
    Checkbox.prototype.renderToggle = function () {
        var _a = this.properties, checked = _a.checked, mode = _a.mode, onLabel = _a.onLabel, offLabel = _a.offLabel;
        return mode === Mode.toggle
            ? [
                offLabel
                    ? d_1.v('div', {
                        key: 'offLabel',
                        classes: this.theme(css.offLabel),
                        'aria-hidden': checked ? 'true' : null
                    }, [offLabel])
                    : null,
                d_1.v('div', {
                    key: 'toggle',
                    classes: this.theme(css.toggleSwitch)
                }),
                onLabel
                    ? d_1.v('div', {
                        key: 'onLabel',
                        classes: this.theme(css.onLabel),
                        'aria-hidden': checked ? null : 'true'
                    }, [onLabel])
                    : null
            ]
            : [];
    };
    Checkbox.prototype.render = function () {
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, classes = _a.classes, _c = _a.checked, checked = _c === void 0 ? false : _c, disabled = _a.disabled, _d = _a.widgetId, widgetId = _d === void 0 ? this._uuid : _d, invalid = _a.invalid, label = _a.label, _e = _a.labelAfter, labelAfter = _e === void 0 ? true : _e, labelHidden = _a.labelHidden, theme = _a.theme, name = _a.name, readOnly = _a.readOnly, required = _a.required, value = _a.value;
        var focus = this.meta(Focus_2.default).get('root');
        var children = [
            d_1.v('div', { classes: this.theme(css.inputWrapper) }, tslib_1.__spread(this.renderToggle(), [
                d_1.v('input', tslib_1.__assign({ id: widgetId }, util_1.formatAriaProperties(aria), { classes: this.theme(css.input), checked: checked,
                    disabled: disabled, focus: this.shouldFocus, 'aria-invalid': invalid === true ? 'true' : null, name: name,
                    readOnly: readOnly, 'aria-readonly': readOnly === true ? 'true' : null, required: required, type: 'checkbox', value: value, onblur: this._onBlur, onchange: this._onChange, onclick: this._onClick, onfocus: this._onFocus, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel }))
            ])),
            label
                ? d_1.w(index_1.default, {
                    key: 'label',
                    classes: classes,
                    theme: theme,
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
    Checkbox = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-checkbox',
            properties: [
                'required',
                'invalid',
                'readOnly',
                'disabled',
                'theme',
                'aria',
                'extraClasses',
                'labelAfter',
                'labelHidden',
                'checked',
                'classes'
            ],
            attributes: ['widgetId', 'label', 'value', 'name', 'mode', 'offLabel', 'onLabel'],
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
    ], Checkbox);
    return Checkbox;
}(Themed_1.ThemedMixin(Focus_1.FocusMixin(WidgetBase_1.WidgetBase))));
exports.Checkbox = Checkbox;
exports.default = Checkbox;

/*# sourceMappingURL=index.js.map*/