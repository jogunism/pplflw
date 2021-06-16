import { Employee, EMPLOYEE_LIST, MainActionType } from '../constants';

interface MainState {
  data: Array<Employee>;
}

const initialState: MainState = {
  data: [] as Array<Employee>
};

export const mainReducer = (
  state: MainState = initialState,
  action: MainActionType
): MainState => {

  switch (action.type) {
    case EMPLOYEE_LIST:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }

};
