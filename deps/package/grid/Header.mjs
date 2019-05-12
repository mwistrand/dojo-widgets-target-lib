import * as tslib_1 from "tslib";
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';
import TextInput from '../text-input/index';
import Icon from '../icon/index';
import * as css from '../theme/grid-header.m.css';
import * as fixedCss from './styles/header.m.css';
let Header = class Header extends ThemedMixin(WidgetBase) {
    constructor() {
        super(...arguments);
        this._sortRenderer = (column, direction, sorter) => {
            const { theme, classes } = this.properties;
            return v('button', { classes: this.theme(css.sort), onclick: sorter }, [
                w(Icon, {
                    theme,
                    classes,
                    type: direction === 'asc' ? 'upIcon' : 'downIcon',
                    altText: `Sort by ${this._getColumnTitle(column)}`
                })
            ]);
        };
        this._filterRenderer = (columnConfig, filterValue, doFilter, title) => {
            const { theme, classes } = this.properties;
            return w(TextInput, {
                key: 'filter',
                theme,
                classes,
                extraClasses: { root: css.filter },
                label: `Filter by ${title}`,
                labelHidden: true,
                type: 'search',
                value: filterValue,
                onInput: doFilter
            });
        };
    }
    _getColumnTitle(column) {
        if (typeof column.title === 'function') {
            return column.title();
        }
        return column.title;
    }
    _sortColumn(id) {
        const { sort, sorter } = this.properties;
        const direction = sort
            ? sort.columnId !== id
                ? 'desc'
                : sort.direction === 'desc'
                    ? 'asc'
                    : 'desc'
            : 'desc';
        sorter(id, direction);
    }
    render() {
        const { columnConfig, sort, filterer, filter = {}, sortRenderer = this._sortRenderer, filterRenderer = this._filterRenderer } = this.properties;
        return v('div', { classes: [this.theme(css.root), fixedCss.rootFixed], role: 'row' }, columnConfig.map((column) => {
            const title = this._getColumnTitle(column);
            let headerProperties = {};
            const isSorted = sort && sort.columnId === column.id;
            const isSortedAsc = Boolean(sort && sort.columnId === column.id && sort.direction === 'asc');
            if (column.sortable) {
                headerProperties = {
                    classes: [
                        this.theme(css.sortable),
                        isSorted ? this.theme(css.sorted) : null,
                        isSorted && !isSortedAsc ? this.theme(css.desc) : null,
                        isSortedAsc ? this.theme(css.asc) : null
                    ],
                    onclick: () => {
                        this._sortColumn(column.id);
                    }
                };
            }
            const filterKeys = Object.keys(filter);
            const direction = !isSorted ? undefined : isSortedAsc ? 'asc' : 'desc';
            const filterValue = filterKeys.indexOf(column.id) > -1 ? filter[column.id] : '';
            const doFilter = (value) => {
                filterer(column.id, value);
            };
            return v('div', {
                'aria-sort': isSorted ? (isSortedAsc ? 'ascending' : 'descending') : null,
                classes: [this.theme(css.cell), fixedCss.cellFixed],
                role: 'columnheader'
            }, [
                v('div', headerProperties, [
                    title,
                    column.sortable
                        ? sortRenderer(column, direction, () => {
                            this._sortColumn(column.id);
                        })
                        : null
                ]),
                column.filterable
                    ? filterRenderer(column, filterValue, doFilter, title)
                    : null
            ]);
        }));
    }
};
Header = tslib_1.__decorate([
    theme(css)
], Header);
export default Header;

/*# sourceMappingURL=Header.mjs.map*/