import { ActionCreator, Dispatch } from 'redux';
import { Employee, EMPLOYEE_LIST, MainActionType } from '../constants';
import { mainService } from '../services';

const employeeListSuccess: ActionCreator<MainActionType> = (data: Array<Employee>) => {
  return { type: EMPLOYEE_LIST, payload: data };
}

export const getEmployeeList = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await mainService.getEmployeeList();
      dispatch(employeeListSuccess(response));
    } catch(e) {
      console.error(e);
    }
  }
};