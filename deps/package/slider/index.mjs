import * as tslib_1 from "tslib";
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin } from '@dojo/framework/widget-core/mixins/Focus';
import Label from '../label/index';
import { v, w } from '@dojo/framework/widget-core/d';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import { uuid } from '@dojo/framework/core/util';
import { formatAriaProperties } from '../common/util';
import * as fixedCss from './styles/slider.m.css';
import * as css from '../theme/slider.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
function extractValue(event) {
    const value = event.target.value;
    return parseFloat(value);
}
let Slider = class Slider extends ThemedMixin(FocusMixin(WidgetBase)) {
    constructor() {
        super(...arguments);
        // id used to associate input with output
        this._widgetId = uuid();
    }
    _onBlur(event) {
        this.properties.onBlur && this.properties.onBlur(extractValue(event));
    }
    _onChange(event) {
        event.stopPropagation();
        this.properties.onChange && this.properties.onChange(extractValue(event));
    }
    _onClick(event) {
        event.stopPropagation();
        this.properties.onClick && this.properties.onClick(extractValue(event));
    }
    _onFocus(event) {
        this.properties.onFocus && this.properties.onFocus(extractValue(event));
    }
    _onInput(event) {
        event.stopPropagation();
        this.properties.onInput && this.properties.onInput(extractValue(event));
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
    getRootClasses() {
        const { disabled, invalid, readOnly, required, vertical = false } = this.properties;
        const focus = this.meta(Focus).get('root');
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
    }
    renderControls(percentValue) {
        const { vertical = false, verticalHeight = '200px' } = this.properties;
        return v('div', {
            classes: [this.theme(css.track), fixedCss.trackFixed],
            'aria-hidden': 'true',
            styles: vertical ? { width: verticalHeight } : {}
        }, [
            v('span', {
                classes: [this.theme(css.fill), fixedCss.fillFixed],
                styles: { width: `${percentValue}%` }
            }),
            v('span', {
                classes: [this.theme(css.thumb), fixedCss.thumbFixed],
                styles: { left: `${percentValue}%` }
            })
        ]);
    }
    renderOutput(value, percentValue) {
        const { output, outputIsTooltip = false, vertical = false } = this.properties;
        const outputNode = output ? output(value) : `${value}`;
        // output styles
        let outputStyles = {};
        if (outputIsTooltip) {
            outputStyles = vertical
                ? { top: `${100 - percentValue}%` }
                : { left: `${percentValue}%` };
        }
        return v('output', {
            classes: this.theme([css.output, outputIsTooltip ? css.outputTooltip : null]),
            for: this._widgetId,
            styles: outputStyles,
            tabIndex: -1 /* needed so Edge doesn't select the element while tabbing through */
        }, [outputNode]);
    }
    render() {
        const { aria = {}, disabled, widgetId = this._widgetId, invalid, label, labelAfter, labelHidden, max = 100, min = 0, name, readOnly, required, showOutput = true, step = 1, vertical = false, verticalHeight = '200px', theme, classes, inputStyles = {} } = this.properties;
        const focus = this.meta(Focus).get('root');
        let { value = min } = this.properties;
        value = value > max ? max : value;
        value = value < min ? min : value;
        const percentValue = ((value - min) / (max - min)) * 100;
        const slider = v('div', {
            classes: [this.theme(css.inputWrapper), fixedCss.inputWrapperFixed],
            styles: vertical ? { height: verticalHeight } : {}
        }, [
            v('input', Object.assign({ key: 'input' }, formatAriaProperties(aria), { classes: [this.theme(css.input), fixedCss.nativeInput], disabled, id: widgetId, focus: this.shouldFocus, 'aria-invalid': invalid === true ? 'true' : null, max: `${max}`, min: `${min}`, name,
                readOnly, 'aria-readonly': readOnly === true ? 'true' : null, required, step: `${step}`, styles: Object.assign({}, inputStyles, (vertical ? { width: verticalHeight } : {})), type: 'range', value: `${value}`, onblur: this._onBlur, onchange: this._onChange, onclick: this._onClick, onfocus: this._onFocus, oninput: this._onInput, onkeydown: this._onKeyDown, onkeypress: this._onKeyPress, onkeyup: this._onKeyUp, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel })),
            this.renderControls(percentValue),
            showOutput ? this.renderOutput(value, percentValue) : null
        ]);
        const children = [
            label
                ? w(Label, {
                    theme,
                    classes,
                    disabled,
                    focused: focus.containsFocus,
                    invalid,
                    readOnly,
                    required,
                    hidden: labelHidden,
                    forId: widgetId
                }, [label])
                : null,
            slider
        ];
        return v('div', {
            key: 'root',
            classes: [...this.theme(this.getRootClasses()), fixedCss.rootFixed]
        }, labelAfter ? children.reverse() : children);
    }
};
Slider = tslib_1.__decorate([
    theme(css),
    customElement({
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
export { Slider };
export default Slider;

/*# sourceMappingURL=index.mjs.map*/