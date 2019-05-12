import * as tslib_1 from "tslib";
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin } from '@dojo/framework/widget-core/mixins/Focus';
import { v, w } from '@dojo/framework/widget-core/d';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import Label from '../label/index';
import { formatAriaProperties } from '../common/util';
import { uuid } from '@dojo/framework/core/util';
import * as css from '../theme/text-area.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import HelperText from '../helper-text/index';
let Textarea = class Textarea extends ThemedMixin(FocusMixin(WidgetBase)) {
    constructor() {
        super(...arguments);
        this._uuid = uuid();
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
    getRootClasses() {
        const { disabled, invalid, readOnly, required } = this.properties;
        const focus = this.meta(Focus).get('root');
        return [
            css.root,
            disabled ? css.disabled : null,
            focus.containsFocus ? css.focused : null,
            invalid === true ? css.invalid : null,
            invalid === false ? css.valid : null,
            readOnly ? css.readonly : null,
            required ? css.required : null
        ];
    }
    render() {
        const { aria = {}, columns = 20, disabled, widgetId = this._uuid, invalid, label, maxLength, minLength, name, placeholder, readOnly, required, rows = 2, value, wrapText, theme, classes, labelHidden, helperText } = this.properties;
        const focus = this.meta(Focus).get('root');
        return v('div', {
            key: 'root',
            classes: this.theme(this.getRootClasses())
        }, [
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
            v('div', { classes: this.theme(css.inputWrapper) }, [
                v('textarea', Object.assign({ id: widgetId, key: 'input' }, formatAriaProperties(aria), { classes: this.theme(css.input), cols: `${columns}`, disabled, focus: this.shouldFocus, 'aria-invalid': invalid ? 'true' : null, maxlength: maxLength ? `${maxLength}` : null, minlength: minLength ? `${minLength}` : null, name,
                    placeholder,
                    readOnly, 'aria-readonly': readOnly ? 'true' : null, required, rows: `${rows}`, value, wrap: wrapText, onblur: this._onBlur, onchange: this._onChange, onclick: this._onClick, onfocus: this._onFocus, oninput: this._onInput, onkeydown: this._onKeyDown, onkeypress: this._onKeyPress, onkeyup: this._onKeyUp, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel }))
            ]),
            w(HelperText, { text: helperText })
        ]);
    }
};
Textarea = tslib_1.__decorate([
    theme(css),
    customElement({
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
export { Textarea };
export default Textarea;

/*# sourceMappingURL=index.mjs.map*/