import * as tslib_1 from "tslib";
import { I18nMixin } from '@dojo/framework/widget-core/mixins/I18n';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin } from '@dojo/framework/widget-core/mixins/Focus';
import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import commonBundle from '../common/nls/common';
import { Keys } from '../common/util';
import * as css from '../theme/tab-controller.m.css';
export const ThemedBase = I18nMixin(ThemedMixin(FocusMixin(WidgetBase)));
let TabButtonBase = class TabButtonBase extends ThemedBase {
    _onClick(event) {
        event.stopPropagation();
        const { disabled, index, onClick } = this.properties;
        !disabled && onClick && onClick(index);
    }
    _onCloseClick(event) {
        event.stopPropagation();
        const { index, onCloseClick } = this.properties;
        onCloseClick && onCloseClick(index);
    }
    _onKeyDown(event) {
        event.stopPropagation();
        const { closeable, disabled, index, onCloseClick, onDownArrowPress, onEndPress, onHomePress, onLeftArrowPress, onRightArrowPress, onUpArrowPress } = this.properties;
        if (disabled) {
            return;
        }
        // Accessibility
        switch (event.which) {
            // Escape
            case Keys.Escape:
                closeable && onCloseClick && onCloseClick(index);
                break;
            // Left arrow
            case Keys.Left:
                onLeftArrowPress && onLeftArrowPress();
                break;
            // Right arrow
            case Keys.Right:
                onRightArrowPress && onRightArrowPress();
                break;
            // Up arrow
            case Keys.Up:
                onUpArrowPress && onUpArrowPress();
                break;
            // Down arrow
            case Keys.Down:
                onDownArrowPress && onDownArrowPress();
                break;
            // Home
            case Keys.Home:
                onHomePress && onHomePress();
                break;
            // End
            case Keys.End:
                onEndPress && onEndPress();
                break;
        }
    }
    getContent(messages) {
        const { active, closeable } = this.properties;
        return [
            ...this.children,
            closeable
                ? v('button', {
                    tabIndex: active ? 0 : -1,
                    classes: this.theme(css.close),
                    type: 'button',
                    onclick: this._onCloseClick
                }, [messages.close])
                : null
        ];
    }
    getModifierClasses() {
        const { active, closeable, disabled } = this.properties;
        return [
            active ? css.activeTabButton : null,
            closeable ? css.closeable : null,
            disabled ? css.disabledTabButton : null
        ];
    }
    render() {
        const { active, controls, disabled, id } = this.properties;
        const { messages } = this.localizeBundle(commonBundle);
        return v('div', {
            'aria-controls': controls,
            'aria-disabled': disabled ? 'true' : 'false',
            'aria-selected': active === true ? 'true' : 'false',
            classes: this.theme([css.tabButton, ...this.getModifierClasses()]),
            focus: this.shouldFocus,
            id,
            key: 'tab-button',
            onclick: this._onClick,
            onkeydown: this._onKeyDown,
            role: 'tab',
            tabIndex: active === true ? 0 : -1
        }, this.getContent(messages));
    }
};
TabButtonBase = tslib_1.__decorate([
    theme(css)
], TabButtonBase);
export { TabButtonBase };
export default class TabButton extends TabButtonBase {
}

/*# sourceMappingURL=TabButton.mjs.map*/