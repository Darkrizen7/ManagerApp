import React, { Component } from 'react';
import LoginForm from './LoginForm.js';
import SignOut from './SignOut.js';

class Header extends Component {
    handleLogout = () => {
        this.props.handleLogout();
    };
    handleLogin = (data) => {
        this.props.handleLogin(data);
    };

    render() {
        return (
            <nav>
                <ul>
                    <li>
                        {this.props.user ? <>{this.props.user.username} </> : <></>}
                    </li>
                    <li>{!this.props.user && <LoginForm handle={this.handleLogin}></LoginForm>}</li>
                    <li>{this.props.user && <SignOut handle={this.handleLogout}></SignOut>}</li>
                    <li>{this.props.user && this.props.user.role === "admin" && <>Admin</>}</li>
                </ul>
            </nav>
        );
    }
}
export default Header;
