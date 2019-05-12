import * as tslib_1 from "tslib";
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { I18nMixin } from '@dojo/framework/widget-core/mixins/I18n';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import { v, w } from '@dojo/framework/widget-core/d';
import { uuid } from '@dojo/framework/core/util';
import { formatAriaProperties, Keys } from '../common/util';
import commonBundle from '../common/nls/common';
import Icon from '../icon/index';
import * as fixedCss from './styles/dialog.m.css';
import * as css from '../theme/dialog.m.css';
import { GlobalEvent } from '../global-event/index';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
let Dialog = class Dialog extends I18nMixin(ThemedMixin(WidgetBase)) {
    constructor() {
        super(...arguments);
        this._titleId = uuid();
        this._callFocus = false;
        this._initialFocusSet = false;
        this._onKeyUp = (event) => {
            event.stopPropagation();
            if (event.which === Keys.Escape) {
                this._close();
            }
        };
    }
    _onCloseClick(event) {
        event.stopPropagation();
        this._close();
    }
    _checkFocus() {
        const { modal, open } = this.properties;
        // only handle focus for open dialog
        if (!open) {
            return;
        }
        const dialogFocus = this.meta(Focus).get('main');
        if (dialogFocus.containsFocus) {
            this._callFocus = false;
            this._initialFocusSet = true;
        }
        // handle if the dialog is open and loses focus
        if (this._initialFocusSet && !dialogFocus.containsFocus) {
            modal ? (this._callFocus = true) : this._close();
        }
        if (this._callFocus) {
            this.meta(Focus).set('main');
        }
    }
    _close() {
        const { closeable = true, onRequestClose } = this.properties;
        closeable && onRequestClose && onRequestClose();
    }
    _onUnderlayClick(event) {
        event.stopPropagation();
        !this.properties.modal && this._close();
    }
    _onOpen() {
        const { onOpen } = this.properties;
        this._callFocus = true;
        this._initialFocusSet = false;
        onOpen && onOpen();
    }
    getContent() {
        return v('div', {
            classes: this.theme(css.content),
            key: 'content'
        }, this.children);
    }
    renderTitle() {
        const { title = '' } = this.properties;
        return v('div', { id: this._titleId }, [title]);
    }
    renderUnderlay() {
        const { underlay, underlayEnterAnimation = this.theme(css.underlayEnter), underlayExitAnimation = this.theme(css.underlayExit) } = this.properties;
        return v('div', {
            classes: [this.theme(underlay ? css.underlayVisible : null), fixedCss.underlay],
            enterAnimation: underlayEnterAnimation,
            exitAnimation: underlayExitAnimation,
            key: 'underlay',
            onclick: this._onUnderlayClick
        });
    }
    render() {
        let { aria = {}, closeable = true, closeText, enterAnimation = this.theme(css.enter), exitAnimation = this.theme(css.exit), open = false, role = 'dialog', title = '', theme, classes } = this.properties;
        open && !this._wasOpen && this._onOpen();
        this._wasOpen = open;
        this._checkFocus();
        if (!closeText) {
            const { messages } = this.localizeBundle(commonBundle);
            closeText = `${messages.close} ${title}`;
        }
        return v('div', {
            classes: this.theme([css.root, open ? css.open : null])
        }, open
            ? [
                w(GlobalEvent, { key: 'global', document: { keyup: this._onKeyUp } }),
                this.renderUnderlay(),
                v('div', Object.assign({}, formatAriaProperties(aria), { 'aria-labelledby': this._titleId, classes: this.theme(css.main), enterAnimation,
                    exitAnimation, key: 'main', role, tabIndex: -1 }), [
                    v('div', {
                        classes: this.theme(css.title),
                        key: 'title'
                    }, [
                        this.renderTitle(),
                        closeable
                            ? v('button', {
                                classes: this.theme(css.close),
                                type: 'button',
                                onclick: this._onCloseClick
                            }, [
                                closeText,
                                w(Icon, {
                                    type: 'closeIcon',
                                    theme,
                                    classes
                                })
                            ])
                            : null
                    ]),
                    this.getContent()
                ])
            ]
            : []);
    }
};
Dialog = tslib_1.__decorate([
    theme(css),
    customElement({
        tag: 'dojo-dialog',
        properties: [
            'theme',
            'aria',
            'extraClasses',
            'exitAnimation',
            'enterAnimation',
            'underlayEnterAnimation',
            'underlayExitAnimation',
            'closeable',
            'modal',
            'open',
            'underlay',
            'classes'
        ],
        attributes: ['title', 'role', 'closeText'],
        events: ['onOpen', 'onRequestClose']
    })
], Dialog);
export { Dialog };
export default Dialog;

/*# sourceMappingURL=index.mjs.map*/