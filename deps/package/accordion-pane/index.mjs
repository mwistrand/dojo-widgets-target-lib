import * as tslib_1 from "tslib";
import { assign } from '@dojo/framework/shim/object';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { includes } from '@dojo/framework/shim/array';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import * as css from '../theme/accordion-pane.m.css';
let AccordionPane = class AccordionPane extends ThemedMixin(WidgetBase) {
    _assignCallback(child, functionName, callback) {
        const existingProperty = child.properties[functionName];
        const property = () => {
            callback.call(this, `${child.properties.key}`);
        };
        return existingProperty
            ? (key) => {
                existingProperty(key);
                property();
            }
            : property;
    }
    onRequestClose(key) {
        const { onRequestClose } = this.properties;
        onRequestClose && onRequestClose(key);
    }
    onRequestOpen(key) {
        const { onRequestOpen } = this.properties;
        onRequestOpen && onRequestOpen(key);
    }
    renderChildren() {
        const { openKeys = [], theme, classes } = this.properties;
        return this.children
            .filter((child) => child)
            .map((child) => {
            // null checks skipped since children are filtered prior to mapping
            assign(child.properties, {
                onRequestClose: this._assignCallback(child, 'onRequestClose', this.onRequestClose),
                onRequestOpen: this._assignCallback(child, 'onRequestOpen', this.onRequestOpen),
                open: includes(openKeys, child.properties.key),
                theme,
                classes
            });
            return child;
        });
    }
    render() {
        return v('div', { classes: this.theme(css.root) }, this.renderChildren());
    }
};
AccordionPane = tslib_1.__decorate([
    theme(css),
    customElement({
        tag: 'dojo-accordion-pane',
        properties: ['openKeys', 'theme', 'extraClasses', 'classes'],
        events: ['onRequestClose', 'onRequestOpen']
    })
], AccordionPane);
export { AccordionPane };
export default AccordionPane;

/*# sourceMappingURL=index.mjs.map*/