import * as tslib_1 from "tslib";
import { reference } from '@dojo/framework/widget-core/diff';
import { diffProperty } from '@dojo/framework/widget-core/decorators/diffProperty';
import Dimensions from '@dojo/framework/widget-core/meta/Dimensions';
import { formatAriaProperties, Keys } from '../common/util';
import MetaBase from '@dojo/framework/widget-core/meta/Base';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin } from '@dojo/framework/widget-core/mixins/Focus';
import { uuid } from '@dojo/framework/core/util';
import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import * as css from '../theme/listbox.m.css';
import ListboxOption from './ListboxOption';
import { Focus } from '@dojo/framework/widget-core/meta/Focus';
import Resize from '@dojo/framework/widget-core/meta/Resize';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
/* Default scroll meta */
export class ScrollMeta extends MetaBase {
    scroll(key, amount) {
        const node = this.getNode(key);
        if (node) {
            node.scrollTop = amount;
        }
    }
}
let Listbox = class Listbox extends ThemedMixin(FocusMixin(WidgetBase)) {
    constructor() {
        super(...arguments);
        this._boundRenderOption = this.renderOption.bind(this);
        this._idBase = uuid();
    }
    _getOptionDisabled(option, index) {
        const { getOptionDisabled } = this.properties;
        return getOptionDisabled ? getOptionDisabled(option, index) : false;
    }
    _getOptionId(index) {
        const { optionData = [], getOptionId } = this.properties;
        return getOptionId ? getOptionId(optionData[index], index) : `${this._idBase}-${index}`;
    }
    _onKeyDown(event) {
        event.stopPropagation();
        const { activeIndex = 0, key, optionData = [], onActiveIndexChange, onOptionSelect, onKeyDown } = this.properties;
        onKeyDown && onKeyDown(event, key);
        const activeItem = optionData[activeIndex];
        let newIndex;
        switch (event.which) {
            case Keys.Enter:
            case Keys.Space:
                event.preventDefault();
                if (!this._getOptionDisabled(activeItem, activeIndex)) {
                    onOptionSelect && onOptionSelect(activeItem, activeIndex, key);
                }
                break;
            case Keys.Down:
                event.preventDefault();
                newIndex = (activeIndex + 1) % optionData.length;
                onActiveIndexChange && onActiveIndexChange(newIndex, key);
                break;
            case Keys.Up:
                event.preventDefault();
                newIndex = (activeIndex - 1 + optionData.length) % optionData.length;
                onActiveIndexChange && onActiveIndexChange(newIndex, key);
                break;
            case Keys.Home:
            case Keys.PageUp:
                onActiveIndexChange && onActiveIndexChange(0, key);
                break;
            case Keys.End:
            case Keys.PageDown:
                onActiveIndexChange && onActiveIndexChange(optionData.length - 1, key);
                break;
        }
    }
    _onOptionClick(option, index, key) {
        const { onActiveIndexChange, onOptionSelect } = this.properties;
        if (!this._getOptionDisabled(option, index)) {
            onActiveIndexChange && onActiveIndexChange(index, key);
            onOptionSelect && onOptionSelect(option, index, key);
        }
    }
    animateScroll(scrollValue) {
        this.meta(ScrollMeta).scroll('root', scrollValue);
    }
    _calculateScroll() {
        const { activeIndex = 0 } = this.properties;
        const menuDimensions = this.meta(Dimensions).get('root');
        const scrollOffset = menuDimensions.scroll.top;
        const menuHeight = menuDimensions.offset.height;
        const optionOffset = this.meta(Dimensions).get(this._getOptionId(activeIndex)).offset;
        if (optionOffset.top - scrollOffset < 0) {
            this.animateScroll(optionOffset.top);
        }
        else if (optionOffset.top + optionOffset.height > scrollOffset + menuHeight) {
            this.animateScroll(optionOffset.top + optionOffset.height - menuHeight);
        }
    }
    getModifierClasses() {
        const { visualFocus } = this.properties;
        const focus = this.meta(Focus).get('root');
        return [visualFocus || focus.containsFocus ? css.focused : null];
    }
    getOptionClasses(active, disabled, selected) {
        return [
            css.option,
            active ? css.activeOption : null,
            disabled ? css.disabledOption : null,
            selected ? css.selectedOption : null
        ];
    }
    renderOptionLabel(option, index) {
        const { getOptionLabel } = this.properties;
        return getOptionLabel ? getOptionLabel(option, index) : `${option}`;
    }
    renderOption(option, index) {
        const { activeIndex = 0, getOptionSelected, theme, classes } = this.properties;
        const disabled = this._getOptionDisabled(option, index);
        const selected = getOptionSelected ? getOptionSelected(option, index) : false;
        return v('div', { key: this._getOptionId(index), role: 'presentation' }, [
            w(ListboxOption, {
                active: activeIndex === index,
                css: this.getOptionClasses(activeIndex === index, disabled, selected),
                classes,
                disabled,
                label: this.renderOptionLabel(option, index),
                id: this._getOptionId(index),
                index: index,
                key: `option-${index}`,
                option,
                selected,
                theme,
                onClick: this._onOptionClick
            })
        ]);
    }
    renderOptions() {
        const { optionData = [] } = this.properties;
        return optionData.map(this._boundRenderOption);
    }
    render() {
        const { activeIndex = 0, aria = {}, widgetId, multiselect = false, tabIndex = 0 } = this.properties;
        const themeClasses = this.getModifierClasses();
        this.meta(Resize).get('root');
        this._calculateScroll();
        return v('div', Object.assign({}, formatAriaProperties(aria), { 'aria-activedescendant': this._getOptionId(activeIndex), 'aria-multiselectable': multiselect ? 'true' : null, classes: this.theme([css.root, ...themeClasses]), id: widgetId, focus: this.shouldFocus, key: 'root', role: 'listbox', tabIndex, onkeydown: this._onKeyDown }), this.renderOptions());
    }
};
Listbox = tslib_1.__decorate([
    theme(css),
    diffProperty('optionData', reference),
    customElement({
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
export { Listbox };
export default Listbox;

/*# sourceMappingURL=index.mjs.map*/