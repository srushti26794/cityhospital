import React from 'react';
import { InputBox } from './text.styled';

function Text({children, type, ...rest}) {
    return (
        <InputBox {...rest}>
            {children}
        </InputBox>
    );
}

export default Text;