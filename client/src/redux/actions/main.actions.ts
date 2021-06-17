import { ActionCreator, Dispatch } from 'redux';
import { 
  MainActionType,
  Employee, 
  RETRIVED_EMPLOYEE_LIST, 
  SHOW_ADD_INPUTBOX,
  HIDE_ADD_INPUTBOX, 
  SHOW_EDIT_INPUTBOX,
  HIDE_EDIT_INPUTBOX
} from '../constants';
import { mainService } from '../services';

const employeeListSuccess: ActionCreator<MainActionType> = (data: Array<Employee>) => {
  return { type: RETRIVED_EMPLOYEE_LIST, payload: data };
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

export const showEditInputBox = (seq?: number | undefined) => {
  return { type: SHOW_EDIT_INPUTBOX, seq }
}

export const hideEditInputBox = (seq?: number | undefined) => {
  return { type: HIDE_EDIT_INPUTBOX, seq }
}

export const editEmployee = (o: {
  seq: number;
  id: string;
  name: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await mainService.editEmployee(o);
      dispatch(employeeListSuccess(response));
    } catch(e) {
      console.error(e);
    }
  }
}

export const showAddInputboxs = () => {
  return { type: SHOW_ADD_INPUTBOX };
};

export const hideInputboxs = () => {
  return { type: HIDE_ADD_INPUTBOX };
}

export const addEmployee = (o = {}) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await mainService.addEmployee(o);
      dispatch(employeeListSuccess(response));
    } catch(e) {
      console.error(e);
    }
  }
};