"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var d_1 = require("@dojo/framework/widget-core/d");
var Focus_1 = require("@dojo/framework/widget-core/mixins/Focus");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var util_1 = require("@dojo/framework/core/util");
var util_2 = require("../common/util");
var index_1 = require("../text-input/index");
var index_2 = require("../button/index");
var index_3 = require("../icon/index");
var fixedCss = require("./styles/cell.m.css");
var css = require("../theme/grid-cell.m.css");
var Cell = /** @class */ (function (_super) {
    tslib_1.__extends(Cell, _super);
    function Cell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._editing = false;
        _this._editingValue = '';
        _this._idBase = util_1.uuid();
        _this._onEdit = function () {
            var editable = _this.properties.editable;
            if (editable) {
                _this._editing = true;
                _this._callFocus('input');
                _this._editingValue = _this.properties.rawValue;
                _this.invalidate();
            }
        };
        return _this;
    }
    Cell.prototype._callFocus = function (key) {
        this._focusKey = key;
        this.focus();
    };
    Cell.prototype._onBlur = function () {
        if (this._editing) {
            this._onSave();
        }
    };
    Cell.prototype._onInput = function (value) {
        this._editingValue = value;
    };
    Cell.prototype._onKeyDown = function (key) {
        if (key === util_2.Keys.Enter) {
            this._onSave();
            this._callFocus('button');
        }
        else if (key === util_2.Keys.Escape) {
            this._editing = false;
            this._callFocus('button');
            this.invalidate();
        }
    };
    Cell.prototype._onSave = function () {
        this._editing = false;
        this.properties.updater(this._editingValue);
        this.invalidate();
    };
    Cell.prototype.renderContent = function () {
        var value = this.properties.value;
        return d_1.v('div', {
            key: 'content',
            id: this._idBase,
            ondblclick: this._onEdit
        }, [value]);
    };
    Cell.prototype.render = function () {
        var _a = this.properties, editable = _a.editable, rawValue = _a.rawValue, theme = _a.theme, classes = _a.classes;
        return d_1.v('div', { role: 'cell', classes: [this.theme(css.root), fixedCss.rootFixed] }, [
            this._editing
                ? d_1.w(index_1.default, {
                    key: 'input',
                    theme: theme,
                    classes: classes,
                    label: "Edit " + rawValue,
                    labelHidden: true,
                    extraClasses: { input: this.theme(css.input) },
                    focus: this._focusKey === 'input' ? this.shouldFocus : function () { return false; },
                    value: this._editingValue,
                    onInput: this._onInput,
                    onBlur: this._onBlur,
                    onKeyDown: this._onKeyDown
                })
                : this.renderContent(),
            editable && !this._editing
                ? d_1.w(index_2.default, {
                    key: 'button',
                    theme: theme,
                    classes: classes,
                    aria: { describedby: this._idBase },
                    focus: this._focusKey === 'button' ? this.shouldFocus : function () { return false; },
                    type: 'button',
                    extraClasses: { root: this.theme(css.edit) },
                    onClick: this._onEdit
                }, [d_1.w(index_3.default, { type: 'editIcon', altText: 'Edit', classes: classes, theme: theme })])
                : null
        ]);
    };
    Cell = tslib_1.__decorate([
        Themed_1.theme(css)
    ], Cell);
    return Cell;
}(Themed_1.default(Focus_1.FocusMixin(WidgetBase_1.default))));
exports.default = Cell;

/*# sourceMappingURL=Cell.js.map*/