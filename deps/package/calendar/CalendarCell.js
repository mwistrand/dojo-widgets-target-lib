"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
var d_1 = require("@dojo/framework/widget-core/d");
var css = require("../theme/calendar.m.css");
var CalendarCell = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarCell, _super);
    function CalendarCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarCell.prototype._onClick = function (event) {
        event.stopPropagation();
        var _a = this.properties, date = _a.date, _b = _a.disabled, disabled = _b === void 0 ? false : _b, onClick = _a.onClick;
        onClick && onClick(date, disabled);
    };
    CalendarCell.prototype._onKeyDown = function (event) {
        event.stopPropagation();
        var onKeyDown = this.properties.onKeyDown;
        onKeyDown &&
            onKeyDown(event.which, function () {
                event.preventDefault();
            });
    };
    CalendarCell.prototype.formatDate = function (date) {
        return d_1.v('span', ["" + date]);
    };
    CalendarCell.prototype.getModifierClasses = function () {
        var _a = this.properties, _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.outOfRange, outOfRange = _c === void 0 ? false : _c, _d = _a.selected, selected = _d === void 0 ? false : _d, _e = _a.today, today = _e === void 0 ? false : _e;
        return [
            disabled || outOfRange ? css.inactiveDate : null,
            outOfRange ? css.outOfRange : null,
            selected ? css.selectedDate : null,
            today ? css.todayDate : null
        ];
    };
    CalendarCell.prototype.render = function () {
        var _a = this.properties, callFocus = _a.callFocus, date = _a.date, _b = _a.focusable, focusable = _b === void 0 ? false : _b, _c = _a.selected, selected = _c === void 0 ? false : _c, onFocusCalled = _a.onFocusCalled;
        if (callFocus) {
            this.meta(Focus_1.default).set('root');
            onFocusCalled && onFocusCalled();
        }
        return d_1.v('td', {
            key: 'root',
            role: 'gridcell',
            'aria-selected': "" + selected,
            tabIndex: focusable ? 0 : -1,
            classes: this.theme(tslib_1.__spread([css.date], this.getModifierClasses())),
            onclick: this._onClick,
            onkeydown: this._onKeyDown
        }, [this.formatDate(date)]);
    };
    CalendarCell = tslib_1.__decorate([
        Themed_1.theme(css)
    ], CalendarCell);
    return CalendarCell;
}(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase)));
exports.CalendarCell = CalendarCell;
exports.default = CalendarCell;

/*# sourceMappingURL=CalendarCell.js.map*/