import { 
  MainActionType,
  Employee,
  RETRIVED_EMPLOYEE_LIST,
  SHOW_ADD_INPUTBOX,
  HIDE_ADD_INPUTBOX,
  SHOW_EDIT_INPUTBOX,
  HIDE_EDIT_INPUTBOX,
} from '../constants';

interface MainState {
  data: Array<Employee>;
  addButtonDisabled: boolean;
}

const initialState: MainState = {
  data: [] as Array<Employee>,
  addButtonDisabled: false
};

export const mainReducer = (
  state: MainState = initialState,
  action: MainActionType
): MainState => {

  switch (action.type) {
    case RETRIVED_EMPLOYEE_LIST:
      return {
        ...state,
        data: action.payload.map((o: Employee) => {
          o.showCheckbox = true;
          return o;
        }),
        addButtonDisabled: false,
      };

    /** update */
    case SHOW_EDIT_INPUTBOX:
      for (let o of state.data) {
        if (o.seq === action.seq) {
          o.showCheckbox = true;
          o.showInput = true;
          o.showFuncButton = false;
          o.showEditButton = true;
        }
      }
      return {
        ...state
      };

    case HIDE_EDIT_INPUTBOX:
      for (let o of state.data) {
        if (o.seq === action.seq) {
          o.showCheckbox = true;
          o.showInput = false;
          o.showFuncButton = false;
          o.showEditButton = false;
        }
      }

      return {
        ...state,
      };

    /** add */
    case SHOW_ADD_INPUTBOX:
      let _obj: Employee = {
        seq: 0,
        id: '',
        name: '',
        state: 0,

        showCheckbox: false,
        showInput: true,
        showFuncButton: true,
        showEditButton: false
      };
      state.data.push(_obj);
      return {
        ...state,
        data: state.data,
        addButtonDisabled: true
      }

    case HIDE_ADD_INPUTBOX:
      state.data.splice(-1, 1)
      return {
        ...state,
        data: state.data,
        addButtonDisabled: false,
      }

    default:
      return state;
  }

};
