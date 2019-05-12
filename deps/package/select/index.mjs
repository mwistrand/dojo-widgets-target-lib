import * as tslib_1 from "tslib";
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { diffProperty } from '@dojo/framework/widget-core/decorators/diffProperty';
import { reference } from '@dojo/framework/widget-core/diff';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin } from '@dojo/framework/widget-core/mixins/Focus';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import { v, w } from '@dojo/framework/widget-core/d';
import { uuid } from '@dojo/framework/core/util';
import { find } from '@dojo/framework/shim/array';
import { formatAriaProperties, Keys } from '../common/util';
import Icon from '../icon/index';
import Label from '../label/index';
import Listbox from '../listbox/index';
import HelperText from '../helper-text/index';
import * as css from '../theme/select.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
let Select = class Select extends ThemedMixin(FocusMixin(WidgetBase)) {
    constructor() {
        super(...arguments);
        this._focusNode = 'trigger';
        this._ignoreBlur = false;
        this._open = false;
        this._baseId = uuid();
        this._inputText = '';
        this._getOptionSelected = (option, index) => {
            const { getOptionValue, value } = this.properties;
            return getOptionValue ? getOptionValue(option, index) === value : option === value;
        };
    }
    _getOptionLabel(option) {
        const { getOptionLabel } = this.properties;
        const fallback = option ? `${option}` : '';
        return getOptionLabel ? getOptionLabel(option) : fallback;
    }
    _getSelectedIndexOnInput(event) {
        const { options = [], getOptionDisabled, getOptionText } = this.properties;
        if (event.key !== undefined && event.key.length === 1) {
            clearTimeout(this._resetInputTextTimer);
            this._resetInputTextTimer = setTimeout(() => {
                this._inputText = '';
            }, 800);
            this._inputText += `${event.key}`;
            let index;
            options.some((option, i) => {
                if (getOptionDisabled && getOptionDisabled(option, i)) {
                    return false;
                }
                const optionText = getOptionText
                    ? getOptionText(option)
                    : this._getOptionLabel(option);
                if (typeof optionText === 'string' &&
                    optionText.toLowerCase().indexOf(this._inputText.toLowerCase()) === 0) {
                    index = i;
                    return true;
                }
                return false;
            });
            return index;
        }
    }
    _onBlur(event) {
        this.properties.onBlur && this.properties.onBlur(this.properties.key || '');
    }
    _onFocus(event) {
        this.properties.onFocus && this.properties.onFocus(this.properties.key || '');
    }
    // native select events
    _onNativeChange(event) {
        const { key, getOptionValue, options = [], onChange } = this.properties;
        event.stopPropagation();
        const value = event.target.value;
        const option = find(options, (option, index) => getOptionValue ? getOptionValue(option, index) === value : option === value);
        option && onChange && onChange(option, key);
    }
    // custom select events
    _openSelect() {
        this.focus();
        this._focusNode = 'listbox';
        this._ignoreBlur = true;
        this._open = true;
        this._focusedIndex = this._focusedIndex || 0;
        this.invalidate();
    }
    _closeSelect() {
        this._focusNode = 'trigger';
        this._ignoreBlur = true;
        this._open = false;
        this.invalidate();
    }
    _onDropdownKeyDown(event) {
        event.stopPropagation();
        if (event.which === Keys.Escape) {
            this._closeSelect();
            this.focus();
        }
    }
    _onTriggerClick(event) {
        event.stopPropagation();
        this._open ? this._closeSelect() : this._openSelect();
    }
    _onTriggerBlur(event) {
        if (this._ignoreBlur) {
            this._ignoreBlur = false;
            return;
        }
        const { key, onBlur } = this.properties;
        onBlur && onBlur(key);
        this._closeSelect();
    }
    _onTriggerKeyDown(event) {
        const { key, options = [], onChange } = this.properties;
        event.stopPropagation();
        const index = this._getSelectedIndexOnInput(event);
        if (index !== undefined) {
            this._focusedIndex = index;
            onChange && onChange(options[index], key);
            this.invalidate();
        }
        if (event.which === Keys.Down) {
            this._openSelect();
        }
    }
    _onTriggerMouseDown() {
        this._ignoreBlur = true;
    }
    _onListboxBlur(event) {
        if (this._ignoreBlur) {
            this._ignoreBlur = false;
            return;
        }
        const { key, onBlur } = this.properties;
        onBlur && onBlur(key);
        this._closeSelect();
    }
    renderExpandIcon() {
        const { theme, classes } = this.properties;
        return v('span', { classes: this.theme(css.arrow) }, [
            w(Icon, { type: 'downIcon', theme, classes })
        ]);
    }
    renderNativeSelect() {
        const { aria = {}, disabled, getOptionDisabled, getOptionId, getOptionSelected, getOptionValue, widgetId = this._baseId, invalid, name, options = [], readOnly, required, value } = this.properties;
        /* create option nodes */
        const optionNodes = options.map((option, i) => v('option', {
            value: getOptionValue ? getOptionValue(option, i) : undefined,
            id: getOptionId ? getOptionId(option, i) : undefined,
            disabled: getOptionDisabled ? getOptionDisabled(option, i) : undefined,
            selected: getOptionSelected ? getOptionSelected(option, i) : undefined
        }, [this._getOptionLabel(option)]));
        return v('div', { classes: this.theme(css.inputWrapper) }, [
            v('select', Object.assign({}, formatAriaProperties(aria), { classes: this.theme(css.input), disabled, focus: this.shouldFocus, 'aria-invalid': invalid ? 'true' : null, id: widgetId, name,
                readOnly, 'aria-readonly': readOnly ? 'true' : null, required,
                value, onblur: this._onBlur, onchange: this._onNativeChange, onfocus: this._onFocus }), optionNodes),
            this.renderExpandIcon()
        ]);
    }
    renderCustomSelect() {
        const { getOptionDisabled, getOptionId, getOptionLabel, getOptionSelected = this._getOptionSelected, widgetId = this._baseId, key, options = [], theme, classes, onChange } = this.properties;
        if (this._focusedIndex === undefined) {
            options.map(getOptionSelected).forEach((isSelected, index) => {
                if (isSelected) {
                    this._focusedIndex = index;
                }
            });
        }
        const { _open, _focusedIndex = 0 } = this;
        // create dropdown trigger and select box
        return v('div', {
            key: 'wrapper',
            classes: this.theme([css.inputWrapper, _open ? css.open : null])
        }, [
            ...this.renderCustomTrigger(),
            v('div', {
                classes: this.theme(css.dropdown),
                onfocusout: this._onListboxBlur,
                onkeydown: this._onDropdownKeyDown
            }, [
                w(Listbox, {
                    key: 'listbox',
                    activeIndex: _focusedIndex,
                    widgetId: widgetId,
                    focus: this._focusNode === 'listbox' ? this.shouldFocus : () => false,
                    optionData: options,
                    tabIndex: _open ? 0 : -1,
                    getOptionDisabled,
                    getOptionId,
                    getOptionLabel,
                    getOptionSelected,
                    theme,
                    classes,
                    onActiveIndexChange: (index) => {
                        this._focusedIndex = index;
                        this.invalidate();
                    },
                    onOptionSelect: (option) => {
                        onChange && onChange(option, key);
                        this._closeSelect();
                        this.focus();
                    },
                    onKeyDown: (event) => {
                        const index = this._getSelectedIndexOnInput(event);
                        if (index !== undefined) {
                            this._focusedIndex = index;
                            this.invalidate();
                        }
                    }
                })
            ])
        ]);
    }
    renderCustomTrigger() {
        const { aria = {}, disabled, getOptionSelected = this._getOptionSelected, invalid, options = [], placeholder, readOnly, required, value } = this.properties;
        let label;
        let isPlaceholder = false;
        const selectedOption = find(options, (option, index) => {
            return getOptionSelected(option, index);
        });
        if (selectedOption) {
            label = this._getOptionLabel(selectedOption);
        }
        else {
            isPlaceholder = true;
            label = placeholder ? placeholder : this._getOptionLabel(options[0]);
        }
        return [
            v('button', Object.assign({}, formatAriaProperties(aria), { 'aria-controls': this._baseId, 'aria-expanded': `${this._open}`, 'aria-haspopup': 'listbox', 'aria-invalid': invalid ? 'true' : null, 'aria-required': required ? 'true' : null, classes: this.theme([css.trigger, isPlaceholder ? css.placeholder : null]), disabled: disabled || readOnly, focus: this._focusNode === 'trigger' ? this.shouldFocus : () => false, key: 'trigger', type: 'button', value, onblur: this._onTriggerBlur, onclick: this._onTriggerClick, onfocus: this._onFocus, onkeydown: this._onTriggerKeyDown, onmousedown: this._onTriggerMouseDown }), [label]),
            this.renderExpandIcon()
        ];
    }
    render() {
        const { label, labelHidden, disabled, helperText, widgetId = this._baseId, invalid, readOnly, required, useNativeElement = false, theme, classes } = this.properties;
        const focus = this.meta(Focus).get('root');
        return v('div', {
            key: 'root',
            classes: this.theme([
                css.root,
                disabled ? css.disabled : null,
                focus.containsFocus ? css.focused : null,
                invalid === true ? css.invalid : null,
                invalid === false ? css.valid : null,
                readOnly ? css.readonly : null,
                required ? css.required : null
            ])
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
            useNativeElement ? this.renderNativeSelect() : this.renderCustomSelect(),
            w(HelperText, { theme, text: helperText })
        ]);
    }
};
Select = tslib_1.__decorate([
    theme(css),
    diffProperty('options', reference),
    customElement({
        tag: 'dojo-select',
        properties: [
            'theme',
            'classes',
            'aria',
            'extraClasses',
            'options',
            'useNativeElement',
            'getOptionDisabled',
            'getOptionId',
            'getOptionLabel',
            'getOptionText',
            'getOptionSelected',
            'getOptionValue',
            'readOnly',
            'required',
            'invalid',
            'disabled',
            'labelHidden'
        ],
        attributes: ['widgetId', 'placeholder', 'label', 'value', 'helperText'],
        events: ['onBlur', 'onChange', 'onFocus']
    })
], Select);
export { Select };
export default Select;

/*# sourceMappingURL=index.mjs.map*/