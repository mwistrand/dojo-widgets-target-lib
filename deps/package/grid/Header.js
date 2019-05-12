"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var d_1 = require("@dojo/framework/widget-core/d");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var index_1 = require("../text-input/index");
var index_2 = require("../icon/index");
var css = require("../theme/grid-header.m.css");
var fixedCss = require("./styles/header.m.css");
var Header = /** @class */ (function (_super) {
    tslib_1.__extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._sortRenderer = function (column, direction, sorter) {
            var _a = _this.properties, theme = _a.theme, classes = _a.classes;
            return d_1.v('button', { classes: _this.theme(css.sort), onclick: sorter }, [
                d_1.w(index_2.default, {
                    theme: theme,
                    classes: classes,
                    type: direction === 'asc' ? 'upIcon' : 'downIcon',
                    altText: "Sort by " + _this._getColumnTitle(column)
                })
            ]);
        };
        _this._filterRenderer = function (columnConfig, filterValue, doFilter, title) {
            var _a = _this.properties, theme = _a.theme, classes = _a.classes;
            return d_1.w(index_1.default, {
                key: 'filter',
                theme: theme,
                classes: classes,
                extraClasses: { root: css.filter },
                label: "Filter by " + title,
                labelHidden: true,
                type: 'search',
                value: filterValue,
                onInput: doFilter
            });
        };
        return _this;
    }
    Header.prototype._getColumnTitle = function (column) {
        if (typeof column.title === 'function') {
            return column.title();
        }
        return column.title;
    };
    Header.prototype._sortColumn = function (id) {
        var _a = this.properties, sort = _a.sort, sorter = _a.sorter;
        var direction = sort
            ? sort.columnId !== id
                ? 'desc'
                : sort.direction === 'desc'
                    ? 'asc'
                    : 'desc'
            : 'desc';
        sorter(id, direction);
    };
    Header.prototype.render = function () {
        var _this = this;
        var _a = this.properties, columnConfig = _a.columnConfig, sort = _a.sort, filterer = _a.filterer, _b = _a.filter, filter = _b === void 0 ? {} : _b, _c = _a.sortRenderer, sortRenderer = _c === void 0 ? this._sortRenderer : _c, _d = _a.filterRenderer, filterRenderer = _d === void 0 ? this._filterRenderer : _d;
        return d_1.v('div', { classes: [this.theme(css.root), fixedCss.rootFixed], role: 'row' }, columnConfig.map(function (column) {
            var title = _this._getColumnTitle(column);
            var headerProperties = {};
            var isSorted = sort && sort.columnId === column.id;
            var isSortedAsc = Boolean(sort && sort.columnId === column.id && sort.direction === 'asc');
            if (column.sortable) {
                headerProperties = {
                    classes: [
                        _this.theme(css.sortable),
                        isSorted ? _this.theme(css.sorted) : null,
                        isSorted && !isSortedAsc ? _this.theme(css.desc) : null,
                        isSortedAsc ? _this.theme(css.asc) : null
                    ],
                    onclick: function () {
                        _this._sortColumn(column.id);
                    }
                };
            }
            var filterKeys = Object.keys(filter);
            var direction = !isSorted ? undefined : isSortedAsc ? 'asc' : 'desc';
            var filterValue = filterKeys.indexOf(column.id) > -1 ? filter[column.id] : '';
            var doFilter = function (value) {
                filterer(column.id, value);
            };
            return d_1.v('div', {
                'aria-sort': isSorted ? (isSortedAsc ? 'ascending' : 'descending') : null,
                classes: [_this.theme(css.cell), fixedCss.cellFixed],
                role: 'columnheader'
            }, [
                d_1.v('div', headerProperties, [
                    title,
                    column.sortable
                        ? sortRenderer(column, direction, function () {
                            _this._sortColumn(column.id);
                        })
                        : null
                ]),
                column.filterable
                    ? filterRenderer(column, filterValue, doFilter, title)
                    : null
            ]);
        }));
    };
    Header = tslib_1.__decorate([
        Themed_1.theme(css)
    ], Header);
    return Header;
}(Themed_1.default(WidgetBase_1.default)));
exports.default = Header;

/*# sourceMappingURL=Header.js.map*/