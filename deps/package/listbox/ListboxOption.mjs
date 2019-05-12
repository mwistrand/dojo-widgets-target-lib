import * as tslib_1 from "tslib";
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import * as css from '../theme/listbox.m.css';
let ListboxOption = class ListboxOption extends ThemedMixin(WidgetBase) {
    _onClick(event) {
        event.stopPropagation();
        const { index, key, option, onClick } = this.properties;
        onClick && onClick(option, index, key);
    }
    render() {
        const { css = [], disabled = false, id, label, selected = false } = this.properties;
        return v('div', {
            'aria-disabled': disabled ? 'true' : null,
            'aria-selected': disabled ? null : String(selected),
            classes: this.theme(css),
            id,
            role: 'option',
            onclick: this._onClick
        }, [label]);
    }
};
ListboxOption = tslib_1.__decorate([
    theme(css)
], ListboxOption);
export { ListboxOption };
export default ListboxOption;

/*# sourceMappingURL=ListboxOption.mjs.map*/