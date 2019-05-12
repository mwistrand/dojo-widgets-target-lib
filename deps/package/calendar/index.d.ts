import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { I18nMixin } from '@dojo/framework/widget-core/mixins/I18n';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { CommonMessages } from '../common/interfaces';
import { CustomAriaProperties } from '../common/interfaces';
import { Paging } from './DatePicker';
import calendarBundle from './nls/Calendar';
export declare type CalendarMessages = typeof calendarBundle.messages;
/**
 * @type CalendarProperties
 *
 * Properties that can be set on a Calendar component
 *
 * @property labels            Customize or internationalize accessible text for the Calendar widget
 * @property month             Set the currently displayed month, 0-based
 * @property monthNames        Customize or internationalize full month names and abbreviations
 * @property selectedDate      The currently selected date
 * @property weekdayNames      Customize or internationalize weekday names and abbreviations
 * @property year              Set the currently displayed year
 * @property minDate           Set the earliest date the calendar will display (it will show the whole month but not allow previous selections)
 * @property maxDate           Set the latest date the calendar will display (it will show the whole month but not allow later selections)
 * @property renderMonthLabel  Format the displayed current month and year
 * @property renderWeekdayCell Format the weekday column headers
 * @property onMonthChange     Function called when the month changes
 * @property onYearChange      Function called when the year changes
 * @property onDateSelect      Function called when the user selects a date
 */
export interface CalendarProperties extends ThemedProperties, CustomAriaProperties {
    labels?: CalendarMessages;
    month?: number;
    monthNames?: {
        short: string;
        long: string;
    }[];
    selectedDate?: Date;
    weekdayNames?: {
        short: string;
        long: string;
    }[];
    year?: number;
    minDate?: Date;
    maxDate?: Date;
    renderMonthLabel?(month: number, year: number): string;
    renderWeekdayCell?(day: {
        short: string;
        long: string;
    }): DNode;
    onMonthChange?(month: number): void;
    onYearChange?(year: number): void;
    onDateSelect?(date: Date): void;
}
declare const Calendar_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => I18nMixin);
export declare class Calendar extends Calendar_base<CalendarProperties> {
    private _callDateFocus;
    private _defaultDate;
    private _focusedDay;
    private _monthLabelId;
    private _popupOpen;
    private _getMonthLength(month, year);
    private _getMonths(commonMessages);
    private _getMonthYear();
    private _getWeekdays(commonMessages);
    private _goToDate(day);
    private _onDateClick(date, disabled);
    private _onDateFocusCalled();
    private _onDateKeyDown(key, preventDefault);
    private _onMonthDecrement();
    private _onMonthIncrement();
    private _onMonthPageDown(event);
    private _onMonthPageUp(event);
    private _ensureDayIsInMinMax(newDate, update);
    private _renderDateGrid(selectedDate?);
    protected renderDateCell(dateObj: Date, index: number, selected: boolean, currentMonth: boolean, today: boolean): DNode;
    protected renderDatePicker(commonMessages: CommonMessages, labels: CalendarMessages): DNode;
    protected renderPagingButtonContent(type: Paging, labels: CalendarMessages): DNode[];
    protected renderWeekdayCell(day: {
        short: string;
        long: string;
    }): DNode;
    protected render(): DNode;
}
export default Calendar;
