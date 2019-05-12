"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var d_1 = require("@dojo/framework/widget-core/d");
var util_1 = require("../common/util");
var css = require("../theme/progress.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var Progress = /** @class */ (function (_super) {
    tslib_1.__extends(Progress, _super);
    function Progress() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Progress.prototype._output = function (value, percent) {
        var output = this.properties.output;
        return output ? output(value, percent) : percent + "%";
    };
    Progress.prototype.renderProgress = function (percent) {
        return [
            d_1.v('div', {
                classes: this.theme(css.progress),
                styles: {
                    width: percent + "%"
                }
            })
        ];
    };
    Progress.prototype.render = function () {
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, value = _a.value, _c = _a.showOutput, showOutput = _c === void 0 ? true : _c, _d = _a.max, max = _d === void 0 ? 100 : _d, _e = _a.min, min = _e === void 0 ? 0 : _e, widgetId = _a.widgetId;
        var percent = Math.round(((value - min) / (max - min)) * 100);
        var output = this._output(value, percent);
        return d_1.v('div', { classes: this.theme(css.root) }, [
            d_1.v('div', tslib_1.__assign({}, util_1.formatAriaProperties(aria), { classes: this.theme(css.bar), role: 'progressbar', 'aria-valuemin': "" + min, 'aria-valuemax': "" + max, 'aria-valuenow': "" + value, 'aria-valuetext': output, id: widgetId }), this.renderProgress(percent)),
            showOutput ? d_1.v('span', { classes: this.theme(css.output) }, [output]) : null
        ]);
    };
    Progress = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-progress',
            properties: [
                'theme',
                'classes',
                'aria',
                'extraClasses',
                'output',
                'showOutput',
                'max',
                'min',
                'value'
            ],
            attributes: ['widgetId'],
            events: []
        })
    ], Progress);
    return Progress;
}(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase)));
exports.Progress = Progress;
exports.default = Progress;

/*# sourceMappingURL=index.js.map*/