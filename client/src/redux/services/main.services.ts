// services
import axios from 'axios';
const http = axios.create({
  baseURL: 'http://localhost:8080/api/',
});
http.defaults.headers.common['Content-Type'] = 'application/json';

export const mainService = {
  // async testMethod({ id }: { id: String }) {
  async getEmployeeList() {
    try {
      const response = await http.get('/employees');
      return await Promise.resolve(response.data);
    } catch (error) {
      return await Promise.reject(error);
    }
  }
};
