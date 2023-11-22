import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'App.css';

import { AuthProvider } from 'hooks/AuthContext';
import { NavBar } from 'components'

import { GetMembers } from 'pages/members';
import { Lists, List } from 'pages/lists';
import { Transactions, Transaction } from 'pages/transactions';

import { Home } from 'pages/home';
import { Login } from 'pages/login';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <NavBar />
          <Switch>
            <Route path="/members" component={GetMembers} />

            <Route path="/lists/get/:listId" component={List} />
            <Route path="/lists/get" component={List} />
            <Route path="/lists" component={Lists} />

            <Route path="/transactions/get/:transactionId" component={Transaction} />
            <Route path="/transactions/getByList/:list" component={Transactions} />
            <Route path="/transactions" component={Transactions} />

            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </AuthProvider>
      </div >
    </Router>
  );
}
export default App;
