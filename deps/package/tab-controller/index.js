"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var object_1 = require("@dojo/framework/shim/object");
var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
var Focus_1 = require("@dojo/framework/widget-core/mixins/Focus");
var d_1 = require("@dojo/framework/widget-core/d");
var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
var TabButton_1 = require("./TabButton");
var util_1 = require("@dojo/framework/core/util");
var util_2 = require("../common/util");
var css = require("../theme/tab-controller.m.css");
var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
/**
 * Enum for tab button alignment
 */
var Align;
(function (Align) {
    Align["bottom"] = "bottom";
    Align["left"] = "left";
    Align["right"] = "right";
    Align["top"] = "top";
})(Align = exports.Align || (exports.Align = {}));
var TabController = /** @class */ (function (_super) {
    tslib_1.__extends(TabController, _super);
    function TabController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._id = util_1.uuid();
        return _this;
    }
    Object.defineProperty(TabController.prototype, "_tabs", {
        get: function () {
            return this.children.filter(function (child) { return child !== null; });
        },
        enumerable: true,
        configurable: true
    });
    TabController.prototype._onDownArrowPress = function () {
        var alignButtons = this.properties.alignButtons;
        if (alignButtons === Align.left || alignButtons === Align.right) {
            this.selectNextIndex();
        }
    };
    TabController.prototype._onLeftArrowPress = function () {
        this.selectPreviousIndex();
    };
    TabController.prototype._onRightArrowPress = function () {
        this.selectNextIndex();
    };
    TabController.prototype._onUpArrowPress = function () {
        var alignButtons = this.properties.alignButtons;
        if (alignButtons === Align.left || alignButtons === Align.right) {
            this.selectPreviousIndex();
        }
    };
    /**
     * Determines if the tab at `currentIndex` is enabled. If disabled,
     * returns the next valid index, or null if no enabled tabs exist.
     */
    TabController.prototype._validateIndex = function (currentIndex, backwards) {
        var tabs = this._tabs;
        if (tabs.every(function (result) { return Boolean(result.properties.disabled); })) {
            return null;
        }
        function nextIndex(index) {
            if (backwards) {
                return (tabs.length + (index - 1)) % tabs.length;
            }
            return (index + 1) % tabs.length;
        }
        var i = !tabs[currentIndex] ? tabs.length - 1 : currentIndex;
        while (tabs[i].properties.disabled) {
            i = nextIndex(i);
        }
        return i;
    };
    TabController.prototype.closeIndex = function (index) {
        var onRequestTabClose = this.properties.onRequestTabClose;
        var key = this._tabs[index].properties.key;
        this.focus();
        onRequestTabClose && onRequestTabClose(index, key);
    };
    TabController.prototype.renderButtonContent = function (label) {
        return [label || null];
    };
    TabController.prototype.renderTabButtons = function () {
        var _this = this;
        return this._tabs.map(function (tab, i) {
            var _a = (tab.properties), closeable = _a.closeable, disabled = _a.disabled, key = _a.key, label = _a.label, theme = _a.theme, classes = _a.classes;
            return d_1.w(TabButton_1.default, {
                active: i === _this.properties.activeIndex,
                closeable: closeable,
                controls: _this._id + "-tab-" + i,
                disabled: disabled,
                focus: i === _this.properties.activeIndex ? _this.shouldFocus : function () { return false; },
                id: _this._id + "-tabbutton-" + i,
                index: i,
                key: key + "-tabbutton",
                onClick: _this.selectIndex,
                onCloseClick: _this.closeIndex,
                onDownArrowPress: _this._onDownArrowPress,
                onEndPress: _this.selectLastIndex,
                onHomePress: _this.selectFirstIndex,
                onLeftArrowPress: _this._onLeftArrowPress,
                onRightArrowPress: _this._onRightArrowPress,
                onUpArrowPress: _this._onUpArrowPress,
                theme: theme,
                classes: classes
            }, _this.renderButtonContent(label));
        });
    };
    TabController.prototype.renderTabs = function () {
        var _this = this;
        var activeIndex = this.properties.activeIndex;
        return this._tabs.map(function (tab, i) {
            object_1.assign(tab.properties, {
                widgetId: _this._id + "-tab-" + i,
                labelledBy: _this._id + "-tabbutton-" + i,
                show: i === activeIndex
            });
            return tab;
        });
    };
    TabController.prototype.selectFirstIndex = function () {
        this.selectIndex(0, true);
    };
    TabController.prototype.selectIndex = function (index, backwards) {
        var _a = this.properties, activeIndex = _a.activeIndex, onRequestTabChange = _a.onRequestTabChange;
        var validIndex = this._validateIndex(index, backwards);
        this.focus();
        if (validIndex !== null && validIndex !== activeIndex) {
            var key = this._tabs[validIndex].properties.key;
            onRequestTabChange && onRequestTabChange(validIndex, key);
        }
    };
    TabController.prototype.selectLastIndex = function () {
        this.selectIndex(this._tabs.length - 1);
    };
    TabController.prototype.selectNextIndex = function () {
        var activeIndex = this.properties.activeIndex;
        this.selectIndex(activeIndex === this._tabs.length - 1 ? 0 : activeIndex + 1);
    };
    TabController.prototype.selectPreviousIndex = function () {
        var activeIndex = this.properties.activeIndex;
        this.selectIndex(activeIndex === 0 ? this._tabs.length - 1 : activeIndex - 1, true);
    };
    TabController.prototype.render = function () {
        var _a = this.properties, activeIndex = _a.activeIndex, _b = _a.aria, aria = _b === void 0 ? {} : _b;
        var validIndex = this._validateIndex(activeIndex);
        var tabs = this.renderTabs();
        if (validIndex !== null && validIndex !== activeIndex) {
            this.selectIndex(validIndex);
            return null;
        }
        var children = [
            d_1.v('div', {
                key: 'buttons',
                classes: this.theme(css.tabButtons)
            }, this.renderTabButtons()),
            tabs.length
                ? d_1.v('div', {
                    key: 'tabs',
                    classes: this.theme(css.tabs)
                }, tabs)
                : null
        ];
        var alignClass;
        var orientation = 'horizontal';
        switch (this.properties.alignButtons) {
            case Align.right:
                alignClass = css.alignRight;
                orientation = 'vertical';
                children.reverse();
                break;
            case Align.bottom:
                alignClass = css.alignBottom;
                children.reverse();
                break;
            case Align.left:
                alignClass = css.alignLeft;
                orientation = 'vertical';
                break;
        }
        return d_1.v('div', tslib_1.__assign({}, util_2.formatAriaProperties(aria), { 'aria-orientation': orientation, classes: this.theme([alignClass ? alignClass : null, css.root]), role: 'tablist' }), children);
    };
    TabController = tslib_1.__decorate([
        Themed_1.theme(css),
        customElement_1.customElement({
            tag: 'dojo-tab-controller',
            properties: ['theme', 'classes', 'aria', 'extraClasses', 'activeIndex'],
            attributes: ['alignButtons'],
            events: ['onRequestTabChange', 'onRequestTabClose']
        })
    ], TabController);
    return TabController;
}(Themed_1.ThemedMixin(Focus_1.FocusMixin(WidgetBase_1.WidgetBase))));
exports.TabController = TabController;
exports.default = TabController;

/*# sourceMappingURL=index.js.map*/