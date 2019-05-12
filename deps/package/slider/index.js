"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Focus_1 = require("@dojo/framework/widget-core/mixins/Focus");
var index_1 = require("../label/index");
var d_1 = require("@dojo/framework/widget-core/d");
var Focus_2 = require("@dojo/framework/widget-core/meta/Focus");
var util_1 = require("@dojo/framework/core/util");
var util_2 = require("../common/util");
var fixedCss = require("./styles/slider.m.css");
var css = require("../theme/slider.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
function extractValue(event) {
    var value = event.target.value;
    return parseFloat(value);
}
var Slider = /** @class */ (function (_super) {
    tslib_1.__extends(Slider, _super);
    function Slider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // id used to associate input with output
        _this._widgetId = util_1.uuid();
        return _this;
    }
    Slider.prototype._onBlur = function (event) {
        this.properties.onBlur && this.properties.onBlur(extractValue(event));
    };
    Slider.prototype._onChange = function (event) {
        event.stopPropagation();
        this.properties.onChange && this.properties.onChange(extractValue(event));
    };
    Slider.prototype._onClick = function (event) {
        event.stopPropagation();
        this.properties.onClick && this.properties.onClick(extractValue(event));
    };
    Slider.prototype._onFocus = function (event) {
        this.properties.onFocus && this.properties.onFocus(extractValue(event));
    };
    Slider.prototype._onInput = function (event) {
        event.stopPropagation();
        this.properties.onInput && this.properties.onInput(extractValue(event));
    };
    Slider.prototype._onKeyDown = function (event) {
        event.stopPropagation();
        this.properties.onKeyDown &&
            this.properties.onKeyDown(event.which, function () {
                event.preventDefault();
            });
    };
    Slider.prototype._onKeyPress = function (event) {
        event.stopPropagation();
        this.properties.onKeyPress &&
            this.properties.onKeyPress(event.which, function () {
                event.preventDefault();
            });
    };
    Slider.prototype._onKeyUp = function (event) {
        event.stopPropagation();
        this.properties.onKeyUp &&
            this.properties.onKeyUp(event.which, function () {
                event.preventDefault();
            });
    };
    Slider.prototype._onMouseDown = function (event) {
        event.stopPropagation();
        this.properties.onMouseDown && this.properties.onMouseDown();
    };
    Slider.prototype._onMouseUp = function (event) {
        event.stopPropagation();
        this.properties.onMouseUp && this.properties.onMouseUp();
    };
    Slider.prototype._onTouchStart = function (event) {
        event.stopPropagation();
        this.properties.onTouchStart && this.properties.onTouchStart();
    };
    Slider.prototype._onTouchEnd = function (event) {
        event.stopPropagation();
        this.properties.onTouchEnd && this.properties.onTouchEnd();
    };
    Slider.prototype._onTouchCancel = function (event) {
        event.stopPropagation();
        this.properties.onTouchCancel && this.properties.onTouchCancel();
    };
    Slider.prototype.getRootClasses = function () {
        var _a = this.properties, disabled = _a.disabled, invalid = _a.invalid, readOnly = _a.readOnly, required = _a.required, _b = _a.vertical, vertical = _b === void 0 ? false : _b;
        var focus = this.meta(Focus_2.default).get('root');
        return [
            css.root,
            disabled ? css.disabled : null,
            focus.containsFocus ? css.focused : null,
            invalid === true ? css.invalid : null,
            invalid === false ? css.valid : null,
            readOnly ? css.readonly : null,
            required ? css.required : null,
            vertical ? css.vertical : null
        ];
    };
    Slider.prototype.renderControls = function (percentValue) {
        var _a = this.properties, _b = _a.vertical, vertical = _b === void 0 ? false : _b, _c = _a.verticalHeight, verticalHeight = _c === void 0 ? '200px' : _c;
        return d_1.v('div', {
            classes: [this.theme(css.track), fixedCss.trackFixed],
            'aria-hidden': 'true',
            styles: vertical ? { width: verticalHeight } : {}
        }, [
            d_1.v('span', {
                classes: [this.theme(css.fill), fixedCss.fillFixed],
                styles: { width: percentValue + "%" }
            }),
            d_1.v('span', {
                classes: [this.theme(css.thumb), fixedCss.thumbFixed],
                styles: { left: percentValue + "%" }
            })
        ]);
    };
    Slider.prototype.renderOutput = function (value, percentValue) {
        var _a = this.properties, output = _a.output, _b = _a.outputIsTooltip, outputIsTooltip = _b === void 0 ? false : _b, _c = _a.vertical, vertical = _c === void 0 ? false : _c;
        var outputNode = output ? output(value) : "" + value;
        // output styles
        var outputStyles = {};
        if (outputIsTooltip) {
            outputStyles = vertical
                ? { top: 100 - percentValue + "%" }
                : { left: percentValue + "%" };
        }
        return d_1.v('output', {
            classes: this.theme([css.output, outputIsTooltip ? css.outputTooltip : null]),
            for: this._widgetId,
            styles: outputStyles,
            tabIndex: -1 /* needed so Edge doesn't select the element while tabbing through */
        }, [outputNode]);
    };
    Slider.prototype.render = function () {
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, disabled = _a.disabled, _c = _a.widgetId, widgetId = _c === void 0 ? this._widgetId : _c, invalid = _a.invalid, label = _a.label, labelAfter = _a.labelAfter, labelHidden = _a.labelHidden, _d = _a.max, max = _d === void 0 ? 100 : _d, _e = _a.min, min = _e === void 0 ? 0 : _e, name = _a.name, readOnly = _a.readOnly, required = _a.required, _f = _a.showOutput, showOutput = _f === void 0 ? true : _f, _g = _a.step, step = _g === void 0 ? 1 : _g, _h = _a.vertical, vertical = _h === void 0 ? false : _h, _j = _a.verticalHeight, verticalHeight = _j === void 0 ? '200px' : _j, theme = _a.theme, classes = _a.classes, _k = _a.inputStyles, inputStyles = _k === void 0 ? {} : _k;
        var focus = this.meta(Focus_2.default).get('root');
        var _l = this.properties.value, value = _l === void 0 ? min : _l;
        value = value > max ? max : value;
        value = value < min ? min : value;
        var percentValue = ((value - min) / (max - min)) * 100;
        var slider = d_1.v('div', {
            classes: [this.theme(css.inputWrapper), fixedCss.inputWrapperFixed],
            styles: vertical ? { height: verticalHeight } : {}
        }, [
            d_1.v('input', tslib_1.__assign({ key: 'input' }, util_2.formatAriaProperties(aria), { classes: [this.theme(css.input), fixedCss.nativeInput], disabled: disabled, id: widgetId, focus: this.shouldFocus, 'aria-invalid': invalid === true ? 'true' : null, max: "" + max, min: "" + min, name: name,
                readOnly: readOnly, 'aria-readonly': readOnly === true ? 'true' : null, required: required, step: "" + step, styles: tslib_1.__assign({}, inputStyles, (vertical ? { width: verticalHeight } : {})), type: 'range', value: "" + value, onblur: this._onBlur, onchange: this._onChange, onclick: this._onClick, onfocus: this._onFocus, oninput: this._onInput, onkeydown: this._onKeyDown, onkeypress: this._onKeyPress, onkeyup: this._onKeyUp, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel })),
            this.renderControls(percentValue),
            showOutput ? this.renderOutput(value, percentValue) : null
        ]);
        var children = [
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
            slider
        ];
        return d_1.v('div', {
            key: 'root',
            classes: tslib_1.__spread(this.theme(this.getRootClasses()), [fixedCss.rootFixed])
        }, labelAfter ? children.reverse() : children);
    };
    Slider = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-slider',
            properties: [
                'theme',
                'classes',
                'aria',
                'extraClasses',
                'disabled',
                'invalid',
                'required',
                'readOnly',
                'labelAfter',
                'labelHidden',
                'max',
                'min',
                'output',
                'outputIsTooltip',
                'showOutput',
                'step',
                'vertical',
                'value'
            ],
            attributes: ['widgetId', 'label', 'name', 'verticalHeight'],
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
    ], Slider);
    return Slider;
}(Themed_1.ThemedMixin(Focus_1.FocusMixin(WidgetBase_1.WidgetBase))));
exports.Slider = Slider;
exports.default = Slider;

/*# sourceMappingURL=index.js.map*/