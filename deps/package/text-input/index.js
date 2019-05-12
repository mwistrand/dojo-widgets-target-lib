"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var d_1 = require("@dojo/framework/widget-core/d");
var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
var Focus_2 = require("@dojo/framework/widget-core/mixins/Focus");
var index_1 = require("../label/index");
var util_1 = require("../common/util");
var util_2 = require("@dojo/framework/core/util");
var css = require("../theme/text-input.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
var diff_1 = require("@dojo/framework/widget-core/diff");
var InputValidity_1 = require("../common/InputValidity");
var index_2 = require("../helper-text/index");
function formatAutocomplete(autocomplete) {
    if (typeof autocomplete === 'boolean') {
        return autocomplete ? 'on' : 'off';
    }
    return autocomplete;
}
function patternDiffer(previousProperty, newProperty) {
    var value = newProperty instanceof RegExp ? newProperty.source : newProperty;
    return {
        changed: previousProperty !== value,
        value: value
    };
}
var TextInput = /** @class */ (function (_super) {
    tslib_1.__extends(TextInput, _super);
    function TextInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._uuid = util_2.uuid();
        _this._state = {};
        return _this;
    }
    TextInput.prototype._onBlur = function (event) {
        this.properties.onBlur && this.properties.onBlur(event.target.value);
    };
    TextInput.prototype._onChange = function (event) {
        event.stopPropagation();
        this.properties.onChange &&
            this.properties.onChange(event.target.value);
    };
    TextInput.prototype._onClick = function (event) {
        event.stopPropagation();
        this.properties.onClick &&
            this.properties.onClick(event.target.value);
    };
    TextInput.prototype._onFocus = function (event) {
        this.properties.onFocus &&
            this.properties.onFocus(event.target.value);
    };
    TextInput.prototype._onInput = function (event) {
        event.stopPropagation();
        this.properties.onInput &&
            this.properties.onInput(event.target.value);
    };
    TextInput.prototype._onKeyDown = function (event) {
        event.stopPropagation();
        this.properties.onKeyDown &&
            this.properties.onKeyDown(event.which, function () {
                event.preventDefault();
            });
    };
    TextInput.prototype._onKeyPress = function (event) {
        event.stopPropagation();
        this.properties.onKeyPress &&
            this.properties.onKeyPress(event.which, function () {
                event.preventDefault();
            });
    };
    TextInput.prototype._onKeyUp = function (event) {
        event.stopPropagation();
        this.properties.onKeyUp &&
            this.properties.onKeyUp(event.which, function () {
                event.preventDefault();
            });
    };
    TextInput.prototype._onMouseDown = function (event) {
        event.stopPropagation();
        this.properties.onMouseDown && this.properties.onMouseDown();
    };
    TextInput.prototype._onMouseUp = function (event) {
        event.stopPropagation();
        this.properties.onMouseUp && this.properties.onMouseUp();
    };
    TextInput.prototype._onTouchStart = function (event) {
        event.stopPropagation();
        this.properties.onTouchStart && this.properties.onTouchStart();
    };
    TextInput.prototype._onTouchEnd = function (event) {
        event.stopPropagation();
        this.properties.onTouchEnd && this.properties.onTouchEnd();
    };
    TextInput.prototype._onTouchCancel = function (event) {
        event.stopPropagation();
        this.properties.onTouchCancel && this.properties.onTouchCancel();
    };
    TextInput.prototype._validate = function () {
        var _a = this, state = _a._state, _b = _a.properties, onValidate = _b.onValidate, value = _b.value, customValidator = _b.customValidator;
        if (!onValidate || value === undefined || value === null || state.previousValue === value) {
            return;
        }
        state.previousValue = value;
        var _c = this.meta(InputValidity_1.default).get('input', value), valid = _c.valid, _d = _c.message, message = _d === void 0 ? '' : _d;
        if (valid && customValidator) {
            var customValid = customValidator(value);
            if (customValid) {
                valid = customValid.valid;
                message = customValid.message || '';
            }
        }
        if (valid === state.previousValid && message === state.previousMessage) {
            return;
        }
        state.previousValid = valid;
        state.previousMessage = message;
        onValidate(valid, message);
    };
    Object.defineProperty(TextInput.prototype, "validity", {
        get: function () {
            var _a = this.properties.valid, valid = _a === void 0 ? { valid: undefined, message: undefined } : _a;
            if (typeof valid === 'boolean') {
                return { valid: valid, message: undefined };
            }
            return {
                valid: valid.valid,
                message: valid.message
            };
        },
        enumerable: true,
        configurable: true
    });
    TextInput.prototype.getRootClasses = function () {
        var _a = this.properties, disabled = _a.disabled, readOnly = _a.readOnly, required = _a.required, leading = _a.leading, trailing = _a.trailing;
        var valid = this.validity.valid;
        var focus = this.meta(Focus_1.default).get('root');
        return [
            css.root,
            disabled ? css.disabled : null,
            focus.containsFocus ? css.focused : null,
            valid === false ? css.invalid : null,
            valid === true ? css.valid : null,
            readOnly ? css.readonly : null,
            required ? css.required : null,
            leading ? css.hasLeading : null,
            trailing ? css.hasTrailing : null
        ];
    };
    TextInput.prototype.render = function () {
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, autocomplete = _a.autocomplete, classes = _a.classes, disabled = _a.disabled, label = _a.label, _c = _a.labelHidden, labelHidden = _c === void 0 ? false : _c, leading = _a.leading, maxLength = _a.maxLength, minLength = _a.minLength, name = _a.name, pattern = _a.pattern, placeholder = _a.placeholder, readOnly = _a.readOnly, required = _a.required, theme = _a.theme, trailing = _a.trailing, _d = _a.type, type = _d === void 0 ? 'text' : _d, value = _a.value, _e = _a.widgetId, widgetId = _e === void 0 ? this._uuid : _e, helperText = _a.helperText;
        this._validate();
        var _f = this.validity, valid = _f.valid, message = _f.message;
        var focus = this.meta(Focus_1.default).get('root');
        var computedHelperText = (valid === false && message) || helperText;
        return d_1.v('div', {
            key: 'root',
            classes: this.theme(this.getRootClasses()),
            role: 'presentation'
        }, [
            label &&
                d_1.w(index_1.default, {
                    theme: theme,
                    classes: classes,
                    disabled: disabled,
                    invalid: valid === false || undefined,
                    focused: focus.containsFocus,
                    readOnly: readOnly,
                    required: required,
                    hidden: labelHidden,
                    forId: widgetId
                }, [label]),
            d_1.v('div', {
                key: 'inputWrapper',
                classes: this.theme(css.inputWrapper),
                role: 'presentation'
            }, [
                leading &&
                    d_1.v('span', { key: 'leading', classes: this.theme(css.leading) }, [
                        leading()
                    ]),
                d_1.v('input', tslib_1.__assign({}, util_1.formatAriaProperties(aria), { 'aria-invalid': valid === false ? 'true' : null, autocomplete: formatAutocomplete(autocomplete), classes: this.theme(css.input), disabled: disabled, id: widgetId, focus: this.shouldFocus, key: 'input', maxlength: maxLength ? "" + maxLength : null, minlength: minLength ? "" + minLength : null, name: name,
                    pattern: pattern,
                    placeholder: placeholder,
                    readOnly: readOnly, 'aria-readonly': readOnly ? 'true' : null, required: required,
                    type: type,
                    value: value, onblur: this._onBlur, onchange: this._onChange, onclick: this._onClick, onfocus: this._onFocus, oninput: this._onInput, onkeydown: this._onKeyDown, onkeypress: this._onKeyPress, onkeyup: this._onKeyUp, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel })),
                trailing &&
                    d_1.v('span', { key: 'trailing', classes: this.theme(css.trailing) }, [
                        trailing()
                    ])
            ]),
            d_1.w(index_2.default, { text: computedHelperText, valid: valid })
        ]);
    };
    TextInput = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-text-input',
            properties: [
                'theme',
                'classes',
                'aria',
                'extraClasses',
                'disabled',
                'readOnly',
                'labelHidden',
                'valid',
                'leading',
                'trailing'
            ],
            attributes: [
                'widgetId',
                'label',
                'placeholder',
                'helperText',
                'controls',
                'type',
                'minLength',
                'maxLength',
                'value',
                'name',
                'pattern',
                'autocomplete'
            ],
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
                'onTouchStart',
                'onValidate'
            ]
        }),
        diffProperty_1.default('pattern', patternDiffer),
        diffProperty_1.default('leading', diff_1.reference),
        diffProperty_1.default('trailing', diff_1.reference)
    ], TextInput);
    return TextInput;
}(Themed_1.ThemedMixin(Focus_2.FocusMixin(WidgetBase_1.WidgetBase))));
exports.TextInput = TextInput;
exports.default = TextInput;

/*# sourceMappingURL=index.js.map*/