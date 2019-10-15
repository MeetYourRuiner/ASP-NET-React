import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subYears } from 'date-fns/esm';
import { toDate } from 'date-fns/fp';

export class CreateComponent extends Component {
    constructor(props) {
        super(props);
        // CREATE STATE
		this.state = {
            name: '', email: '', birthday: '', salary: 0, IsEdit: false, title: "Create new employee",
            isNameValid: true, isEmailValid: true, isSalaryValid: true,
        };
		let { id } = this.props.match.params;
		if (id !== undefined) {
            // EDIT STATE
            this.state = {
                name: '', email: '', birthday: '', salary: 0, empid: id, IsEdit: true, title: 'Edit employee',
                isNameValid: true, isEmailValid: true, isSalaryValid: true,
            };
            this.fetchEmployee(id);
        }
		this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.Validation = this.Validation.bind(this);
	}

	async handleSubmit(event) {
        event.preventDefault();
        if (this.state.isEmailValid && this.state.isNameValid && this.state.isSalaryValid) {
            if (this.state.IsEdit) {
                const data = JSON.stringify({
                    'name': this.state.name,
                    'email': this.state.email,
                    'birthday': this.state.birthday,
                    'salary': parseInt(this.state.salary),
                });
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
                const data = JSON.stringify({
                    'name': this.state.name,
                    'email': this.state.email,
                    'birthday': this.state.birthday,
                    'salary': parseInt(this.state.salary),
                }
                );
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
	}

    async fetchEmployee(id) {
        const response = await fetch('api/employee/get/' + id);
        const object = await response.json();
        const date = toDate(new Date(object.birthday));
        this.setState({
            name: object.name,
            email: object.email,
            birthday: date,
            salary: object.salary,
        });
	}

    handleInputChange(event) {
        if (event.target !== undefined) {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
        else {
            this.setState({ birthday: event });
        }
	}

    Validation(event) {
        const emailReg = /(?<!.)(\w|\.|\+|\-)+@\w+\.\w+(?!.)/;
        const nameReg = /(?<!.)([a-zA-Z]|[а-яА-Я]){2,}(?!.)/;
        switch (event.target.name) {
            case "name":
                if (nameReg.test(event.target.value))
                    this.setState({ isNameValid: true });
                else
                    this.setState({ isNameValid: false });
                break;
            case "email":
                if (emailReg.test(event.target.value))
                    this.setState({ isEmailValid: true });
                else
                    this.setState({ isEmailValid: false });
                break;
            case "salary":
                if (this.state.salary >= 0)
                    this.setState({ isSalaryValid: true });
                else
                    this.setState({ isSalaryValid: false });
                break;
        }
    }

    render() {
        return (
			<form onSubmit={this.handleSubmit}>
                <h1>{this.state.title}</h1>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <label> Name:</label>
                        </td>
                        <td>
                            <input className={this.state.isNameValid ? 'valid' : 'invalid'} required name="name" type="text" value={this.state.name} onChange={this.handleInputChange} onBlur={this.Validation}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label> Email: </label>
                        </td>
                        <td>
                            <input className={this.state.isEmailValid ? 'valid' : 'invalid'} required name="email" type="text" value={this.state.email} onChange={this.handleInputChange} onBlur={this.Validation}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label> Birthday:</label>
                        </td>
                        <td>
                            <DatePicker required
                            placeholderText="Select your birthday date"
                            name="birthday"
                            dateFormat="dd.MM.yyyy"
                            selected={this.state.birthday}
                            onChange={this.handleInputChange}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            maxDate={subYears(new Date(), 10)}
                            />
                        </td>
                    </tr>
                    <td>
                        <label> Salary:</label>
                    </td>
                    <td>
                        <input className={this.state.isSalaryValid ? 'valid' : 'invalid'} required name="salary" type="text" value={this.state.salary} onChange={this.handleInputChange} onBlur={this.Validation}/>
                    </td><br/>
                    </tbody>
                </table>
                <input className="btn btn-primary" type="submit" value="Submit" />
                <button className="btn btn-primary" onClick={() => this.props.history.push('/employees')}>Cancel</button>
            </form>
            );
    }
}