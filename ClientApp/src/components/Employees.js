import React, { Component } from 'react';

export class EmployeesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            loading: true
		};
	}

    componentDidMount() {
        this.getEmployees();
    }

    async getEmployees() {
        const response = await fetch('api/employee/get');
        const data = await response.json();
        this.setState({ employees: data, loading: false });
	}

	updateState() {
		this.setState({ loading: true });
		this.getEmployees();
	}

	async handleDelete(id) {
		const response = await fetch(
			'api/employee/delete/' + id,
			{ method: 'DELETE', }
		);
		if (response.ok) {
			this.updateState();
		}
	}

    renderTable() {
        return (
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
							<th>Position</th>
							<th>Controls</th>
                        </tr>
                    </thead>
                    <tbody>
					{this.state.employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
								<td>{employee.position}</td>
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
                <h1 id="tabelLabel" >Employees</h1>
                {contents}
				{/* <p><Link to="/create">Add new employee</Link></p> */}
				<p><button className="btn btn-primary" onClick={() => this.props.history.push('/employees/create')}>New employee</button></p>
            </div>
        );
    }
}