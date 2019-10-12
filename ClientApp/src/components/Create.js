import React, { Component } from 'react';

export class CreateComponent extends Component {
    constructor(props) {
		super(props);
		this.state = {
			name: '', position: '', IsEdit: false, title: "Create"};
		let { id } = this.props.match.params;
		if (id !== undefined) {
            this.state = { IsEdit: true, title: 'Edit', name: '', position: '', empid: id};
            this.fetchEmployee(id);
        }
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	async handleSubmit(event) {
        event.preventDefault();
        if (this.state.IsEdit) {
            const data = JSON.stringify({ 'name': this.state.name, 'position': this.state.position });
            await fetch('api/employee/update/' + this.state.empid, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            this.props.history.push('/employees');
        }
        else {
            const data = JSON.stringify({ 'name': this.state.name, 'position': this.state.position });
            await fetch('api/employee/create', {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            this.props.history.push('/employees');
        }
	}

    async fetchEmployee(id) {
        const response = await fetch('api/employee/get/' + id);
        const object = await response.json();
        this.setState({name: object.name, position: object.position});
	}

	handleInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	render() {
        return (
			<form onSubmit={this.handleSubmit}>
				<h1>{this.state.title}</h1>
                <label> Name:
                    <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange}/>
                </label><br/>
                <label> Position:
                    <input name="position" type="text" value={this.state.position} onChange={this.handleInputChange}/>
				</label><br />
				<input className="btn btn-primary" type="submit" value="Submit" />
				<button className="btn btn-primary" onClick={() => this.props.history.push('/employees')}>Cancel</button>
            </form>
            );
    }
}