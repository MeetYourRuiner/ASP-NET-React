import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import './custom.css'
import { EmployeesComponent } from './components/Employees';
import { CreateComponent } from './components/Create';
import PrivateRoute from './components/PrivateRoute';

export default class App extends Component {
  static displayName = App.name;

	render () {
		return (
			<Layout>
                <Route exact path='/' component={Login} />
                <Route path='/login' component={Login} />
				<PrivateRoute exact path='/employees' component={EmployeesComponent}/>
				<PrivateRoute path='/employees/create' component={CreateComponent} />
				<PrivateRoute path='/employees/edit/:id' component={CreateComponent} />
			</Layout>
		);
	}
}
