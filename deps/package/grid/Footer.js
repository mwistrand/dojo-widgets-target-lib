"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var d_1 = require("@dojo/framework/widget-core/d");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var css = require("../theme/grid-footer.m.css");
var Footer = /** @class */ (function (_super) {
    tslib_1.__extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        var _a = this.properties, total = _a.total, page = _a.page, pageSize = _a.pageSize;
        var footer = total !== undefined
            ? "Page " + page + " of " + Math.ceil(total / pageSize) + ". Total rows " + total
            : "Page " + page + " of ?";
        return d_1.v('div', { classes: this.theme(css.root) }, [footer]);
    };
    Footer = tslib_1.__decorate([
        Themed_1.theme(css)
    ], Footer);
    return Footer;
}(Themed_1.default(WidgetBase_1.default)));
exports.default = Footer;

/*# sourceMappingURL=Footer.js.map*/