import * as tslib_1 from "tslib";
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';
import Cell from './Cell';
import * as fixedCss from './styles/row.m.css';
import * as css from '../theme/grid-row.m.css';
let Row = class Row extends ThemedMixin(WidgetBase) {
    render() {
        const { item, columnConfig, id, theme, classes } = this.properties;
        let columns = columnConfig.map((config) => {
            let value = `${item[config.id]}`;
            if (config.renderer) {
                value = config.renderer({ value });
            }
            return w(Cell, {
                theme,
                key: config.id,
                classes,
                updater: (updatedValue) => {
                    this.properties.updater(id, config.id, updatedValue);
                },
                value,
                editable: config.editable,
                rawValue: `${item[config.id]}`
            });
        }, []);
        return v('div', {
            classes: [this.theme(css.root), fixedCss.rootFixed],
            role: 'row',
            'aria-rowindex': `${id + 1}`
        }, columns);
    }
};
Row = tslib_1.__decorate([
    theme(css)
], Row);
export default Row;

/*# sourceMappingURL=Row.mjs.map*/