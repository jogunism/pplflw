import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { editState } from '../redux';
import { Employee } from '../redux/constants';
import '../css/State.css';

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
      case 1:
        return 'ADDED';
      case 2:
        return 'IN-CHECK';
      case 3:
        return 'APPROVED';
      case 4:
        return 'ACTIVE';
      case 5:
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
        disabled={ employee.showFuncButton }
      >
        { displayState(employee.state) }
      </button>
    </div>
  );
};

export default State;