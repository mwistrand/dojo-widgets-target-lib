import * as tslib_1 from "tslib";
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { I18nMixin } from '@dojo/framework/widget-core/mixins/I18n';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { v, w } from '@dojo/framework/widget-core/d';
import { uuid } from '@dojo/framework/core/util';
import commonBundle from '../common/nls/common';
import { formatAriaProperties, Keys } from '../common/util';
import { monthInMin, monthInMax } from './date-utils';
import CalendarCell from './CalendarCell';
import DatePicker, { Paging } from './DatePicker';
import Icon from '../icon/index';
import calendarBundle from './nls/Calendar';
import * as css from '../theme/calendar.m.css';
import * as baseCss from '../common/styles/base.m.css';
import customElement from '@dojo/framework/widget-core/decorators/customElement';
const DEFAULT_MONTHS = [
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
const DEFAULT_WEEKDAYS = [
    { short: 'sunShort', long: 'sunday' },
    { short: 'monShort', long: 'monday' },
    { short: 'tueShort', long: 'tuesday' },
    { short: 'wedShort', long: 'wednesday' },
    { short: 'thuShort', long: 'thursday' },
    { short: 'friShort', long: 'friday' },
    { short: 'satShort', long: 'saturday' }
];
let Calendar = class Calendar extends I18nMixin(ThemedMixin(WidgetBase)) {
    constructor() {
        super(...arguments);
        this._callDateFocus = false;
        this._defaultDate = new Date();
        this._focusedDay = 1;
        this._monthLabelId = uuid();
        this._popupOpen = false;
    }
    _getMonthLength(month, year) {
        const lastDate = new Date(year, month + 1, 0);
        return lastDate.getDate();
    }
    _getMonths(commonMessages) {
        return DEFAULT_MONTHS.map((month) => ({
            short: commonMessages[month.short],
            long: commonMessages[month.long]
        }));
    }
    _getMonthYear() {
        const { month, selectedDate = this._defaultDate, year } = this.properties;
        return {
            month: typeof month === 'number' ? month : selectedDate.getMonth(),
            year: typeof year === 'number' ? year : selectedDate.getFullYear()
        };
    }
    _getWeekdays(commonMessages) {
        return DEFAULT_WEEKDAYS.map((weekday) => ({
            short: commonMessages[weekday.short],
            long: commonMessages[weekday.long]
        }));
    }
    _goToDate(day) {
        const { month, year } = this._getMonthYear();
        const currentMonthLength = this._getMonthLength(month, year);
        const previousMonthLength = this._getMonthLength(month - 1, year);
        this._ensureDayIsInMinMax(new Date(year, month, day), (updatedDay) => (day = updatedDay));
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
    }
    _onDateClick(date, disabled) {
        const { onDateSelect } = this.properties;
        let { month, year } = this._getMonthYear();
        if (disabled) {
            ({ month, year } = date < 15 ? this._onMonthIncrement() : this._onMonthDecrement());
            this._callDateFocus = true;
        }
        this._focusedDay = date;
        onDateSelect && onDateSelect(new Date(year, month, date));
    }
    _onDateFocusCalled() {
        this._callDateFocus = false;
    }
    _onDateKeyDown(key, preventDefault) {
        const { month, year } = this._getMonthYear();
        switch (key) {
            case Keys.Up:
                preventDefault();
                this._goToDate(this._focusedDay - 7);
                break;
            case Keys.Down:
                preventDefault();
                this._goToDate(this._focusedDay + 7);
                break;
            case Keys.Left:
                preventDefault();
                this._goToDate(this._focusedDay - 1);
                break;
            case Keys.Right:
                preventDefault();
                this._goToDate(this._focusedDay + 1);
                break;
            case Keys.PageUp:
                preventDefault();
                this._goToDate(1);
                break;
            case Keys.PageDown:
                preventDefault();
                const monthLengh = this._getMonthLength(month, year);
                this._goToDate(monthLengh);
                break;
            case Keys.Enter:
            case Keys.Space:
                const { onDateSelect } = this.properties;
                onDateSelect && onDateSelect(new Date(year, month, this._focusedDay));
        }
    }
    _onMonthDecrement() {
        const { month, year } = this._getMonthYear();
        const { onMonthChange, onYearChange } = this.properties;
        if (month === 0) {
            onMonthChange && onMonthChange(11);
            onYearChange && onYearChange(year - 1);
            return { month: 11, year: year - 1 };
        }
        onMonthChange && onMonthChange(month - 1);
        return { month: month - 1, year: year };
    }
    _onMonthIncrement() {
        const { month, year } = this._getMonthYear();
        const { onMonthChange, onYearChange } = this.properties;
        if (month === 11) {
            onMonthChange && onMonthChange(0);
            onYearChange && onYearChange(year + 1);
            return { month: 0, year: year + 1 };
        }
        onMonthChange && onMonthChange(month + 1);
        return { month: month + 1, year: year };
    }
    _onMonthPageDown(event) {
        event.stopPropagation();
        this._onMonthDecrement();
    }
    _onMonthPageUp(event) {
        event.stopPropagation();
        this._onMonthIncrement();
    }
    _ensureDayIsInMinMax(newDate, update) {
        const { minDate, maxDate } = this.properties;
        if (minDate && newDate < minDate) {
            update(minDate.getDate());
        }
        else if (maxDate && newDate > maxDate) {
            update(maxDate.getDate());
        }
    }
    _renderDateGrid(selectedDate) {
        const { month, year } = this._getMonthYear();
        this._ensureDayIsInMinMax(new Date(year, month, this._focusedDay), (newDay) => (this._focusedDay = newDay));
        const currentMonthLength = this._getMonthLength(month, year);
        const previousMonthLength = this._getMonthLength(month - 1, year);
        const initialWeekday = new Date(year, month, 1).getDay();
        const todayString = new Date().toDateString();
        let dayIndex = 0;
        let isCurrentMonth = initialWeekday === 0;
        let cellMonth = isCurrentMonth ? month : month - 1;
        let date = isCurrentMonth ? 0 : previousMonthLength - initialWeekday;
        let isSelectedDay;
        let isToday;
        let weeks = [];
        let days;
        let dateObj;
        let dateString;
        let weekday;
        for (let week = 0; week < 6; week++) {
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
            weeks.push(v('tr', days));
        }
        return weeks;
    }
    renderDateCell(dateObj, index, selected, currentMonth, today) {
        const { minDate, maxDate } = this.properties;
        const date = dateObj.getDate();
        const { theme, classes } = this.properties;
        const outOfRange = Boolean((minDate && dateObj < minDate) || (maxDate && dateObj > maxDate));
        const focusable = currentMonth && date === this._focusedDay;
        return w(CalendarCell, {
            classes,
            key: `date-${index}`,
            callFocus: this._callDateFocus && focusable,
            date,
            outOfRange,
            focusable,
            disabled: !currentMonth,
            selected,
            theme,
            today,
            onClick: outOfRange ? undefined : this._onDateClick,
            onFocusCalled: this._onDateFocusCalled,
            onKeyDown: this._onDateKeyDown
        });
    }
    renderDatePicker(commonMessages, labels) {
        const { monthNames = this._getMonths(commonMessages), renderMonthLabel, theme, classes, onMonthChange, onYearChange, minDate, maxDate } = this.properties;
        const { month, year } = this._getMonthYear();
        return w(DatePicker, {
            key: 'date-picker',
            classes,
            labelId: this._monthLabelId,
            labels,
            month,
            monthNames,
            renderMonthLabel,
            theme,
            year,
            minDate,
            maxDate,
            onPopupChange: (open) => {
                this._popupOpen = open;
                this.invalidate();
            },
            onRequestMonthChange: (requestMonth) => {
                onMonthChange && onMonthChange(requestMonth);
            },
            onRequestYearChange: (requestYear) => {
                onYearChange && onYearChange(requestYear);
            }
        });
    }
    renderPagingButtonContent(type, labels) {
        const { theme, classes } = this.properties;
        const iconType = type === Paging.next ? 'rightIcon' : 'leftIcon';
        const labelText = type === Paging.next ? labels.nextMonth : labels.previousMonth;
        return [
            w(Icon, { type: iconType, theme, classes }),
            v('span', { classes: [baseCss.visuallyHidden] }, [labelText])
        ];
    }
    renderWeekdayCell(day) {
        const { renderWeekdayCell } = this.properties;
        return renderWeekdayCell
            ? renderWeekdayCell(day)
            : v('abbr', { title: day.long }, [day.short]);
    }
    render() {
        const { messages: commonMessages } = this.localizeBundle(commonBundle);
        const { labels = this.localizeBundle(calendarBundle).messages, aria = {}, selectedDate, minDate, maxDate, weekdayNames = this._getWeekdays(commonMessages) } = this.properties;
        const { year, month } = this._getMonthYear();
        // Calendar Weekday array
        const weekdays = [];
        for (const weekday in weekdayNames) {
            weekdays.push(v('th', {
                role: 'columnheader',
                classes: this.theme(css.weekday)
            }, [this.renderWeekdayCell(weekdayNames[weekday])]));
        }
        return v('div', Object.assign({ classes: this.theme(css.root) }, formatAriaProperties(aria)), [
            // header
            this.renderDatePicker(commonMessages, labels),
            // date table
            v('table', {
                cellspacing: '0',
                cellpadding: '0',
                role: 'grid',
                'aria-labelledby': this._monthLabelId,
                classes: [
                    this.theme(css.dateGrid),
                    this._popupOpen ? baseCss.visuallyHidden : null
                ]
            }, [
                v('thead', [v('tr', weekdays)]),
                v('tbody', this._renderDateGrid(selectedDate))
            ]),
            // controls
            v('div', {
                classes: [
                    this.theme(css.controls),
                    this._popupOpen ? baseCss.visuallyHidden : null
                ]
            }, [
                v('button', {
                    classes: this.theme(css.previous),
                    tabIndex: this._popupOpen ? -1 : 0,
                    type: 'button',
                    disabled: !monthInMin(year, month - 1, minDate),
                    onclick: this._onMonthPageDown
                }, this.renderPagingButtonContent(Paging.previous, labels)),
                v('button', {
                    classes: this.theme(css.next),
                    tabIndex: this._popupOpen ? -1 : 0,
                    type: 'button',
                    disabled: !monthInMax(year, month + 1, maxDate),
                    onclick: this._onMonthPageUp
                }, this.renderPagingButtonContent(Paging.next, labels))
            ])
        ]);
    }
};
Calendar = tslib_1.__decorate([
    theme(css),
    customElement({
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
export { Calendar };
export default Calendar;

/*# sourceMappingURL=index.mjs.map*/