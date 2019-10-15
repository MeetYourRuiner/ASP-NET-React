import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './custom.css'
import { EmployeesComponent } from './components/Employees';
import { CreateComponent } from './components/Create';

export default class App extends Component {
  static displayName = App.name;

	render () {
		return (
			<Layout>
				<Route exact path='/' component={Home} />
				<Route exact path='/employees' component={EmployeesComponent}/>
				<Route path='/employees/create' component={CreateComponent} />
				<Route path='/employees/edit/:id' component={CreateComponent}/>
			</Layout>
		);
	}
}
