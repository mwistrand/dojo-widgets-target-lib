import * as tslib_1 from "tslib";
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { v, w } from '@dojo/framework/widget-core/d';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import { FocusMixin } from '@dojo/framework/widget-core/mixins/Focus';
import Label from '../label/index';
import { formatAriaProperties } from '../common/util';
import { uuid } from '@dojo/framework/core/util';
import * as css from '../theme/text-input.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import diffProperty from '@dojo/framework/widget-core/decorators/diffProperty';
import { reference } from '@dojo/framework/widget-core/diff';
import InputValidity from '../common/InputValidity';
import HelperText from '../helper-text/index';
function formatAutocomplete(autocomplete) {
    if (typeof autocomplete === 'boolean') {
        return autocomplete ? 'on' : 'off';
    }
    return autocomplete;
}
function patternDiffer(previousProperty, newProperty) {
    const value = newProperty instanceof RegExp ? newProperty.source : newProperty;
    return {
        changed: previousProperty !== value,
        value
    };
}
let TextInput = class TextInput extends ThemedMixin(FocusMixin(WidgetBase)) {
    constructor() {
        super(...arguments);
        this._uuid = uuid();
        this._state = {};
    }
    _onBlur(event) {
        this.properties.onBlur && this.properties.onBlur(event.target.value);
    }
    _onChange(event) {
        event.stopPropagation();
        this.properties.onChange &&
            this.properties.onChange(event.target.value);
    }
    _onClick(event) {
        event.stopPropagation();
        this.properties.onClick &&
            this.properties.onClick(event.target.value);
    }
    _onFocus(event) {
        this.properties.onFocus &&
            this.properties.onFocus(event.target.value);
    }
    _onInput(event) {
        event.stopPropagation();
        this.properties.onInput &&
            this.properties.onInput(event.target.value);
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
    _validate() {
        const { _state: state, properties: { onValidate, value, customValidator } } = this;
        if (!onValidate || value === undefined || value === null || state.previousValue === value) {
            return;
        }
        state.previousValue = value;
        let { valid, message = '' } = this.meta(InputValidity).get('input', value);
        if (valid && customValidator) {
            const customValid = customValidator(value);
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
    }
    get validity() {
        const { valid = { valid: undefined, message: undefined } } = this.properties;
        if (typeof valid === 'boolean') {
            return { valid, message: undefined };
        }
        return {
            valid: valid.valid,
            message: valid.message
        };
    }
    getRootClasses() {
        const { disabled, readOnly, required, leading, trailing } = this.properties;
        const { valid } = this.validity;
        const focus = this.meta(Focus).get('root');
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
    }
    render() {
        const { aria = {}, autocomplete, classes, disabled, label, labelHidden = false, leading, maxLength, minLength, name, pattern, placeholder, readOnly, required, theme, trailing, type = 'text', value, widgetId = this._uuid, helperText } = this.properties;
        this._validate();
        const { valid, message } = this.validity;
        const focus = this.meta(Focus).get('root');
        const computedHelperText = (valid === false && message) || helperText;
        return v('div', {
            key: 'root',
            classes: this.theme(this.getRootClasses()),
            role: 'presentation'
        }, [
            label &&
                w(Label, {
                    theme,
                    classes,
                    disabled,
                    invalid: valid === false || undefined,
                    focused: focus.containsFocus,
                    readOnly,
                    required,
                    hidden: labelHidden,
                    forId: widgetId
                }, [label]),
            v('div', {
                key: 'inputWrapper',
                classes: this.theme(css.inputWrapper),
                role: 'presentation'
            }, [
                leading &&
                    v('span', { key: 'leading', classes: this.theme(css.leading) }, [
                        leading()
                    ]),
                v('input', Object.assign({}, formatAriaProperties(aria), { 'aria-invalid': valid === false ? 'true' : null, autocomplete: formatAutocomplete(autocomplete), classes: this.theme(css.input), disabled, id: widgetId, focus: this.shouldFocus, key: 'input', maxlength: maxLength ? `${maxLength}` : null, minlength: minLength ? `${minLength}` : null, name,
                    pattern,
                    placeholder,
                    readOnly, 'aria-readonly': readOnly ? 'true' : null, required,
                    type,
                    value, onblur: this._onBlur, onchange: this._onChange, onclick: this._onClick, onfocus: this._onFocus, oninput: this._onInput, onkeydown: this._onKeyDown, onkeypress: this._onKeyPress, onkeyup: this._onKeyUp, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel })),
                trailing &&
                    v('span', { key: 'trailing', classes: this.theme(css.trailing) }, [
                        trailing()
                    ])
            ]),
            w(HelperText, { text: computedHelperText, valid })
        ]);
    }
};
TextInput = tslib_1.__decorate([
    theme(css),
    customElement({
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
    diffProperty('pattern', patternDiffer),
    diffProperty('leading', reference),
    diffProperty('trailing', reference)
], TextInput);
export { TextInput };
export default TextInput;

/*# sourceMappingURL=index.mjs.map*/