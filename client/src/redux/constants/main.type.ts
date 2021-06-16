

export interface Employee {
  seq: number,
  id: string,
  name: string,
  gender: number,
  state: number
}

export const EMPLOYEE_LIST = 'EMPLOYEE_LIST';

interface EmployeeListAction {
  type: typeof EMPLOYEE_LIST;
  payload: Array<Employee>;
}

export type MainActionType = EmployeeListAction;