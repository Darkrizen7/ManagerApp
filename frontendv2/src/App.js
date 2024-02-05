import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'styles';

import { AuthProvider } from 'hooks/AuthContext';
import { NavBar } from 'components'

import { GetMembers } from 'pages/members';
import { Lists, List } from 'pages/lists';
import { TransactionsRoute, TransactionRoute } from 'pages/transactions';
import { Statistics } from 'pages/admin/statistics';
import { Admin } from 'pages/admin';

import { Home } from 'pages/home';
import { Login } from 'pages/login';
import { TestComponent } from 'pages/test';

import { PermProvider } from 'hooks/PermContext';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <PermProvider>
            <NavBar />
            <Switch>
              <Route path="/test" component={TestComponent} />

              <Route path="/members" component={GetMembers} />

              <Route path="/lists/get/:listId" component={List} />
              <Route path="/lists/get" component={List} />
              <Route path="/lists" component={Lists} />

              <Route path="/transactions/get/:transactionId" component={TransactionRoute} />
              <Route path="/transactions/getByList/:list_id" component={TransactionsRoute} />
              <Route path="/transactions" component={TransactionsRoute} />

              <Route path="/admin/statistics" component={Statistics} />
              <Route path="/admin" component={Admin} />

              <Route path="/login" component={Login} />
              <Route path="/" component={Home} />
            </Switch>
          </PermProvider>
        </AuthProvider>
      </div >
    </Router>
  );
}
export default App;
