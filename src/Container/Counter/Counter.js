import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../redux/action/counter.action';


function Counter(props) {
    const dispatch = useDispatch()
    const counter = useSelector(state => state.counter)

    const handleIncrement = () => {
        dispatch(increment());
    }

    const handleDecrement = () => {
        dispatch(decrement());
    }

    return (
        <div>
            <div>
                <button onClick={handleDecrement}>-</button>
                {counter.count}
                <button onClick={handleIncrement}>+</button>
            </div>
        </div>
    );
}

export default Counter;