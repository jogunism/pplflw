// services
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8080/api/',
});
http.defaults.headers.common['Content-Type'] = 'application/json';

export const mainService = {

  /** List */
  async getEmployeeList() {
    try {
      const response = await http.get('/employees');
      return await Promise.resolve(response.data);
    } catch (error) {
      return await Promise.reject(error);
    }
  },

  /** Edit */
  async editEmployee(o: {
    seq: number;
    id: string;
    name: string;
  }) {
    try {
      const response = await http.put(`/employee/${o.id}`, o);
      return await Promise.resolve(response.data);
    } catch (error) {
      return await Promise.reject(error);
    }
  },

  async editState(seq: number) {
    try {
      const response = await http.put(`/employee/state/${seq}`);
      return await Promise.resolve(response.data);
    } catch (error) {
      return await Promise.reject(error);
    }
  },

  /** Add */
  async addEmployee(o = {}) {
    try {
      const response = await http.post('/employee', o);
      return await Promise.resolve(response.data);
    } catch (error) {
      return await Promise.reject(error);
    }
  }
};
