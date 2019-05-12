import * as tslib_1 from "tslib";
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { formatAriaProperties } from '../common/util';
import * as css from '../theme/tab-controller.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/framework/widget-core/registerCustomElement';
let Tab = class Tab extends ThemedMixin(WidgetBase) {
    render() {
        const { aria = {}, widgetId, labelledBy, show = false } = this.properties;
        const hidden = this.theme(!show ? css.hidden : null);
        return v('div', Object.assign({}, formatAriaProperties(aria), { 'aria-labelledby': labelledBy, classes: this.theme([css.tab]), id: widgetId, role: 'tabpanel' }), [v('div', { classes: [hidden] }, this.children)]);
    }
};
Tab = tslib_1.__decorate([
    theme(css),
    customElement({
        tag: 'dojo-tab',
        childType: CustomElementChildType.NODE,
        properties: ['theme', 'classes', 'aria', 'extraClasses', 'closeable', 'disabled', 'show'],
        attributes: ['key', 'labelledBy', 'widgetId', 'label'],
        events: []
    })
], Tab);
export { Tab };
export default Tab;

/*# sourceMappingURL=index.mjs.map*/