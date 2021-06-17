import React, { useEffect, useRef } from 'react';
import { Employee } from '../redux/constants';
// import { useSelector, useDispatch } from 'react-redux';
import '../css/State.css';
import { useDispatch } from 'react-redux';
import { editState } from '../redux';

export interface StateProps{
  employee: Employee;
};

const State: React.FC<StateProps> = ({ employee }) => {

  const dispatch = useDispatch();

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

  const buttonClickHandler = (seq: number) => {
    dispatch(editState(seq));
  }

  /* ----------------------
   * Hooks
   */
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      // mounted
      // console.log(employee);
    }
    mounted.current = !mounted.current;
    return () => {
      // willupdate
      
    };
  }, [employee]);

  useEffect(() => {
    return () => {
      // unmount
    };
  }, []);

  return (
    <div className="state">
      <button
        type="button"
        className="btn btn-sm"
        onClick={ () => buttonClickHandler(employee.seq) }
      >
        { displayState(employee.state) }
      </button>
    </div>
  );
};

export default State;