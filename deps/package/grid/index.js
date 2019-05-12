"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var d_1 = require("@dojo/framework/widget-core/d");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
var diff_1 = require("@dojo/framework/widget-core/diff");
var Store_1 = require("@dojo/framework/stores/Store");
var Dimensions_1 = require("@dojo/framework/widget-core/meta/Dimensions");
var Resize_1 = require("@dojo/framework/widget-core/meta/Resize");
var processes_1 = require("./processes");
var Header_1 = require("./Header");
var Body_1 = require("./Body");
var Footer_1 = require("./Footer");
var css = require("../theme/grid.m.css");
var fixedCss = require("./styles/grid.m.css");
var defaultGridMeta = {
    page: 1,
    total: undefined,
    sort: undefined,
    filter: undefined,
    isSorting: false,
    editedRow: undefined
};
var Grid = /** @class */ (function (_super) {
    tslib_1.__extends(Grid, _super);
    function Grid() {
        var _this = _super.call(this) || this;
        _this._store = new Store_1.Store();
        _this._scrollLeft = 0;
        _this._pageSize = 100;
        _this._handle = _this._store.onChange(_this._store.path('_grid'), _this.invalidate.bind(_this));
        return _this;
    }
    Grid.prototype.onStoreProperty = function (previous, current) {
        var _this = this;
        var _a = current.storeId, storeId = _a === void 0 ? '_grid' : _a;
        this._handle.remove();
        this._store = current.store;
        this._handle = this._store.onChange(this._store.path(storeId), function () {
            _this.invalidate();
        });
    };
    Grid.prototype._getProperties = function () {
        var _a = this.properties.storeId, storeId = _a === void 0 ? '_grid' : _a;
        return tslib_1.__assign({}, this.properties, { storeId: storeId });
    };
    Grid.prototype._getBodyHeight = function () {
        var height = this.properties.height;
        var headerHeight = this.meta(Dimensions_1.default).get('header');
        var footerHeight = this.meta(Dimensions_1.default).get('footer');
        return height - headerHeight.size.height - footerHeight.size.height;
    };
    Grid.prototype._fetcher = function (page, pageSize) {
        var _a = this._getProperties(), storeId = _a.storeId, fetcher = _a.fetcher;
        processes_1.fetcherProcess(this._store)({ id: storeId, fetcher: fetcher, page: page, pageSize: pageSize });
    };
    Grid.prototype._sorter = function (columnId, direction) {
        var _a = this._getProperties(), storeId = _a.storeId, fetcher = _a.fetcher;
        processes_1.sortProcess(this._store)({ id: storeId, fetcher: fetcher, columnId: columnId, direction: direction });
    };
    Grid.prototype._filterer = function (columnId, value) {
        var _a = this._getProperties(), storeId = _a.storeId, fetcher = _a.fetcher;
        processes_1.filterProcess(this._store)({ id: storeId, fetcher: fetcher, filterOptions: { columnId: columnId, value: value } });
    };
    Grid.prototype._updater = function (page, rowNumber, columnId, value) {
        var _a = this._getProperties(), storeId = _a.storeId, updater = _a.updater;
        processes_1.updaterProcess(this._store)({ id: storeId, page: page, columnId: columnId, rowNumber: rowNumber, value: value, updater: updater });
    };
    Grid.prototype._pageChange = function (page) {
        var storeId = this._getProperties().storeId;
        processes_1.pageChangeProcess(this._store)({ id: storeId, page: page });
    };
    Grid.prototype._onScroll = function (value) {
        this._scrollLeft = value;
        this.invalidate();
    };
    Grid.prototype.render = function () {
        var _a = this._getProperties(), columnConfig = _a.columnConfig, storeId = _a.storeId, theme = _a.theme, classes = _a.classes, _b = _a.customRenderers, customRenderers = _b === void 0 ? {} : _b;
        var sortRenderer = customRenderers.sortRenderer, filterRenderer = customRenderers.filterRenderer;
        if (!columnConfig || !this.properties.fetcher) {
            return null;
        }
        var meta = this._store.get(this._store.path(storeId, 'meta')) || defaultGridMeta;
        var pages = this._store.get(this._store.path(storeId, 'data', 'pages')) || {};
        var hasFilters = columnConfig.some(function (config) { return !!config.filterable; });
        var bodyHeight = this._getBodyHeight();
        this.meta(Resize_1.default).get('root');
        if (bodyHeight <= 0) {
            return d_1.v('div', {
                key: 'root',
                classes: [this.theme(css.root), fixedCss.rootFixed],
                role: 'table'
            });
        }
        return d_1.v('div', {
            key: 'root',
            classes: [this.theme(css.root), fixedCss.rootFixed],
            role: 'table',
            'aria-rowcount': meta.total ? "" + meta.total : null
        }, [
            d_1.v('div', {
                key: 'header',
                scrollLeft: this._scrollLeft,
                classes: [
                    this.theme(css.header),
                    fixedCss.headerFixed,
                    hasFilters ? this.theme(css.filterGroup) : null
                ],
                row: 'rowgroup'
            }, [
                d_1.w(Header_1.default, {
                    key: 'header-row',
                    theme: theme,
                    classes: classes,
                    columnConfig: columnConfig,
                    sorter: this._sorter,
                    sort: meta.sort,
                    filter: meta.filter,
                    filterer: this._filterer,
                    sortRenderer: sortRenderer,
                    filterRenderer: filterRenderer
                })
            ]),
            d_1.w(Body_1.default, {
                key: 'body',
                theme: theme,
                classes: classes,
                pages: pages,
                totalRows: meta.total,
                pageSize: this._pageSize,
                columnConfig: columnConfig,
                fetcher: this._fetcher,
                pageChange: this._pageChange,
                updater: this._updater,
                onScroll: this._onScroll,
                height: bodyHeight
            }),
            d_1.v('div', { key: 'footer' }, [
                d_1.w(Footer_1.default, {
                    key: 'footer-row',
                    theme: theme,
                    classes: classes,
                    total: meta.total,
                    page: meta.page,
                    pageSize: this._pageSize
                })
            ])
        ]);
    };
    tslib_1.__decorate([
        diffProperty_1.default('store', diff_1.reference),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], Grid.prototype, "onStoreProperty", null);
    Grid = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.default({
            tag: 'dojo-grid',
            properties: ['theme', 'classes', 'height', 'fetcher', 'updater', 'columnConfig', 'store'],
            attributes: ['storeId']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], Grid);
    return Grid;
}(Themed_1.default(WidgetBase_1.default)));
exports.default = Grid;

/*# sourceMappingURL=index.js.map*/