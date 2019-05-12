"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Focus_1 = require("@dojo/framework/widget-core/mixins/Focus");
var d_1 = require("@dojo/framework/widget-core/d");
var Focus_2 = require("@dojo/framework/widget-core/meta/Focus");
var index_1 = require("../label/index");
var util_1 = require("../common/util");
var util_2 = require("@dojo/framework/core/util");
var css = require("../theme/text-area.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var index_2 = require("../helper-text/index");
var Textarea = /** @class */ (function (_super) {
    tslib_1.__extends(Textarea, _super);
    function Textarea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._uuid = util_2.uuid();
        return _this;
    }
    Textarea.prototype._onBlur = function (event) {
        this.properties.onBlur && this.properties.onBlur(event.target.value);
    };
    Textarea.prototype._onChange = function (event) {
        event.stopPropagation();
        this.properties.onChange &&
            this.properties.onChange(event.target.value);
    };
    Textarea.prototype._onClick = function (event) {
        event.stopPropagation();
        this.properties.onClick &&
            this.properties.onClick(event.target.value);
    };
    Textarea.prototype._onFocus = function (event) {
        this.properties.onFocus &&
            this.properties.onFocus(event.target.value);
    };
    Textarea.prototype._onInput = function (event) {
        event.stopPropagation();
        this.properties.onInput &&
            this.properties.onInput(event.target.value);
    };
    Textarea.prototype._onKeyDown = function (event) {
        event.stopPropagation();
        this.properties.onKeyDown &&
            this.properties.onKeyDown(event.which, function () {
                event.preventDefault();
            });
    };
    Textarea.prototype._onKeyPress = function (event) {
        event.stopPropagation();
        this.properties.onKeyPress &&
            this.properties.onKeyPress(event.which, function () {
                event.preventDefault();
            });
    };
    Textarea.prototype._onKeyUp = function (event) {
        event.stopPropagation();
        this.properties.onKeyUp &&
            this.properties.onKeyUp(event.which, function () {
                event.preventDefault();
            });
    };
    Textarea.prototype._onMouseDown = function (event) {
        event.stopPropagation();
        this.properties.onMouseDown && this.properties.onMouseDown();
    };
    Textarea.prototype._onMouseUp = function (event) {
        event.stopPropagation();
        this.properties.onMouseUp && this.properties.onMouseUp();
    };
    Textarea.prototype._onTouchStart = function (event) {
        event.stopPropagation();
        this.properties.onTouchStart && this.properties.onTouchStart();
    };
    Textarea.prototype._onTouchEnd = function (event) {
        event.stopPropagation();
        this.properties.onTouchEnd && this.properties.onTouchEnd();
    };
    Textarea.prototype._onTouchCancel = function (event) {
        event.stopPropagation();
        this.properties.onTouchCancel && this.properties.onTouchCancel();
    };
    Textarea.prototype.getRootClasses = function () {
        var _a = this.properties, disabled = _a.disabled, invalid = _a.invalid, readOnly = _a.readOnly, required = _a.required;
        var focus = this.meta(Focus_2.default).get('root');
        return [
            css.root,
            disabled ? css.disabled : null,
            focus.containsFocus ? css.focused : null,
            invalid === true ? css.invalid : null,
            invalid === false ? css.valid : null,
            readOnly ? css.readonly : null,
            required ? css.required : null
        ];
    };
    Textarea.prototype.render = function () {
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, _c = _a.columns, columns = _c === void 0 ? 20 : _c, disabled = _a.disabled, _d = _a.widgetId, widgetId = _d === void 0 ? this._uuid : _d, invalid = _a.invalid, label = _a.label, maxLength = _a.maxLength, minLength = _a.minLength, name = _a.name, placeholder = _a.placeholder, readOnly = _a.readOnly, required = _a.required, _e = _a.rows, rows = _e === void 0 ? 2 : _e, value = _a.value, wrapText = _a.wrapText, theme = _a.theme, classes = _a.classes, labelHidden = _a.labelHidden, helperText = _a.helperText;
        var focus = this.meta(Focus_2.default).get('root');
        return d_1.v('div', {
            key: 'root',
            classes: this.theme(this.getRootClasses())
        }, [
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
                    forId: widgetId
                }, [label])
                : null,
            d_1.v('div', { classes: this.theme(css.inputWrapper) }, [
                d_1.v('textarea', tslib_1.__assign({ id: widgetId, key: 'input' }, util_1.formatAriaProperties(aria), { classes: this.theme(css.input), cols: "" + columns, disabled: disabled, focus: this.shouldFocus, 'aria-invalid': invalid ? 'true' : null, maxlength: maxLength ? "" + maxLength : null, minlength: minLength ? "" + minLength : null, name: name,
                    placeholder: placeholder,
                    readOnly: readOnly, 'aria-readonly': readOnly ? 'true' : null, required: required, rows: "" + rows, value: value, wrap: wrapText, onblur: this._onBlur, onchange: this._onChange, onclick: this._onClick, onfocus: this._onFocus, oninput: this._onInput, onkeydown: this._onKeyDown, onkeypress: this._onKeyPress, onkeyup: this._onKeyUp, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel }))
            ]),
            d_1.w(index_2.default, { text: helperText })
        ]);
    };
    Textarea = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-text-area',
            properties: [
                'theme',
                'classes',
                'aria',
                'extraClasses',
                'columns',
                'rows',
                'required',
                'readOnly',
                'disabled',
                'invalid',
                'labelHidden'
            ],
            attributes: [
                'widgetId',
                'label',
                'helperText',
                'minLength',
                'maxLength',
                'name',
                'placeholder',
                'value',
                'wrapText'
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
                'onTouchStart'
            ]
        })
    ], Textarea);
    return Textarea;
}(Themed_1.ThemedMixin(Focus_1.FocusMixin(WidgetBase_1.WidgetBase))));
exports.Textarea = Textarea;
exports.default = Textarea;

/*# sourceMappingURL=index.js.map*/