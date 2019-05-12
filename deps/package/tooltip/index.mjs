import * as tslib_1 from "tslib";
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { formatAriaProperties } from '../common/util';
import * as fixedCss from './styles/tooltip.m.css';
import * as css from '../theme/tooltip.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
// Enum used to position the Tooltip
export var Orientation;
(function (Orientation) {
    Orientation["bottom"] = "bottom";
    Orientation["left"] = "left";
    Orientation["right"] = "right";
    Orientation["top"] = "top";
})(Orientation || (Orientation = {}));
const fixedOrientationCss = fixedCss;
const orientationCss = css;
let Tooltip = class Tooltip extends ThemedMixin(WidgetBase) {
    getFixedModifierClasses() {
        const { orientation = Orientation.right } = this.properties;
        return [fixedCss.rootFixed, fixedOrientationCss[`${orientation}Fixed`]];
    }
    getModifierClasses() {
        const { orientation = Orientation.right } = this.properties;
        return [orientationCss[orientation]];
    }
    renderContent() {
        const { aria = {} } = this.properties;
        return v('div', Object.assign({}, formatAriaProperties(aria), { classes: [this.theme(css.content), fixedCss.contentFixed], key: 'content' }), [this.properties.content]);
    }
    renderTarget() {
        return v('div', { key: 'target' }, this.children);
    }
    render() {
        const { open } = this.properties;
        const classes = this.getModifierClasses();
        const fixedClasses = this.getFixedModifierClasses();
        return v('div', {
            classes: [...this.theme(classes), ...fixedClasses]
        }, [this.renderTarget(), open ? this.renderContent() : null]);
    }
};
Tooltip = tslib_1.__decorate([
    theme(css),
    customElement({
        tag: 'dojo-tooltip',
        properties: ['theme', 'classes', 'aria', 'extraClasses', 'content', 'open'],
        attributes: ['orientation'],
        events: []
    })
], Tooltip);
export { Tooltip };
export default Tooltip;

/*# sourceMappingURL=index.mjs.map*/