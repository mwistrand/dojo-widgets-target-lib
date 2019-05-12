import * as tslib_1 from "tslib";
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import { v } from '@dojo/framework/widget-core/d';
import * as css from '../theme/calendar.m.css';
let CalendarCell = class CalendarCell extends ThemedMixin(WidgetBase) {
    _onClick(event) {
        event.stopPropagation();
        const { date, disabled = false, onClick } = this.properties;
        onClick && onClick(date, disabled);
    }
    _onKeyDown(event) {
        event.stopPropagation();
        const { onKeyDown } = this.properties;
        onKeyDown &&
            onKeyDown(event.which, () => {
                event.preventDefault();
            });
    }
    formatDate(date) {
        return v('span', [`${date}`]);
    }
    getModifierClasses() {
        const { disabled = false, outOfRange = false, selected = false, today = false } = this.properties;
        return [
            disabled || outOfRange ? css.inactiveDate : null,
            outOfRange ? css.outOfRange : null,
            selected ? css.selectedDate : null,
            today ? css.todayDate : null
        ];
    }
    render() {
        const { callFocus, date, focusable = false, selected = false, onFocusCalled } = this.properties;
        if (callFocus) {
            this.meta(Focus).set('root');
            onFocusCalled && onFocusCalled();
        }
        return v('td', {
            key: 'root',
            role: 'gridcell',
            'aria-selected': `${selected}`,
            tabIndex: focusable ? 0 : -1,
            classes: this.theme([css.date, ...this.getModifierClasses()]),
            onclick: this._onClick,
            onkeydown: this._onKeyDown
        }, [this.formatDate(date)]);
    }
};
CalendarCell = tslib_1.__decorate([
    theme(css)
], CalendarCell);
export { CalendarCell };
export default CalendarCell;

/*# sourceMappingURL=CalendarCell.mjs.map*/