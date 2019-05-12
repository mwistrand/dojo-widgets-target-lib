import * as tslib_1 from "tslib";
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';
import * as css from '../theme/helper-text.m.css';
import { v } from '@dojo/framework/widget-core/d';
let HelperText = class HelperText extends ThemedMixin(WidgetBase) {
    render() {
        const { text, valid } = this.properties;
        return v('div', {
            key: 'root',
            classes: this.theme([
                css.root,
                valid === true ? css.valid : null,
                valid === false ? css.invalid : null
            ])
        }, [
            text &&
                v('p', {
                    key: 'text',
                    classes: this.theme(css.text),
                    'aria-hidden': 'true',
                    title: text
                }, [text])
        ]);
    }
};
HelperText = tslib_1.__decorate([
    theme(css)
], HelperText);
export default HelperText;

/*# sourceMappingURL=index.mjs.map*/