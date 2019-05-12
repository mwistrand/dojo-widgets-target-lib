import * as tslib_1 from "tslib";
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin } from '@dojo/framework/widget-core/mixins/Focus';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import Label from '../label/index';
import { formatAriaProperties } from '../common/util';
import { v, w } from '@dojo/framework/widget-core/d';
import { uuid } from '@dojo/framework/core/util';
import * as css from '../theme/radio.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
let Radio = class Radio extends ThemedMixin(FocusMixin(WidgetBase)) {
    constructor() {
        super(...arguments);
        this._uuid = uuid();
    }
    _onBlur(event) {
        const radio = event.target;
        this.properties.onBlur && this.properties.onBlur(radio.value, radio.checked);
    }
    _onChange(event) {
        event.stopPropagation();
        const radio = event.target;
        this.properties.onChange && this.properties.onChange(radio.value, radio.checked);
    }
    _onClick(event) {
        event.stopPropagation();
        const radio = event.target;
        this.properties.onClick && this.properties.onClick(radio.value, radio.checked);
    }
    _onFocus(event) {
        const radio = event.target;
        this.properties.onFocus && this.properties.onFocus(radio.value, radio.checked);
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
        const { checked = false, disabled, invalid, readOnly, required } = this.properties;
        const focus = this.meta(Focus).get('root');
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
    }
    render() {
        const { aria = {}, checked = false, disabled, widgetId = this._uuid, invalid, label, labelAfter = true, labelHidden, theme, classes, name, readOnly, required, value } = this.properties;
        const focus = this.meta(Focus).get('root');
        const children = [
            v('div', { classes: this.theme(css.inputWrapper) }, [
                v('input', Object.assign({ id: widgetId }, formatAriaProperties(aria), { classes: this.theme(css.input), checked,
                    disabled, focus: this.shouldFocus, 'aria-invalid': invalid === true ? 'true' : null, name,
                    readOnly, 'aria-readonly': readOnly === true ? 'true' : null, required, type: 'radio', value, onblur: this._onBlur, onchange: this._onChange, onclick: this._onClick, onfocus: this._onFocus, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel })),
                v('div', {
                    classes: this.theme(css.radioBackground)
                }, [
                    v('div', { classes: this.theme(css.radioOuter) }),
                    v('div', { classes: this.theme(css.radioInner) })
                ])
            ]),
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
                    forId: widgetId,
                    secondary: true
                }, [label])
                : null
        ];
        return v('div', {
            key: 'root',
            classes: this.theme(this.getRootClasses())
        }, labelAfter ? children : children.reverse());
    }
};
Radio = tslib_1.__decorate([
    theme(css),
    customElement({
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
export { Radio };
export default Radio;

/*# sourceMappingURL=index.mjs.map*/