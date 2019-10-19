import React, { Component } from 'react';
import { PageSelector } from './PageSelector'
import { API } from '../API.js';

export class EmployeesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            loading: true,
            pages: 0,
            currentPage: 1,
        };
        this.handlePageSelector = this.handlePageSelector.bind(this);
	}

    componentDidMount() {
        this.fetchEmployees();
    }

    async fetchEmployees() {
        const response = await API.getEmployees();
        const data = await response.json();
        this.setState({ employees: data, loading: false, pages: (data.length / 10)});
	}

	updateState() {
		this.setState({ loading: true });
		this.fetchEmployees();
	}

	async handleDelete(id) {
        const response = await API.deleteEmployee(id);
		if (response.ok) {
			this.updateState();
		}
	}

    handlePageSelector(page) {
        if (page != this.state.currentPage)
            this.setState({ currentPage: page });
    }

    getDate(string) {
        let date = new Date(string);
        return date.toLocaleDateString();
    }

    renderTable() {
        let employeesOnPage = [];
        const page = this.state.currentPage;
        employeesOnPage = this.state.employees.slice(
            (page - 1) * 10, // 0, 10, etc...
            (10 * page) // не включая 10
        )
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Birthday</th>
                        <th>Salary</th>
					    <th>Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {employeesOnPage.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{this.getDate(employee.birthday)}</td>
                            <td>{employee.salary}</td>
					    <td>
						    <button className="btn btn-primary" onClick={() => this.props.history.push("/employees/edit/" + employee.id)}>Edit</button>
						    <button className="btn btn-primary" onClick={() => this.handleDelete(employee.id)}>Delete</button>
					    </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTable();
        return (
            <div>
                <h1 id="tableLabel" >Employees</h1>
                <p><button className="btn btn-primary" onClick={() => this.props.history.push('/employees/create')}>New</button></p>
                {contents}
                <PageSelector pages={this.state.pages} handle={this.handlePageSelector}/>
            </div>
        );
    }
}