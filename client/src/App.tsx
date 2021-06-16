import React, { RefObject, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './css/App.css';

import { RootState } from './redux/reducers';
import { addEmployee, getEmployeeList, hideEditInputBox, hideInputboxs, showAddInputboxs, showEditInputBox } from './redux/actions';
import { Employee } from './redux/constants';

export interface AppProps{};

const App: React.FC<AppProps> = () => {

  const { data } = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch();

  const inputId: RefObject<HTMLInputElement> = React.createRef();
  const inputName: RefObject<HTMLInputElement> = React.createRef();

  /* ----------------------
   * Methods
   */
  const displayState = (n: number) => {
    switch(n) {
      case 0:
        return 'ADDED';
      case 1:
        return 'IN-CHECK';
      case 2:
        return 'APPROVED';
      case 3:
        return 'ACTIVE';
      case 4:
        return 'INACTIVE';
    }
  };

  const displayButtons = (o: Employee) => {
    if (o.showInput) {
      return (
        <div>
          <button type="button" className="btn" onClick={ addEmployeeHandler }>+</button> 
          <button type="button" className="btn" onClick={ cancelAddEmployeeHandler }>x</button>
        </div>
      );
    } else if (o.showEditButton) {
      return (
        <button type="button" className="btn" onClick={() => editEmployeeHandler(o.seq) }>Edit</button>
      );
    }
  };

  const checkboxHandler = (e: React.FormEvent<HTMLInputElement>) => {
    let checkbox = e.target as any;
    let seq: number = parseInt(checkbox.value);
    if (checkbox.checked) {
      dispatch(showEditInputBox(seq));
    } else {
      dispatch(hideEditInputBox(seq));
    }
  };

  const addButtonHandler = () => {
    dispatch(showAddInputboxs());
  };

  const addEmployeeHandler = () => {
    let id = inputId.current?.value;
    let name = inputName.current?.value;
    if (!id || !name) {
      // todo - inputbox red
      return;
    }
    dispatch(addEmployee({
      id,
      name,
    }))
  };

  const cancelAddEmployeeHandler = () => {
    dispatch(hideInputboxs());
  };

  const editEmployeeHandler = (seq: number | undefined) => {
    console.log(seq);
  }

  /* ----------------------
   * Hooks
   */
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      // mounted
      dispatch(getEmployeeList());
    }
    mounted.current = !mounted.current;
    return () => {
      // willupdate
    };
  }, [data, dispatch]);

  useEffect(() => {
    return () => {
      // unmount
    };
  }, []);

  return (
    <div className="App">
      <h3>* Employee list</h3>
      <div className="container">
        <table className="list">
          <thead>
            <tr>
              <th className="seq">#</th>
              <th className="">ID</th>
              <th className="name">Name</th>
              <th className="">State</th>
              <th className="button"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, idx) => {
              return (
                <tr key={ idx }>
                  <td className="">
                    {
                      employee.showCheckbox ?
                        <input
                          type="checkbox"
                          className="checkbox"
                          value={ employee.seq }
                          onChange={ checkboxHandler }
                        /> :
                        ''
                    }
                  </td>
                  <td className="id">
                    {
                      !employee.showInput ? 
                        <span>{ employee.id }</span> :
                        <input type="input"
                          className="inputbox"
                          placeholder="id"
                          ref={ inputId }
                          defaultValue={ employee.id }
                        />
                    }
                  </td>
                  <td className="name">
                    {
                      !employee.showInput ?
                        <span>{ employee.name }</span> :
                        <input type="input"
                          className="inputbox"
                          placeholder="name"
                          ref={ inputName }
                          defaultValue={ employee.name }
                        />
                    }
                  </td>
                  <td className="state">
                    {
                      !employee.showInput ?
                        <span>{ displayState(employee.state) }</span> :
                        <input
                          type="input"
                          className="inputbox"
                          defaultValue={ displayState(employee.state) }
                          readOnly
                        />
                    }
                  </td>
                  <td> { displayButtons(employee) }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button type="button" className="btn btn-md" onClick={ addButtonHandler }>ADD</button>
      </div>
    </div>
  );
}

export default App;
