import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from './redux/reducers';
import { addEmployee, editEmployee, getEmployeeList, hideAllEditInputBox, hideEditInputBox, hideInputboxs, showAddInputboxs, showEditInputBox } from './redux/actions';
import { Employee } from './redux/constants';
import State from './component/State';
import './css/App.css';

export interface AppProps{};
const App: React.FC<AppProps> = () => {

  const { data, addButtonDisabled } = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch();

  const inputId: RefObject<HTMLInputElement> = React.createRef();
  const [ inputIdClass, setIdClass ] = useState('');
  const inputName: RefObject<HTMLInputElement> = React.createRef();
  const [ inputNameClass, setNameClass ] = useState('');

  /* ----------------------
   * Methods
   */
  const displayButtons = (o: Employee) => {
    if (o.showFuncButton) {
      return (
        <div>
          <button type="button" className="btn" onClick={ addEmployeeHandler }>+</button> 
          <button type="button" className="btn" onClick={ cancelAddEmployeeHandler }>x</button>
        </div>
      );
    } else if (o.showEditButton) {
      return (
        <button type="button" className="btn" onClick={ () => editEmployeeHandler(o.seq) }>Edit</button>
      );
    }
  };

  const checkboxHandler = (e: React.FormEvent<HTMLInputElement>) => {
    let checkbox = e.target as any;
    let seq: number = parseInt(checkbox.value);

    // cancel edit mode all
    dispatch(hideAllEditInputBox());

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

    // inputbox border red
    setIdClass(!id ? 'warn' : '');
    setNameClass(!name ? 'warn' : '');

    // validation
    if (!id || !name) {
      return;
    }

    dispatch(addEmployee({
      id,
      name,
    }))
  };

  const cancelAddEmployeeHandler = () => {
    setIdClass('');
    setNameClass('');
    dispatch(hideInputboxs());
  };

  const editEmployeeHandler = (seq: number) => {
    dispatch(editEmployee({
      seq,
      id: inputId.current!.value,
      name: inputName.current!.value
    }))
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
                          defaultValue={ employee.seq ?? 0 }
                          onChange={ checkboxHandler }
                          checked={ employee.isChecked ?? false }
                        /> :
                        ''
                    }
                  </td>
                  <td className="id">
                    {
                      !employee.showInput ? 
                        <span>{ employee.id }</span> :
                        <input type="input"
                          className={`inputbox ${inputIdClass}`}
                          placeholder="id"
                          ref={ inputId }
                          // onChange={
                          //   (e: React.ChangeEvent<HTMLInputElement>) => idOnchangeHanlder(e, employee.seq)
                          // }
                          defaultValue={ employee.id ?? '' }
                        />
                    }
                  </td>
                  <td className="name">
                    {
                      !employee.showInput ?
                        <span>{ employee.name }</span> :
                        <input type="input"
                        className={`inputbox ${inputNameClass}`}
                          placeholder="name"
                          ref={ inputName }
                          // onChange={
                          //   (e: React.ChangeEvent<HTMLInputElement>) => nameOnchangeHanlder(e, employee.seq)
                          // }
                          defaultValue={ employee.name ?? '' }
                        />
                    }
                  </td>
                  <td className="state">
                    <State employee={ employee } />
                  </td>
                  <td> { displayButtons(employee) }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button
          type="button"
          className="btn btn-md"
          onClick={ addButtonHandler }
          disabled={ addButtonDisabled }
        >
          ADD
        </button>
      </div>
    </div>
  );
}

export default App;
