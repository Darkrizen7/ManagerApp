import { useEffect, useState } from "react";
import { Column, Table } from "@tanstack/react-table";

const Filter = ({ column, table }: { column: Column<any>, table: Table<any> }): React.JSX.Element => {
    const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)
    const columnFilterValue = column.getFilterValue();
    const sortedUniqueValues = typeof firstValue === 'number' ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort();
    switch (typeof firstValue) {
        case "number": return (<></>);
        case "boolean": return (
            <>
                <select id={column.id + 'list'} onChange={e => { column.setFilterValue(e.target.value === "true" ? true : false) }}>
                    <option value="" key="baseoptionbool" >Oui/Non</option>
                    <option value={"true"} key={"true"} >Oui</option>
                    <option value={"false"} key={"false"} >Non</option>
                </select>
            </>
        );
        default:
            return (<>
                <datalist id={column.id + 'list'}>
                    {sortedUniqueValues.slice(0, 5000).map((value, index) => (
                        <option value={value} key={index} />
                    ))}
                </datalist>
                <DebouncedInput
                    type="text"
                    value={(columnFilterValue ?? '')}
                    onChange={(value: any) => column.setFilterValue(value)}
                    placeholder={`Rechercher`}
                    className="w-36 border shadow rounded"
                />
            </>)
    }
}
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }:
    { value: any, onChange: (value: any) => void, debounce?: number, type: string, placeholder: string, className: string }) => {
    const [value, setValue] = useState(initialValue)
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])
    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
        //eslint-disable-next-line
    }, [value, debounce])
    return (
        <input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}

export { Filter, DebouncedInput }