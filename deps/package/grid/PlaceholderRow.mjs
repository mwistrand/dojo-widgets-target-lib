import * as tslib_1 from "tslib";
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';
import * as css from '../theme/grid-placeholder-row.m.css';
let PlaceholderRow = class PlaceholderRow extends ThemedMixin(WidgetBase) {
    render() {
        return v('div', { classes: this.theme(css.root) }, [
            v('div', { classes: this.theme(css.loading) })
        ]);
    }
};
PlaceholderRow = tslib_1.__decorate([
    theme(css)
], PlaceholderRow);
export default PlaceholderRow;

/*# sourceMappingURL=PlaceholderRow.mjs.map*/