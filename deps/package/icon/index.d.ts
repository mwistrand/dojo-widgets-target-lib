import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { CustomAriaProperties } from '../common/interfaces';
import * as css from '../theme/icon.m.css';
export declare type IconType = keyof typeof css;
/**
 * @type IconProperties
 *
 * Properties that can be set on an Icon component
 *
 * @property type           Icon type, e.g. downIcon, searchIcon, etc.
 * @property altText        An optional, visually hidden label for the icon
 */
export interface IconProperties extends ThemedProperties, CustomAriaProperties {
    type: IconType;
    altText?: string;
}
declare const Icon_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase;
export declare class Icon extends Icon_base<IconProperties> {
    protected renderAltText(altText: string): DNode;
    render(): DNode;
}
export default Icon;
