import React, { RefObject, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './css/App.css';

import { RootState } from './redux/reducers';
import { addEmployee, getEmployeeList, showInputboxs } from './redux/actions';

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

  const addButtonHandler = () => {
    dispatch(showInputboxs());
  };

  const addEmployeeAction = () => {
    let id = inputId.current?.value;
    let name = inputName.current?.value;
    if (!id || !name) {
      return;
    }

    dispatch(addEmployee({
      id,
      name,
    }))
  };

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
                      !employee.isAdding ?  <input type="checkbox" className="checkbox" /> : ''
                    }
                  </td>
                  <td className="id">
                    {
                      !employee.isAdding ? 
                        <span>{ employee.id }</span> :
                        <input type="input" className="inputbox" placeholder="id" ref={ inputId } />
                    }
                  </td>
                  <td className="name">
                    {
                      !employee.isAdding ?
                        <span>{ employee.name }</span> :
                        <input type="input" className="inputbox" placeholder="name" ref={ inputName } />
                    }
                  </td>
                  <td className="state">
                    {
                      !employee.isAdding ?
                        <span>{ displayState(employee.state) }</span> :
                        <input type="input" className="inputbox" value="ADDED" readOnly />
                    }
                  </td>
                  <td>
                    { 
                      employee.isAdding ?
                        <div>
                          <button type="button" className="btn" onClick={ addEmployeeAction }>+</button> 
                          <button type="button" className="btn">x</button>
                        </div> :
                        ''
                    }
                  </td>
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
