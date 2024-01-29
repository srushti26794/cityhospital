import React from 'react';
import { BaseButton } from './button.styled';

function Button({children}) {
    return (
       <BaseButton>
            {children}
       </BaseButton>
    );
}

export default Button;