
export interface Employee {
  seq: number,
  id: string,
  name: string,
  state: number,

  showCheckbox?: boolean,
  showInput?: boolean,
  showFuncButton?: boolean,
  showEditButton?: boolean,
}

export const RETRIVED_EMPLOYEE_LIST = 'RETRIVED_EMPLOYEE_LIST';
export const SHOW_EDIT_INPUTBOX = 'SHOW_EDIT_INPUTBOX';
export const HIDE_EDIT_INPUTBOX = 'HIDE_EDIT_INPUTBOX';
export const SHOW_ADD_INPUTBOX = 'SHOW_ADD_INPUTBOX';
export const HIDE_ADD_INPUTBOX = 'HIDE_ADD_INPUTBOX';

interface EmployeeListAction {
  type: typeof RETRIVED_EMPLOYEE_LIST;
  payload: Array<Employee>;
}

interface ShowEditInputboxAction {
  type: typeof SHOW_EDIT_INPUTBOX,
  seq: number
}

interface HideEditInputboxAction {
  type: typeof HIDE_EDIT_INPUTBOX,
  seq: number
}

interface ShowAddInputboxAction {
  type: typeof SHOW_ADD_INPUTBOX
}

interface HideAddInputboxAction {
  type: typeof HIDE_ADD_INPUTBOX
}

export type MainActionType = EmployeeListAction |
                              ShowEditInputboxAction |
                              HideEditInputboxAction |
                              ShowAddInputboxAction |
                              HideAddInputboxAction;