import * as tslib_1 from "tslib";
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin } from '@dojo/framework/widget-core/mixins/Focus';
import { v, w } from '@dojo/framework/widget-core/d';
import * as css from '../theme/button.m.css';
import { formatAriaProperties } from '../common/util';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import Icon from '../icon/index';
import { CustomElementChildType } from '@dojo/framework/widget-core/registerCustomElement';
let Button = class Button extends ThemedMixin(FocusMixin(WidgetBase)) {
    _onBlur(event) {
        this.properties.onBlur && this.properties.onBlur();
    }
    _onClick(event) {
        event.stopPropagation();
        this.properties.onClick && this.properties.onClick();
    }
    _onFocus(event) {
        this.properties.onFocus && this.properties.onFocus();
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
    getContent() {
        return this.children;
    }
    getModifierClasses() {
        const { disabled, popup = false, pressed } = this.properties;
        return [
            disabled ? css.disabled : null,
            popup ? css.popup : null,
            pressed ? css.pressed : null
        ];
    }
    render() {
        let { aria = {}, disabled, widgetId, popup = false, name, pressed, type, value, theme, classes } = this.properties;
        if (popup === true) {
            popup = { expanded: false, id: '' };
        }
        return v('button', Object.assign({ classes: this.theme([css.root, ...this.getModifierClasses()]), disabled, id: widgetId, focus: this.shouldFocus, name,
            type,
            value, onblur: this._onBlur, onclick: this._onClick, onfocus: this._onFocus, onkeydown: this._onKeyDown, onkeypress: this._onKeyPress, onkeyup: this._onKeyUp, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel }, formatAriaProperties(aria), { 'aria-haspopup': popup ? 'true' : null, 'aria-controls': popup ? popup.id : null, 'aria-expanded': popup ? popup.expanded + '' : null, 'aria-pressed': typeof pressed === 'boolean' ? pressed.toString() : null }), [
            ...this.getContent(),
            popup
                ? v('span', { classes: this.theme(css.addon) }, [
                    w(Icon, { type: 'downIcon', theme, classes })
                ])
                : null
        ]);
    }
};
Button = tslib_1.__decorate([
    theme(css),
    customElement({
        tag: 'dojo-button',
        childType: CustomElementChildType.TEXT,
        properties: ['disabled', 'pressed', 'popup', 'theme', 'aria', 'extraClasses', 'classes'],
        attributes: ['widgetId', 'name', 'type', 'value'],
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
], Button);
export { Button };
export default Button;

/*# sourceMappingURL=index.mjs.map*/