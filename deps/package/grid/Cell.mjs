import * as tslib_1 from "tslib";
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { FocusMixin } from '@dojo/framework/widget-core/mixins/Focus';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';
import { uuid } from '@dojo/framework/core/util';
import { Keys } from '../common/util';
import TextInput from '../text-input/index';
import Button from '../button/index';
import Icon from '../icon/index';
import * as fixedCss from './styles/cell.m.css';
import * as css from '../theme/grid-cell.m.css';
let Cell = class Cell extends ThemedMixin(FocusMixin(WidgetBase)) {
    constructor() {
        super(...arguments);
        this._editing = false;
        this._editingValue = '';
        this._idBase = uuid();
        this._onEdit = () => {
            const { editable } = this.properties;
            if (editable) {
                this._editing = true;
                this._callFocus('input');
                this._editingValue = this.properties.rawValue;
                this.invalidate();
            }
        };
    }
    _callFocus(key) {
        this._focusKey = key;
        this.focus();
    }
    _onBlur() {
        if (this._editing) {
            this._onSave();
        }
    }
    _onInput(value) {
        this._editingValue = value;
    }
    _onKeyDown(key) {
        if (key === Keys.Enter) {
            this._onSave();
            this._callFocus('button');
        }
        else if (key === Keys.Escape) {
            this._editing = false;
            this._callFocus('button');
            this.invalidate();
        }
    }
    _onSave() {
        this._editing = false;
        this.properties.updater(this._editingValue);
        this.invalidate();
    }
    renderContent() {
        const { value } = this.properties;
        return v('div', {
            key: 'content',
            id: this._idBase,
            ondblclick: this._onEdit
        }, [value]);
    }
    render() {
        let { editable, rawValue, theme, classes } = this.properties;
        return v('div', { role: 'cell', classes: [this.theme(css.root), fixedCss.rootFixed] }, [
            this._editing
                ? w(TextInput, {
                    key: 'input',
                    theme,
                    classes,
                    label: `Edit ${rawValue}`,
                    labelHidden: true,
                    extraClasses: { input: this.theme(css.input) },
                    focus: this._focusKey === 'input' ? this.shouldFocus : () => false,
                    value: this._editingValue,
                    onInput: this._onInput,
                    onBlur: this._onBlur,
                    onKeyDown: this._onKeyDown
                })
                : this.renderContent(),
            editable && !this._editing
                ? w(Button, {
                    key: 'button',
                    theme,
                    classes,
                    aria: { describedby: this._idBase },
                    focus: this._focusKey === 'button' ? this.shouldFocus : () => false,
                    type: 'button',
                    extraClasses: { root: this.theme(css.edit) },
                    onClick: this._onEdit
                }, [w(Icon, { type: 'editIcon', altText: 'Edit', classes, theme })])
                : null
        ]);
    }
};
Cell = tslib_1.__decorate([
    theme(css)
], Cell);
export default Cell;

/*# sourceMappingURL=Cell.mjs.map*/