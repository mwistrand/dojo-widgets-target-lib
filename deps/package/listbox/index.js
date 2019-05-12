"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var diff_1 = require("@dojo/framework/widget-core/diff");
var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
var Dimensions_1 = require("@dojo/framework/widget-core/meta/Dimensions");
var util_1 = require("../common/util");
var Base_1 = require("@dojo/framework/widget-core/meta/Base");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Focus_1 = require("@dojo/framework/widget-core/mixins/Focus");
var util_2 = require("@dojo/framework/core/util");
var d_1 = require("@dojo/framework/widget-core/d");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var css = require("../theme/listbox.m.css");
var ListboxOption_1 = require("./ListboxOption");
var Focus_2 = require("@dojo/framework/widget-core/meta/Focus");
var Resize_1 = require("@dojo/framework/widget-core/meta/Resize");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
/* Default scroll meta */
var ScrollMeta = /** @class */ (function (_super) {
    tslib_1.__extends(ScrollMeta, _super);
    function ScrollMeta() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScrollMeta.prototype.scroll = function (key, amount) {
        var node = this.getNode(key);
        if (node) {
            node.scrollTop = amount;
        }
    };
    return ScrollMeta;
}(Base_1.default));
exports.ScrollMeta = ScrollMeta;
var Listbox = /** @class */ (function (_super) {
    tslib_1.__extends(Listbox, _super);
    function Listbox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._boundRenderOption = _this.renderOption.bind(_this);
        _this._idBase = util_2.uuid();
        return _this;
    }
    Listbox.prototype._getOptionDisabled = function (option, index) {
        var getOptionDisabled = this.properties.getOptionDisabled;
        return getOptionDisabled ? getOptionDisabled(option, index) : false;
    };
    Listbox.prototype._getOptionId = function (index) {
        var _a = this.properties, _b = _a.optionData, optionData = _b === void 0 ? [] : _b, getOptionId = _a.getOptionId;
        return getOptionId ? getOptionId(optionData[index], index) : this._idBase + "-" + index;
    };
    Listbox.prototype._onKeyDown = function (event) {
        event.stopPropagation();
        var _a = this.properties, _b = _a.activeIndex, activeIndex = _b === void 0 ? 0 : _b, key = _a.key, _c = _a.optionData, optionData = _c === void 0 ? [] : _c, onActiveIndexChange = _a.onActiveIndexChange, onOptionSelect = _a.onOptionSelect, onKeyDown = _a.onKeyDown;
        onKeyDown && onKeyDown(event, key);
        var activeItem = optionData[activeIndex];
        var newIndex;
        switch (event.which) {
            case util_1.Keys.Enter:
            case util_1.Keys.Space:
                event.preventDefault();
                if (!this._getOptionDisabled(activeItem, activeIndex)) {
                    onOptionSelect && onOptionSelect(activeItem, activeIndex, key);
                }
                break;
            case util_1.Keys.Down:
                event.preventDefault();
                newIndex = (activeIndex + 1) % optionData.length;
                onActiveIndexChange && onActiveIndexChange(newIndex, key);
                break;
            case util_1.Keys.Up:
                event.preventDefault();
                newIndex = (activeIndex - 1 + optionData.length) % optionData.length;
                onActiveIndexChange && onActiveIndexChange(newIndex, key);
                break;
            case util_1.Keys.Home:
            case util_1.Keys.PageUp:
                onActiveIndexChange && onActiveIndexChange(0, key);
                break;
            case util_1.Keys.End:
            case util_1.Keys.PageDown:
                onActiveIndexChange && onActiveIndexChange(optionData.length - 1, key);
                break;
        }
    };
    Listbox.prototype._onOptionClick = function (option, index, key) {
        var _a = this.properties, onActiveIndexChange = _a.onActiveIndexChange, onOptionSelect = _a.onOptionSelect;
        if (!this._getOptionDisabled(option, index)) {
            onActiveIndexChange && onActiveIndexChange(index, key);
            onOptionSelect && onOptionSelect(option, index, key);
        }
    };
    Listbox.prototype.animateScroll = function (scrollValue) {
        this.meta(ScrollMeta).scroll('root', scrollValue);
    };
    Listbox.prototype._calculateScroll = function () {
        var _a = this.properties.activeIndex, activeIndex = _a === void 0 ? 0 : _a;
        var menuDimensions = this.meta(Dimensions_1.default).get('root');
        var scrollOffset = menuDimensions.scroll.top;
        var menuHeight = menuDimensions.offset.height;
        var optionOffset = this.meta(Dimensions_1.default).get(this._getOptionId(activeIndex)).offset;
        if (optionOffset.top - scrollOffset < 0) {
            this.animateScroll(optionOffset.top);
        }
        else if (optionOffset.top + optionOffset.height > scrollOffset + menuHeight) {
            this.animateScroll(optionOffset.top + optionOffset.height - menuHeight);
        }
    };
    Listbox.prototype.getModifierClasses = function () {
        var visualFocus = this.properties.visualFocus;
        var focus = this.meta(Focus_2.Focus).get('root');
        return [visualFocus || focus.containsFocus ? css.focused : null];
    };
    Listbox.prototype.getOptionClasses = function (active, disabled, selected) {
        return [
            css.option,
            active ? css.activeOption : null,
            disabled ? css.disabledOption : null,
            selected ? css.selectedOption : null
        ];
    };
    Listbox.prototype.renderOptionLabel = function (option, index) {
        var getOptionLabel = this.properties.getOptionLabel;
        return getOptionLabel ? getOptionLabel(option, index) : "" + option;
    };
    Listbox.prototype.renderOption = function (option, index) {
        var _a = this.properties, _b = _a.activeIndex, activeIndex = _b === void 0 ? 0 : _b, getOptionSelected = _a.getOptionSelected, theme = _a.theme, classes = _a.classes;
        var disabled = this._getOptionDisabled(option, index);
        var selected = getOptionSelected ? getOptionSelected(option, index) : false;
        return d_1.v('div', { key: this._getOptionId(index), role: 'presentation' }, [
            d_1.w(ListboxOption_1.default, {
                active: activeIndex === index,
                css: this.getOptionClasses(activeIndex === index, disabled, selected),
                classes: classes,
                disabled: disabled,
                label: this.renderOptionLabel(option, index),
                id: this._getOptionId(index),
                index: index,
                key: "option-" + index,
                option: option,
                selected: selected,
                theme: theme,
                onClick: this._onOptionClick
            })
        ]);
    };
    Listbox.prototype.renderOptions = function () {
        var _a = this.properties.optionData, optionData = _a === void 0 ? [] : _a;
        return optionData.map(this._boundRenderOption);
    };
    Listbox.prototype.render = function () {
        var _a = this.properties, _b = _a.activeIndex, activeIndex = _b === void 0 ? 0 : _b, _c = _a.aria, aria = _c === void 0 ? {} : _c, widgetId = _a.widgetId, _d = _a.multiselect, multiselect = _d === void 0 ? false : _d, _e = _a.tabIndex, tabIndex = _e === void 0 ? 0 : _e;
        var themeClasses = this.getModifierClasses();
        this.meta(Resize_1.default).get('root');
        this._calculateScroll();
        return d_1.v('div', tslib_1.__assign({}, util_1.formatAriaProperties(aria), { 'aria-activedescendant': this._getOptionId(activeIndex), 'aria-multiselectable': multiselect ? 'true' : null, classes: this.theme(tslib_1.__spread([css.root], themeClasses)), id: widgetId, focus: this.shouldFocus, key: 'root', role: 'listbox', tabIndex: tabIndex, onkeydown: this._onKeyDown }), this.renderOptions());
    };
    Listbox = tslib_1.__decorate([
        Themed_1.theme(css),
        diffProperty_1.diffProperty('optionData', diff_1.reference),
        customElement_1.customElement({
            tag: 'dojo-listbox',
            properties: [
                'theme',
                'classes',
                'activeIndex',
                'multiselect',
                'tabIndex',
                'visualFocus',
                'optionData',
                'getOptionDisabled',
                'getOptionId',
                'getOptionLabel',
                'getOptionSelected'
            ],
            attributes: ['widgetId'],
            events: ['onActiveIndexChange', 'onKeyDown', 'onOptionSelect']
        })
    ], Listbox);
    return Listbox;
}(Themed_1.ThemedMixin(Focus_1.FocusMixin(WidgetBase_1.WidgetBase))));
exports.Listbox = Listbox;
exports.default = Listbox;

/*# sourceMappingURL=index.js.map*/