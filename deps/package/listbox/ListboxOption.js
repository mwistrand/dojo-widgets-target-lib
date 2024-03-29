"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var d_1 = require("@dojo/framework/widget-core/d");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var css = require("../theme/listbox.m.css");
var ListboxOption = /** @class */ (function (_super) {
    tslib_1.__extends(ListboxOption, _super);
    function ListboxOption() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListboxOption.prototype._onClick = function (event) {
        event.stopPropagation();
        var _a = this.properties, index = _a.index, key = _a.key, option = _a.option, onClick = _a.onClick;
        onClick && onClick(option, index, key);
    };
    ListboxOption.prototype.render = function () {
        var _a = this.properties, _b = _a.css, css = _b === void 0 ? [] : _b, _c = _a.disabled, disabled = _c === void 0 ? false : _c, id = _a.id, label = _a.label, _d = _a.selected, selected = _d === void 0 ? false : _d;
        return d_1.v('div', {
            'aria-disabled': disabled ? 'true' : null,
            'aria-selected': disabled ? null : String(selected),
            classes: this.theme(css),
            id: id,
            role: 'option',
            onclick: this._onClick
        }, [label]);
    };
    ListboxOption = tslib_1.__decorate([
        Themed_1.theme(css)
    ], ListboxOption);
    return ListboxOption;
}(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase)));
exports.ListboxOption = ListboxOption;
exports.default = ListboxOption;

/*# sourceMappingURL=ListboxOption.js.map*/