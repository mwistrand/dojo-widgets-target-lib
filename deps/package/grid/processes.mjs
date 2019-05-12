import * as tslib_1 from "tslib";
import { createProcess, createCommandFactory } from '@dojo/framework/stores/process';
import { replace, remove } from '@dojo/framework/stores/state/operations';
const commandFactory = createCommandFactory();
const pageChangeCommand = commandFactory(({ path, get, payload: { id, page } }) => {
    const currentPage = get(path(id, 'meta', 'page'));
    if (page !== currentPage) {
        return [replace(path(id, 'meta', 'page'), page)];
    }
    return [];
});
const preFetcherCommand = commandFactory(({ path, get, payload: { id, page } }) => {
    const fetchedPages = get(path(id, 'meta', 'fetchedPages')) || [];
    if (fetchedPages.indexOf(page) === -1) {
        return [replace(path(id, 'meta', 'fetchedPages'), [...fetchedPages, page])];
    }
    throw Error('The page has already been requested');
});
const fetcherCommand = commandFactory(({ at, path, get, payload: { id, fetcher, page, pageSize } }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let result;
    const isSorting = get(path(id, 'meta', 'isSorting'));
    if (!isSorting) {
        const sortOptions = get(path(id, 'meta', 'sort'));
        const filterOptions = get(path(id, 'meta', 'filter'));
        try {
            result = yield fetcher(page, pageSize, {
                sort: sortOptions,
                filter: filterOptions
            });
        }
        catch (error) {
            return [remove(path(id, 'data', 'pages', `page-${page}`))];
        }
        return [
            replace(path(id, 'data', 'pages', `page-${page}`), result.data),
            replace(path(id, 'meta', 'total'), result.meta.total),
            replace(path(id, 'meta', 'pageSize'), pageSize)
        ];
    }
    else {
        throw Error('The grid is being sorted or filtered');
    }
}));
const preSortCommand = commandFactory(({ at, path, get, payload: { id, columnId, direction } }) => {
    const page = get(path(id, 'meta', 'page'));
    return [
        remove(path(id, 'data', 'pages')),
        replace(path(id, 'meta', 'fetchedPages'), page === 1 ? [1] : [page, page - 1]),
        replace(path(id, 'meta', 'sort', 'columnId'), columnId),
        replace(path(id, 'meta', 'sort', 'direction'), direction),
        replace(path(id, 'meta', 'isSorting'), true)
    ];
});
const preFilterCommand = commandFactory(({ at, path, get, payload: { id, filterOptions } }) => {
    return [
        remove(path(id, 'data', 'pages')),
        replace(path(id, 'meta', 'fetchedPages'), [1]),
        replace(path(id, 'meta', 'filter', filterOptions.columnId), filterOptions.value),
        replace(path(id, 'meta', 'currentFilter'), filterOptions),
        replace(path(id, 'meta', 'page'), 1),
        replace(path(id, 'meta', 'isSorting'), true)
    ];
});
const sortCommand = commandFactory(({ at, path, get, payload }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const { id, fetcher, columnId, direction } = payload;
    const page = get(path(id, 'meta', 'page'));
    if (page === 1) {
        return sortForFirstPage({ at, get, path, payload });
    }
    const pageSize = get(path(id, 'meta', 'pageSize'));
    const filterOptions = get(path(id, 'meta', 'filter'));
    let result;
    try {
        const options = {
            sort: { columnId, direction },
            filter: filterOptions
        };
        const previousPage = fetcher(page - 1, pageSize, options);
        const currentPage = fetcher(page, pageSize, options);
        result = yield Promise.all([previousPage, currentPage]);
    }
    catch (err) {
        return [];
    }
    return [
        replace(path(id, 'data', 'pages', `page-${page - 1}`), result[0].data),
        replace(path(id, 'data', 'pages', `page-${page}`), result[1].data),
        replace(path(id, 'meta', 'sort', 'columnId'), columnId),
        replace(path(id, 'meta', 'sort', 'direction'), direction),
        replace(path(id, 'meta', 'total'), result[1].meta.total),
        replace(path(id, 'meta', 'page'), page),
        replace(path(id, 'meta', 'isSorting'), false)
    ];
}));
const sortForFirstPage = commandFactory(({ at, path, get, payload: { id, fetcher, columnId, direction } }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const pageSize = get(path(id, 'meta', 'pageSize'));
    const filterOptions = get(path(id, 'meta', 'filter'));
    let result;
    try {
        result = yield fetcher(1, pageSize, {
            sort: { columnId, direction },
            filter: filterOptions
        });
    }
    catch (err) {
        return [];
    }
    return [
        replace(path(id, 'data', 'pages', 'page-1'), result.data),
        replace(path(id, 'meta', 'sort', 'columnId'), columnId),
        replace(path(id, 'meta', 'sort', 'direction'), direction),
        replace(path(id, 'meta', 'total'), result.meta.total),
        replace(path(id, 'meta', 'page'), 1),
        replace(path(id, 'meta', 'isSorting'), false)
    ];
}));
const filterCommand = commandFactory(({ at, path, get, payload: { id, fetcher, filterOptions } }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const pageSize = get(path(id, 'meta', 'pageSize'));
    const sortOptions = get(path(id, 'meta', 'sort'));
    const currentFilters = get(path(id, 'meta', 'filter'));
    let result;
    try {
        result = yield fetcher(1, pageSize, { sort: sortOptions, filter: currentFilters });
    }
    catch (err) {
        return [];
    }
    if (filterOptions !== get(path(id, 'meta', 'currentFilter'))) {
        throw new Error();
    }
    return [
        remove(path(id, 'data', 'pages')),
        replace(path(id, 'data', 'pages', 'page-1'), result.data),
        replace(path(id, 'meta', 'total'), result.meta.total),
        replace(path(id, 'meta', 'isSorting'), false)
    ];
}));
const preUpdateCommand = commandFactory(({ at, path, get, payload: { id, updater, columnId, value, page, rowNumber } }) => {
    const item = get(at(path(id, 'data', 'pages', `page-${page}`), rowNumber));
    const updatedItem = Object.assign({}, item, { [columnId]: value });
    return [
        replace(at(path(id, 'data', 'pages', `page-${page}`), rowNumber), updatedItem),
        replace(path(id, 'meta', 'editedRow', 'page'), page),
        replace(path(id, 'meta', 'editedRow', 'index'), rowNumber),
        replace(path(id, 'meta', 'editedRow', 'item'), Object.assign({}, item))
    ];
});
const updaterCommand = commandFactory(({ at, path, get, payload: { id, updater, columnId, value, page, rowNumber } }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const item = get(at(path(id, 'data', 'pages', `page-${page}`), rowNumber));
    try {
        yield updater(item);
    }
    catch (err) {
        const previousItem = get(path(id, 'meta', 'editedRow', 'item'));
        return [
            replace(at(path(id, 'data', 'pages', `page-${page}`), rowNumber), previousItem)
        ];
    }
    return [replace(path(id, 'meta', 'editedRow'), undefined)];
}));
export const updaterProcess = createProcess('grid-update', [preUpdateCommand, updaterCommand]);
export const fetcherProcess = createProcess('grid-fetch', [preFetcherCommand, fetcherCommand]);
export const filterProcess = createProcess('grid-filter', [preFilterCommand, filterCommand]);
export const sortProcess = createProcess('grid-sort', [
    preSortCommand,
    sortCommand
]);
export const pageChangeProcess = createProcess('grid-page-change', [pageChangeCommand]);

/*# sourceMappingURL=processes.mjs.map*/