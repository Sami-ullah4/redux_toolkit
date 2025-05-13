import React from "react";
import "../app.css";
import {
  increment,
  decrement,
  incrementByAmount,
  incrementBy, reset
} from "../features/counter/CounterSlice";
import { useDispatch, useSelector } from "react-redux";
const IncDec = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(increment());
  };
  const handleDecrement = () => {
    dispatch(decrement());
  };
  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount());
  };
  const handleIncBy5 = () => {
    dispatch(incrementBy());
  };
  const handleReset  = ()=>{
    dispatch(reset())
  }
  return (
    <div className="container">
      <div onClick={handleIncrement} className="button">
        +
      </div>
      <div onClick={handleIncBy5} className="button">
        increment 5
      </div>

      <div className="button">{count}</div>
      <div onClick={handleDecrement} className="button">
        -
      </div>
      <div onClick={handleReset} className="button">
        reset
      </div>
      <div onClick={handleIncrementByAmount} className="button">
        by
      </div>
    </div>
  );
};

export default IncDec;
