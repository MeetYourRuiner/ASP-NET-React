import React, { Component } from 'react';
import { API } from '../API.js';
import { Link } from 'react-router-dom';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.handleSumbit = this.handleSumbit.bind(this);
    }

    async handleSumbit(event) {
        event.preventDefault();
        const loginData = {
            login: event.target.login.value,
            password: event.target.password.value,
        }
        const response = await API.login(loginData);
        const obj = await response.json();
        sessionStorage.setItem('access_token', obj.access_token);
        sessionStorage.setItem('name', loginData.login);
        this.props.history.push('/');
    }

    render () {
        return API.isAuthenticated()
            ? (
                <div>
                    Welcome, {sessionStorage.getItem('name')}!
                    <p/><Link to='/employees'>Open employees list</Link>
                </div>
            )
            : (
                <div className="loginBox">
                    <form onSubmit={this.handleSumbit}>
                        <label>Username:</label><br/>
                        <input name="login" type="text" /><br />
                        <label>Password:</label><br />
                        <input name="password" type="text" /><br />
                        <input className="btn btn-primary" type="submit" value="Log in"/>
                    </form>
                </div>
            );
    }
}
