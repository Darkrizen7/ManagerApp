import React, { useEffect, useState } from "react"

import { IList } from 'interfaces';

import { fetchLists } from 'lib/api';

import { ListsTable } from "./components";

const Statistics: React.FC = (): JSX.Element => {
    const [lists, setLists]: [IList[], Function] = useState()
    const [apiError, setAPIError] = useState();
    useEffect(() => {
        (async () => {
            const { dataLists, error }: { dataLists: IList[], error: any } = await fetchLists();
            console.log(error);
            if (dataLists) setLists(dataLists)
            if (error) setAPIError(error);
        })();
    }, []);
    return (
        <>
            {apiError &&
                <div style={{ color: "red" }}>{apiError}</div>
            }
            <ListsTable lists={lists}></ListsTable>
        </>
    );
}
export { Statistics };