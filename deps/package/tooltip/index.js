"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var d_1 = require("@dojo/framework/widget-core/d");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var util_1 = require("../common/util");
var fixedCss = require("./styles/tooltip.m.css");
var css = require("../theme/tooltip.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
// Enum used to position the Tooltip
var Orientation;
(function (Orientation) {
    Orientation["bottom"] = "bottom";
    Orientation["left"] = "left";
    Orientation["right"] = "right";
    Orientation["top"] = "top";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
var fixedOrientationCss = fixedCss;
var orientationCss = css;
var Tooltip = /** @class */ (function (_super) {
    tslib_1.__extends(Tooltip, _super);
    function Tooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tooltip.prototype.getFixedModifierClasses = function () {
        var _a = this.properties.orientation, orientation = _a === void 0 ? Orientation.right : _a;
        return [fixedCss.rootFixed, fixedOrientationCss[orientation + "Fixed"]];
    };
    Tooltip.prototype.getModifierClasses = function () {
        var _a = this.properties.orientation, orientation = _a === void 0 ? Orientation.right : _a;
        return [orientationCss[orientation]];
    };
    Tooltip.prototype.renderContent = function () {
        var _a = this.properties.aria, aria = _a === void 0 ? {} : _a;
        return d_1.v('div', tslib_1.__assign({}, util_1.formatAriaProperties(aria), { classes: [this.theme(css.content), fixedCss.contentFixed], key: 'content' }), [this.properties.content]);
    };
    Tooltip.prototype.renderTarget = function () {
        return d_1.v('div', { key: 'target' }, this.children);
    };
    Tooltip.prototype.render = function () {
        var open = this.properties.open;
        var classes = this.getModifierClasses();
        var fixedClasses = this.getFixedModifierClasses();
        return d_1.v('div', {
            classes: tslib_1.__spread(this.theme(classes), fixedClasses)
        }, [this.renderTarget(), open ? this.renderContent() : null]);
    };
    Tooltip = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-tooltip',
            properties: ['theme', 'classes', 'aria', 'extraClasses', 'content', 'open'],
            attributes: ['orientation'],
            events: []
        })
    ], Tooltip);
    return Tooltip;
}(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase)));
exports.Tooltip = Tooltip;
exports.default = Tooltip;

/*# sourceMappingURL=index.js.map*/