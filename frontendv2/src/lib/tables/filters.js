import {
    rankItem,
} from '@tanstack/match-sorter-utils'

const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta(itemRank)
    return itemRank.passed
}
const booleanFilter = (row, columnId, value, addMeta) => {
    return row.getValue(columnId) === value
}
export { fuzzyFilter, booleanFilter };