"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// NOTE: This module will be deleted in favor of
// https://github.com/dojo/framework/pull/264
var Base_1 = require("@dojo/framework/widget-core/meta/Base");
var InputValidity = /** @class */ (function (_super) {
    tslib_1.__extends(InputValidity, _super);
    function InputValidity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputValidity.prototype.get = function (key, value) {
        var _this = this;
        var node = this.getNode(key);
        if (!node) {
            return { valid: undefined, message: '' };
        }
        if (value !== node.value) {
            // if the vdom is out of sync with the real dom our
            // validation check will be one render behind.
            // Call invalidate on the next loop.
            setTimeout(function () { return _this.invalidate(); });
        }
        return {
            valid: node.validity.valid,
            message: node.validationMessage
        };
    };
    return InputValidity;
}(Base_1.default));
exports.InputValidity = InputValidity;
exports.default = InputValidity;

/*# sourceMappingURL=InputValidity.js.map*/