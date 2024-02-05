import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from "./hooks";
import { Login, Home, ListsController, TransactionsController, ListController, TransactionController, MembersController } from "./pages";
import { Nav } from "components";
import { PermProvider } from "hooks/PermContext";

import "./styles/app.css"
export function App(): React.JSX.Element {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <PermProvider>
            <>
              <Nav />
              <Routes>
                <Route path="/login" Component={Login} />
                <Route path="/members" Component={MembersController} />
                <Route path="/lists" Component={ListsController} />
                <Route path="/list/:_id?" Component={ListController} />
                <Route path="/transactions/:list_id?" Component={TransactionsController} />
                <Route path="/transaction/:_id" Component={TransactionController} />
                <Route path="/" Component={Home} />
              </Routes>
            </>
          </PermProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}