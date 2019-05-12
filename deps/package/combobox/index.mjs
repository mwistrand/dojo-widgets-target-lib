import * as tslib_1 from "tslib";
import { diffProperty } from '@dojo/framework/widget-core/decorators/diffProperty';
import { Keys } from '../common/util';
import { reference } from '@dojo/framework/widget-core/diff';
import { I18nMixin } from '@dojo/framework/widget-core/mixins/I18n';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import { FocusMixin } from '@dojo/framework/widget-core/mixins/Focus';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { uuid } from '@dojo/framework/core/util';
import { v, w } from '@dojo/framework/widget-core/d';
import Icon from '../icon/index';
import Label from '../label/index';
import Listbox from '../listbox/index';
import TextInput from '../text-input/index';
import commonBundle from '../common/nls/common';
import * as css from '../theme/combobox.m.css';
import * as baseCss from '../common/styles/base.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
// Enum used when traversing items using arrow keys
export var Operation;
(function (Operation) {
    Operation[Operation["increase"] = 1] = "increase";
    Operation[Operation["decrease"] = -1] = "decrease";
})(Operation || (Operation = {}));
let ComboBox = class ComboBox extends I18nMixin(ThemedMixin(FocusMixin(WidgetBase))) {
    constructor() {
        super(...arguments);
        this._activeIndex = 0;
        this._idBase = uuid();
        this._menuHasVisualFocus = false;
    }
    _closeMenu() {
        this._open = false;
        this.invalidate();
    }
    _getMenuId() {
        return `${this._idBase}-menu`;
    }
    _getResultLabel(result) {
        const { getResultLabel } = this.properties;
        return getResultLabel ? getResultLabel(result) : `${result}`;
    }
    _getResultSelected(result) {
        const { getResultSelected, value } = this.properties;
        return getResultSelected
            ? getResultSelected(result)
            : this._getResultLabel(result) === value;
    }
    _getResultValue(result) {
        const { getResultValue = this.properties.getResultLabel } = this.properties;
        return getResultValue ? `${getResultValue(result)}` : `${result}`;
    }
    _getResultId(result, index) {
        return `${this._idBase}-result${index}`;
    }
    _onArrowClick(event) {
        event.stopPropagation();
        const { disabled, readOnly } = this.properties;
        if (!disabled && !readOnly) {
            this.focus();
            this._openMenu();
        }
    }
    _onClearClick(event) {
        event.stopPropagation();
        const { key, onChange } = this.properties;
        this.focus();
        this.invalidate();
        onChange && onChange('', key);
    }
    _onInput(value) {
        const { key, disabled, readOnly, onChange } = this.properties;
        onChange && onChange(value, key);
        !disabled && !readOnly && this._openMenu();
    }
    _onInputBlur(value) {
        const { key, onBlur } = this.properties;
        if (this._ignoreBlur) {
            this._ignoreBlur = false;
            return;
        }
        onBlur && onBlur(value, key);
        this._closeMenu();
    }
    _onInputFocus(value) {
        const { key, disabled, readOnly, onFocus, openOnFocus } = this.properties;
        onFocus && onFocus(value, key);
        !disabled && !readOnly && openOnFocus && this._openMenu();
    }
    _onInputKeyDown(key, preventDefault) {
        const { disabled, isResultDisabled = () => false, readOnly, results = [] } = this.properties;
        this._menuHasVisualFocus = true;
        switch (key) {
            case Keys.Up:
                preventDefault();
                this._moveActiveIndex(Operation.decrease);
                break;
            case Keys.Down:
                preventDefault();
                if (!this._open && !disabled && !readOnly) {
                    this._openMenu();
                }
                else if (this._open) {
                    this._moveActiveIndex(Operation.increase);
                }
                break;
            case Keys.Escape:
                this._open && this._closeMenu();
                break;
            case Keys.Enter:
            case Keys.Space:
                if (this._open && results.length > 0) {
                    if (isResultDisabled(results[this._activeIndex])) {
                        return;
                    }
                    this._selectIndex(this._activeIndex);
                }
                break;
            case Keys.Home:
                this._activeIndex = 0;
                this.invalidate();
                break;
            case Keys.End:
                this._activeIndex = results.length - 1;
                this.invalidate();
                break;
        }
    }
    _onMenuChange() {
        const { key, onMenuChange } = this.properties;
        if (!onMenuChange) {
            return;
        }
        this._open && !this._wasOpen && onMenuChange(true, key);
        !this._open && this._wasOpen && onMenuChange(false, key);
    }
    _onResultHover() {
        this._menuHasVisualFocus = false;
        this.invalidate();
    }
    _onResultMouseDown(event) {
        event.stopPropagation();
        // Maintain underlying input focus on next render
        this._ignoreBlur = true;
    }
    _openMenu() {
        const { key, onRequestResults } = this.properties;
        this._activeIndex = 0;
        this._open = true;
        onRequestResults && onRequestResults(key);
        this.invalidate();
    }
    _selectIndex(index) {
        const { key, onChange, onResultSelect, results = [] } = this.properties;
        this.focus();
        this._closeMenu();
        onResultSelect && onResultSelect(results[index], key);
        onChange && onChange(this._getResultValue(results[index]), key);
    }
    _moveActiveIndex(operation) {
        const { results = [] } = this.properties;
        if (results.length === 0) {
            this._activeIndex = 0;
            this.invalidate();
            return;
        }
        const total = results.length;
        const nextIndex = (this._activeIndex + operation + total) % total;
        this._activeIndex = nextIndex;
        this.invalidate();
    }
    getRootClasses() {
        const { clearable, invalid } = this.properties;
        const focus = this.meta(Focus).get('root');
        return [
            css.root,
            this._open ? css.open : null,
            clearable ? css.clearable : null,
            focus.containsFocus ? css.focused : null,
            invalid === true ? css.invalid : null,
            invalid === false ? css.valid : null
        ];
    }
    renderInput(results) {
        const { classes, disabled, widgetId = this._idBase, inputProperties = {}, invalid, readOnly, required, value = '', theme } = this.properties;
        return w(TextInput, Object.assign({}, inputProperties, { key: 'textinput', classes, aria: {
                activedescendant: this._open
                    ? this._getResultId(results[this._activeIndex], this._activeIndex)
                    : null,
                autocomplete: 'list'
            }, valid: typeof invalid === 'boolean' ? !invalid : undefined, disabled,
            widgetId, focus: this.shouldFocus, onBlur: this._onInputBlur, onFocus: this._onInputFocus, onInput: this._onInput, onKeyDown: this._onInputKeyDown, readOnly,
            required,
            theme,
            value }));
    }
    renderClearButton(messages) {
        const { disabled, label = '', readOnly, theme, classes } = this.properties;
        return v('button', {
            key: 'clear',
            'aria-hidden': 'true',
            classes: this.theme(css.clear),
            disabled: disabled || readOnly,
            tabIndex: -1,
            type: 'button',
            onclick: this._onClearClick
        }, [
            v('span', { classes: baseCss.visuallyHidden }, [`${messages.clear} ${label}`]),
            w(Icon, { type: 'closeIcon', theme, classes })
        ]);
    }
    renderMenuButton(messages) {
        const { disabled, label = '', readOnly, theme, classes } = this.properties;
        return v('button', {
            key: 'trigger',
            'aria-hidden': 'true',
            classes: this.theme(css.trigger),
            disabled: disabled || readOnly,
            tabIndex: -1,
            type: 'button',
            onclick: this._onArrowClick
        }, [
            v('span', { classes: baseCss.visuallyHidden }, [`${messages.open} ${label}`]),
            w(Icon, { type: 'downIcon', theme, classes })
        ]);
    }
    renderMenu(results) {
        const { theme, isResultDisabled, classes } = this.properties;
        if (results.length === 0 || !this._open) {
            return null;
        }
        return v('div', {
            key: 'dropdown',
            classes: this.theme(css.dropdown),
            onmouseover: this._onResultHover,
            onmousedown: this._onResultMouseDown
        }, [
            w(Listbox, {
                key: 'listbox',
                classes,
                activeIndex: this._activeIndex,
                widgetId: this._getMenuId(),
                visualFocus: this._menuHasVisualFocus,
                optionData: results,
                tabIndex: -1,
                getOptionDisabled: isResultDisabled,
                getOptionId: this._getResultId,
                getOptionLabel: this._getResultLabel,
                getOptionSelected: this._getResultSelected,
                onActiveIndexChange: (index) => {
                    this._activeIndex = index;
                    this.invalidate();
                },
                onOptionSelect: (option, index) => {
                    this._selectIndex(index);
                },
                theme
            })
        ]);
    }
    render() {
        const { clearable = false, widgetId = this._idBase, invalid, label, readOnly, required, disabled, labelHidden, labelAfter, results = [], theme, classes } = this.properties;
        const { messages } = this.localizeBundle(commonBundle);
        const focus = this.meta(Focus).get('root');
        const menu = this.renderMenu(results);
        this._onMenuChange();
        this._wasOpen = this._open;
        const controls = [
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
                    forId: widgetId
                }, [label])
                : null,
            v('div', {
                'aria-expanded': this._open ? 'true' : 'false',
                'aria-haspopup': 'listbox',
                'aria-owns': this._open ? this._getMenuId() : null,
                classes: this.theme(css.controls),
                role: 'combobox'
            }, [
                this.renderInput(results),
                clearable ? this.renderClearButton(messages) : null,
                this.renderMenuButton(messages)
            ]),
            menu
        ];
        return v('div', {
            classes: this.theme(this.getRootClasses()),
            key: 'root'
        }, labelAfter ? controls.reverse() : controls);
    }
};
ComboBox = tslib_1.__decorate([
    theme(css),
    diffProperty('results', reference),
    customElement({
        tag: 'dojo-combo-box',
        properties: [
            'theme',
            'classes',
            'extraClasses',
            'labelAfter',
            'labelHidden',
            'clearable',
            'disabled',
            'inputProperties',
            'invalid',
            'isResultDisabled',
            'labelAfter',
            'labelHidden',
            'openOnFocus',
            'readOnly',
            'required',
            'results'
        ],
        attributes: ['widgetId', 'label', 'value'],
        events: ['onBlur', 'onChange', 'onFocus', 'onMenuChange', 'onRequestResults', 'onResultSelect']
    })
], ComboBox);
export { ComboBox };
export default ComboBox;

/*# sourceMappingURL=index.mjs.map*/