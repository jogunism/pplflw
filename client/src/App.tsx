import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './css/App.css';

import { RootState } from './redux/reducers';
import { getEmployeeList } from './redux/actions';
// import { Employee } from './redux/constants';

export interface AppProps{};

const App: React.FC<AppProps> = () => {

  const { data } = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch();

  /* ----------------------
   * Hooks
   */
  const displayEmployyList = () => {
    if (data === undefined || data.length < 1) {
      return;
    }

    const item: JSX.Element[] = [];
    data.forEach((employee) => {
      item.push(
        <tr>
          <td>{ employee.seq }</td>
          <td>{ employee.id }</td>
          <td className="name">{ employee.name }</td>
          <td>{ employee.state }</td>
        </tr>
      );
    });

    return item;
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
    console.log(data);
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
      <p>Employee list</p>
      <table className="list">
        <thead>
          <tr>
            <th className="seq">seq</th>
            <th className="id">id</th>
            <th className="name">name</th>
            <th className="state">state</th>
          </tr>
        </thead>
        <tbody>
          { displayEmployyList() }
        </tbody>
      </table>
    </div>
  );
}

export default App;
