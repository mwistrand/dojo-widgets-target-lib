"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function monthInMin(year, month, minDate) {
    if (minDate) {
        return new Date(year, month, 1) >= new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    }
    return true;
}
exports.monthInMin = monthInMin;
function monthInMax(year, month, maxDate) {
    if (maxDate) {
        var thisMonth = new Date(year, month, 1);
        var max = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
        return thisMonth <= max;
    }
    return true;
}
exports.monthInMax = monthInMax;

/*# sourceMappingURL=date-utils.js.map*/