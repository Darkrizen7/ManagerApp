import React, { Component } from 'react';
import './App.css';

import LoginForm from './components/LoginForm.js';
import SignOut from './components/SignOut.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  };

  checkTokenValidity = async () => {
    try {
      const response = await fetch('http://localhost:3000/isTokenValid', {
        credentials: 'include',
        method: 'GET',
      });
      const body = await response.json();
      this.setState({ user: body.data })
      console.log(this.state.user);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  componentDidMount() {
    this.checkTokenValidity();
  };

  handleLogout = () => {
    this.setState({ user: null });
  };
  handleLogin = (data) => {
    this.setState({ user: data.user })
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            {this.state.user ? <div>Hi {this.state.user.username} </div> : <div>Hi Stranger</div>}
          </h1>
          {!this.state.user && <LoginForm handle={this.handleLogin}></LoginForm>}
          {this.state.user && <SignOut handle={this.handleLogout}></SignOut>}
        </header>
      </div>
    );
  }
}
export default App;
