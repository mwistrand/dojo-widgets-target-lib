"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var global_1 = require("@dojo/framework/shim/global");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var d_1 = require("@dojo/framework/widget-core/d");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var vdom_1 = require("@dojo/framework/widget-core/vdom");
var PlaceholderRow_1 = require("./PlaceholderRow");
var Row_1 = require("./Row");
var fixedCss = require("./styles/body.m.css");
var css = require("../theme/grid-body.m.css");
var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
var diff_1 = require("@dojo/framework/widget-core/diff");
var offscreen = function (dnode) {
    var r = vdom_1.default(function () {
        return d_1.w(/** @class */ (function (_super) {
            tslib_1.__extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.render = function () {
                return dnode;
            };
            return class_1;
        }(WidgetBase_1.default)), {});
    });
    var div = global_1.default.document.createElement('div');
    div.style.position = 'absolute';
    global_1.default.document.body.appendChild(div);
    r.mount({ domNode: div, sync: true });
    var dimensions = div.getBoundingClientRect();
    global_1.default.document.body.removeChild(div);
    return dimensions;
};
var defaultPlaceholderRowRenderer = function (index) {
    return d_1.w(PlaceholderRow_1.default, { key: index });
};
var Body = /** @class */ (function (_super) {
    tslib_1.__extends(Body, _super);
    function Body() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._start = 0;
        _this._end = 100;
        _this._resetScroll = false;
        return _this;
    }
    Body.prototype._updater = function (rowNumber, columnId, value) {
        var page = Math.max(Math.ceil(rowNumber / this.properties.pageSize), 1);
        var pageItemNumber = rowNumber - (page - 1) * this.properties.pageSize;
        this.properties.updater(page, pageItemNumber, columnId, value);
    };
    Body.prototype._onScroll = function (event) {
        var _a = this.properties.totalRows, totalRows = _a === void 0 ? 0 : _a;
        var scrollTop = event.target.scrollTop;
        var scrollLeft = event.target.scrollLeft;
        var topRow = Math.round(scrollTop / this._rowHeight);
        var bottomRow = topRow + this._rowsInView;
        if (topRow <= this._start) {
            this._start = Math.max(0, topRow - this._renderPageSize);
            this._end = Math.min(totalRows, this._start + this._renderPageSize * 2);
        }
        if (bottomRow >= this._end) {
            this._start = Math.min(topRow, totalRows - this._renderPageSize);
            this._end = Math.min(totalRows, this._start + this._renderPageSize * 2);
        }
        this.properties.onScroll(scrollLeft);
        this.invalidate();
    };
    Body.prototype._onDiffTotalRows = function () {
        this._start = 0;
        this._end = 100;
        this._resetScroll = true;
    };
    Body.prototype._renderRows = function (start, end) {
        var _a = this.properties, pageSize = _a.pageSize, fetcher = _a.fetcher, pages = _a.pages, columnConfig = _a.columnConfig, _b = _a.placeholderRowRenderer, placeholderRowRenderer = _b === void 0 ? defaultPlaceholderRowRenderer : _b, pageChange = _a.pageChange, totalRows = _a.totalRows, theme = _a.theme, classes = _a.classes;
        var startPage = Math.max(Math.ceil(start / pageSize), 1);
        var endPage = Math.ceil(end / pageSize);
        var data = pages["page-" + startPage] || [];
        if (!data.length && (totalRows === undefined || totalRows > 0)) {
            fetcher(startPage, pageSize);
        }
        if (startPage !== endPage) {
            var endData = pages["page-" + endPage] || [];
            if (!endData.length) {
                fetcher(endPage, pageSize);
            }
            var midScreenPage = Math.max(Math.ceil((start + this._rowsInView / 2) / pageSize), 1);
            pageChange(midScreenPage);
            data = tslib_1.__spread(data, endData);
        }
        else {
            pageChange(startPage);
        }
        var rows = [];
        for (var i = start; i < end; i++) {
            var offset = i - (startPage * pageSize - pageSize);
            var item = data[offset];
            if (item) {
                rows.push(d_1.w(Row_1.default, {
                    id: i,
                    key: i,
                    theme: theme,
                    classes: classes,
                    item: item,
                    columnConfig: columnConfig,
                    updater: this._updater
                }));
            }
            else {
                if (totalRows === undefined || (i > -1 && i < totalRows)) {
                    rows.push(placeholderRowRenderer(i));
                }
            }
        }
        return rows;
    };
    Body.prototype.render = function () {
        var _a = this.properties, _b = _a.placeholderRowRenderer, placeholderRowRenderer = _b === void 0 ? defaultPlaceholderRowRenderer : _b, _c = _a.totalRows, totalRows = _c === void 0 ? 0 : _c, pageSize = _a.pageSize, height = _a.height;
        if (!this._rowHeight) {
            var firstRow = placeholderRowRenderer(0);
            var dimensions = offscreen(firstRow);
            this._rowHeight = dimensions.height;
            this._rowsInView = Math.ceil(height / this._rowHeight);
            this._renderPageSize = this._rowsInView * 2;
        }
        var rows = this._renderRows(this._start, this._end);
        var topPaddingHeight = this._rowHeight * this._start;
        var bottomPaddingHeight = 0;
        if (totalRows >= pageSize) {
            bottomPaddingHeight =
                totalRows * this._rowHeight -
                    topPaddingHeight -
                    (this._end - this._start) * this._rowHeight;
        }
        var containerProperties = {
            key: 'root',
            classes: [this.theme(css.root), fixedCss.rootFixed],
            role: 'rowgroup',
            onscroll: this._onScroll,
            styles: { height: height + "px" }
        };
        if (this._resetScroll) {
            this._resetScroll = false;
            containerProperties = tslib_1.__assign({}, containerProperties, { scrollTop: 0 });
        }
        return d_1.v('div', containerProperties, tslib_1.__spread([
            d_1.v('div', { key: 'top', styles: { height: topPaddingHeight + "px" } })
        ], rows, [
            d_1.v('div', {
                key: 'bottom',
                styles: { height: bottomPaddingHeight + "px" }
            })
        ]));
    };
    tslib_1.__decorate([
        diffProperty_1.diffProperty('totalRows', diff_1.auto),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], Body.prototype, "_onDiffTotalRows", null);
    Body = tslib_1.__decorate([
        Themed_1.theme(css),
        diffProperty_1.diffProperty('pages', diff_1.reference)
    ], Body);
    return Body;
}(Themed_1.default(WidgetBase_1.default)));
exports.default = Body;

/*# sourceMappingURL=Body.js.map*/