import {
    rankItem,
} from '@tanstack/match-sorter-utils'

const fuzzyFilter = (row: any, columnId: any, value: any, addMeta: any) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta(itemRank)
    return itemRank.passed
}
const booleanFilter = (row: any, columnId: any, value: any, addMeta: any) => {
    return row.getValue(columnId) === value
}
export { fuzzyFilter, booleanFilter };