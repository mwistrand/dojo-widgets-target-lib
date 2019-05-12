"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var css = require("../theme/helper-text.m.css");
var d_1 = require("@dojo/framework/widget-core/d");
var HelperText = /** @class */ (function (_super) {
    tslib_1.__extends(HelperText, _super);
    function HelperText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HelperText.prototype.render = function () {
        var _a = this.properties, text = _a.text, valid = _a.valid;
        return d_1.v('div', {
            key: 'root',
            classes: this.theme([
                css.root,
                valid === true ? css.valid : null,
                valid === false ? css.invalid : null
            ])
        }, [
            text &&
                d_1.v('p', {
                    key: 'text',
                    classes: this.theme(css.text),
                    'aria-hidden': 'true',
                    title: text
                }, [text])
        ]);
    };
    HelperText = tslib_1.__decorate([
        Themed_1.theme(css)
    ], HelperText);
    return HelperText;
}(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase)));
exports.default = HelperText;

/*# sourceMappingURL=index.js.map*/