import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import calendarBundle from './nls/Calendar';
/**
 * Enum for next/previous buttons
 */
export declare enum Paging {
    next = "next",
    previous = "previous",
}
/**
 * Enum for month or year controls
 */
export declare enum Controls {
    month = "month",
    year = "year",
}
/**
 * @type DatePickerProperties
 *
 * Properties that can be set on a Calendar component
 *
 * @property labelId              Set id to reference label containing current month and year
 * @property labels               Customize or internationalize accessible helper text
 * @property month                Currently displayed month, zero-based
 * @property monthNames           Array of full and abbreviated month names
 * @property year                 Currently displayed year
 * @property yearRange            Number of years to display in a single page of the year popup
 * @property renderMonthLabel     Format the displayed current month and year
 * @property minDate              Minimum date to be picked
 * @property maxDate              Maximum date to be picked
 * @property onPopupChange        Called when a user action occurs that triggers a change in the month or year popup state
 * @property onRequestMonthChange Called when a month should change; receives the zero-based month number
 * @property onRequestYearChange  Called when a year should change; receives the year as an integer
 */
export interface DatePickerProperties extends ThemedProperties {
    labelId?: string;
    labels: typeof calendarBundle.messages;
    month: number;
    monthNames: {
        short: string;
        long: string;
    }[];
    year: number;
    yearRange?: number;
    minDate?: Date;
    maxDate?: Date;
    renderMonthLabel?(month: number, year: number): string;
    onPopupChange?(open: boolean): void;
    onRequestMonthChange?(month: number): void;
    onRequestYearChange?(year: number): void;
}
declare const DatePicker_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export declare class DatePicker extends DatePicker_base<DatePickerProperties> {
    private _idBase;
    private _monthPopupOpen;
    private _yearPopupOpen;
    private _yearPage;
    private _closeMonthPopup(event?);
    private _closeYearPopup(event?);
    private _getMonthInputKey(month);
    private _getPopupState();
    private _getYearInputKey(year);
    private _getYearRange();
    private _onMonthButtonClick(event);
    private _onMonthRadioChange(event);
    private _onPopupKeyDown(event);
    private _onYearButtonClick(event);
    private _onYearPageDown(event);
    private _onYearPageUp(event);
    private _onYearRadioChange(event);
    private _openMonthPopup();
    private _openYearPopup();
    private _monthInMinMax(year, month);
    private _yearInMinMax(year);
    protected renderControlsTrigger(type: Controls): DNode;
    protected renderMonthLabel(month: number, year: number): DNode;
    protected renderMonthRadios(): DNode[];
    protected renderPagingButtonContent(type: Paging): DNode[];
    protected renderYearRadios(): DNode[];
    protected render(): DNode;
}
export default DatePicker;
