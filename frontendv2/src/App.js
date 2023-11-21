import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'App.css';

import { AuthProvider } from 'hooks/AuthContext';
import { NavBar } from 'components'

import { GetLists, GetList } from 'pages/lists';
import { GetTransactions, GetTransaction } from 'pages/transactions';

import { Home } from 'pages/home';
import { Login } from 'pages/login';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <NavBar />
          <Switch>

            <Route path="/lists/get/:listName" component={GetList} />
            <Route path="/lists/get" component={GetList} />
            <Route path="/lists" component={GetLists} />

            <Route path="/transactions/get/:transactionId" component={GetTransaction} />
            <Route path="/transactions/getByList/:list" component={GetTransactions} />
            <Route path="/transactions" component={GetTransactions} />

            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </AuthProvider>
      </div >
    </Router>
  );
}
export default App;
