import { Employee, EMPLOYEE_LIST, MainActionType, SHOW_INPUTBOX } from '../constants';

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
    case SHOW_INPUTBOX:
      let _obj: Employee = {
        seq: 0,
        id: '',
        name: '',
        state: -1,
        isAdding: true,
        isEditing: false
      };
      state.data.push(_obj);
      return {
        ...state,
        data: state.data
      }
    default:
      return state;
  }

};
