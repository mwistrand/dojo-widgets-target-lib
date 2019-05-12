import * as tslib_1 from "tslib";
import global from '@dojo/framework/shim/global';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';
import renderer from '@dojo/framework/widget-core/vdom';
import PlaceholderRow from './PlaceholderRow';
import Row from './Row';
import * as fixedCss from './styles/body.m.css';
import * as css from '../theme/grid-body.m.css';
import { diffProperty } from '@dojo/framework/widget-core/decorators/diffProperty';
import { auto, reference } from '@dojo/framework/widget-core/diff';
const offscreen = (dnode) => {
    const r = renderer(() => w(class extends WidgetBase {
        render() {
            return dnode;
        }
    }, {}));
    const div = global.document.createElement('div');
    div.style.position = 'absolute';
    global.document.body.appendChild(div);
    r.mount({ domNode: div, sync: true });
    const dimensions = div.getBoundingClientRect();
    global.document.body.removeChild(div);
    return dimensions;
};
const defaultPlaceholderRowRenderer = (index) => {
    return w(PlaceholderRow, { key: index });
};
let Body = class Body extends ThemedMixin(WidgetBase) {
    constructor() {
        super(...arguments);
        this._start = 0;
        this._end = 100;
        this._resetScroll = false;
    }
    _updater(rowNumber, columnId, value) {
        const page = Math.max(Math.ceil(rowNumber / this.properties.pageSize), 1);
        const pageItemNumber = rowNumber - (page - 1) * this.properties.pageSize;
        this.properties.updater(page, pageItemNumber, columnId, value);
    }
    _onScroll(event) {
        const { totalRows = 0 } = this.properties;
        const scrollTop = event.target.scrollTop;
        const scrollLeft = event.target.scrollLeft;
        const topRow = Math.round(scrollTop / this._rowHeight);
        const bottomRow = topRow + this._rowsInView;
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
    }
    _onDiffTotalRows() {
        this._start = 0;
        this._end = 100;
        this._resetScroll = true;
    }
    _renderRows(start, end) {
        const { pageSize, fetcher, pages, columnConfig, placeholderRowRenderer = defaultPlaceholderRowRenderer, pageChange, totalRows, theme, classes } = this.properties;
        const startPage = Math.max(Math.ceil(start / pageSize), 1);
        const endPage = Math.ceil(end / pageSize);
        let data = pages[`page-${startPage}`] || [];
        if (!data.length && (totalRows === undefined || totalRows > 0)) {
            fetcher(startPage, pageSize);
        }
        if (startPage !== endPage) {
            const endData = pages[`page-${endPage}`] || [];
            if (!endData.length) {
                fetcher(endPage, pageSize);
            }
            const midScreenPage = Math.max(Math.ceil((start + this._rowsInView / 2) / pageSize), 1);
            pageChange(midScreenPage);
            data = [...data, ...endData];
        }
        else {
            pageChange(startPage);
        }
        const rows = [];
        for (let i = start; i < end; i++) {
            const offset = i - (startPage * pageSize - pageSize);
            const item = data[offset];
            if (item) {
                rows.push(w(Row, {
                    id: i,
                    key: i,
                    theme,
                    classes,
                    item,
                    columnConfig,
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
    }
    render() {
        const { placeholderRowRenderer = defaultPlaceholderRowRenderer, totalRows = 0, pageSize, height } = this.properties;
        if (!this._rowHeight) {
            const firstRow = placeholderRowRenderer(0);
            const dimensions = offscreen(firstRow);
            this._rowHeight = dimensions.height;
            this._rowsInView = Math.ceil(height / this._rowHeight);
            this._renderPageSize = this._rowsInView * 2;
        }
        const rows = this._renderRows(this._start, this._end);
        const topPaddingHeight = this._rowHeight * this._start;
        let bottomPaddingHeight = 0;
        if (totalRows >= pageSize) {
            bottomPaddingHeight =
                totalRows * this._rowHeight -
                    topPaddingHeight -
                    (this._end - this._start) * this._rowHeight;
        }
        let containerProperties = {
            key: 'root',
            classes: [this.theme(css.root), fixedCss.rootFixed],
            role: 'rowgroup',
            onscroll: this._onScroll,
            styles: { height: `${height}px` }
        };
        if (this._resetScroll) {
            this._resetScroll = false;
            containerProperties = Object.assign({}, containerProperties, { scrollTop: 0 });
        }
        return v('div', containerProperties, [
            v('div', { key: 'top', styles: { height: `${topPaddingHeight}px` } }),
            ...rows,
            v('div', {
                key: 'bottom',
                styles: { height: `${bottomPaddingHeight}px` }
            })
        ]);
    }
};
tslib_1.__decorate([
    diffProperty('totalRows', auto),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Body.prototype, "_onDiffTotalRows", null);
Body = tslib_1.__decorate([
    theme(css),
    diffProperty('pages', reference)
], Body);
export default Body;

/*# sourceMappingURL=Body.mjs.map*/