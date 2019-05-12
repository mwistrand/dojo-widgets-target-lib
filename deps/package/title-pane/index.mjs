import * as tslib_1 from "tslib";
import { uuid } from '@dojo/framework/core/util';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin } from '@dojo/framework/widget-core/mixins/Focus';
import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import Icon from '../icon/index';
import * as fixedCss from './styles/title-pane.m.css';
import * as css from '../theme/title-pane.m.css';
import { Dimensions } from '@dojo/framework/widget-core/meta/Dimensions';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import GlobalEvent from '../global-event/index';
let TitlePane = class TitlePane extends ThemedMixin(FocusMixin(WidgetBase)) {
    constructor() {
        super(...arguments);
        this._id = uuid();
        this._onWindowResize = () => {
            this.invalidate();
        };
    }
    _onTitleClick(event) {
        event.stopPropagation();
        this._toggle();
    }
    _toggle() {
        const { closeable = true, key, onRequestClose, onRequestOpen, open = true } = this.properties;
        if (!closeable) {
            return;
        }
        if (open) {
            onRequestClose && onRequestClose(key);
        }
        else {
            onRequestOpen && onRequestOpen(key);
        }
    }
    getButtonContent() {
        return this.properties.title;
    }
    getFixedModifierClasses() {
        const { closeable = true } = this.properties;
        return [closeable ? fixedCss.closeableFixed : null];
    }
    getModifierClasses() {
        const { closeable = true } = this.properties;
        return [closeable ? css.closeable : null];
    }
    getPaneContent() {
        return this.children;
    }
    renderExpandIcon() {
        const { open = true, theme, classes } = this.properties;
        return v('span', { classes: this.theme(css.arrow) }, [
            w(Icon, { type: open ? 'downIcon' : 'rightIcon', theme, classes })
        ]);
    }
    getPaneStyles() {
        const { open = true } = this.properties;
        const contentDimensions = this.meta(Dimensions).get('content');
        return { marginTop: open ? '0px' : `-${contentDimensions.offset.height}px` };
    }
    render() {
        const { closeable = true, headingLevel, open = true } = this.properties;
        let transition = false;
        if (open !== this._open) {
            transition = true;
            this._open = open;
        }
        return v('div', {
            classes: [...this.theme([css.root, open ? css.open : null]), fixedCss.rootFixed]
        }, [
            w(GlobalEvent, { key: 'global', window: { resize: this._onWindowResize } }),
            v('div', {
                'aria-level': headingLevel ? `${headingLevel}` : null,
                classes: [
                    ...this.theme([css.title, ...this.getModifierClasses()]),
                    fixedCss.titleFixed,
                    ...this.getFixedModifierClasses()
                ],
                role: 'heading'
            }, [
                v('button', {
                    'aria-controls': `${this._id}-content`,
                    'aria-expanded': `${open}`,
                    disabled: !closeable,
                    classes: [
                        fixedCss.titleButtonFixed,
                        ...this.theme([css.titleButton])
                    ],
                    focus: this.shouldFocus,
                    id: `${this._id}-title`,
                    type: 'button',
                    onclick: this._onTitleClick
                }, [this.renderExpandIcon(), this.getButtonContent()])
            ]),
            v('div', {
                'aria-hidden': open ? null : 'true',
                'aria-labelledby': `${this._id}-title`,
                classes: [
                    ...this.theme([css.content, transition ? css.contentTransition : null]),
                    fixedCss.contentFixed
                ],
                id: `${this._id}-content`,
                key: 'content',
                styles: this.getPaneStyles()
            }, this.getPaneContent())
        ]);
    }
};
TitlePane = tslib_1.__decorate([
    theme(css),
    customElement({
        tag: 'dojo-title-pane',
        properties: ['theme', 'classes', 'extraClasses', 'open', 'closeable', 'headingLevel'],
        attributes: ['title', 'key'],
        events: ['onRequestClose', 'onRequestOpen']
    })
], TitlePane);
export { TitlePane };
export default TitlePane;

/*# sourceMappingURL=index.mjs.map*/