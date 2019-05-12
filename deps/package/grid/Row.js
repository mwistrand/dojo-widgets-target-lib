"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var d_1 = require("@dojo/framework/widget-core/d");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Cell_1 = require("./Cell");
var fixedCss = require("./styles/row.m.css");
var css = require("../theme/grid-row.m.css");
var Row = /** @class */ (function (_super) {
    tslib_1.__extends(Row, _super);
    function Row() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Row.prototype.render = function () {
        var _this = this;
        var _a = this.properties, item = _a.item, columnConfig = _a.columnConfig, id = _a.id, theme = _a.theme, classes = _a.classes;
        var columns = columnConfig.map(function (config) {
            var value = "" + item[config.id];
            if (config.renderer) {
                value = config.renderer({ value: value });
            }
            return d_1.w(Cell_1.default, {
                theme: theme,
                key: config.id,
                classes: classes,
                updater: function (updatedValue) {
                    _this.properties.updater(id, config.id, updatedValue);
                },
                value: value,
                editable: config.editable,
                rawValue: "" + item[config.id]
            });
        }, []);
        return d_1.v('div', {
            classes: [this.theme(css.root), fixedCss.rootFixed],
            role: 'row',
            'aria-rowindex': "" + (id + 1)
        }, columns);
    };
    Row = tslib_1.__decorate([
        Themed_1.theme(css)
    ], Row);
    return Row;
}(Themed_1.default(WidgetBase_1.default)));
exports.default = Row;

/*# sourceMappingURL=Row.js.map*/