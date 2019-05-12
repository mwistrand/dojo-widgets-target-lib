"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var object_1 = require("@dojo/framework/shim/object");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var array_1 = require("@dojo/framework/shim/array");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var d_1 = require("@dojo/framework/widget-core/d");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var css = require("../theme/accordion-pane.m.css");
var AccordionPane = /** @class */ (function (_super) {
    tslib_1.__extends(AccordionPane, _super);
    function AccordionPane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccordionPane.prototype._assignCallback = function (child, functionName, callback) {
        var _this = this;
        var existingProperty = child.properties[functionName];
        var property = function () {
            callback.call(_this, "" + child.properties.key);
        };
        return existingProperty
            ? function (key) {
                existingProperty(key);
                property();
            }
            : property;
    };
    AccordionPane.prototype.onRequestClose = function (key) {
        var onRequestClose = this.properties.onRequestClose;
        onRequestClose && onRequestClose(key);
    };
    AccordionPane.prototype.onRequestOpen = function (key) {
        var onRequestOpen = this.properties.onRequestOpen;
        onRequestOpen && onRequestOpen(key);
    };
    AccordionPane.prototype.renderChildren = function () {
        var _this = this;
        var _a = this.properties, _b = _a.openKeys, openKeys = _b === void 0 ? [] : _b, theme = _a.theme, classes = _a.classes;
        return this.children
            .filter(function (child) { return child; })
            .map(function (child) {
            // null checks skipped since children are filtered prior to mapping
            object_1.assign(child.properties, {
                onRequestClose: _this._assignCallback(child, 'onRequestClose', _this.onRequestClose),
                onRequestOpen: _this._assignCallback(child, 'onRequestOpen', _this.onRequestOpen),
                open: array_1.includes(openKeys, child.properties.key),
                theme: theme,
                classes: classes
            });
            return child;
        });
    };
    AccordionPane.prototype.render = function () {
        return d_1.v('div', { classes: this.theme(css.root) }, this.renderChildren());
    };
    AccordionPane = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-accordion-pane',
            properties: ['openKeys', 'theme', 'extraClasses', 'classes'],
            events: ['onRequestClose', 'onRequestOpen']
        })
    ], AccordionPane);
    return AccordionPane;
}(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase)));
exports.AccordionPane = AccordionPane;
exports.default = AccordionPane;

/*# sourceMappingURL=index.js.map*/