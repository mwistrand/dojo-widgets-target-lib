import * as tslib_1 from "tslib";
import { uuid } from '@dojo/framework/core/util';
import { I18nMixin } from '@dojo/framework/widget-core/mixins/I18n';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { formatAriaProperties } from '../common/util';
import * as animations from '../common/styles/animations.m.css';
import commonBundle from '../common/nls/common';
import Icon from '../icon/index';
import * as fixedCss from './styles/slide-pane.m.css';
import * as css from '../theme/slide-pane.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import diffProperty from '@dojo/framework/widget-core/decorators/diffProperty';
/**
 * Enum for left / right alignment
 */
export var Align;
(function (Align) {
    Align["bottom"] = "bottom";
    Align["left"] = "left";
    Align["right"] = "right";
    Align["top"] = "top";
})(Align || (Align = {}));
/**
 * The default width of the slide pane
 */
const DEFAULT_WIDTH = 320;
var Plane;
(function (Plane) {
    Plane[Plane["x"] = 0] = "x";
    Plane[Plane["y"] = 1] = "y";
})(Plane || (Plane = {}));
var Slide;
(function (Slide) {
    Slide[Slide["in"] = 0] = "in";
    Slide[Slide["out"] = 1] = "out";
})(Slide || (Slide = {}));
let SlidePane = class SlidePane extends I18nMixin(ThemedMixin(WidgetBase)) {
    constructor() {
        super(...arguments);
        this._initialPosition = 0;
        this._titleId = uuid();
        this._transform = 0;
        this._hasMoved = false;
    }
    get plane() {
        const { align = Align.left } = this.properties;
        return align === Align.left || align === Align.right ? Plane.x : Plane.y;
    }
    _onOpenChange(oldProperties, newProperties) {
        const wasOpen = oldProperties.open;
        const { open, onOpen } = newProperties;
        if (open && !wasOpen) {
            this._slide = Slide.in;
            onOpen && onOpen();
        }
        else if (!open && wasOpen) {
            this._slide = Slide.out;
        }
    }
    _getDelta(event, eventType) {
        const { align = Align.left } = this.properties;
        if (this.plane === Plane.x) {
            const currentX = event.type === eventType ? event.changedTouches[0].screenX : event.pageX;
            return align === Align.right
                ? currentX - this._initialPosition
                : this._initialPosition - currentX;
        }
        else {
            const currentY = event.type === eventType ? event.changedTouches[0].screenY : event.pageY;
            return align === Align.bottom
                ? currentY - this._initialPosition
                : this._initialPosition - currentY;
        }
    }
    _onCloseClick(event) {
        event.stopPropagation();
        const { onRequestClose } = this.properties;
        onRequestClose && onRequestClose();
    }
    _onSwipeStart(event) {
        event.stopPropagation();
        this._swiping = true;
        // Cache initial pointer position
        if (this.plane === Plane.x) {
            this._initialPosition =
                event.type === 'touchstart' ? event.changedTouches[0].screenX : event.pageX;
        }
        else {
            this._initialPosition =
                event.type === 'touchstart' ? event.changedTouches[0].screenY : event.pageY;
        }
        // Clear out the last transform applied
        this._transform = 0;
    }
    _onSwipeMove(event) {
        event.stopPropagation();
        // Ignore mouse movement when not swiping
        if (!this._swiping) {
            return;
        }
        this._hasMoved = true;
        const { width = DEFAULT_WIDTH } = this.properties;
        const delta = this._getDelta(event, 'touchmove');
        // Prevent pane from sliding past screen edge
        if (delta >= 0) {
            this._transform = (100 * delta) / width;
            this.invalidate();
        }
    }
    _onSwipeEnd(event) {
        event.stopPropagation();
        this._swiping = false;
        this._hasMoved = false;
        const { onRequestClose, width = DEFAULT_WIDTH } = this.properties;
        const delta = this._getDelta(event, 'touchend');
        // If the pane was swiped far enough to close
        if (delta > width / 2) {
            onRequestClose && onRequestClose();
        }
        else if (delta > 0) {
            // Animate the pane back open
            this._slide = Slide.in;
            this.invalidate();
        }
    }
    _onUnderlayMouseUp(event) {
        const { onRequestClose } = this.properties;
        if (this._hasMoved === false) {
            onRequestClose && onRequestClose();
        }
    }
    getContent() {
        return v('div', { classes: [this.theme(css.content), fixedCss.contentFixed] }, this.children);
    }
    getStyles() {
        const { align = Align.left, width = DEFAULT_WIDTH } = this.properties;
        let translate = '';
        const translateAxis = this.plane === Plane.x ? 'X' : 'Y';
        if (this._swiping) {
            translate =
                align === Align.left || align === Align.top
                    ? `-${this._transform}`
                    : `${this._transform}`;
        }
        return {
            transform: translate ? `translate${translateAxis}(${translate}%)` : null,
            width: this.plane === Plane.x ? `${width}px` : null,
            height: this.plane === Plane.y ? `${width}px` : null
        };
    }
    getFixedModifierClasses() {
        const { align = Align.left, open = false } = this.properties;
        const alignCss = fixedCss;
        return [
            open ? fixedCss.openFixed : null,
            alignCss[`${align}Fixed`],
            this._slide === Slide.in ? fixedCss.slideInFixed : null,
            this._slide === Slide.out ? fixedCss.slideOutFixed : null
        ];
    }
    getModifierClasses() {
        const { align = Align.left, open = false } = this.properties;
        const alignCss = css;
        return [
            alignCss[align],
            open ? css.open : null,
            this._slide === Slide.in ? css.slideIn : null,
            this._slide === Slide.out ? css.slideOut : null
        ];
    }
    renderTitle() {
        const { title = '' } = this.properties;
        return v('div', { id: this._titleId }, [title]);
    }
    renderUnderlay() {
        const { underlay = false } = this.properties;
        return v('div', {
            classes: [this.theme(underlay ? css.underlayVisible : null), fixedCss.underlay],
            enterAnimation: animations.fadeIn,
            exitAnimation: animations.fadeOut,
            onmouseup: this._onUnderlayMouseUp,
            ontouchend: this._onUnderlayMouseUp,
            key: 'underlay'
        });
    }
    render() {
        let { aria = {}, closeText, open = false, title = '', theme, classes } = this.properties;
        const contentStyles = this.getStyles();
        const contentClasses = this.getModifierClasses();
        const fixedContentClasses = this.getFixedModifierClasses();
        if (!closeText) {
            const { messages } = this.localizeBundle(commonBundle);
            closeText = `${messages.close} ${title}`;
        }
        // This is a side-effect of rendering, it clears the slide styles for the next render.
        this._slide = undefined;
        return v('div', {
            'aria-labelledby': this._titleId,
            classes: this.theme(css.root),
            onmousedown: this._onSwipeStart,
            onmousemove: this._onSwipeMove,
            onmouseup: this._onSwipeEnd,
            ontouchend: this._onSwipeEnd,
            ontouchmove: this._onSwipeMove,
            ontouchstart: this._onSwipeStart
        }, [
            open ? this.renderUnderlay() : null,
            v('div', Object.assign({}, formatAriaProperties(aria), { key: 'content', classes: [
                    ...this.theme([css.pane, ...contentClasses]),
                    fixedCss.paneFixed,
                    ...fixedContentClasses
                ], transitionend: this.invalidate, styles: contentStyles }), [
                title
                    ? v('div', {
                        classes: this.theme(css.title),
                        key: 'title'
                    }, [
                        this.renderTitle(),
                        v('button', {
                            classes: this.theme(css.close),
                            type: 'button',
                            onclick: this._onCloseClick
                        }, [
                            closeText,
                            w(Icon, { type: 'closeIcon', theme, classes })
                        ])
                    ])
                    : null,
                this.getContent()
            ])
        ]);
    }
};
tslib_1.__decorate([
    diffProperty('open'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SlidePane.prototype, "_onOpenChange", null);
SlidePane = tslib_1.__decorate([
    theme(css),
    customElement({
        tag: 'dojo-slide-pane',
        properties: ['theme', 'aria', 'extraClasses', 'open', 'underlay', 'classes'],
        attributes: ['align', 'closeText', 'title'],
        events: ['onOpen', 'onRequestClose']
    })
], SlidePane);
export { SlidePane };
export default SlidePane;

/*# sourceMappingURL=index.mjs.map*/