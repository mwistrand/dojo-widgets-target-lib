"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var d_1 = require("@dojo/framework/widget-core/d");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var css = require("../theme/grid-placeholder-row.m.css");
var PlaceholderRow = /** @class */ (function (_super) {
    tslib_1.__extends(PlaceholderRow, _super);
    function PlaceholderRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlaceholderRow.prototype.render = function () {
        return d_1.v('div', { classes: this.theme(css.root) }, [
            d_1.v('div', { classes: this.theme(css.loading) })
        ]);
    };
    PlaceholderRow = tslib_1.__decorate([
        Themed_1.theme(css)
    ], PlaceholderRow);
    return PlaceholderRow;
}(Themed_1.default(WidgetBase_1.default)));
exports.default = PlaceholderRow;

/*# sourceMappingURL=PlaceholderRow.js.map*/