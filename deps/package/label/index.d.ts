import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { CustomAriaProperties } from '../common/interfaces';
/**
 * @type LabelProperties
 *
 * Properties that can be set on a Label component
 *
 * @property forId     ID to explicitly associate the label with an input element
 * @property disabled
 * @property focused
 * @property readOnly
 * @property required
 * @property invalid
 * @property hidden
 * @property secondary
 */
export interface LabelProperties extends ThemedProperties, CustomAriaProperties {
    forId?: string;
    disabled?: boolean;
    focused?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    hidden?: boolean;
    secondary?: boolean;
    widgetId?: string;
}
declare const Label_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export declare class Label extends Label_base<LabelProperties> {
    protected getRootClasses(): (string | null)[];
    render(): DNode;
}
export default Label;
