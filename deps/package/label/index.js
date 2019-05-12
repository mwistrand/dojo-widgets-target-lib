"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var d_1 = require("@dojo/framework/widget-core/d");
var util_1 = require("../common/util");
var css = require("../theme/label.m.css");
var baseCss = require("../common/styles/base.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var Label = /** @class */ (function (_super) {
    tslib_1.__extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.prototype.getRootClasses = function () {
        var _a = this.properties, disabled = _a.disabled, focused = _a.focused, invalid = _a.invalid, readOnly = _a.readOnly, required = _a.required, secondary = _a.secondary;
        return [
            css.root,
            disabled ? css.disabled : null,
            focused ? css.focused : null,
            invalid === true ? css.invalid : null,
            invalid === false ? css.valid : null,
            readOnly ? css.readonly : null,
            required ? css.required : null,
            secondary ? css.secondary : null
        ];
    };
    Label.prototype.render = function () {
        var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, forId = _a.forId, hidden = _a.hidden, widgetId = _a.widgetId;
        return d_1.v('label', tslib_1.__assign({}, util_1.formatAriaProperties(aria), { id: widgetId, classes: tslib_1.__spread(this.theme(this.getRootClasses()), [
                hidden ? baseCss.visuallyHidden : null
            ]), for: forId }), this.children);
    };
    Label = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-label',
            properties: [
                'theme',
                'classes',
                'aria',
                'extraClasses',
                'disabled',
                'focused',
                'readOnly',
                'required',
                'invalid',
                'hidden',
                'secondary'
            ],
            attributes: [],
            events: []
        })
    ], Label);
    return Label;
}(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase)));
exports.Label = Label;
exports.default = Label;

/*# sourceMappingURL=index.js.map*/