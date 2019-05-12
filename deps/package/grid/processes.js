"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var process_1 = require("@dojo/framework/stores/process");
var operations_1 = require("@dojo/framework/stores/state/operations");
var commandFactory = process_1.createCommandFactory();
var pageChangeCommand = commandFactory(function (_a) {
    var path = _a.path, get = _a.get, _b = _a.payload, id = _b.id, page = _b.page;
    var currentPage = get(path(id, 'meta', 'page'));
    if (page !== currentPage) {
        return [operations_1.replace(path(id, 'meta', 'page'), page)];
    }
    return [];
});
var preFetcherCommand = commandFactory(function (_a) {
    var path = _a.path, get = _a.get, _b = _a.payload, id = _b.id, page = _b.page;
    var fetchedPages = get(path(id, 'meta', 'fetchedPages')) || [];
    if (fetchedPages.indexOf(page) === -1) {
        return [operations_1.replace(path(id, 'meta', 'fetchedPages'), tslib_1.__spread(fetchedPages, [page]))];
    }
    throw Error('The page has already been requested');
});
var fetcherCommand = commandFactory(function (_a) {
    var at = _a.at, path = _a.path, get = _a.get, _b = _a.payload, id = _b.id, fetcher = _b.fetcher, page = _b.page, pageSize = _b.pageSize;
    return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var result, isSorting, sortOptions, filterOptions, error_1;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    isSorting = get(path(id, 'meta', 'isSorting'));
                    if (!!isSorting) return [3 /*break*/, 5];
                    sortOptions = get(path(id, 'meta', 'sort'));
                    filterOptions = get(path(id, 'meta', 'filter'));
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetcher(page, pageSize, {
                            sort: sortOptions,
                            filter: filterOptions
                        })];
                case 2:
                    result = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    return [2 /*return*/, [operations_1.remove(path(id, 'data', 'pages', "page-" + page))]];
                case 4: return [2 /*return*/, [
                        operations_1.replace(path(id, 'data', 'pages', "page-" + page), result.data),
                        operations_1.replace(path(id, 'meta', 'total'), result.meta.total),
                        operations_1.replace(path(id, 'meta', 'pageSize'), pageSize)
                    ]];
                case 5: throw Error('The grid is being sorted or filtered');
            }
        });
    });
});
var preSortCommand = commandFactory(function (_a) {
    var at = _a.at, path = _a.path, get = _a.get, _b = _a.payload, id = _b.id, columnId = _b.columnId, direction = _b.direction;
    var page = get(path(id, 'meta', 'page'));
    return [
        operations_1.remove(path(id, 'data', 'pages')),
        operations_1.replace(path(id, 'meta', 'fetchedPages'), page === 1 ? [1] : [page, page - 1]),
        operations_1.replace(path(id, 'meta', 'sort', 'columnId'), columnId),
        operations_1.replace(path(id, 'meta', 'sort', 'direction'), direction),
        operations_1.replace(path(id, 'meta', 'isSorting'), true)
    ];
});
var preFilterCommand = commandFactory(function (_a) {
    var at = _a.at, path = _a.path, get = _a.get, _b = _a.payload, id = _b.id, filterOptions = _b.filterOptions;
    return [
        operations_1.remove(path(id, 'data', 'pages')),
        operations_1.replace(path(id, 'meta', 'fetchedPages'), [1]),
        operations_1.replace(path(id, 'meta', 'filter', filterOptions.columnId), filterOptions.value),
        operations_1.replace(path(id, 'meta', 'currentFilter'), filterOptions),
        operations_1.replace(path(id, 'meta', 'page'), 1),
        operations_1.replace(path(id, 'meta', 'isSorting'), true)
    ];
});
var sortCommand = commandFactory(function (_a) {
    var at = _a.at, path = _a.path, get = _a.get, payload = _a.payload;
    return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var id, fetcher, columnId, direction, page, pageSize, filterOptions, result, options, previousPage, currentPage, err_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = payload.id, fetcher = payload.fetcher, columnId = payload.columnId, direction = payload.direction;
                    page = get(path(id, 'meta', 'page'));
                    if (page === 1) {
                        return [2 /*return*/, sortForFirstPage({ at: at, get: get, path: path, payload: payload })];
                    }
                    pageSize = get(path(id, 'meta', 'pageSize'));
                    filterOptions = get(path(id, 'meta', 'filter'));
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    options = {
                        sort: { columnId: columnId, direction: direction },
                        filter: filterOptions
                    };
                    previousPage = fetcher(page - 1, pageSize, options);
                    currentPage = fetcher(page, pageSize, options);
                    return [4 /*yield*/, Promise.all([previousPage, currentPage])];
                case 2:
                    result = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/, [
                        operations_1.replace(path(id, 'data', 'pages', "page-" + (page - 1)), result[0].data),
                        operations_1.replace(path(id, 'data', 'pages', "page-" + page), result[1].data),
                        operations_1.replace(path(id, 'meta', 'sort', 'columnId'), columnId),
                        operations_1.replace(path(id, 'meta', 'sort', 'direction'), direction),
                        operations_1.replace(path(id, 'meta', 'total'), result[1].meta.total),
                        operations_1.replace(path(id, 'meta', 'page'), page),
                        operations_1.replace(path(id, 'meta', 'isSorting'), false)
                    ]];
            }
        });
    });
});
var sortForFirstPage = commandFactory(function (_a) {
    var at = _a.at, path = _a.path, get = _a.get, _b = _a.payload, id = _b.id, fetcher = _b.fetcher, columnId = _b.columnId, direction = _b.direction;
    return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var pageSize, filterOptions, result, err_2;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    pageSize = get(path(id, 'meta', 'pageSize'));
                    filterOptions = get(path(id, 'meta', 'filter'));
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetcher(1, pageSize, {
                            sort: { columnId: columnId, direction: direction },
                            filter: filterOptions
                        })];
                case 2:
                    result = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _c.sent();
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/, [
                        operations_1.replace(path(id, 'data', 'pages', 'page-1'), result.data),
                        operations_1.replace(path(id, 'meta', 'sort', 'columnId'), columnId),
                        operations_1.replace(path(id, 'meta', 'sort', 'direction'), direction),
                        operations_1.replace(path(id, 'meta', 'total'), result.meta.total),
                        operations_1.replace(path(id, 'meta', 'page'), 1),
                        operations_1.replace(path(id, 'meta', 'isSorting'), false)
                    ]];
            }
        });
    });
});
var filterCommand = commandFactory(function (_a) {
    var at = _a.at, path = _a.path, get = _a.get, _b = _a.payload, id = _b.id, fetcher = _b.fetcher, filterOptions = _b.filterOptions;
    return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var pageSize, sortOptions, currentFilters, result, err_3;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    pageSize = get(path(id, 'meta', 'pageSize'));
                    sortOptions = get(path(id, 'meta', 'sort'));
                    currentFilters = get(path(id, 'meta', 'filter'));
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetcher(1, pageSize, { sort: sortOptions, filter: currentFilters })];
                case 2:
                    result = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _c.sent();
                    return [2 /*return*/, []];
                case 4:
                    if (filterOptions !== get(path(id, 'meta', 'currentFilter'))) {
                        throw new Error();
                    }
                    return [2 /*return*/, [
                            operations_1.remove(path(id, 'data', 'pages')),
                            operations_1.replace(path(id, 'data', 'pages', 'page-1'), result.data),
                            operations_1.replace(path(id, 'meta', 'total'), result.meta.total),
                            operations_1.replace(path(id, 'meta', 'isSorting'), false)
                        ]];
            }
        });
    });
});
var preUpdateCommand = commandFactory(function (_a) {
    var at = _a.at, path = _a.path, get = _a.get, _b = _a.payload, id = _b.id, updater = _b.updater, columnId = _b.columnId, value = _b.value, page = _b.page, rowNumber = _b.rowNumber;
    var item = get(at(path(id, 'data', 'pages', "page-" + page), rowNumber));
    var updatedItem = tslib_1.__assign({}, item, (_c = {}, _c[columnId] = value, _c));
    return [
        operations_1.replace(at(path(id, 'data', 'pages', "page-" + page), rowNumber), updatedItem),
        operations_1.replace(path(id, 'meta', 'editedRow', 'page'), page),
        operations_1.replace(path(id, 'meta', 'editedRow', 'index'), rowNumber),
        operations_1.replace(path(id, 'meta', 'editedRow', 'item'), tslib_1.__assign({}, item))
    ];
    var _c;
});
var updaterCommand = commandFactory(function (_a) {
    var at = _a.at, path = _a.path, get = _a.get, _b = _a.payload, id = _b.id, updater = _b.updater, columnId = _b.columnId, value = _b.value, page = _b.page, rowNumber = _b.rowNumber;
    return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var item, err_4, previousItem;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    item = get(at(path(id, 'data', 'pages', "page-" + page), rowNumber));
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, updater(item)];
                case 2:
                    _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _c.sent();
                    previousItem = get(path(id, 'meta', 'editedRow', 'item'));
                    return [2 /*return*/, [
                            operations_1.replace(at(path(id, 'data', 'pages', "page-" + page), rowNumber), previousItem)
                        ]];
                case 4: return [2 /*return*/, [operations_1.replace(path(id, 'meta', 'editedRow'), undefined)]];
            }
        });
    });
});
exports.updaterProcess = process_1.createProcess('grid-update', [preUpdateCommand, updaterCommand]);
exports.fetcherProcess = process_1.createProcess('grid-fetch', [preFetcherCommand, fetcherCommand]);
exports.filterProcess = process_1.createProcess('grid-filter', [preFilterCommand, filterCommand]);
exports.sortProcess = process_1.createProcess('grid-sort', [
    preSortCommand,
    sortCommand
]);
exports.pageChangeProcess = process_1.createProcess('grid-page-change', [pageChangeCommand]);

/*# sourceMappingURL=processes.js.map*/