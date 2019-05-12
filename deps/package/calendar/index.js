"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var I18n_1 = require("@dojo/framework/widget-core/mixins/I18n");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var d_1 = require("@dojo/framework/widget-core/d");
var util_1 = require("@dojo/framework/core/util");
var common_1 = require("../common/nls/common");
var util_2 = require("../common/util");
var date_utils_1 = require("./date-utils");
var CalendarCell_1 = require("./CalendarCell");
var DatePicker_1 = require("./DatePicker");
var index_1 = require("../icon/index");
var Calendar_1 = require("./nls/Calendar");
var css = require("../theme/calendar.m.css");
var baseCss = require("../common/styles/base.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var DEFAULT_MONTHS = [
    { short: 'janShort', long: 'january' },
    { short: 'febShort', long: 'february' },
    { short: 'marShort', long: 'march' },
    { short: 'aprShort', long: 'april' },
    { short: 'mayShort', long: 'may' },
    { short: 'junShort', long: 'june' },
    { short: 'julShort', long: 'july' },
    { short: 'augShort', long: 'august' },
    { short: 'sepShort', long: 'september' },
    { short: 'octShort', long: 'october' },
    { short: 'novShort', long: 'november' },
    { short: 'decShort', long: 'december' }
];
var DEFAULT_WEEKDAYS = [
    { short: 'sunShort', long: 'sunday' },
    { short: 'monShort', long: 'monday' },
    { short: 'tueShort', long: 'tuesday' },
    { short: 'wedShort', long: 'wednesday' },
    { short: 'thuShort', long: 'thursday' },
    { short: 'friShort', long: 'friday' },
    { short: 'satShort', long: 'saturday' }
];
var Calendar = /** @class */ (function (_super) {
    tslib_1.__extends(Calendar, _super);
    function Calendar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._callDateFocus = false;
        _this._defaultDate = new Date();
        _this._focusedDay = 1;
        _this._monthLabelId = util_1.uuid();
        _this._popupOpen = false;
        return _this;
    }
    Calendar.prototype._getMonthLength = function (month, year) {
        var lastDate = new Date(year, month + 1, 0);
        return lastDate.getDate();
    };
    Calendar.prototype._getMonths = function (commonMessages) {
        return DEFAULT_MONTHS.map(function (month) { return ({
            short: commonMessages[month.short],
            long: commonMessages[month.long]
        }); });
    };
    Calendar.prototype._getMonthYear = function () {
        var _a = this.properties, month = _a.month, _b = _a.selectedDate, selectedDate = _b === void 0 ? this._defaultDate : _b, year = _a.year;
        return {
            month: typeof month === 'number' ? month : selectedDate.getMonth(),
            year: typeof year === 'number' ? year : selectedDate.getFullYear()
        };
    };
    Calendar.prototype._getWeekdays = function (commonMessages) {
        return DEFAULT_WEEKDAYS.map(function (weekday) { return ({
            short: commonMessages[weekday.short],
            long: commonMessages[weekday.long]
        }); });
    };
    Calendar.prototype._goToDate = function (day) {
        var _a = this._getMonthYear(), month = _a.month, year = _a.year;
        var currentMonthLength = this._getMonthLength(month, year);
        var previousMonthLength = this._getMonthLength(month - 1, year);
        this._ensureDayIsInMinMax(new Date(year, month, day), function (updatedDay) { return (day = updatedDay); });
        if (day < 1) {
            this._onMonthDecrement();
            day += previousMonthLength;
        }
        else if (day > currentMonthLength) {
            this._onMonthIncrement();
            day -= currentMonthLength;
        }
        this._focusedDay = day;
        this._callDateFocus = true;
        this.invalidate();
    };
    Calendar.prototype._onDateClick = function (date, disabled) {
        var onDateSelect = this.properties.onDateSelect;
        var _a = this._getMonthYear(), month = _a.month, year = _a.year;
        if (disabled) {
            (_b = date < 15 ? this._onMonthIncrement() : this._onMonthDecrement(), month = _b.month, year = _b.year);
            this._callDateFocus = true;
        }
        this._focusedDay = date;
        onDateSelect && onDateSelect(new Date(year, month, date));
        var _b;
    };
    Calendar.prototype._onDateFocusCalled = function () {
        this._callDateFocus = false;
    };
    Calendar.prototype._onDateKeyDown = function (key, preventDefault) {
        var _a = this._getMonthYear(), month = _a.month, year = _a.year;
        switch (key) {
            case util_2.Keys.Up:
                preventDefault();
                this._goToDate(this._focusedDay - 7);
                break;
            case util_2.Keys.Down:
                preventDefault();
                this._goToDate(this._focusedDay + 7);
                break;
            case util_2.Keys.Left:
                preventDefault();
                this._goToDate(this._focusedDay - 1);
                break;
            case util_2.Keys.Right:
                preventDefault();
                this._goToDate(this._focusedDay + 1);
                break;
            case util_2.Keys.PageUp:
                preventDefault();
                this._goToDate(1);
                break;
            case util_2.Keys.PageDown:
                preventDefault();
                var monthLengh = this._getMonthLength(month, year);
                this._goToDate(monthLengh);
                break;
            case util_2.Keys.Enter:
            case util_2.Keys.Space:
                var onDateSelect = this.properties.onDateSelect;
                onDateSelect && onDateSelect(new Date(year, month, this._focusedDay));
        }
    };
    Calendar.prototype._onMonthDecrement = function () {
        var _a = this._getMonthYear(), month = _a.month, year = _a.year;
        var _b = this.properties, onMonthChange = _b.onMonthChange, onYearChange = _b.onYearChange;
        if (month === 0) {
            onMonthChange && onMonthChange(11);
            onYearChange && onYearChange(year - 1);
            return { month: 11, year: year - 1 };
        }
        onMonthChange && onMonthChange(month - 1);
        return { month: month - 1, year: year };
    };
    Calendar.prototype._onMonthIncrement = function () {
        var _a = this._getMonthYear(), month = _a.month, year = _a.year;
        var _b = this.properties, onMonthChange = _b.onMonthChange, onYearChange = _b.onYearChange;
        if (month === 11) {
            onMonthChange && onMonthChange(0);
            onYearChange && onYearChange(year + 1);
            return { month: 0, year: year + 1 };
        }
        onMonthChange && onMonthChange(month + 1);
        return { month: month + 1, year: year };
    };
    Calendar.prototype._onMonthPageDown = function (event) {
        event.stopPropagation();
        this._onMonthDecrement();
    };
    Calendar.prototype._onMonthPageUp = function (event) {
        event.stopPropagation();
        this._onMonthIncrement();
    };
    Calendar.prototype._ensureDayIsInMinMax = function (newDate, update) {
        var _a = this.properties, minDate = _a.minDate, maxDate = _a.maxDate;
        if (minDate && newDate < minDate) {
            update(minDate.getDate());
        }
        else if (maxDate && newDate > maxDate) {
            update(maxDate.getDate());
        }
    };
    Calendar.prototype._renderDateGrid = function (selectedDate) {
        var _this = this;
        var _a = this._getMonthYear(), month = _a.month, year = _a.year;
        this._ensureDayIsInMinMax(new Date(year, month, this._focusedDay), function (newDay) { return (_this._focusedDay = newDay); });
        var currentMonthLength = this._getMonthLength(month, year);
        var previousMonthLength = this._getMonthLength(month - 1, year);
        var initialWeekday = new Date(year, month, 1).getDay();
        var todayString = new Date().toDateString();
        var dayIndex = 0;
        var isCurrentMonth = initialWeekday === 0;
        var cellMonth = isCurrentMonth ? month : month - 1;
        var date = isCurrentMonth ? 0 : previousMonthLength - initialWeekday;
        var isSelectedDay;
        var isToday;
        var weeks = [];
        var days;
        var dateObj;
        var dateString;
        var weekday;
        for (var week = 0; week < 6; week++) {
            days = [];
            for (weekday = 0; weekday < 7; weekday++) {
                // find the next date
                // if we've reached the end of the previous month, reset to 1
                if (date > dayIndex && date >= previousMonthLength) {
                    date = 1;
                    cellMonth++;
                }
                else if (date <= dayIndex && date >= currentMonthLength) {
                    date = 1;
                    cellMonth++;
                }
                else {
                    date++;
                }
                // set isSelectedDay if the dates match
                dateObj = new Date(year, cellMonth, date);
                dateString = dateObj.toDateString();
                isSelectedDay = Boolean(selectedDate && dateString === selectedDate.toDateString());
                isCurrentMonth = month === cellMonth;
                isToday = dateString === todayString;
                days.push(this.renderDateCell(dateObj, dayIndex++, isSelectedDay, isCurrentMonth, isToday));
            }
            weeks.push(d_1.v('tr', days));
        }
        return weeks;
    };
    Calendar.prototype.renderDateCell = function (dateObj, index, selected, currentMonth, today) {
        var _a = this.properties, minDate = _a.minDate, maxDate = _a.maxDate;
        var date = dateObj.getDate();
        var _b = this.properties, theme = _b.theme, classes = _b.classes;
        var outOfRange = Boolean((minDate && dateObj < minDate) || (maxDate && dateObj > maxDate));
        var focusable = currentMonth && date === this._focusedDay;
        return d_1.w(CalendarCell_1.default, {
            classes: classes,
            key: "date-" + index,
            callFocus: this._callDateFocus && focusable,
            date: date,
            outOfRange: outOfRange,
            focusable: focusable,
            disabled: !currentMonth,
            selected: selected,
            theme: theme,
            today: today,
            onClick: outOfRange ? undefined : this._onDateClick,
            onFocusCalled: this._onDateFocusCalled,
            onKeyDown: this._onDateKeyDown
        });
    };
    Calendar.prototype.renderDatePicker = function (commonMessages, labels) {
        var _this = this;
        var _a = this.properties, _b = _a.monthNames, monthNames = _b === void 0 ? this._getMonths(commonMessages) : _b, renderMonthLabel = _a.renderMonthLabel, theme = _a.theme, classes = _a.classes, onMonthChange = _a.onMonthChange, onYearChange = _a.onYearChange, minDate = _a.minDate, maxDate = _a.maxDate;
        var _c = this._getMonthYear(), month = _c.month, year = _c.year;
        return d_1.w(DatePicker_1.default, {
            key: 'date-picker',
            classes: classes,
            labelId: this._monthLabelId,
            labels: labels,
            month: month,
            monthNames: monthNames,
            renderMonthLabel: renderMonthLabel,
            theme: theme,
            year: year,
            minDate: minDate,
            maxDate: maxDate,
            onPopupChange: function (open) {
                _this._popupOpen = open;
                _this.invalidate();
            },
            onRequestMonthChange: function (requestMonth) {
                onMonthChange && onMonthChange(requestMonth);
            },
            onRequestYearChange: function (requestYear) {
                onYearChange && onYearChange(requestYear);
            }
        });
    };
    Calendar.prototype.renderPagingButtonContent = function (type, labels) {
        var _a = this.properties, theme = _a.theme, classes = _a.classes;
        var iconType = type === DatePicker_1.Paging.next ? 'rightIcon' : 'leftIcon';
        var labelText = type === DatePicker_1.Paging.next ? labels.nextMonth : labels.previousMonth;
        return [
            d_1.w(index_1.default, { type: iconType, theme: theme, classes: classes }),
            d_1.v('span', { classes: [baseCss.visuallyHidden] }, [labelText])
        ];
    };
    Calendar.prototype.renderWeekdayCell = function (day) {
        var renderWeekdayCell = this.properties.renderWeekdayCell;
        return renderWeekdayCell
            ? renderWeekdayCell(day)
            : d_1.v('abbr', { title: day.long }, [day.short]);
    };
    Calendar.prototype.render = function () {
        var commonMessages = this.localizeBundle(common_1.default).messages;
        var _a = this.properties, _b = _a.labels, labels = _b === void 0 ? this.localizeBundle(Calendar_1.default).messages : _b, _c = _a.aria, aria = _c === void 0 ? {} : _c, selectedDate = _a.selectedDate, minDate = _a.minDate, maxDate = _a.maxDate, _d = _a.weekdayNames, weekdayNames = _d === void 0 ? this._getWeekdays(commonMessages) : _d;
        var _e = this._getMonthYear(), year = _e.year, month = _e.month;
        // Calendar Weekday array
        var weekdays = [];
        for (var weekday in weekdayNames) {
            weekdays.push(d_1.v('th', {
                role: 'columnheader',
                classes: this.theme(css.weekday)
            }, [this.renderWeekdayCell(weekdayNames[weekday])]));
        }
        return d_1.v('div', tslib_1.__assign({ classes: this.theme(css.root) }, util_2.formatAriaProperties(aria)), [
            // header
            this.renderDatePicker(commonMessages, labels),
            // date table
            d_1.v('table', {
                cellspacing: '0',
                cellpadding: '0',
                role: 'grid',
                'aria-labelledby': this._monthLabelId,
                classes: [
                    this.theme(css.dateGrid),
                    this._popupOpen ? baseCss.visuallyHidden : null
                ]
            }, [
                d_1.v('thead', [d_1.v('tr', weekdays)]),
                d_1.v('tbody', this._renderDateGrid(selectedDate))
            ]),
            // controls
            d_1.v('div', {
                classes: [
                    this.theme(css.controls),
                    this._popupOpen ? baseCss.visuallyHidden : null
                ]
            }, [
                d_1.v('button', {
                    classes: this.theme(css.previous),
                    tabIndex: this._popupOpen ? -1 : 0,
                    type: 'button',
                    disabled: !date_utils_1.monthInMin(year, month - 1, minDate),
                    onclick: this._onMonthPageDown
                }, this.renderPagingButtonContent(DatePicker_1.Paging.previous, labels)),
                d_1.v('button', {
                    classes: this.theme(css.next),
                    tabIndex: this._popupOpen ? -1 : 0,
                    type: 'button',
                    disabled: !date_utils_1.monthInMax(year, month + 1, maxDate),
                    onclick: this._onMonthPageUp
                }, this.renderPagingButtonContent(DatePicker_1.Paging.next, labels))
            ])
        ]);
    };
    Calendar = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.default({
            tag: 'dojo-calendar',
            properties: [
                'aria',
                'classes',
                'selectedDate',
                'month',
                'year',
                'renderMonthLabel',
                'renderWeekdayCell',
                'labels',
                'monthNames',
                'weekdayNames',
                'theme'
            ],
            events: ['onDateSelect', 'onMonthChange', 'onYearChange']
        })
    ], Calendar);
    return Calendar;
}(I18n_1.I18nMixin(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase))));
exports.Calendar = Calendar;
exports.default = Calendar;

/*# sourceMappingURL=index.js.map*/