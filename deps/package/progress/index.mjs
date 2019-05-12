import * as tslib_1 from "tslib";
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { v } from '@dojo/framework/widget-core/d';
import { formatAriaProperties } from '../common/util';
import * as css from '../theme/progress.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
let Progress = class Progress extends ThemedMixin(WidgetBase) {
    _output(value, percent) {
        const { output } = this.properties;
        return output ? output(value, percent) : `${percent}%`;
    }
    renderProgress(percent) {
        return [
            v('div', {
                classes: this.theme(css.progress),
                styles: {
                    width: `${percent}%`
                }
            })
        ];
    }
    render() {
        const { aria = {}, value, showOutput = true, max = 100, min = 0, widgetId } = this.properties;
        const percent = Math.round(((value - min) / (max - min)) * 100);
        const output = this._output(value, percent);
        return v('div', { classes: this.theme(css.root) }, [
            v('div', Object.assign({}, formatAriaProperties(aria), { classes: this.theme(css.bar), role: 'progressbar', 'aria-valuemin': `${min}`, 'aria-valuemax': `${max}`, 'aria-valuenow': `${value}`, 'aria-valuetext': output, id: widgetId }), this.renderProgress(percent)),
            showOutput ? v('span', { classes: this.theme(css.output) }, [output]) : null
        ]);
    }
};
Progress = tslib_1.__decorate([
    theme(css),
    customElement({
        tag: 'dojo-progress',
        properties: [
            'theme',
            'classes',
            'aria',
            'extraClasses',
            'output',
            'showOutput',
            'max',
            'min',
            'value'
        ],
        attributes: ['widgetId'],
        events: []
    })
], Progress);
export { Progress };
export default Progress;

/*# sourceMappingURL=index.mjs.map*/