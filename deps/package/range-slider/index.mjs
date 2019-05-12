import * as tslib_1 from "tslib";
import { uuid } from '@dojo/framework/core/util';
import { v, w } from '@dojo/framework/widget-core/d';
import Dimensions from '@dojo/framework/widget-core/meta/Dimensions';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { formatAriaProperties } from '../common/util';
import Label from '../label/index';
import * as fixedCss from './styles/range-slider.m.css';
import * as css from '../theme/range-slider.m.css';
import * as baseCss from '../common/styles/base.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
function extractValue(event) {
    const value = event.target.value;
    return parseFloat(value);
}
let RangeSlider = class RangeSlider extends ThemedMixin(WidgetBase) {
    constructor() {
        super(...arguments);
        // id used to associate input with output
        this._widgetId = uuid();
        this._minLabelId = uuid();
        this._maxLabelId = uuid();
    }
    getRootClasses() {
        const { disabled, invalid, readOnly, required, showOutput } = this.properties;
        const focus = this.meta(Focus).get('root');
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
    }
    _genericCallback(callback, minEvent, maxEvent) {
        minEvent && minEvent.stopPropagation();
        maxEvent && maxEvent.stopPropagation();
        const { min = 0, max = 100 } = this.properties;
        const { minValue = min, maxValue = max } = this.properties;
        callback &&
            callback(minEvent ? extractValue(minEvent) : minValue, maxEvent ? extractValue(maxEvent) : maxValue);
    }
    _genericChangeCallback(callback, minEvent, maxEvent) {
        minEvent && minEvent.stopPropagation();
        maxEvent && maxEvent.stopPropagation();
        const { min = 0, max = 100 } = this.properties;
        const { minValue = min, maxValue = max } = this.properties;
        if (minEvent) {
            callback && callback(Math.min(extractValue(minEvent), maxValue), maxValue);
        }
        else if (maxEvent) {
            callback && callback(minValue, Math.max(minValue, extractValue(maxEvent)));
        }
    }
    _onKeyDown(event) {
        event.stopPropagation();
        this.properties.onKeyDown &&
            this.properties.onKeyDown(event.which, () => {
                event.preventDefault();
            });
    }
    _onKeyPress(event) {
        event.stopPropagation();
        this.properties.onKeyPress &&
            this.properties.onKeyPress(event.which, () => {
                event.preventDefault();
            });
    }
    _onKeyUp(event) {
        event.stopPropagation();
        this.properties.onKeyUp &&
            this.properties.onKeyUp(event.which, () => {
                event.preventDefault();
            });
    }
    _onMouseDown(event) {
        event.stopPropagation();
        this.properties.onMouseDown && this.properties.onMouseDown();
    }
    _onMouseUp(event) {
        event.stopPropagation();
        this.properties.onMouseUp && this.properties.onMouseUp();
    }
    _onTouchStart(event) {
        event.stopPropagation();
        this.properties.onTouchStart && this.properties.onTouchStart();
    }
    _onTouchEnd(event) {
        event.stopPropagation();
        this.properties.onTouchEnd && this.properties.onTouchEnd();
    }
    _onTouchCancel(event) {
        event.stopPropagation();
        this.properties.onTouchCancel && this.properties.onTouchCancel();
    }
    _getInputProperties(isSlider1) {
        const { aria = {}, disabled, invalid, max = 100, min = 0, name = '', readOnly, required, step = 1, widgetId = this._widgetId } = this.properties;
        const { minName = `${name}_min`, maxName = `${name}_max` } = this.properties;
        const prepareCallback = (callback, property) => {
            return (e) => {
                callback(property, ...[isSlider1 ? e : undefined, !isSlider1 ? e : undefined]);
            };
        };
        return Object.assign({}, formatAriaProperties(aria), { 'aria-invalid': invalid === true ? 'true' : null, 'aria-readonly': readOnly === true ? 'true' : null, 'aria-describedby': isSlider1 ? this._minLabelId : this._maxLabelId, 'aria-labelledby': `${widgetId}-label`, type: 'range', min: `${min}`, max: `${max}`, step: `${step}`, readonly: readOnly, required,
            disabled, name: isSlider1 ? minName : maxName, onblur: prepareCallback((prop, e1, e2) => this._genericCallback(prop, e1, e2), this.properties.onBlur), onclick: prepareCallback((prop, e1, e2) => this._genericCallback(prop, e1, e2), this.properties.onClick), onfocus: prepareCallback((prop, e1, e2) => this._genericCallback(prop, e1, e2), this.properties.onFocus), onchange: prepareCallback((prop, e1, e2) => this._genericChangeCallback(prop, e1, e2), this.properties.onChange), oninput: prepareCallback((prop, e1, e2) => this._genericChangeCallback(prop, e1, e2), this.properties.onInput), onkeydown: this._onKeyDown, onkeypress: this._onKeyPress, onkeyup: this._onKeyUp, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel, classes: [this.theme(css.input), fixedCss.nativeInput] });
    }
    renderOutput(minValue, maxValue, percentValue) {
        const { output, outputIsTooltip = false } = this.properties;
        const outputNode = output ? output(minValue, maxValue) : `${minValue}, ${maxValue}`;
        // output styles
        let outputStyles = {};
        if (outputIsTooltip) {
            outputStyles = {
                left: `${Math.round((percentValue[0] + (percentValue[1] - percentValue[0]) / 2) * 100)}%`
            };
        }
        return v('output', {
            classes: this.theme([css.output, outputIsTooltip ? css.outputTooltip : null]),
            for: this._widgetId,
            styles: outputStyles,
            tabIndex: -1 /* needed so Edge doesn't select the element while tabbing through */
        }, [outputNode]);
    }
    render() {
        const { disabled, widgetId = this._widgetId, invalid, label, labelAfter, labelHidden, max = 100, min = 0, readOnly, required, theme, classes, showOutput = false, minimumLabel = 'Minimum', maximumLabel = 'Maximum' } = this.properties;
        const focus = this.meta(Focus).get('root');
        let { minValue = min, maxValue = max } = this.properties;
        minValue = Math.max(minValue, min);
        maxValue = Math.min(maxValue, max);
        const slider1Percent = (minValue - min) / (max - min);
        const slider2Percent = (maxValue - min) / (max - min);
        const slider1Size = slider1Percent + (slider2Percent - slider1Percent) / 2;
        const slider2Size = 1 - slider1Size;
        const size = this.meta(Dimensions).get('root');
        const slider1Focus = this.meta(Focus).get('slider1');
        const slider2Focus = this.meta(Focus).get('slider2');
        const slider1 = v('input', Object.assign({}, this._getInputProperties(true), { key: 'slider1', value: `${minValue}`, styles: {
                clip: `rect(auto, ${Math.round(slider1Size * size.client.width)}px, auto, auto)`
            } }));
        const slider2 = v('input', Object.assign({}, this._getInputProperties(false), { key: 'slider2', value: `${maxValue}`, styles: {
                clip: `rect(auto, auto, auto, ${Math.round((1 - slider2Size) * size.client.width)}px)`
            } }));
        const children = [
            label
                ? w(Label, {
                    key: 'label',
                    theme,
                    classes,
                    disabled,
                    focused: focus.containsFocus,
                    invalid,
                    readOnly,
                    required,
                    hidden: labelHidden,
                    widgetId: `${widgetId}-label`
                }, [label])
                : null,
            v('div', {
                classes: [this.theme(css.inputWrapper), fixedCss.inputWrapperFixed]
            }, [
                slider1,
                v('div', {
                    key: 'minimumLabel',
                    classes: [baseCss.visuallyHidden],
                    id: this._minLabelId
                }, [minimumLabel]),
                slider2,
                v('div', {
                    key: 'maximumLabel',
                    classes: [baseCss.visuallyHidden],
                    id: this._maxLabelId
                }, [maximumLabel]),
                v('div', {
                    key: 'track',
                    classes: [this.theme(css.filled), fixedCss.filledFixed],
                    styles: {
                        left: Math.round(slider1Percent * 100) + '%',
                        width: Math.round((slider2Percent - slider1Percent) * 100) + '%'
                    }
                }),
                v('div', {
                    key: 'leftThumb',
                    classes: [
                        ...this.theme([
                            css.thumb,
                            css.leftThumb,
                            slider1Focus.active ? css.focused : undefined
                        ]),
                        fixedCss.thumbFixed
                    ],
                    styles: {
                        left: Math.round(slider1Percent * 100) + '%'
                    }
                }),
                v('div', {
                    key: 'rightThumb',
                    classes: [
                        ...this.theme([
                            css.thumb,
                            css.rightThumb,
                            slider2Focus.active ? css.focused : undefined
                        ]),
                        fixedCss.thumbFixed
                    ],
                    styles: {
                        left: Math.round(slider2Percent * 100) + '%'
                    }
                }),
                showOutput
                    ? this.renderOutput(minValue, maxValue, [slider1Percent, slider2Percent])
                    : null
            ])
        ];
        return v('div', {
            key: 'root',
            classes: this.theme(this.getRootClasses())
        }, labelAfter ? children.reverse() : children);
    }
};
RangeSlider = tslib_1.__decorate([
    theme(css),
    customElement({
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
export { RangeSlider };
export default RangeSlider;

/*# sourceMappingURL=index.mjs.map*/