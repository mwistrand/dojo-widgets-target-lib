import { DNode } from '@dojo/framework/widget-core/interfaces';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { I18nMixin } from '@dojo/framework/widget-core/mixins/I18n';
import { ThemedMixin, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { CustomAriaProperties } from '../common/interfaces';
/**
 * The role of this dialog, used for accessibility
 */
export declare type RoleType = 'dialog' | 'alertdialog';
/**
 * @type DialogProperties
 *
 * Properties that can be set on a Dialog component
 *
 * @property closeable          Determines whether the dialog can be closed
 * @property closeText          Hidden text used by screen readers to display for the close button
 * @property enterAnimation     css class to be used when animating the dialog entering, or null to disable the animation
 * @property exitAnimation      css class to be used when animating the dialog exiting, or null to disable the animation
 * @property underlayEnterAnimation     css class to be used when animating the dialog underlay entering, or null to disable the animation
 * @property underlayExitAnimation      css class to be used when animating the dialog underlay exiting, or null to disable the animation
 * @property modal              Determines whether the dialog can be closed by clicking outside its content
 * @property onOpen             Called when the dialog opens
 * @property onRequestClose     Called when the dialog is closed
 * @property open               Determines whether the dialog is open or closed
 * @property role               Role of this dialog for accessibility, either 'alert' or 'dialog'
 * @property title              Title to show in the dialog title bar
 * @property underlay           Determines whether a semi-transparent background shows behind the dialog
 */
export interface DialogProperties extends ThemedProperties, CustomAriaProperties {
    closeable?: boolean;
    closeText?: string;
    enterAnimation?: string | null;
    exitAnimation?: string | null;
    underlayEnterAnimation?: string | null;
    underlayExitAnimation?: string | null;
    modal?: boolean;
    onOpen?(): void;
    onRequestClose?(): void;
    open?: boolean;
    role?: RoleType;
    title?: string;
    underlay?: boolean;
}
declare const Dialog_base: (new (...args: any[]) => ThemedMixin<{}>) & typeof WidgetBase & (new (...args: any[]) => I18nMixin);
export declare class Dialog extends Dialog_base<DialogProperties> {
    private _titleId;
    private _wasOpen;
    private _callFocus;
    private _initialFocusSet;
    private _onCloseClick(event);
    private _checkFocus();
    private _close();
    private _onUnderlayClick(event);
    private _onKeyUp;
    private _onOpen();
    protected getContent(): DNode;
    protected renderTitle(): DNode;
    protected renderUnderlay(): DNode;
    protected render(): DNode;
}
export default Dialog;
