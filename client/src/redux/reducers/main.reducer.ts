import { 
  MainActionType,
  Employee,
  RETRIVED_EMPLOYEE_LIST,
  SET_ADD_MODE,
  CANCEL_ADD_MODE,
  SET_EDIT_MODE,
  CANCEL_EDIT_MODE,
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
    /** List */
    case RETRIVED_EMPLOYEE_LIST:
      return {
        ...state,
        data: action.payload.map((o: Employee) => {
          o.showCheckbox = true;
          return o;
        }),
        addButtonDisabled: false,
      };

    /** Edit */
    case SET_EDIT_MODE:
      for (let o of state.data) {
        if (o.seq === action.seq) {
          o.showCheckbox = true;
          o.isChecked = true;
          o.showInput = true;
          o.showFuncButton = false;
          o.showEditButton = true;
        }
      }
      return {
        ...state
      };

    case CANCEL_EDIT_MODE:
      if (action.seq) {
        for (let o of state.data) {
          if (o.seq === action.seq) {
            o.showCheckbox = true;
            o.isChecked = false;
            o.showInput = false;
            o.showFuncButton = false;
            o.showEditButton = false;
          }
        }
      } else {
        for (let o of state.data) {
          o.showCheckbox = true;
          o.isChecked = false;
          o.showInput = false;
          o.showFuncButton = false;
          o.showEditButton = false;
        }
      }

      return {
        ...state,
      };

    /** Add */
    case SET_ADD_MODE:
      let _obj: Employee = {
        seq: 0,
        id: '',
        name: '',
        state: 1,

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

    case CANCEL_ADD_MODE:
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
