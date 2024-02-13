import React from 'react';
import { Option, SelectBox } from './dropDown.styled';

function Select({ children }) {
    return (
        <>
            <SelectBox>
                {children}
            </SelectBox>
        </>
    );
}

export default Select;