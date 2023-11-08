import React, { Component } from 'react';
import './App.css';

import Header from './components/Header.js';

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
          <Header handleLogin={this.handleLogin} handleLogout={this.handleLogout} user={this.state.user}></Header>
        </header>
      </div >
    );
  }
}
export default App;
