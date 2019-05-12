"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var string_1 = require("@dojo/framework/shim/string");
var d_1 = require("@dojo/framework/widget-core/d");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Focus_1 = require("@dojo/framework/widget-core/mixins/Focus");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
var diff_1 = require("@dojo/framework/widget-core/diff");
var Focus_2 = require("@dojo/framework/widget-core/meta/Focus");
var index_1 = require("../combobox/index");
var util_1 = require("../common/util");
var index_2 = require("../label/index");
var util_2 = require("@dojo/framework/core/util");
var css = require("../theme/time-picker.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
/**
 * @private
 * Regular epression that matches a standard time string ('HH:mm:ss').
 */
var TIME_PATTERN = /^\d{2}:\d{2}(:\d{2})?$/;
/**
 * Generate an array of time unit objects from the specified start date to the specified end date.
 *
 * @param start    The start time. Defaults to midnight.
 * @param end      The end time. Defaults to 23:59:59.
 * @param step     The amount of time in seconds between each step. Defaults to 60.
 * @return         An array of time unit objects.
 */
function getOptions(start, end, step) {
    if (start === void 0) { start = '00:00:00'; }
    if (end === void 0) { end = '23:59:59'; }
    if (step === void 0) { step = 60; }
    var endUnits = parseUnits(end);
    var startUnits = parseUnits(start);
    var endTime = getTime(endUnits);
    var date = new Date();
    var time = getTime(startUnits, date);
    var i = step * 1000;
    var options = [];
    while (time <= endTime) {
        options.push(time);
        time += i;
    }
    return options.map(function (time) {
        date.setTime(time);
        return {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        };
    });
}
exports.getOptions = getOptions;
/**
 * @private
 * Create a numeric timestamp for the specified hour, minute, and second units.
 *
 * @param units   An object containing the hours, minutes, and seconds for the time.
 * @param date    An optional date object.
 * @return        The timestamp, in milliseconds, according to universal time.
 */
function getTime(units, date) {
    if (date === void 0) { date = new Date(); }
    var hour = units.hour, minute = units.minute, second = units.second;
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
function parseUnits(value) {
    if (typeof value === 'string') {
        if (!TIME_PATTERN.test(value)) {
            throw new Error('Time strings must be in the format HH:mm or HH:mm:ss');
        }
        var _a = tslib_1.__read(value.split(':').map(function (unit) { return parseInt(unit, 10); }), 3), hour = _a[0], minute = _a[1], _b = _a[2], second = _b === void 0 ? 0 : _b;
        return { hour: hour, minute: minute, second: second };
    }
    return value;
}
exports.parseUnits = parseUnits;
var TimePicker = /** @class */ (function (_super) {
    tslib_1.__extends(TimePicker, _super);
    function TimePicker() {
        var _this = _super.call(this) || this;
        _this.options = null;
        _this._uuid = util_2.uuid();
        return _this;
    }
    TimePicker.prototype._formatUnits = function (units) {
        var _a = this.properties.step, step = _a === void 0 ? 60 : _a;
        var hour = units.hour, minute = units.minute, second = units.second;
        return (step >= 60 ? [hour, minute] : [hour, minute, second])
            .map(function (unit) { return string_1.padStart(String(unit), 2, '0'); })
            .join(':');
    };
    TimePicker.prototype._getOptionLabel = function (value) {
        var getOptionLabel = this.properties.getOptionLabel;
        var units = parseUnits(value);
        return getOptionLabel ? getOptionLabel(units) : this._formatUnits(units);
    };
    TimePicker.prototype._onBlur = function (value) {
        var _a = this.properties, key = _a.key, onBlur = _a.onBlur;
        onBlur && onBlur(value, key);
    };
    TimePicker.prototype._onChange = function (value) {
        var _a = this.properties, key = _a.key, onChange = _a.onChange;
        onChange && onChange(value, key);
    };
    TimePicker.prototype._onFocus = function (value) {
        var _a = this.properties, key = _a.key, onFocus = _a.onFocus;
        onFocus && onFocus(value, key);
    };
    TimePicker.prototype._onMenuChange = function (open) {
        var _a = this.properties, key = _a.key, onMenuChange = _a.onMenuChange;
        onMenuChange && onMenuChange(open, key);
    };
    TimePicker.prototype._onNativeBlur = function (event) {
        var _a = this.properties, key = _a.key, onBlur = _a.onBlur;
        onBlur && onBlur(event.target.value, key);
    };
    TimePicker.prototype._onNativeChange = function (event) {
        var _a = this.properties, key = _a.key, onChange = _a.onChange;
        onChange && onChange(event.target.value, key);
    };
    TimePicker.prototype._onNativeFocus = function (event) {
        var _a = this.properties, key = _a.key, onFocus = _a.onFocus;
        onFocus && onFocus(event.target.value, key);
    };
    TimePicker.prototype._onRequestOptions = function () {
        var _a = this.properties, onRequestOptions = _a.onRequestOptions, key = _a.key;
        onRequestOptions && onRequestOptions(key);
    };
    TimePicker.prototype.getRootClasses = function () {
        var _a = this.properties, disabled = _a.disabled, invalid = _a.invalid, readOnly = _a.readOnly, required = _a.required;
        var focus = this.meta(Focus_2.default).get('root');
        return [
            css.root,
            disabled ? css.disabled : null,
            focus.containsFocus ? css.focused : null,
            invalid ? css.invalid : null,
            readOnly ? css.readonly : null,
            required ? css.required : null
        ];
    };
    TimePicker.prototype.getOptions = function () {
        if (this.options) {
            return this.options;
        }
        var _a = this.properties, end = _a.end, start = _a.start, step = _a.step;
        this.options = getOptions(start, end, step);
        return this.options;
    };
    TimePicker.prototype.onPropertiesChanged = function () {
        this.options = null;
    };
    TimePicker.prototype.renderCustomInput = function () {
        var _a = this.properties, clearable = _a.clearable, disabled = _a.disabled, extraClasses = _a.extraClasses, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, inputProperties = _a.inputProperties, invalid = _a.invalid, isOptionDisabled = _a.isOptionDisabled, label = _a.label, labelAfter = _a.labelAfter, labelHidden = _a.labelHidden, openOnFocus = _a.openOnFocus, _c = _a.options, options = _c === void 0 ? this.getOptions() : _c, readOnly = _a.readOnly, required = _a.required, theme = _a.theme, classes = _a.classes, value = _a.value;
        return d_1.w(index_1.default, {
            key: 'combo',
            clearable: clearable,
            disabled: disabled,
            extraClasses: extraClasses,
            getResultLabel: this._getOptionLabel.bind(this),
            widgetId: widgetId,
            focus: this.shouldFocus,
            inputProperties: inputProperties,
            invalid: invalid,
            isResultDisabled: isOptionDisabled,
            label: label,
            labelAfter: labelAfter,
            labelHidden: labelHidden,
            onBlur: this._onBlur,
            onChange: this._onChange,
            onFocus: this._onFocus,
            onMenuChange: this._onMenuChange,
            onRequestResults: this._onRequestOptions.bind(this),
            openOnFocus: openOnFocus,
            readOnly: readOnly,
            required: required,
            results: options,
            theme: theme,
            classes: classes,
            value: value
        });
    };
    TimePicker.prototype.renderNativeInput = function () {
        var _a = this.properties, disabled = _a.disabled, end = _a.end, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, _c = _a.inputProperties, inputProperties = _c === void 0 ? {} : _c, invalid = _a.invalid, name = _a.name, readOnly = _a.readOnly, required = _a.required, start = _a.start, step = _a.step, value = _a.value, label = _a.label, theme = _a.theme, classes = _a.classes, _d = _a.labelHidden, labelHidden = _d === void 0 ? false : _d, _e = _a.labelAfter, labelAfter = _e === void 0 ? false : _e;
        var focus = this.meta(Focus_2.default).get('root');
        var _f = inputProperties.aria, aria = _f === void 0 ? {} : _f;
        var children = [
            label
                ? d_1.w(index_2.default, {
                    theme: theme,
                    classes: classes,
                    disabled: disabled,
                    focused: focus.containsFocus,
                    invalid: invalid,
                    readOnly: readOnly,
                    required: required,
                    hidden: labelHidden,
                    forId: widgetId
                }, [label])
                : null,
            d_1.v('input', tslib_1.__assign({ id: widgetId }, util_1.formatAriaProperties(aria), { 'aria-invalid': invalid === true ? 'true' : null, 'aria-readonly': readOnly === true ? 'true' : null, classes: this.theme(css.input), disabled: disabled, focus: this.shouldFocus, invalid: invalid, key: 'native-input', max: end, min: start, name: name, onblur: this._onNativeBlur, onchange: this._onNativeChange, onfocus: this._onNativeFocus, readOnly: readOnly,
                required: required,
                step: step, type: 'time', value: value }))
        ];
        return d_1.v('div', {
            key: 'root',
            classes: this.theme(this.getRootClasses())
        }, labelAfter ? children.reverse() : children);
    };
    TimePicker.prototype.render = function () {
        var useNativeElement = this.properties.useNativeElement;
        return useNativeElement ? this.renderNativeInput() : this.renderCustomInput();
    };
    tslib_1.__decorate([
        diffProperty_1.diffProperty('start', diff_1.auto),
        diffProperty_1.diffProperty('end', diff_1.auto),
        diffProperty_1.diffProperty('step', diff_1.auto),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TimePicker.prototype, "onPropertiesChanged", null);
    TimePicker = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
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
    return TimePicker;
}(Themed_1.default(Focus_1.FocusMixin(WidgetBase_1.WidgetBase))));
exports.TimePicker = TimePicker;
exports.default = TimePicker;

/*# sourceMappingURL=index.js.map*/