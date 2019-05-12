import { Process } from '@dojo/framework/stores/process';
import { GridState, FetcherCommandPayload, PageChangeCommandPayload, SortCommandPayload, FilterCommandPayload, UpdaterCommandPayload } from './interfaces';
export declare const updaterProcess: Process<GridState, UpdaterCommandPayload>;
export declare const fetcherProcess: Process<GridState, FetcherCommandPayload>;
export declare const filterProcess: Process<GridState, FilterCommandPayload>;
export declare const sortProcess: Process<GridState, SortCommandPayload>;
export declare const pageChangeProcess: Process<GridState, PageChangeCommandPayload>;
