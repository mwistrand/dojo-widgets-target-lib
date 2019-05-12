"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
var util_1 = require("../common/util");
var diff_1 = require("@dojo/framework/widget-core/diff");
var I18n_1 = require("@dojo/framework/widget-core/mixins/I18n");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
var Focus_2 = require("@dojo/framework/widget-core/mixins/Focus");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var util_2 = require("@dojo/framework/core/util");
var d_1 = require("@dojo/framework/widget-core/d");
var index_1 = require("../icon/index");
var index_2 = require("../label/index");
var index_3 = require("../listbox/index");
var index_4 = require("../text-input/index");
var common_1 = require("../common/nls/common");
var css = require("../theme/combobox.m.css");
var baseCss = require("../common/styles/base.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
// Enum used when traversing items using arrow keys
var Operation;
(function (Operation) {
    Operation[Operation["increase"] = 1] = "increase";
    Operation[Operation["decrease"] = -1] = "decrease";
})(Operation = exports.Operation || (exports.Operation = {}));
var ComboBox = /** @class */ (function (_super) {
    tslib_1.__extends(ComboBox, _super);
    function ComboBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._activeIndex = 0;
        _this._idBase = util_2.uuid();
        _this._menuHasVisualFocus = false;
        return _this;
    }
    ComboBox.prototype._closeMenu = function () {
        this._open = false;
        this.invalidate();
    };
    ComboBox.prototype._getMenuId = function () {
        return this._idBase + "-menu";
    };
    ComboBox.prototype._getResultLabel = function (result) {
        var getResultLabel = this.properties.getResultLabel;
        return getResultLabel ? getResultLabel(result) : "" + result;
    };
    ComboBox.prototype._getResultSelected = function (result) {
        var _a = this.properties, getResultSelected = _a.getResultSelected, value = _a.value;
        return getResultSelected
            ? getResultSelected(result)
            : this._getResultLabel(result) === value;
    };
    ComboBox.prototype._getResultValue = function (result) {
        var _a = this.properties.getResultValue, getResultValue = _a === void 0 ? this.properties.getResultLabel : _a;
        return getResultValue ? "" + getResultValue(result) : "" + result;
    };
    ComboBox.prototype._getResultId = function (result, index) {
        return this._idBase + "-result" + index;
    };
    ComboBox.prototype._onArrowClick = function (event) {
        event.stopPropagation();
        var _a = this.properties, disabled = _a.disabled, readOnly = _a.readOnly;
        if (!disabled && !readOnly) {
            this.focus();
            this._openMenu();
        }
    };
    ComboBox.prototype._onClearClick = function (event) {
        event.stopPropagation();
        var _a = this.properties, key = _a.key, onChange = _a.onChange;
        this.focus();
        this.invalidate();
        onChange && onChange('', key);
    };
    ComboBox.prototype._onInput = function (value) {
        var _a = this.properties, key = _a.key, disabled = _a.disabled, readOnly = _a.readOnly, onChange = _a.onChange;
        onChange && onChange(value, key);
        !disabled && !readOnly && this._openMenu();
    };
    ComboBox.prototype._onInputBlur = function (value) {
        var _a = this.properties, key = _a.key, onBlur = _a.onBlur;
        if (this._ignoreBlur) {
            this._ignoreBlur = false;
            return;
        }
        onBlur && onBlur(value, key);
        this._closeMenu();
    };
    ComboBox.prototype._onInputFocus = function (value) {
        var _a = this.properties, key = _a.key, disabled = _a.disabled, readOnly = _a.readOnly, onFocus = _a.onFocus, openOnFocus = _a.openOnFocus;
        onFocus && onFocus(value, key);
        !disabled && !readOnly && openOnFocus && this._openMenu();
    };
    ComboBox.prototype._onInputKeyDown = function (key, preventDefault) {
        var _a = this.properties, disabled = _a.disabled, _b = _a.isResultDisabled, isResultDisabled = _b === void 0 ? function () { return false; } : _b, readOnly = _a.readOnly, _c = _a.results, results = _c === void 0 ? [] : _c;
        this._menuHasVisualFocus = true;
        switch (key) {
            case util_1.Keys.Up:
                preventDefault();
                this._moveActiveIndex(Operation.decrease);
                break;
            case util_1.Keys.Down:
                preventDefault();
                if (!this._open && !disabled && !readOnly) {
                    this._openMenu();
                }
                else if (this._open) {
                    this._moveActiveIndex(Operation.increase);
                }
                break;
            case util_1.Keys.Escape:
                this._open && this._closeMenu();
                break;
            case util_1.Keys.Enter:
            case util_1.Keys.Space:
                if (this._open && results.length > 0) {
                    if (isResultDisabled(results[this._activeIndex])) {
                        return;
                    }
                    this._selectIndex(this._activeIndex);
                }
                break;
            case util_1.Keys.Home:
                this._activeIndex = 0;
                this.invalidate();
                break;
            case util_1.Keys.End:
                this._activeIndex = results.length - 1;
                this.invalidate();
                break;
        }
    };
    ComboBox.prototype._onMenuChange = function () {
        var _a = this.properties, key = _a.key, onMenuChange = _a.onMenuChange;
        if (!onMenuChange) {
            return;
        }
        this._open && !this._wasOpen && onMenuChange(true, key);
        !this._open && this._wasOpen && onMenuChange(false, key);
    };
    ComboBox.prototype._onResultHover = function () {
        this._menuHasVisualFocus = false;
        this.invalidate();
    };
    ComboBox.prototype._onResultMouseDown = function (event) {
        event.stopPropagation();
        // Maintain underlying input focus on next render
        this._ignoreBlur = true;
    };
    ComboBox.prototype._openMenu = function () {
        var _a = this.properties, key = _a.key, onRequestResults = _a.onRequestResults;
        this._activeIndex = 0;
        this._open = true;
        onRequestResults && onRequestResults(key);
        this.invalidate();
    };
    ComboBox.prototype._selectIndex = function (index) {
        var _a = this.properties, key = _a.key, onChange = _a.onChange, onResultSelect = _a.onResultSelect, _b = _a.results, results = _b === void 0 ? [] : _b;
        this.focus();
        this._closeMenu();
        onResultSelect && onResultSelect(results[index], key);
        onChange && onChange(this._getResultValue(results[index]), key);
    };
    ComboBox.prototype._moveActiveIndex = function (operation) {
        var _a = this.properties.results, results = _a === void 0 ? [] : _a;
        if (results.length === 0) {
            this._activeIndex = 0;
            this.invalidate();
            return;
        }
        var total = results.length;
        var nextIndex = (this._activeIndex + operation + total) % total;
        this._activeIndex = nextIndex;
        this.invalidate();
    };
    ComboBox.prototype.getRootClasses = function () {
        var _a = this.properties, clearable = _a.clearable, invalid = _a.invalid;
        var focus = this.meta(Focus_1.default).get('root');
        return [
            css.root,
            this._open ? css.open : null,
            clearable ? css.clearable : null,
            focus.containsFocus ? css.focused : null,
            invalid === true ? css.invalid : null,
            invalid === false ? css.valid : null
        ];
    };
    ComboBox.prototype.renderInput = function (results) {
        var _a = this.properties, classes = _a.classes, disabled = _a.disabled, _b = _a.widgetId, widgetId = _b === void 0 ? this._idBase : _b, _c = _a.inputProperties, inputProperties = _c === void 0 ? {} : _c, invalid = _a.invalid, readOnly = _a.readOnly, required = _a.required, _d = _a.value, value = _d === void 0 ? '' : _d, theme = _a.theme;
        return d_1.w(index_4.default, tslib_1.__assign({}, inputProperties, { key: 'textinput', classes: classes, aria: {
                activedescendant: this._open
                    ? this._getResultId(results[this._activeIndex], this._activeIndex)
                    : null,
                autocomplete: 'list'
            }, valid: typeof invalid === 'boolean' ? !invalid : undefined, disabled: disabled,
            widgetId: widgetId, focus: this.shouldFocus, onBlur: this._onInputBlur, onFocus: this._onInputFocus, onInput: this._onInput, onKeyDown: this._onInputKeyDown, readOnly: readOnly,
            required: required,
            theme: theme,
            value: value }));
    };
    ComboBox.prototype.renderClearButton = function (messages) {
        var _a = this.properties, disabled = _a.disabled, _b = _a.label, label = _b === void 0 ? '' : _b, readOnly = _a.readOnly, theme = _a.theme, classes = _a.classes;
        return d_1.v('button', {
            key: 'clear',
            'aria-hidden': 'true',
            classes: this.theme(css.clear),
            disabled: disabled || readOnly,
            tabIndex: -1,
            type: 'button',
            onclick: this._onClearClick
        }, [
            d_1.v('span', { classes: baseCss.visuallyHidden }, [messages.clear + " " + label]),
            d_1.w(index_1.default, { type: 'closeIcon', theme: theme, classes: classes })
        ]);
    };
    ComboBox.prototype.renderMenuButton = function (messages) {
        var _a = this.properties, disabled = _a.disabled, _b = _a.label, label = _b === void 0 ? '' : _b, readOnly = _a.readOnly, theme = _a.theme, classes = _a.classes;
        return d_1.v('button', {
            key: 'trigger',
            'aria-hidden': 'true',
            classes: this.theme(css.trigger),
            disabled: disabled || readOnly,
            tabIndex: -1,
            type: 'button',
            onclick: this._onArrowClick
        }, [
            d_1.v('span', { classes: baseCss.visuallyHidden }, [messages.open + " " + label]),
            d_1.w(index_1.default, { type: 'downIcon', theme: theme, classes: classes })
        ]);
    };
    ComboBox.prototype.renderMenu = function (results) {
        var _this = this;
        var _a = this.properties, theme = _a.theme, isResultDisabled = _a.isResultDisabled, classes = _a.classes;
        if (results.length === 0 || !this._open) {
            return null;
        }
        return d_1.v('div', {
            key: 'dropdown',
            classes: this.theme(css.dropdown),
            onmouseover: this._onResultHover,
            onmousedown: this._onResultMouseDown
        }, [
            d_1.w(index_3.default, {
                key: 'listbox',
                classes: classes,
                activeIndex: this._activeIndex,
                widgetId: this._getMenuId(),
                visualFocus: this._menuHasVisualFocus,
                optionData: results,
                tabIndex: -1,
                getOptionDisabled: isResultDisabled,
                getOptionId: this._getResultId,
                getOptionLabel: this._getResultLabel,
                getOptionSelected: this._getResultSelected,
                onActiveIndexChange: function (index) {
                    _this._activeIndex = index;
                    _this.invalidate();
                },
                onOptionSelect: function (option, index) {
                    _this._selectIndex(index);
                },
                theme: theme
            })
        ]);
    };
    ComboBox.prototype.render = function () {
        var _a = this.properties, _b = _a.clearable, clearable = _b === void 0 ? false : _b, _c = _a.widgetId, widgetId = _c === void 0 ? this._idBase : _c, invalid = _a.invalid, label = _a.label, readOnly = _a.readOnly, required = _a.required, disabled = _a.disabled, labelHidden = _a.labelHidden, labelAfter = _a.labelAfter, _d = _a.results, results = _d === void 0 ? [] : _d, theme = _a.theme, classes = _a.classes;
        var messages = this.localizeBundle(common_1.default).messages;
        var focus = this.meta(Focus_1.default).get('root');
        var menu = this.renderMenu(results);
        this._onMenuChange();
        this._wasOpen = this._open;
        var controls = [
            label
                ? d_1.w(index_2.default, {
                    key: 'label',
                    theme: theme,
                    classes: classes,
                    disabled: disabled,
                    focused: focus.containsFocus,
                    invalid: invalid,
                    readOnly: readOnly,
                    required: required,
                    hidden: labelHidden,
                    forId: widgetId
                }, [label])
                : null,
            d_1.v('div', {
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
        return d_1.v('div', {
            classes: this.theme(this.getRootClasses()),
            key: 'root'
        }, labelAfter ? controls.reverse() : controls);
    };
    ComboBox = tslib_1.__decorate([
        Themed_1.theme(css),
        diffProperty_1.diffProperty('results', diff_1.reference),
        customElement_1.customElement({
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
    return ComboBox;
}(I18n_1.I18nMixin(Themed_1.ThemedMixin(Focus_2.FocusMixin(WidgetBase_1.WidgetBase)))));
exports.ComboBox = ComboBox;
exports.default = ComboBox;

/*# sourceMappingURL=index.js.map*/