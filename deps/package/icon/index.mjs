import * as tslib_1 from "tslib";
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { v } from '@dojo/framework/widget-core/d';
import { formatAriaProperties } from '../common/util';
import * as css from '../theme/icon.m.css';
import * as baseCss from '../common/styles/base.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
let Icon = class Icon extends ThemedMixin(WidgetBase) {
    renderAltText(altText) {
        return v('span', { classes: [baseCss.visuallyHidden] }, [altText]);
    }
    render() {
        const { aria = {
            hidden: 'true'
        }, type, altText } = this.properties;
        return v('span', { classes: this.theme(css.root) }, [
            v('i', Object.assign({}, formatAriaProperties(aria), { classes: this.theme([css.icon, css[type]]) })),
            altText ? this.renderAltText(altText) : null
        ]);
    }
};
Icon = tslib_1.__decorate([
    theme(css),
    customElement({
        tag: 'dojo-icon',
        properties: ['theme', 'classes', 'aria', 'extraClasses'],
        attributes: ['type', 'altText']
    })
], Icon);
export { Icon };
export default Icon;

/*# sourceMappingURL=index.mjs.map*/