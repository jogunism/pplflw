
export interface Employee {
  // data
  seq: number,
  id: string,
  name: string,
  state: number,

  // view status
  showCheckbox?: boolean,
  isChecked?: boolean,
  showInput?: boolean,
  showFuncButton?: boolean,
  showEditButton?: boolean,
}

export const RETRIVED_EMPLOYEE_LIST = 'RETRIVED_EMPLOYEE_LIST';
export const SET_EDIT_MODE = 'SET_EDIT_MODE';
export const CANCEL_EDIT_MODE = 'CANCEL_EDIT_MODE';
export const SET_ADD_MODE = 'SET_ADD_MODE';
export const CANCEL_ADD_MODE = 'CANCEL_ADD_MODE';

interface EmployeeListType {
  type: typeof RETRIVED_EMPLOYEE_LIST;
  payload: Array<Employee>;
}

interface ShowEditInputboxType {
  type: typeof SET_EDIT_MODE,
  seq: number
}

interface HideEditInputboxType {
  type: typeof CANCEL_EDIT_MODE,
  seq?: number
}

interface ShowAddInputboxType {
  type: typeof SET_ADD_MODE
}

interface HideAddInputboxType {
  type: typeof CANCEL_ADD_MODE
}

export type MainActionType = EmployeeListType |
                              ShowEditInputboxType |
                              HideEditInputboxType |
                              ShowAddInputboxType |
                              HideAddInputboxType;