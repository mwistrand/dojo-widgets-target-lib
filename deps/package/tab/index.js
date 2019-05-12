"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var d_1 = require("@dojo/framework/widget-core/d");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var util_1 = require("../common/util");
var css = require("../theme/tab-controller.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var registerCustomElement_1 = require("@dojo/framework/widget-core/registerCustomElement");
var Tab = /** @class */ (function (_super) {
    tslib_1.__extends(Tab, _super);
    function Tab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tab.prototype.render = function () {
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, widgetId = _a.widgetId, labelledBy = _a.labelledBy, _c = _a.show, show = _c === void 0 ? false : _c;
        var hidden = this.theme(!show ? css.hidden : null);
        return d_1.v('div', tslib_1.__assign({}, util_1.formatAriaProperties(aria), { 'aria-labelledby': labelledBy, classes: this.theme([css.tab]), id: widgetId, role: 'tabpanel' }), [d_1.v('div', { classes: [hidden] }, this.children)]);
    };
    Tab = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-tab',
            childType: registerCustomElement_1.CustomElementChildType.NODE,
            properties: ['theme', 'classes', 'aria', 'extraClasses', 'closeable', 'disabled', 'show'],
            attributes: ['key', 'labelledBy', 'widgetId', 'label'],
            events: []
        })
    ], Tab);
    return Tab;
}(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase)));
exports.Tab = Tab;
exports.default = Tab;

/*# sourceMappingURL=index.js.map*/