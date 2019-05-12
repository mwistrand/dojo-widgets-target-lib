import * as tslib_1 from "tslib";
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin } from '@dojo/framework/widget-core/mixins/Focus';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import Label from '../label/index';
import { formatAriaProperties } from '../common/util';
import { v, w } from '@dojo/framework/widget-core/d';
import { uuid } from '@dojo/framework/core/util';
import * as css from '../theme/checkbox.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
/**
 * The type of UI to show for this Checkbox
 */
export var Mode;
(function (Mode) {
    Mode["normal"] = "normal";
    Mode["toggle"] = "toggle";
})(Mode || (Mode = {}));
let Checkbox = class Checkbox extends ThemedMixin(FocusMixin(WidgetBase)) {
    constructor() {
        super(...arguments);
        this._uuid = uuid();
    }
    _onBlur(event) {
        const checkbox = event.target;
        this.properties.onBlur && this.properties.onBlur(checkbox.value, checkbox.checked);
    }
    _onChange(event) {
        event.stopPropagation();
        const checkbox = event.target;
        this.properties.onChange && this.properties.onChange(checkbox.value, checkbox.checked);
    }
    _onClick(event) {
        event.stopPropagation();
        const checkbox = event.target;
        this.properties.onClick && this.properties.onClick(checkbox.value, checkbox.checked);
    }
    _onFocus(event) {
        const checkbox = event.target;
        this.properties.onFocus && this.properties.onFocus(checkbox.value, checkbox.checked);
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
        const { checked = false, disabled, invalid, mode, readOnly, required } = this.properties;
        const focus = this.meta(Focus).get('root');
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
    }
    renderToggle() {
        const { checked, mode, onLabel, offLabel } = this.properties;
        return mode === Mode.toggle
            ? [
                offLabel
                    ? v('div', {
                        key: 'offLabel',
                        classes: this.theme(css.offLabel),
                        'aria-hidden': checked ? 'true' : null
                    }, [offLabel])
                    : null,
                v('div', {
                    key: 'toggle',
                    classes: this.theme(css.toggleSwitch)
                }),
                onLabel
                    ? v('div', {
                        key: 'onLabel',
                        classes: this.theme(css.onLabel),
                        'aria-hidden': checked ? null : 'true'
                    }, [onLabel])
                    : null
            ]
            : [];
    }
    render() {
        const { aria = {}, classes, checked = false, disabled, widgetId = this._uuid, invalid, label, labelAfter = true, labelHidden, theme, name, readOnly, required, value } = this.properties;
        const focus = this.meta(Focus).get('root');
        const children = [
            v('div', { classes: this.theme(css.inputWrapper) }, [
                ...this.renderToggle(),
                v('input', Object.assign({ id: widgetId }, formatAriaProperties(aria), { classes: this.theme(css.input), checked,
                    disabled, focus: this.shouldFocus, 'aria-invalid': invalid === true ? 'true' : null, name,
                    readOnly, 'aria-readonly': readOnly === true ? 'true' : null, required, type: 'checkbox', value, onblur: this._onBlur, onchange: this._onChange, onclick: this._onClick, onfocus: this._onFocus, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel }))
            ]),
            label
                ? w(Label, {
                    key: 'label',
                    classes,
                    theme,
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
Checkbox = tslib_1.__decorate([
    theme(css),
    customElement({
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
export { Checkbox };
export default Checkbox;

/*# sourceMappingURL=index.mjs.map*/