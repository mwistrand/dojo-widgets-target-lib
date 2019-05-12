import { DNode } from '@dojo/framework/widget-core/interfaces';
import { CustomAriaProperties } from '../common/interfaces';
import MetaBase from '@dojo/framework/widget-core/meta/Base';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { FocusMixin, FocusProperties } from '@dojo/framework/widget-core/mixins/Focus';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
export declare class ScrollMeta extends MetaBase {
    scroll(key: string | number, amount: number): void;
}
/**
 * @type ListboxProperties
 *
 * Properties that can be set on a Listbox component
 *
 * @property activeIndex          Index of the currently active listbox option
 * @property getOptionLabel       Function to return string label based on option data
 * @property getOptionDisabled    Function that accepts option data and returns a boolean for disabled/not disabled
 * @property getOptionId          Function that accepts option data and returns a string ID
 * @property getOptionSelected    Function that accepts option data and returns a boolean for selected/unselected
 * @property widgetId               Optional custom id for the root node of the listbox
 * @property focus                Indicates if the listbox needs focusing
 * @property multiselect          Adds currect semantics for a multiselect listbox
 * @property optionData           Array of data for listbox options
 * @property tabIndex             Listbox is in the focus order by default, but setting tabIndex: -1 will remove it
 * @property visualFocus          When controlling Listbox through an outside widget, e.g. in ComboBox, visualFocus mimics visual focus styling when true
 * @property onActiveIndexChange  Called with the index of the new requested active descendant
 * @property onOptionSelect       Called with the option data of the new requested selected item
 */
export interface ListboxProperties extends ThemedProperties, FocusProperties, CustomAriaProperties {
    activeIndex?: number;
    getOptionDisabled?(option: any, index: number): boolean;
    getOptionId?(option: any, index: number): string;
    getOptionLabel?(option: any, index: number): DNode;
    getOptionSelected?(option: any, index: number): boolean;
    widgetId?: string;
    multiselect?: boolean;
    optionData?: any[];
    tabIndex?: number;
    visualFocus?: boolean;
    onActiveIndexChange?(index: number, key?: string | number): void;
    onKeyDown?(event: KeyboardEvent, key?: string | number): void;
    onOptionSelect?(option: any, index: number, key?: string | number): void;
}
declare const Listbox_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => FocusMixin);
export declare class Listbox extends Listbox_base<ListboxProperties> {
    private _boundRenderOption;
    private _idBase;
    private _getOptionDisabled(option, index);
    private _getOptionId(index);
    private _onKeyDown(event);
    private _onOptionClick(option, index, key?);
    protected animateScroll(scrollValue: number): void;
    private _calculateScroll();
    protected getModifierClasses(): (string | null)[];
    protected getOptionClasses(active: boolean, disabled: boolean, selected: boolean): (string | null)[];
    protected renderOptionLabel(option: any, index: number): DNode;
    protected renderOption(option: any, index: number): DNode;
    protected renderOptions(): DNode[];
    protected render(): DNode;
}
export default Listbox;
