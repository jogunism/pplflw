

export interface Employee {
  seq: number,
  id: string,
  name: string,
  state: number,

  isAdding: boolean,
  isEditing: boolean
}

export const EMPLOYEE_LIST = 'EMPLOYEE_LIST';
export const SHOW_INPUTBOX = 'SHOW_INPUTBOX';


interface EmployeeListAction {
  type: typeof EMPLOYEE_LIST;
  payload: Array<Employee>;
}

interface ShowInputboxAction {
  type: typeof SHOW_INPUTBOX
}

export type MainActionType = EmployeeListAction | ShowInputboxAction;