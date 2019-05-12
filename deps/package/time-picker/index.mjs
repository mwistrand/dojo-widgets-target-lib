import * as tslib_1 from "tslib";
import { padStart } from '@dojo/framework/shim/string';
import { v, w } from '@dojo/framework/widget-core/d';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin } from '@dojo/framework/widget-core/mixins/Focus';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { diffProperty } from '@dojo/framework/widget-core/decorators/diffProperty';
import { auto } from '@dojo/framework/widget-core/diff';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import ComboBox from '../combobox/index';
import { formatAriaProperties } from '../common/util';
import Label from '../label/index';
import { uuid } from '@dojo/framework/core/util';
import * as css from '../theme/time-picker.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
/**
 * @private
 * Regular epression that matches a standard time string ('HH:mm:ss').
 */
const TIME_PATTERN = /^\d{2}:\d{2}(:\d{2})?$/;
/**
 * Generate an array of time unit objects from the specified start date to the specified end date.
 *
 * @param start    The start time. Defaults to midnight.
 * @param end      The end time. Defaults to 23:59:59.
 * @param step     The amount of time in seconds between each step. Defaults to 60.
 * @return         An array of time unit objects.
 */
export function getOptions(start = '00:00:00', end = '23:59:59', step = 60) {
    const endUnits = parseUnits(end);
    const startUnits = parseUnits(start);
    const endTime = getTime(endUnits);
    const date = new Date();
    let time = getTime(startUnits, date);
    const i = step * 1000;
    const options = [];
    while (time <= endTime) {
        options.push(time);
        time += i;
    }
    return options.map((time) => {
        date.setTime(time);
        return {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        };
    });
}
/**
 * @private
 * Create a numeric timestamp for the specified hour, minute, and second units.
 *
 * @param units   An object containing the hours, minutes, and seconds for the time.
 * @param date    An optional date object.
 * @return        The timestamp, in milliseconds, according to universal time.
 */
function getTime(units, date = new Date()) {
    const { hour, minute, second } = units;
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(second);
    date.setMilliseconds(0);
    return date.getTime();
}
/**
 * Convert a standard time string into an object with `hour`, `minute`, and `second` number properties.
 *
 * For example, '12:30' is converted to `{ hour: 12, minute: 30, second: 0 }`, and '19:03:27' is converted
 * to `{ hour: 19, minute: 3, second: 27 }`.
 *
 * @param value   A standard time string or an object with `hour`, `minute`, and `second` properties.
 * @return        An object containing `hour`, `second`, and `number` properties.
 */
export function parseUnits(value) {
    if (typeof value === 'string') {
        if (!TIME_PATTERN.test(value)) {
            throw new Error('Time strings must be in the format HH:mm or HH:mm:ss');
        }
        const [hour, minute, second = 0] = value.split(':').map((unit) => parseInt(unit, 10));
        return { hour, minute, second };
    }
    return value;
}
let TimePicker = class TimePicker extends ThemedMixin(FocusMixin(WidgetBase)) {
    constructor() {
        super();
        this.options = null;
        this._uuid = uuid();
    }
    _formatUnits(units) {
        const { step = 60 } = this.properties;
        const { hour, minute, second } = units;
        return (step >= 60 ? [hour, minute] : [hour, minute, second])
            .map((unit) => padStart(String(unit), 2, '0'))
            .join(':');
    }
    _getOptionLabel(value) {
        const { getOptionLabel } = this.properties;
        const units = parseUnits(value);
        return getOptionLabel ? getOptionLabel(units) : this._formatUnits(units);
    }
    _onBlur(value) {
        const { key, onBlur } = this.properties;
        onBlur && onBlur(value, key);
    }
    _onChange(value) {
        const { key, onChange } = this.properties;
        onChange && onChange(value, key);
    }
    _onFocus(value) {
        const { key, onFocus } = this.properties;
        onFocus && onFocus(value, key);
    }
    _onMenuChange(open) {
        const { key, onMenuChange } = this.properties;
        onMenuChange && onMenuChange(open, key);
    }
    _onNativeBlur(event) {
        const { key, onBlur } = this.properties;
        onBlur && onBlur(event.target.value, key);
    }
    _onNativeChange(event) {
        const { key, onChange } = this.properties;
        onChange && onChange(event.target.value, key);
    }
    _onNativeFocus(event) {
        const { key, onFocus } = this.properties;
        onFocus && onFocus(event.target.value, key);
    }
    _onRequestOptions() {
        const { onRequestOptions, key } = this.properties;
        onRequestOptions && onRequestOptions(key);
    }
    getRootClasses() {
        const { disabled, invalid, readOnly, required } = this.properties;
        const focus = this.meta(Focus).get('root');
        return [
            css.root,
            disabled ? css.disabled : null,
            focus.containsFocus ? css.focused : null,
            invalid ? css.invalid : null,
            readOnly ? css.readonly : null,
            required ? css.required : null
        ];
    }
    getOptions() {
        if (this.options) {
            return this.options;
        }
        const { end, start, step } = this.properties;
        this.options = getOptions(start, end, step);
        return this.options;
    }
    onPropertiesChanged() {
        this.options = null;
    }
    renderCustomInput() {
        const { clearable, disabled, extraClasses, widgetId = this._uuid, inputProperties, invalid, isOptionDisabled, label, labelAfter, labelHidden, openOnFocus, options = this.getOptions(), readOnly, required, theme, classes, value } = this.properties;
        return w(ComboBox, {
            key: 'combo',
            clearable,
            disabled,
            extraClasses,
            getResultLabel: this._getOptionLabel.bind(this),
            widgetId,
            focus: this.shouldFocus,
            inputProperties,
            invalid,
            isResultDisabled: isOptionDisabled,
            label,
            labelAfter,
            labelHidden,
            onBlur: this._onBlur,
            onChange: this._onChange,
            onFocus: this._onFocus,
            onMenuChange: this._onMenuChange,
            onRequestResults: this._onRequestOptions.bind(this),
            openOnFocus,
            readOnly,
            required,
            results: options,
            theme,
            classes,
            value
        });
    }
    renderNativeInput() {
        const { disabled, end, widgetId = this._uuid, inputProperties = {}, invalid, name, readOnly, required, start, step, value, label, theme, classes, labelHidden = false, labelAfter = false } = this.properties;
        const focus = this.meta(Focus).get('root');
        const { aria = {} } = inputProperties;
        const children = [
            label
                ? w(Label, {
                    theme,
                    classes,
                    disabled,
                    focused: focus.containsFocus,
                    invalid,
                    readOnly,
                    required,
                    hidden: labelHidden,
                    forId: widgetId
                }, [label])
                : null,
            v('input', Object.assign({ id: widgetId }, formatAriaProperties(aria), { 'aria-invalid': invalid === true ? 'true' : null, 'aria-readonly': readOnly === true ? 'true' : null, classes: this.theme(css.input), disabled, focus: this.shouldFocus, invalid, key: 'native-input', max: end, min: start, name, onblur: this._onNativeBlur, onchange: this._onNativeChange, onfocus: this._onNativeFocus, readOnly,
                required,
                step, type: 'time', value }))
        ];
        return v('div', {
            key: 'root',
            classes: this.theme(this.getRootClasses())
        }, labelAfter ? children.reverse() : children);
    }
    render() {
        const { useNativeElement } = this.properties;
        return useNativeElement ? this.renderNativeInput() : this.renderCustomInput();
    }
};
tslib_1.__decorate([
    diffProperty('start', auto),
    diffProperty('end', auto),
    diffProperty('step', auto),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TimePicker.prototype, "onPropertiesChanged", null);
TimePicker = tslib_1.__decorate([
    theme(css),
    customElement({
        tag: 'dojo-time-picker',
        properties: [
            'theme',
            'classes',
            'extraClasses',
            'isOptionDisabled',
            'getOptionLabel',
            'autoBlur',
            'clearable',
            'inputProperties',
            'openOnFocus',
            'options',
            'useNativeElement',
            'step',
            'labelAfter',
            'labelHidden',
            'required',
            'invalid',
            'readOnly',
            'disabled'
        ],
        attributes: ['widgetId', 'label', 'name', 'value', 'start', 'end'],
        events: ['onBlur', 'onChange', 'onFocus', 'onMenuChange', 'onRequestOptions']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], TimePicker);
export { TimePicker };
export default TimePicker;

/*# sourceMappingURL=index.mjs.map*/