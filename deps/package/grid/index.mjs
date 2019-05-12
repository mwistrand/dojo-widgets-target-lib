import * as tslib_1 from "tslib";
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';
import customElement from '@dojo/framework/widget-core/decorators/customElement';
import diffProperty from '@dojo/framework/widget-core/decorators/diffProperty';
import { reference } from '@dojo/framework/widget-core/diff';
import { Store } from '@dojo/framework/stores/Store';
import Dimensions from '@dojo/framework/widget-core/meta/Dimensions';
import Resize from '@dojo/framework/widget-core/meta/Resize';
import { fetcherProcess, pageChangeProcess, sortProcess, filterProcess, updaterProcess } from './processes';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import * as css from '../theme/grid.m.css';
import * as fixedCss from './styles/grid.m.css';
const defaultGridMeta = {
    page: 1,
    total: undefined,
    sort: undefined,
    filter: undefined,
    isSorting: false,
    editedRow: undefined
};
let Grid = class Grid extends ThemedMixin(WidgetBase) {
    constructor() {
        super();
        this._store = new Store();
        this._scrollLeft = 0;
        this._pageSize = 100;
        this._handle = this._store.onChange(this._store.path('_grid'), this.invalidate.bind(this));
    }
    onStoreProperty(previous, current) {
        const { storeId = '_grid' } = current;
        this._handle.remove();
        this._store = current.store;
        this._handle = this._store.onChange(this._store.path(storeId), () => {
            this.invalidate();
        });
    }
    _getProperties() {
        const { storeId = '_grid' } = this.properties;
        return Object.assign({}, this.properties, { storeId });
    }
    _getBodyHeight() {
        const { height } = this.properties;
        const headerHeight = this.meta(Dimensions).get('header');
        const footerHeight = this.meta(Dimensions).get('footer');
        return height - headerHeight.size.height - footerHeight.size.height;
    }
    _fetcher(page, pageSize) {
        const { storeId, fetcher } = this._getProperties();
        fetcherProcess(this._store)({ id: storeId, fetcher, page, pageSize });
    }
    _sorter(columnId, direction) {
        const { storeId, fetcher } = this._getProperties();
        sortProcess(this._store)({ id: storeId, fetcher, columnId, direction });
    }
    _filterer(columnId, value) {
        const { storeId, fetcher } = this._getProperties();
        filterProcess(this._store)({ id: storeId, fetcher, filterOptions: { columnId, value } });
    }
    _updater(page, rowNumber, columnId, value) {
        const { storeId, updater } = this._getProperties();
        updaterProcess(this._store)({ id: storeId, page, columnId, rowNumber, value, updater });
    }
    _pageChange(page) {
        const { storeId } = this._getProperties();
        pageChangeProcess(this._store)({ id: storeId, page });
    }
    _onScroll(value) {
        this._scrollLeft = value;
        this.invalidate();
    }
    render() {
        const { columnConfig, storeId, theme, classes, customRenderers = {} } = this._getProperties();
        const { sortRenderer, filterRenderer } = customRenderers;
        if (!columnConfig || !this.properties.fetcher) {
            return null;
        }
        const meta = this._store.get(this._store.path(storeId, 'meta')) || defaultGridMeta;
        const pages = this._store.get(this._store.path(storeId, 'data', 'pages')) || {};
        const hasFilters = columnConfig.some((config) => !!config.filterable);
        const bodyHeight = this._getBodyHeight();
        this.meta(Resize).get('root');
        if (bodyHeight <= 0) {
            return v('div', {
                key: 'root',
                classes: [this.theme(css.root), fixedCss.rootFixed],
                role: 'table'
            });
        }
        return v('div', {
            key: 'root',
            classes: [this.theme(css.root), fixedCss.rootFixed],
            role: 'table',
            'aria-rowcount': meta.total ? `${meta.total}` : null
        }, [
            v('div', {
                key: 'header',
                scrollLeft: this._scrollLeft,
                classes: [
                    this.theme(css.header),
                    fixedCss.headerFixed,
                    hasFilters ? this.theme(css.filterGroup) : null
                ],
                row: 'rowgroup'
            }, [
                w(Header, {
                    key: 'header-row',
                    theme,
                    classes,
                    columnConfig,
                    sorter: this._sorter,
                    sort: meta.sort,
                    filter: meta.filter,
                    filterer: this._filterer,
                    sortRenderer,
                    filterRenderer
                })
            ]),
            w(Body, {
                key: 'body',
                theme,
                classes,
                pages,
                totalRows: meta.total,
                pageSize: this._pageSize,
                columnConfig,
                fetcher: this._fetcher,
                pageChange: this._pageChange,
                updater: this._updater,
                onScroll: this._onScroll,
                height: bodyHeight
            }),
            v('div', { key: 'footer' }, [
                w(Footer, {
                    key: 'footer-row',
                    theme,
                    classes,
                    total: meta.total,
                    page: meta.page,
                    pageSize: this._pageSize
                })
            ])
        ]);
    }
};
tslib_1.__decorate([
    diffProperty('store', reference),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Grid.prototype, "onStoreProperty", null);
Grid = tslib_1.__decorate([
    theme(css),
    customElement({
        tag: 'dojo-grid',
        properties: ['theme', 'classes', 'height', 'fetcher', 'updater', 'columnConfig', 'store'],
        attributes: ['storeId']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], Grid);
export default Grid;

/*# sourceMappingURL=index.mjs.map*/