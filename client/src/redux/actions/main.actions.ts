import { ActionCreator, Dispatch } from 'redux';
import { 
  MainActionType,
  Employee, 
  RETRIVED_EMPLOYEE_LIST, 
  SET_EDIT_MODE,
  CANCEL_EDIT_MODE,
  SET_ADD_MODE,
  CANCEL_ADD_MODE, 
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


/** edit */
export const showEditInputBox = (seq?: number | undefined) => {
  return { type: SET_EDIT_MODE, seq }
}

export const hideAllEditInputBox = () => {
  return { type: CANCEL_EDIT_MODE }
};

export const hideEditInputBox = (seq: number | undefined) => {
  return { type: CANCEL_EDIT_MODE, seq }
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

export const editState = (seq: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await mainService.editState(seq);
      dispatch(employeeListSuccess(response));
    } catch(e) {
      console.error(e);
    }
  }
}


/** add */
export const showAddInputboxs = () => {
  return { type: SET_ADD_MODE };
};

export const hideInputboxs = () => {
  return { type: CANCEL_ADD_MODE };
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