import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
export interface ListenerObject {
    [index: string]: (event?: any) => void;
}
export interface GlobalEventProperties extends Partial<RegisteredListeners> {
    window?: ListenerObject;
    document?: ListenerObject;
}
export interface RegisteredListeners {
    window: ListenerObject;
    document: ListenerObject;
}
export declare class GlobalEvent extends WidgetBase<GlobalEventProperties> {
    private _listeners;
    private _registerListeners(type, previousListeners, newListeners);
    private _removeAllRegisteredListeners(type);
    protected onWindowListenersChange(previousListeners: RegisteredListeners, newListeners: RegisteredListeners): void;
    protected onDocumentListenersChange(previousListeners: RegisteredListeners, newListeners: RegisteredListeners): void;
    protected onDetach(): void;
    protected render(): DNode | DNode[];
}
export default GlobalEvent;
