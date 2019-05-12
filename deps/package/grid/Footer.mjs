import * as tslib_1 from "tslib";
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';
import * as css from '../theme/grid-footer.m.css';
let Footer = class Footer extends ThemedMixin(WidgetBase) {
    render() {
        const { total, page, pageSize } = this.properties;
        const footer = total !== undefined
            ? `Page ${page} of ${Math.ceil(total / pageSize)}. Total rows ${total}`
            : `Page ${page} of ?`;
        return v('div', { classes: this.theme(css.root) }, [footer]);
    }
};
Footer = tslib_1.__decorate([
    theme(css)
], Footer);
export default Footer;

/*# sourceMappingURL=Footer.mjs.map*/