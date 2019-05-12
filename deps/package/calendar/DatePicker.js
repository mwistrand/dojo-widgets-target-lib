"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
var d_1 = require("@dojo/framework/widget-core/d");
var util_1 = require("@dojo/framework/core/util");
var util_2 = require("../common/util");
var date_utils_1 = require("./date-utils");
var index_1 = require("../icon/index");
var baseCss = require("../common/styles/base.m.css");
var css = require("../theme/calendar.m.css");
/**
 * Enum for next/previous buttons
 */
var Paging;
(function (Paging) {
    Paging["next"] = "next";
    Paging["previous"] = "previous";
})(Paging = exports.Paging || (exports.Paging = {}));
/**
 * Enum for month or year controls
 */
var Controls;
(function (Controls) {
    Controls["month"] = "month";
    Controls["year"] = "year";
})(Controls = exports.Controls || (exports.Controls = {}));
var BASE_YEAR = 2000;
var DatePicker = /** @class */ (function (_super) {
    tslib_1.__extends(DatePicker, _super);
    function DatePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._idBase = util_1.uuid();
        _this._monthPopupOpen = false;
        _this._yearPopupOpen = false;
        _this._yearPage = 0;
        return _this;
    }
    DatePicker.prototype._closeMonthPopup = function (event) {
        if (event) {
            event.stopPropagation();
        }
        var onPopupChange = this.properties.onPopupChange;
        this._monthPopupOpen = false;
        this.meta(Focus_1.default).set('month-button');
        this.invalidate();
        onPopupChange && onPopupChange(this._getPopupState());
    };
    DatePicker.prototype._closeYearPopup = function (event) {
        if (event) {
            event.stopPropagation();
        }
        var onPopupChange = this.properties.onPopupChange;
        this._yearPopupOpen = false;
        this.meta(Focus_1.default).set('year-button');
        this.invalidate();
        onPopupChange && onPopupChange(this._getPopupState());
    };
    DatePicker.prototype._getMonthInputKey = function (month) {
        return this._idBase + "_month_input_" + month;
    };
    DatePicker.prototype._getPopupState = function () {
        return this._monthPopupOpen || this._yearPopupOpen;
    };
    DatePicker.prototype._getYearInputKey = function (year) {
        return this._idBase + "_year_input_" + year;
    };
    DatePicker.prototype._getYearRange = function () {
        var _a = this.properties, year = _a.year, _b = _a.yearRange, yearRange = _b === void 0 ? 20 : _b;
        var offset = ((year - BASE_YEAR) % yearRange) - yearRange * this._yearPage;
        if (year >= BASE_YEAR) {
            return { first: year - offset, last: year + yearRange - offset };
        }
        else {
            return { first: year - (yearRange + offset), last: year - offset };
        }
    };
    DatePicker.prototype._onMonthButtonClick = function (event) {
        event.stopPropagation();
        this._monthPopupOpen ? this._closeMonthPopup() : this._openMonthPopup();
    };
    DatePicker.prototype._onMonthRadioChange = function (event) {
        event.stopPropagation();
        var onRequestMonthChange = this.properties.onRequestMonthChange;
        onRequestMonthChange &&
            onRequestMonthChange(parseInt(event.target.value, 10));
    };
    DatePicker.prototype._onPopupKeyDown = function (event) {
        event.stopPropagation();
        // close popup on escape, or if a value is selected with enter/space
        if (event.which === util_2.Keys.Escape ||
            event.which === util_2.Keys.Enter ||
            event.which === util_2.Keys.Space) {
            event.preventDefault();
            this._monthPopupOpen && this._closeMonthPopup();
            this._yearPopupOpen && this._closeYearPopup();
        }
    };
    DatePicker.prototype._onYearButtonClick = function (event) {
        event.stopPropagation();
        this._yearPopupOpen ? this._closeYearPopup() : this._openYearPopup();
    };
    DatePicker.prototype._onYearPageDown = function (event) {
        event.stopPropagation();
        this._yearPage--;
        this._yearPopupOpen && this.invalidate();
    };
    DatePicker.prototype._onYearPageUp = function (event) {
        event.stopPropagation();
        this._yearPage++;
        this._yearPopupOpen && this.invalidate();
    };
    DatePicker.prototype._onYearRadioChange = function (event) {
        event.stopPropagation();
        var _a = this.properties, onRequestYearChange = _a.onRequestYearChange, month = _a.month;
        var newYear = parseInt(event.target.value, 10);
        if (!this._monthInMinMax(newYear, month)) {
            // we know the year is valid but the month is out of range
            var _b = this.properties, minDate = _b.minDate, maxDate = _b.maxDate, onRequestMonthChange = _b.onRequestMonthChange;
            if (minDate && newYear === minDate.getFullYear()) {
                onRequestMonthChange && onRequestMonthChange(minDate.getMonth());
            }
            else if (maxDate && newYear === maxDate.getFullYear()) {
                onRequestMonthChange && onRequestMonthChange(maxDate.getMonth());
            }
        }
        this._yearPage = 0;
        onRequestYearChange && onRequestYearChange(newYear);
    };
    DatePicker.prototype._openMonthPopup = function () {
        var _a = this.properties, month = _a.month, onPopupChange = _a.onPopupChange;
        this._monthPopupOpen = true;
        this.meta(Focus_1.default).set(this._getMonthInputKey(month));
        this._yearPopupOpen = false;
        this.invalidate();
        onPopupChange && onPopupChange(this._getPopupState());
    };
    DatePicker.prototype._openYearPopup = function () {
        var _a = this.properties, year = _a.year, onPopupChange = _a.onPopupChange;
        this._yearPopupOpen = true;
        this.meta(Focus_1.default).set(this._getYearInputKey(year));
        this._monthPopupOpen = false;
        this.invalidate();
        onPopupChange && onPopupChange(this._getPopupState());
    };
    DatePicker.prototype._monthInMinMax = function (year, month) {
        var _a = this.properties, minDate = _a.minDate, maxDate = _a.maxDate;
        return date_utils_1.monthInMin(year, month, minDate) && date_utils_1.monthInMax(year, month, maxDate);
    };
    DatePicker.prototype._yearInMinMax = function (year) {
        var _a = this.properties, minDate = _a.minDate, maxDate = _a.maxDate;
        var minYear = minDate ? minDate.getFullYear() : year;
        var maxYear = maxDate ? maxDate.getFullYear() : year;
        return year >= minYear && year <= maxYear;
    };
    DatePicker.prototype.renderControlsTrigger = function (type) {
        var _a = this.properties, month = _a.month, monthNames = _a.monthNames, year = _a.year;
        var content = type === Controls.month ? monthNames[month].long : "" + year;
        var open = type === Controls.month ? this._monthPopupOpen : this._yearPopupOpen;
        var onclick = type === Controls.month ? this._onMonthButtonClick : this._onYearButtonClick;
        return d_1.v('button', {
            key: type + "-button",
            'aria-controls': this._idBase + "_" + type + "_dialog",
            'aria-expanded': "" + open,
            'aria-haspopup': 'true',
            id: this._idBase + "_" + type + "_button",
            classes: this.theme([
                css[type + "Trigger"],
                open ? css[type + "TriggerActive"] : null
            ]),
            role: 'menuitem',
            type: 'button',
            onclick: onclick
        }, [content]);
    };
    DatePicker.prototype.renderMonthLabel = function (month, year) {
        var _a = this.properties, monthNames = _a.monthNames, renderMonthLabel = _a.renderMonthLabel;
        return renderMonthLabel
            ? renderMonthLabel(month, year)
            : monthNames[month].long + " " + year;
    };
    DatePicker.prototype.renderMonthRadios = function () {
        var _this = this;
        var _a = this.properties, year = _a.year, month = _a.month;
        return this.properties.monthNames.map(function (monthName, i) {
            return d_1.v('label', {
                key: _this._idBase + "_month_radios_" + i,
                classes: _this.theme([
                    css.monthRadio,
                    i === month ? css.monthRadioChecked : null
                ]),
                for: _this._getMonthInputKey(i),
                onmouseup: _this._closeMonthPopup
            }, [
                d_1.v('input', {
                    checked: i === month,
                    classes: _this.theme(css.monthRadioInput),
                    id: _this._getMonthInputKey(i),
                    key: _this._getMonthInputKey(i),
                    name: _this._idBase + "_month_radios",
                    tabIndex: _this._monthPopupOpen ? 0 : -1,
                    type: 'radio',
                    value: "" + i,
                    disabled: !_this._monthInMinMax(year, i),
                    onchange: _this._onMonthRadioChange
                }),
                d_1.v('abbr', {
                    classes: _this.theme(css.monthRadioLabel),
                    title: monthName.long
                }, [monthName.short])
            ]);
        });
    };
    DatePicker.prototype.renderPagingButtonContent = function (type) {
        var _a = this.properties, labels = _a.labels, theme = _a.theme, classes = _a.classes;
        var iconType = type === Paging.next ? 'rightIcon' : 'leftIcon';
        var labelText = type === Paging.next ? labels.nextYears : labels.previousYears;
        return [
            d_1.w(index_1.default, { type: iconType, theme: theme, classes: classes }),
            d_1.v('span', { classes: baseCss.visuallyHidden }, [labelText])
        ];
    };
    DatePicker.prototype.renderYearRadios = function () {
        var year = this.properties.year;
        var radios = [];
        var yearLimits = this._getYearRange();
        for (var i = yearLimits.first; i < yearLimits.last; i++) {
            radios.push(d_1.v('label', {
                key: this._idBase + "_year_radios_" + i,
                classes: this.theme([
                    css.yearRadio,
                    i === year ? css.yearRadioChecked : null
                ]),
                for: this._getYearInputKey(i),
                onmouseup: this._closeYearPopup
            }, [
                d_1.v('input', {
                    checked: i === year,
                    classes: this.theme(css.yearRadioInput),
                    id: this._getYearInputKey(i),
                    key: this._getYearInputKey(i),
                    name: this._idBase + "_year_radios",
                    tabIndex: this._yearPopupOpen ? 0 : -1,
                    type: 'radio',
                    value: "" + i,
                    disabled: !this._yearInMinMax(i),
                    onchange: this._onYearRadioChange
                }),
                d_1.v('abbr', {
                    classes: this.theme(css.yearRadioLabel)
                }, ["" + i])
            ]));
        }
        return radios;
    };
    DatePicker.prototype.render = function () {
        var _a = this.properties, _b = _a.labelId, labelId = _b === void 0 ? this._idBase + "_label" : _b, labels = _a.labels, month = _a.month, year = _a.year;
        return d_1.v('div', {
            classes: this.theme(css.datePicker)
        }, [
            d_1.v('div', {
                classes: this.theme(css.topMatter),
                role: 'menubar'
            }, [
                // hidden label
                d_1.v('label', {
                    id: labelId,
                    classes: [baseCss.visuallyHidden],
                    'aria-live': 'polite',
                    'aria-atomic': 'false'
                }, [this.renderMonthLabel(month, year)]),
                // month trigger
                this.renderControlsTrigger(Controls.month),
                // year trigger
                this.renderControlsTrigger(Controls.year)
            ]),
            // month grid
            d_1.v('div', {
                key: 'month-grid',
                'aria-hidden': "" + !this._monthPopupOpen,
                'aria-labelledby': this._idBase + "_month_button",
                classes: [
                    this.theme(css.monthGrid),
                    !this._monthPopupOpen ? baseCss.visuallyHidden : null
                ],
                id: this._idBase + "_month_dialog",
                role: 'dialog'
            }, [
                d_1.v('fieldset', {
                    classes: this.theme(css.monthFields),
                    onkeydown: this._onPopupKeyDown
                }, tslib_1.__spread([
                    d_1.v('legend', { classes: baseCss.visuallyHidden }, [
                        labels.chooseMonth
                    ])
                ], this.renderMonthRadios()))
            ]),
            // year grid
            d_1.v('div', {
                key: 'year-grid',
                'aria-hidden': "" + !this._yearPopupOpen,
                'aria-labelledby': this._idBase + "_year_button",
                classes: [
                    this.theme(css.yearGrid),
                    !this._yearPopupOpen ? baseCss.visuallyHidden : null
                ],
                id: this._idBase + "_year_dialog",
                role: 'dialog'
            }, [
                d_1.v('fieldset', {
                    classes: this.theme(css.yearFields),
                    onkeydown: this._onPopupKeyDown
                }, tslib_1.__spread([
                    d_1.v('legend', { classes: [baseCss.visuallyHidden] }, [
                        labels.chooseYear
                    ])
                ], this.renderYearRadios())),
                d_1.v('div', {
                    classes: this.theme(css.controls)
                }, [
                    d_1.v('button', {
                        classes: this.theme(css.previous),
                        tabIndex: this._yearPopupOpen ? 0 : -1,
                        type: 'button',
                        onclick: this._onYearPageDown,
                        disabled: !this._yearInMinMax(year - 1)
                    }, this.renderPagingButtonContent(Paging.previous)),
                    d_1.v('button', {
                        classes: this.theme(css.next),
                        tabIndex: this._yearPopupOpen ? 0 : -1,
                        type: 'button',
                        onclick: this._onYearPageUp,
                        disabled: !this._yearInMinMax(year + 1)
                    }, this.renderPagingButtonContent(Paging.next))
                ])
            ])
        ]);
    };
    DatePicker = tslib_1.__decorate([
        Themed_1.theme(css)
    ], DatePicker);
    return DatePicker;
}(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase)));
exports.DatePicker = DatePicker;
exports.default = DatePicker;

/*# sourceMappingURL=DatePicker.js.map*/