import React from "react";
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Admin: React.FC = (): JSX.Element => {
    return (<>
        <ul>
            <Link className="link" to="/admin/statistics">Statistics</Link>
            <Link className="link" to="/lists">Listes</Link>
            <Link className="link" to="/transactions">Transactions</Link>
            <Link className="link" to="/members">Membres</Link>
        </ul>
    </>)
}
export { Admin }