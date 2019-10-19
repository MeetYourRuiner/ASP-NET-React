export class API {
    static getToken() {
        const token = sessionStorage.getItem('access_token');
        return 'Bearer ' + token;
    }

    static isAuthenticated() {
        const key = sessionStorage.getItem('access_token');
        if (key == null)
            return false;
        else return true;
    }

    static logout() {
        sessionStorage.removeItem('access_token');
    }

    static async createEmployee(data) {
        return await fetch('api/employee/create', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': API.getToken(),
            }
        });
    }

    static async getEmployee(id) {
        return await fetch('api/employee/get/' + id, {
            headers: { 'Authorization': API.getToken() },
        });
    }

    static async getEmployees() {
        return await fetch('api/employee/get', {
            headers: {
                'Authorization': API.getToken(),
            },
        });
    }

    static async updateEmployee(id, data) {
        return await fetch('api/employee/update/' + id, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': API.getToken(),
            }
        });
    }

    static async deleteEmployee(id) {
        return await fetch('api/employee/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': API.getToken(),
            }
        });
    }

    static async login(loginData) {
        return await fetch('/token', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}