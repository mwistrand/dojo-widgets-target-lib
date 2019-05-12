"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
var diff_1 = require("@dojo/framework/widget-core/diff");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Focus_1 = require("@dojo/framework/widget-core/mixins/Focus");
var Focus_2 = require("@dojo/framework/widget-core/meta/Focus");
var d_1 = require("@dojo/framework/widget-core/d");
var util_1 = require("@dojo/framework/core/util");
var array_1 = require("@dojo/framework/shim/array");
var util_2 = require("../common/util");
var index_1 = require("../icon/index");
var index_2 = require("../label/index");
var index_3 = require("../listbox/index");
var index_4 = require("../helper-text/index");
var css = require("../theme/select.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var Select = /** @class */ (function (_super) {
    tslib_1.__extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._focusNode = 'trigger';
        _this._ignoreBlur = false;
        _this._open = false;
        _this._baseId = util_1.uuid();
        _this._inputText = '';
        _this._getOptionSelected = function (option, index) {
            var _a = _this.properties, getOptionValue = _a.getOptionValue, value = _a.value;
            return getOptionValue ? getOptionValue(option, index) === value : option === value;
        };
        return _this;
    }
    Select.prototype._getOptionLabel = function (option) {
        var getOptionLabel = this.properties.getOptionLabel;
        var fallback = option ? "" + option : '';
        return getOptionLabel ? getOptionLabel(option) : fallback;
    };
    Select.prototype._getSelectedIndexOnInput = function (event) {
        var _this = this;
        var _a = this.properties, _b = _a.options, options = _b === void 0 ? [] : _b, getOptionDisabled = _a.getOptionDisabled, getOptionText = _a.getOptionText;
        if (event.key !== undefined && event.key.length === 1) {
            clearTimeout(this._resetInputTextTimer);
            this._resetInputTextTimer = setTimeout(function () {
                _this._inputText = '';
            }, 800);
            this._inputText += "" + event.key;
            var index_5;
            options.some(function (option, i) {
                if (getOptionDisabled && getOptionDisabled(option, i)) {
                    return false;
                }
                var optionText = getOptionText
                    ? getOptionText(option)
                    : _this._getOptionLabel(option);
                if (typeof optionText === 'string' &&
                    optionText.toLowerCase().indexOf(_this._inputText.toLowerCase()) === 0) {
                    index_5 = i;
                    return true;
                }
                return false;
            });
            return index_5;
        }
    };
    Select.prototype._onBlur = function (event) {
        this.properties.onBlur && this.properties.onBlur(this.properties.key || '');
    };
    Select.prototype._onFocus = function (event) {
        this.properties.onFocus && this.properties.onFocus(this.properties.key || '');
    };
    // native select events
    Select.prototype._onNativeChange = function (event) {
        var _a = this.properties, key = _a.key, getOptionValue = _a.getOptionValue, _b = _a.options, options = _b === void 0 ? [] : _b, onChange = _a.onChange;
        event.stopPropagation();
        var value = event.target.value;
        var option = array_1.find(options, function (option, index) {
            return getOptionValue ? getOptionValue(option, index) === value : option === value;
        });
        option && onChange && onChange(option, key);
    };
    // custom select events
    Select.prototype._openSelect = function () {
        this.focus();
        this._focusNode = 'listbox';
        this._ignoreBlur = true;
        this._open = true;
        this._focusedIndex = this._focusedIndex || 0;
        this.invalidate();
    };
    Select.prototype._closeSelect = function () {
        this._focusNode = 'trigger';
        this._ignoreBlur = true;
        this._open = false;
        this.invalidate();
    };
    Select.prototype._onDropdownKeyDown = function (event) {
        event.stopPropagation();
        if (event.which === util_2.Keys.Escape) {
            this._closeSelect();
            this.focus();
        }
    };
    Select.prototype._onTriggerClick = function (event) {
        event.stopPropagation();
        this._open ? this._closeSelect() : this._openSelect();
    };
    Select.prototype._onTriggerBlur = function (event) {
        if (this._ignoreBlur) {
            this._ignoreBlur = false;
            return;
        }
        var _a = this.properties, key = _a.key, onBlur = _a.onBlur;
        onBlur && onBlur(key);
        this._closeSelect();
    };
    Select.prototype._onTriggerKeyDown = function (event) {
        var _a = this.properties, key = _a.key, _b = _a.options, options = _b === void 0 ? [] : _b, onChange = _a.onChange;
        event.stopPropagation();
        var index = this._getSelectedIndexOnInput(event);
        if (index !== undefined) {
            this._focusedIndex = index;
            onChange && onChange(options[index], key);
            this.invalidate();
        }
        if (event.which === util_2.Keys.Down) {
            this._openSelect();
        }
    };
    Select.prototype._onTriggerMouseDown = function () {
        this._ignoreBlur = true;
    };
    Select.prototype._onListboxBlur = function (event) {
        if (this._ignoreBlur) {
            this._ignoreBlur = false;
            return;
        }
        var _a = this.properties, key = _a.key, onBlur = _a.onBlur;
        onBlur && onBlur(key);
        this._closeSelect();
    };
    Select.prototype.renderExpandIcon = function () {
        var _a = this.properties, theme = _a.theme, classes = _a.classes;
        return d_1.v('span', { classes: this.theme(css.arrow) }, [
            d_1.w(index_1.default, { type: 'downIcon', theme: theme, classes: classes })
        ]);
    };
    Select.prototype.renderNativeSelect = function () {
        var _this = this;
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, disabled = _a.disabled, getOptionDisabled = _a.getOptionDisabled, getOptionId = _a.getOptionId, getOptionSelected = _a.getOptionSelected, getOptionValue = _a.getOptionValue, _c = _a.widgetId, widgetId = _c === void 0 ? this._baseId : _c, invalid = _a.invalid, name = _a.name, _d = _a.options, options = _d === void 0 ? [] : _d, readOnly = _a.readOnly, required = _a.required, value = _a.value;
        /* create option nodes */
        var optionNodes = options.map(function (option, i) {
            return d_1.v('option', {
                value: getOptionValue ? getOptionValue(option, i) : undefined,
                id: getOptionId ? getOptionId(option, i) : undefined,
                disabled: getOptionDisabled ? getOptionDisabled(option, i) : undefined,
                selected: getOptionSelected ? getOptionSelected(option, i) : undefined
            }, [_this._getOptionLabel(option)]);
        });
        return d_1.v('div', { classes: this.theme(css.inputWrapper) }, [
            d_1.v('select', tslib_1.__assign({}, util_2.formatAriaProperties(aria), { classes: this.theme(css.input), disabled: disabled, focus: this.shouldFocus, 'aria-invalid': invalid ? 'true' : null, id: widgetId, name: name,
                readOnly: readOnly, 'aria-readonly': readOnly ? 'true' : null, required: required,
                value: value, onblur: this._onBlur, onchange: this._onNativeChange, onfocus: this._onFocus }), optionNodes),
            this.renderExpandIcon()
        ]);
    };
    Select.prototype.renderCustomSelect = function () {
        var _this = this;
        var _a = this.properties, getOptionDisabled = _a.getOptionDisabled, getOptionId = _a.getOptionId, getOptionLabel = _a.getOptionLabel, _b = _a.getOptionSelected, getOptionSelected = _b === void 0 ? this._getOptionSelected : _b, _c = _a.widgetId, widgetId = _c === void 0 ? this._baseId : _c, key = _a.key, _d = _a.options, options = _d === void 0 ? [] : _d, theme = _a.theme, classes = _a.classes, onChange = _a.onChange;
        if (this._focusedIndex === undefined) {
            options.map(getOptionSelected).forEach(function (isSelected, index) {
                if (isSelected) {
                    _this._focusedIndex = index;
                }
            });
        }
        var _e = this, _open = _e._open, _f = _e._focusedIndex, _focusedIndex = _f === void 0 ? 0 : _f;
        // create dropdown trigger and select box
        return d_1.v('div', {
            key: 'wrapper',
            classes: this.theme([css.inputWrapper, _open ? css.open : null])
        }, tslib_1.__spread(this.renderCustomTrigger(), [
            d_1.v('div', {
                classes: this.theme(css.dropdown),
                onfocusout: this._onListboxBlur,
                onkeydown: this._onDropdownKeyDown
            }, [
                d_1.w(index_3.default, {
                    key: 'listbox',
                    activeIndex: _focusedIndex,
                    widgetId: widgetId,
                    focus: this._focusNode === 'listbox' ? this.shouldFocus : function () { return false; },
                    optionData: options,
                    tabIndex: _open ? 0 : -1,
                    getOptionDisabled: getOptionDisabled,
                    getOptionId: getOptionId,
                    getOptionLabel: getOptionLabel,
                    getOptionSelected: getOptionSelected,
                    theme: theme,
                    classes: classes,
                    onActiveIndexChange: function (index) {
                        _this._focusedIndex = index;
                        _this.invalidate();
                    },
                    onOptionSelect: function (option) {
                        onChange && onChange(option, key);
                        _this._closeSelect();
                        _this.focus();
                    },
                    onKeyDown: function (event) {
                        var index = _this._getSelectedIndexOnInput(event);
                        if (index !== undefined) {
                            _this._focusedIndex = index;
                            _this.invalidate();
                        }
                    }
                })
            ])
        ]));
    };
    Select.prototype.renderCustomTrigger = function () {
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, disabled = _a.disabled, _c = _a.getOptionSelected, getOptionSelected = _c === void 0 ? this._getOptionSelected : _c, invalid = _a.invalid, _d = _a.options, options = _d === void 0 ? [] : _d, placeholder = _a.placeholder, readOnly = _a.readOnly, required = _a.required, value = _a.value;
        var label;
        var isPlaceholder = false;
        var selectedOption = array_1.find(options, function (option, index) {
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
            d_1.v('button', tslib_1.__assign({}, util_2.formatAriaProperties(aria), { 'aria-controls': this._baseId, 'aria-expanded': "" + this._open, 'aria-haspopup': 'listbox', 'aria-invalid': invalid ? 'true' : null, 'aria-required': required ? 'true' : null, classes: this.theme([css.trigger, isPlaceholder ? css.placeholder : null]), disabled: disabled || readOnly, focus: this._focusNode === 'trigger' ? this.shouldFocus : function () { return false; }, key: 'trigger', type: 'button', value: value, onblur: this._onTriggerBlur, onclick: this._onTriggerClick, onfocus: this._onFocus, onkeydown: this._onTriggerKeyDown, onmousedown: this._onTriggerMouseDown }), [label]),
            this.renderExpandIcon()
        ];
    };
    Select.prototype.render = function () {
        var _a = this.properties, label = _a.label, labelHidden = _a.labelHidden, disabled = _a.disabled, helperText = _a.helperText, _b = _a.widgetId, widgetId = _b === void 0 ? this._baseId : _b, invalid = _a.invalid, readOnly = _a.readOnly, required = _a.required, _c = _a.useNativeElement, useNativeElement = _c === void 0 ? false : _c, theme = _a.theme, classes = _a.classes;
        var focus = this.meta(Focus_2.default).get('root');
        return d_1.v('div', {
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
                ? d_1.w(index_2.default, {
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
            useNativeElement ? this.renderNativeSelect() : this.renderCustomSelect(),
            d_1.w(index_4.default, { theme: theme, text: helperText })
        ]);
    };
    Select = tslib_1.__decorate([
        Themed_1.theme(css),
        diffProperty_1.diffProperty('options', diff_1.reference),
        customElement_1.customElement({
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
    return Select;
}(Themed_1.ThemedMixin(Focus_1.FocusMixin(WidgetBase_1.WidgetBase))));
exports.Select = Select;
exports.default = Select;

/*# sourceMappingURL=index.js.map*/