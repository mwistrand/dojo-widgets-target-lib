import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { DNode } from '@dojo/framework/widget-core/interfaces';
/**
 * @type CalendarCellProperties
 *
 * Properties that can be set on a Calendar Date Cell
 *
 * @property callFocus        Used to immediately call focus on the cell
 * @property date             Integer date value
 * @property disabled         Boolean, whether the date is in the displayed month
 * @property focusable        Boolean, whether the date can receive tab focus
 * @property outOfRange       Boolean, true if the date is outside the min/max
 * @property selected         True if the date is currently selected
 * @property today            True if the date the same as the current day
 * @property onClick          Callback function for the click event
 * @property onFocusCalled    Callback function when the cell receives focus
 * @property onKeyDown        Callback function for the key down event
 */
export interface CalendarCellProperties extends ThemedProperties {
    callFocus?: boolean;
    date: number;
    disabled?: boolean;
    focusable?: boolean;
    outOfRange?: boolean;
    selected?: boolean;
    today?: boolean;
    onClick?(date: number, disabled: boolean): void;
    onFocusCalled?(): void;
    onKeyDown?(key: number, preventDefault: () => void): void;
}
declare const CalendarCell_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export declare class CalendarCell extends CalendarCell_base<CalendarCellProperties> {
    private _onClick(event);
    private _onKeyDown(event);
    protected formatDate(date: number): DNode;
    protected getModifierClasses(): (string | null)[];
    protected render(): DNode;
}
export default CalendarCell;
