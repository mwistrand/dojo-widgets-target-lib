import * as tslib_1 from "tslib";
import global from '@dojo/framework/shim/global';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { diffProperty } from '@dojo/framework/widget-core/decorators/diffProperty';
import { shallow } from '@dojo/framework/widget-core/diff';
export class GlobalEvent extends WidgetBase {
    constructor() {
        super(...arguments);
        this._listeners = {
            window: {},
            document: {}
        };
    }
    _registerListeners(type, previousListeners, newListeners) {
        const registeredListeners = {};
        previousListeners[type] &&
            Object.keys(previousListeners[type]).forEach((eventName) => {
                const newListener = newListeners[type][eventName];
                if (newListener === undefined) {
                    global[type].removeEventListener(eventName, this._listeners[type][eventName]);
                }
                else if (previousListeners[type][eventName] !== newListener) {
                    global[type].removeEventListener(eventName, this._listeners[type][eventName]);
                    global[type].addEventListener(eventName, newListener);
                    registeredListeners[eventName] = newListener;
                }
                else {
                    registeredListeners[eventName] = newListener;
                }
            });
        newListeners[type] &&
            Object.keys(newListeners[type]).forEach((eventName) => {
                if (previousListeners[type] === undefined ||
                    previousListeners[type][eventName] === undefined) {
                    global[type].addEventListener(eventName, newListeners[type][eventName]);
                    registeredListeners[eventName] = newListeners[type][eventName];
                }
            });
        this._listeners[type] = registeredListeners;
    }
    _removeAllRegisteredListeners(type) {
        Object.keys(this._listeners[type]).forEach((eventName) => {
            global[type].removeEventListener(eventName, this._listeners[type][eventName]);
        });
    }
    onWindowListenersChange(previousListeners, newListeners) {
        this._registerListeners('window', previousListeners, newListeners);
    }
    onDocumentListenersChange(previousListeners, newListeners) {
        this._registerListeners('document', previousListeners, newListeners);
    }
    onDetach() {
        this._removeAllRegisteredListeners('window');
        this._removeAllRegisteredListeners('document');
    }
    render() {
        if (this.children.length > 0) {
            return this.children;
        }
        return null;
    }
}
tslib_1.__decorate([
    diffProperty('window', shallow),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], GlobalEvent.prototype, "onWindowListenersChange", null);
tslib_1.__decorate([
    diffProperty('document', shallow),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], GlobalEvent.prototype, "onDocumentListenersChange", null);
export default GlobalEvent;

/*# sourceMappingURL=index.mjs.map*/