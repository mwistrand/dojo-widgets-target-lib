import * as tslib_1 from "tslib";
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { v } from '@dojo/framework/widget-core/d';
import { formatAriaProperties } from '../common/util';
import * as css from '../theme/label.m.css';
import * as baseCss from '../common/styles/base.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
let Label = class Label extends ThemedMixin(WidgetBase) {
    getRootClasses() {
        const { disabled, focused, invalid, readOnly, required, secondary } = this.properties;
        return [
            css.root,
            disabled ? css.disabled : null,
            focused ? css.focused : null,
            invalid === true ? css.invalid : null,
            invalid === false ? css.valid : null,
            readOnly ? css.readonly : null,
            required ? css.required : null,
            secondary ? css.secondary : null
        ];
    }
    render() {
        const { aria = {}, forId, hidden, widgetId } = this.properties;
        return v('label', Object.assign({}, formatAriaProperties(aria), { id: widgetId, classes: [
                ...this.theme(this.getRootClasses()),
                hidden ? baseCss.visuallyHidden : null
            ], for: forId }), this.children);
    }
};
Label = tslib_1.__decorate([
    theme(css),
    customElement({
        tag: 'dojo-label',
        properties: [
            'theme',
            'classes',
            'aria',
            'extraClasses',
            'disabled',
            'focused',
            'readOnly',
            'required',
            'invalid',
            'hidden',
            'secondary'
        ],
        attributes: [],
        events: []
    })
], Label);
export { Label };
export default Label;

/*# sourceMappingURL=index.mjs.map*/