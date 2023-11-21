import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './login.css';

import { useAuth } from 'hooks/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login, error, isConnected } = useAuth();
    const history = useHistory();
    if (isConnected()) {
        history.push('/');
        return;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    }

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value })
    }
    return (
        <form className="container">
            <div className="header">
                <div className="text">Login</div>
                {error && error}
            </div>
            <div className="inputs">
                <div className="input">
                    <label>Email</label>
                    <input id="email" value={formData.email} onChange={handleFormChange} type="email"></input>
                </div>
                <div className="input">
                    <label>Password</label>
                    <input id="password" value={formData.password} onChange={handleFormChange} type="password"></input>
                </div>
            </div>
            <div className="submit-container">
                <button className="submit" type="submit" onClick={handleSubmit}>Login</button>
            </div>
        </form>
    )
}

export { Login };