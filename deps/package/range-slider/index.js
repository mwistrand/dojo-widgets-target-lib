"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@dojo/framework/core/util");
var d_1 = require("@dojo/framework/widget-core/d");
var Dimensions_1 = require("@dojo/framework/widget-core/meta/Dimensions");
var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var util_2 = require("../common/util");
var index_1 = require("../label/index");
var fixedCss = require("./styles/range-slider.m.css");
var css = require("../theme/range-slider.m.css");
var baseCss = require("../common/styles/base.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
function extractValue(event) {
    var value = event.target.value;
    return parseFloat(value);
}
var RangeSlider = /** @class */ (function (_super) {
    tslib_1.__extends(RangeSlider, _super);
    function RangeSlider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // id used to associate input with output
        _this._widgetId = util_1.uuid();
        _this._minLabelId = util_1.uuid();
        _this._maxLabelId = util_1.uuid();
        return _this;
    }
    RangeSlider.prototype.getRootClasses = function () {
        var _a = this.properties, disabled = _a.disabled, invalid = _a.invalid, readOnly = _a.readOnly, required = _a.required, showOutput = _a.showOutput;
        var focus = this.meta(Focus_1.default).get('root');
        return [
            css.root,
            disabled ? css.disabled : null,
            focus.containsFocus ? css.focused : null,
            invalid === true ? css.invalid : null,
            invalid === false ? css.valid : null,
            readOnly ? css.readonly : null,
            required ? css.required : null,
            showOutput ? css.hasOutput : null
        ];
    };
    RangeSlider.prototype._genericCallback = function (callback, minEvent, maxEvent) {
        minEvent && minEvent.stopPropagation();
        maxEvent && maxEvent.stopPropagation();
        var _a = this.properties, _b = _a.min, min = _b === void 0 ? 0 : _b, _c = _a.max, max = _c === void 0 ? 100 : _c;
        var _d = this.properties, _e = _d.minValue, minValue = _e === void 0 ? min : _e, _f = _d.maxValue, maxValue = _f === void 0 ? max : _f;
        callback &&
            callback(minEvent ? extractValue(minEvent) : minValue, maxEvent ? extractValue(maxEvent) : maxValue);
    };
    RangeSlider.prototype._genericChangeCallback = function (callback, minEvent, maxEvent) {
        minEvent && minEvent.stopPropagation();
        maxEvent && maxEvent.stopPropagation();
        var _a = this.properties, _b = _a.min, min = _b === void 0 ? 0 : _b, _c = _a.max, max = _c === void 0 ? 100 : _c;
        var _d = this.properties, _e = _d.minValue, minValue = _e === void 0 ? min : _e, _f = _d.maxValue, maxValue = _f === void 0 ? max : _f;
        if (minEvent) {
            callback && callback(Math.min(extractValue(minEvent), maxValue), maxValue);
        }
        else if (maxEvent) {
            callback && callback(minValue, Math.max(minValue, extractValue(maxEvent)));
        }
    };
    RangeSlider.prototype._onKeyDown = function (event) {
        event.stopPropagation();
        this.properties.onKeyDown &&
            this.properties.onKeyDown(event.which, function () {
                event.preventDefault();
            });
    };
    RangeSlider.prototype._onKeyPress = function (event) {
        event.stopPropagation();
        this.properties.onKeyPress &&
            this.properties.onKeyPress(event.which, function () {
                event.preventDefault();
            });
    };
    RangeSlider.prototype._onKeyUp = function (event) {
        event.stopPropagation();
        this.properties.onKeyUp &&
            this.properties.onKeyUp(event.which, function () {
                event.preventDefault();
            });
    };
    RangeSlider.prototype._onMouseDown = function (event) {
        event.stopPropagation();
        this.properties.onMouseDown && this.properties.onMouseDown();
    };
    RangeSlider.prototype._onMouseUp = function (event) {
        event.stopPropagation();
        this.properties.onMouseUp && this.properties.onMouseUp();
    };
    RangeSlider.prototype._onTouchStart = function (event) {
        event.stopPropagation();
        this.properties.onTouchStart && this.properties.onTouchStart();
    };
    RangeSlider.prototype._onTouchEnd = function (event) {
        event.stopPropagation();
        this.properties.onTouchEnd && this.properties.onTouchEnd();
    };
    RangeSlider.prototype._onTouchCancel = function (event) {
        event.stopPropagation();
        this.properties.onTouchCancel && this.properties.onTouchCancel();
    };
    RangeSlider.prototype._getInputProperties = function (isSlider1) {
        var _this = this;
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, disabled = _a.disabled, invalid = _a.invalid, _c = _a.max, max = _c === void 0 ? 100 : _c, _d = _a.min, min = _d === void 0 ? 0 : _d, _e = _a.name, name = _e === void 0 ? '' : _e, readOnly = _a.readOnly, required = _a.required, _f = _a.step, step = _f === void 0 ? 1 : _f, _g = _a.widgetId, widgetId = _g === void 0 ? this._widgetId : _g;
        var _h = this.properties, _j = _h.minName, minName = _j === void 0 ? name + "_min" : _j, _k = _h.maxName, maxName = _k === void 0 ? name + "_max" : _k;
        var prepareCallback = function (callback, property) {
            return function (e) {
                callback.apply(void 0, tslib_1.__spread([property], [isSlider1 ? e : undefined, !isSlider1 ? e : undefined]));
            };
        };
        return tslib_1.__assign({}, util_2.formatAriaProperties(aria), { 'aria-invalid': invalid === true ? 'true' : null, 'aria-readonly': readOnly === true ? 'true' : null, 'aria-describedby': isSlider1 ? this._minLabelId : this._maxLabelId, 'aria-labelledby': widgetId + "-label", type: 'range', min: "" + min, max: "" + max, step: "" + step, readonly: readOnly, required: required,
            disabled: disabled, name: isSlider1 ? minName : maxName, onblur: prepareCallback(function (prop, e1, e2) { return _this._genericCallback(prop, e1, e2); }, this.properties.onBlur), onclick: prepareCallback(function (prop, e1, e2) { return _this._genericCallback(prop, e1, e2); }, this.properties.onClick), onfocus: prepareCallback(function (prop, e1, e2) { return _this._genericCallback(prop, e1, e2); }, this.properties.onFocus), onchange: prepareCallback(function (prop, e1, e2) { return _this._genericChangeCallback(prop, e1, e2); }, this.properties.onChange), oninput: prepareCallback(function (prop, e1, e2) { return _this._genericChangeCallback(prop, e1, e2); }, this.properties.onInput), onkeydown: this._onKeyDown, onkeypress: this._onKeyPress, onkeyup: this._onKeyUp, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel, classes: [this.theme(css.input), fixedCss.nativeInput] });
    };
    RangeSlider.prototype.renderOutput = function (minValue, maxValue, percentValue) {
        var _a = this.properties, output = _a.output, _b = _a.outputIsTooltip, outputIsTooltip = _b === void 0 ? false : _b;
        var outputNode = output ? output(minValue, maxValue) : minValue + ", " + maxValue;
        // output styles
        var outputStyles = {};
        if (outputIsTooltip) {
            outputStyles = {
                left: Math.round((percentValue[0] + (percentValue[1] - percentValue[0]) / 2) * 100) + "%"
            };
        }
        return d_1.v('output', {
            classes: this.theme([css.output, outputIsTooltip ? css.outputTooltip : null]),
            for: this._widgetId,
            styles: outputStyles,
            tabIndex: -1 /* needed so Edge doesn't select the element while tabbing through */
        }, [outputNode]);
    };
    RangeSlider.prototype.render = function () {
        var _a = this.properties, disabled = _a.disabled, _b = _a.widgetId, widgetId = _b === void 0 ? this._widgetId : _b, invalid = _a.invalid, label = _a.label, labelAfter = _a.labelAfter, labelHidden = _a.labelHidden, _c = _a.max, max = _c === void 0 ? 100 : _c, _d = _a.min, min = _d === void 0 ? 0 : _d, readOnly = _a.readOnly, required = _a.required, theme = _a.theme, classes = _a.classes, _e = _a.showOutput, showOutput = _e === void 0 ? false : _e, _f = _a.minimumLabel, minimumLabel = _f === void 0 ? 'Minimum' : _f, _g = _a.maximumLabel, maximumLabel = _g === void 0 ? 'Maximum' : _g;
        var focus = this.meta(Focus_1.default).get('root');
        var _h = this.properties, _j = _h.minValue, minValue = _j === void 0 ? min : _j, _k = _h.maxValue, maxValue = _k === void 0 ? max : _k;
        minValue = Math.max(minValue, min);
        maxValue = Math.min(maxValue, max);
        var slider1Percent = (minValue - min) / (max - min);
        var slider2Percent = (maxValue - min) / (max - min);
        var slider1Size = slider1Percent + (slider2Percent - slider1Percent) / 2;
        var slider2Size = 1 - slider1Size;
        var size = this.meta(Dimensions_1.default).get('root');
        var slider1Focus = this.meta(Focus_1.default).get('slider1');
        var slider2Focus = this.meta(Focus_1.default).get('slider2');
        var slider1 = d_1.v('input', tslib_1.__assign({}, this._getInputProperties(true), { key: 'slider1', value: "" + minValue, styles: {
                clip: "rect(auto, " + Math.round(slider1Size * size.client.width) + "px, auto, auto)"
            } }));
        var slider2 = d_1.v('input', tslib_1.__assign({}, this._getInputProperties(false), { key: 'slider2', value: "" + maxValue, styles: {
                clip: "rect(auto, auto, auto, " + Math.round((1 - slider2Size) * size.client.width) + "px)"
            } }));
        var children = [
            label
                ? d_1.w(index_1.default, {
                    key: 'label',
                    theme: theme,
                    classes: classes,
                    disabled: disabled,
                    focused: focus.containsFocus,
                    invalid: invalid,
                    readOnly: readOnly,
                    required: required,
                    hidden: labelHidden,
                    widgetId: widgetId + "-label"
                }, [label])
                : null,
            d_1.v('div', {
                classes: [this.theme(css.inputWrapper), fixedCss.inputWrapperFixed]
            }, [
                slider1,
                d_1.v('div', {
                    key: 'minimumLabel',
                    classes: [baseCss.visuallyHidden],
                    id: this._minLabelId
                }, [minimumLabel]),
                slider2,
                d_1.v('div', {
                    key: 'maximumLabel',
                    classes: [baseCss.visuallyHidden],
                    id: this._maxLabelId
                }, [maximumLabel]),
                d_1.v('div', {
                    key: 'track',
                    classes: [this.theme(css.filled), fixedCss.filledFixed],
                    styles: {
                        left: Math.round(slider1Percent * 100) + '%',
                        width: Math.round((slider2Percent - slider1Percent) * 100) + '%'
                    }
                }),
                d_1.v('div', {
                    key: 'leftThumb',
                    classes: tslib_1.__spread(this.theme([
                        css.thumb,
                        css.leftThumb,
                        slider1Focus.active ? css.focused : undefined
                    ]), [
                        fixedCss.thumbFixed
                    ]),
                    styles: {
                        left: Math.round(slider1Percent * 100) + '%'
                    }
                }),
                d_1.v('div', {
                    key: 'rightThumb',
                    classes: tslib_1.__spread(this.theme([
                        css.thumb,
                        css.rightThumb,
                        slider2Focus.active ? css.focused : undefined
                    ]), [
                        fixedCss.thumbFixed
                    ]),
                    styles: {
                        left: Math.round(slider2Percent * 100) + '%'
                    }
                }),
                showOutput
                    ? this.renderOutput(minValue, maxValue, [slider1Percent, slider2Percent])
                    : null
            ])
        ];
        return d_1.v('div', {
            key: 'root',
            classes: this.theme(this.getRootClasses())
        }, labelAfter ? children.reverse() : children);
    };
    RangeSlider = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-range-slider',
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
                'minValue',
                'maxValue',
                'minName',
                'maxName',
                'minimumLabel',
                'maximumLabel'
            ],
            attributes: ['widgetId', 'label', 'name'],
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
    ], RangeSlider);
    return RangeSlider;
}(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase)));
exports.RangeSlider = RangeSlider;
exports.default = RangeSlider;

/*# sourceMappingURL=index.js.map*/