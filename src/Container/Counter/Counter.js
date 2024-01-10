import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../redux/slice/counter.slice';


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
        <>
            <div className='container'>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <button className='countBtn' onClick={handleDecrement}>-</button>
                {counter.count}
                <button className='countBtn'onClick={handleIncrement}>+</button>
                <br/>
                <br/>
                <br/>
            </div>
        </>
    );
}

export default Counter;