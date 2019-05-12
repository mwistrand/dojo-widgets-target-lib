"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var d_1 = require("@dojo/framework/widget-core/d");
var util_1 = require("../common/util");
var css = require("../theme/icon.m.css");
var baseCss = require("../common/styles/base.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var Icon = /** @class */ (function (_super) {
    tslib_1.__extends(Icon, _super);
    function Icon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Icon.prototype.renderAltText = function (altText) {
        return d_1.v('span', { classes: [baseCss.visuallyHidden] }, [altText]);
    };
    Icon.prototype.render = function () {
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {
            hidden: 'true'
        } : _b, type = _a.type, altText = _a.altText;
        return d_1.v('span', { classes: this.theme(css.root) }, [
            d_1.v('i', tslib_1.__assign({}, util_1.formatAriaProperties(aria), { classes: this.theme([css.icon, css[type]]) })),
            altText ? this.renderAltText(altText) : null
        ]);
    };
    Icon = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-icon',
            properties: ['theme', 'classes', 'aria', 'extraClasses'],
            attributes: ['type', 'altText']
        })
    ], Icon);
    return Icon;
}(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase)));
exports.Icon = Icon;
exports.default = Icon;

/*# sourceMappingURL=index.js.map*/