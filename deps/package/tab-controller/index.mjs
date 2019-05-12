import * as tslib_1 from "tslib";
import { assign } from '@dojo/framework/shim/object';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin } from '@dojo/framework/widget-core/mixins/Focus';
import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import TabButton from './TabButton';
import { uuid } from '@dojo/framework/core/util';
import { formatAriaProperties } from '../common/util';
import * as css from '../theme/tab-controller.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
/**
 * Enum for tab button alignment
 */
export var Align;
(function (Align) {
    Align["bottom"] = "bottom";
    Align["left"] = "left";
    Align["right"] = "right";
    Align["top"] = "top";
})(Align || (Align = {}));
let TabController = class TabController extends ThemedMixin(FocusMixin(WidgetBase)) {
    constructor() {
        super(...arguments);
        this._id = uuid();
    }
    get _tabs() {
        return this.children.filter((child) => child !== null);
    }
    _onDownArrowPress() {
        const { alignButtons } = this.properties;
        if (alignButtons === Align.left || alignButtons === Align.right) {
            this.selectNextIndex();
        }
    }
    _onLeftArrowPress() {
        this.selectPreviousIndex();
    }
    _onRightArrowPress() {
        this.selectNextIndex();
    }
    _onUpArrowPress() {
        const { alignButtons } = this.properties;
        if (alignButtons === Align.left || alignButtons === Align.right) {
            this.selectPreviousIndex();
        }
    }
    /**
     * Determines if the tab at `currentIndex` is enabled. If disabled,
     * returns the next valid index, or null if no enabled tabs exist.
     */
    _validateIndex(currentIndex, backwards) {
        const tabs = this._tabs;
        if (tabs.every((result) => Boolean(result.properties.disabled))) {
            return null;
        }
        function nextIndex(index) {
            if (backwards) {
                return (tabs.length + (index - 1)) % tabs.length;
            }
            return (index + 1) % tabs.length;
        }
        let i = !tabs[currentIndex] ? tabs.length - 1 : currentIndex;
        while (tabs[i].properties.disabled) {
            i = nextIndex(i);
        }
        return i;
    }
    closeIndex(index) {
        const { onRequestTabClose } = this.properties;
        const key = this._tabs[index].properties.key;
        this.focus();
        onRequestTabClose && onRequestTabClose(index, key);
    }
    renderButtonContent(label) {
        return [label || null];
    }
    renderTabButtons() {
        return this._tabs.map((tab, i) => {
            const { closeable, disabled, key, label, theme, classes } = (tab.properties);
            return w(TabButton, {
                active: i === this.properties.activeIndex,
                closeable,
                controls: `${this._id}-tab-${i}`,
                disabled,
                focus: i === this.properties.activeIndex ? this.shouldFocus : () => false,
                id: `${this._id}-tabbutton-${i}`,
                index: i,
                key: `${key}-tabbutton`,
                onClick: this.selectIndex,
                onCloseClick: this.closeIndex,
                onDownArrowPress: this._onDownArrowPress,
                onEndPress: this.selectLastIndex,
                onHomePress: this.selectFirstIndex,
                onLeftArrowPress: this._onLeftArrowPress,
                onRightArrowPress: this._onRightArrowPress,
                onUpArrowPress: this._onUpArrowPress,
                theme,
                classes
            }, this.renderButtonContent(label));
        });
    }
    renderTabs() {
        const { activeIndex } = this.properties;
        return this._tabs.map((tab, i) => {
            assign(tab.properties, {
                widgetId: `${this._id}-tab-${i}`,
                labelledBy: `${this._id}-tabbutton-${i}`,
                show: i === activeIndex
            });
            return tab;
        });
    }
    selectFirstIndex() {
        this.selectIndex(0, true);
    }
    selectIndex(index, backwards) {
        const { activeIndex, onRequestTabChange } = this.properties;
        const validIndex = this._validateIndex(index, backwards);
        this.focus();
        if (validIndex !== null && validIndex !== activeIndex) {
            const key = this._tabs[validIndex].properties.key;
            onRequestTabChange && onRequestTabChange(validIndex, key);
        }
    }
    selectLastIndex() {
        this.selectIndex(this._tabs.length - 1);
    }
    selectNextIndex() {
        const { activeIndex } = this.properties;
        this.selectIndex(activeIndex === this._tabs.length - 1 ? 0 : activeIndex + 1);
    }
    selectPreviousIndex() {
        const { activeIndex } = this.properties;
        this.selectIndex(activeIndex === 0 ? this._tabs.length - 1 : activeIndex - 1, true);
    }
    render() {
        const { activeIndex, aria = {} } = this.properties;
        const validIndex = this._validateIndex(activeIndex);
        const tabs = this.renderTabs();
        if (validIndex !== null && validIndex !== activeIndex) {
            this.selectIndex(validIndex);
            return null;
        }
        const children = [
            v('div', {
                key: 'buttons',
                classes: this.theme(css.tabButtons)
            }, this.renderTabButtons()),
            tabs.length
                ? v('div', {
                    key: 'tabs',
                    classes: this.theme(css.tabs)
                }, tabs)
                : null
        ];
        let alignClass;
        let orientation = 'horizontal';
        switch (this.properties.alignButtons) {
            case Align.right:
                alignClass = css.alignRight;
                orientation = 'vertical';
                children.reverse();
                break;
            case Align.bottom:
                alignClass = css.alignBottom;
                children.reverse();
                break;
            case Align.left:
                alignClass = css.alignLeft;
                orientation = 'vertical';
                break;
        }
        return v('div', Object.assign({}, formatAriaProperties(aria), { 'aria-orientation': orientation, classes: this.theme([alignClass ? alignClass : null, css.root]), role: 'tablist' }), children);
    }
};
TabController = tslib_1.__decorate([
    theme(css),
    customElement({
        tag: 'dojo-tab-controller',
        properties: ['theme', 'classes', 'aria', 'extraClasses', 'activeIndex'],
        attributes: ['alignButtons'],
        events: ['onRequestTabChange', 'onRequestTabClose']
    })
], TabController);
export { TabController };
export default TabController;

/*# sourceMappingURL=index.mjs.map*/