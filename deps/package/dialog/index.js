"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var I18n_1 = require("@dojo/framework/widget-core/mixins/I18n");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
var d_1 = require("@dojo/framework/widget-core/d");
var util_1 = require("@dojo/framework/core/util");
var util_2 = require("../common/util");
var common_1 = require("../common/nls/common");
var index_1 = require("../icon/index");
var fixedCss = require("./styles/dialog.m.css");
var css = require("../theme/dialog.m.css");
var index_2 = require("../global-event/index");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var Dialog = /** @class */ (function (_super) {
    tslib_1.__extends(Dialog, _super);
    function Dialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._titleId = util_1.uuid();
        _this._callFocus = false;
        _this._initialFocusSet = false;
        _this._onKeyUp = function (event) {
            event.stopPropagation();
            if (event.which === util_2.Keys.Escape) {
                _this._close();
            }
        };
        return _this;
    }
    Dialog.prototype._onCloseClick = function (event) {
        event.stopPropagation();
        this._close();
    };
    Dialog.prototype._checkFocus = function () {
        var _a = this.properties, modal = _a.modal, open = _a.open;
        // only handle focus for open dialog
        if (!open) {
            return;
        }
        var dialogFocus = this.meta(Focus_1.default).get('main');
        if (dialogFocus.containsFocus) {
            this._callFocus = false;
            this._initialFocusSet = true;
        }
        // handle if the dialog is open and loses focus
        if (this._initialFocusSet && !dialogFocus.containsFocus) {
            modal ? (this._callFocus = true) : this._close();
        }
        if (this._callFocus) {
            this.meta(Focus_1.default).set('main');
        }
    };
    Dialog.prototype._close = function () {
        var _a = this.properties, _b = _a.closeable, closeable = _b === void 0 ? true : _b, onRequestClose = _a.onRequestClose;
        closeable && onRequestClose && onRequestClose();
    };
    Dialog.prototype._onUnderlayClick = function (event) {
        event.stopPropagation();
        !this.properties.modal && this._close();
    };
    Dialog.prototype._onOpen = function () {
        var onOpen = this.properties.onOpen;
        this._callFocus = true;
        this._initialFocusSet = false;
        onOpen && onOpen();
    };
    Dialog.prototype.getContent = function () {
        return d_1.v('div', {
            classes: this.theme(css.content),
            key: 'content'
        }, this.children);
    };
    Dialog.prototype.renderTitle = function () {
        var _a = this.properties.title, title = _a === void 0 ? '' : _a;
        return d_1.v('div', { id: this._titleId }, [title]);
    };
    Dialog.prototype.renderUnderlay = function () {
        var _a = this.properties, underlay = _a.underlay, _b = _a.underlayEnterAnimation, underlayEnterAnimation = _b === void 0 ? this.theme(css.underlayEnter) : _b, _c = _a.underlayExitAnimation, underlayExitAnimation = _c === void 0 ? this.theme(css.underlayExit) : _c;
        return d_1.v('div', {
            classes: [this.theme(underlay ? css.underlayVisible : null), fixedCss.underlay],
            enterAnimation: underlayEnterAnimation,
            exitAnimation: underlayExitAnimation,
            key: 'underlay',
            onclick: this._onUnderlayClick
        });
    };
    Dialog.prototype.render = function () {
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, _c = _a.closeable, closeable = _c === void 0 ? true : _c, closeText = _a.closeText, _d = _a.enterAnimation, enterAnimation = _d === void 0 ? this.theme(css.enter) : _d, _e = _a.exitAnimation, exitAnimation = _e === void 0 ? this.theme(css.exit) : _e, _f = _a.open, open = _f === void 0 ? false : _f, _g = _a.role, role = _g === void 0 ? 'dialog' : _g, _h = _a.title, title = _h === void 0 ? '' : _h, theme = _a.theme, classes = _a.classes;
        open && !this._wasOpen && this._onOpen();
        this._wasOpen = open;
        this._checkFocus();
        if (!closeText) {
            var messages = this.localizeBundle(common_1.default).messages;
            closeText = messages.close + " " + title;
        }
        return d_1.v('div', {
            classes: this.theme([css.root, open ? css.open : null])
        }, open
            ? [
                d_1.w(index_2.GlobalEvent, { key: 'global', document: { keyup: this._onKeyUp } }),
                this.renderUnderlay(),
                d_1.v('div', tslib_1.__assign({}, util_2.formatAriaProperties(aria), { 'aria-labelledby': this._titleId, classes: this.theme(css.main), enterAnimation: enterAnimation,
                    exitAnimation: exitAnimation, key: 'main', role: role, tabIndex: -1 }), [
                    d_1.v('div', {
                        classes: this.theme(css.title),
                        key: 'title'
                    }, [
                        this.renderTitle(),
                        closeable
                            ? d_1.v('button', {
                                classes: this.theme(css.close),
                                type: 'button',
                                onclick: this._onCloseClick
                            }, [
                                closeText,
                                d_1.w(index_1.default, {
                                    type: 'closeIcon',
                                    theme: theme,
                                    classes: classes
                                })
                            ])
                            : null
                    ]),
                    this.getContent()
                ])
            ]
            : []);
    };
    Dialog = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
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
    return Dialog;
}(I18n_1.I18nMixin(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase))));
exports.Dialog = Dialog;
exports.default = Dialog;

/*# sourceMappingURL=index.js.map*/