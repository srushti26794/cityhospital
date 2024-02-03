import React from 'react';
import { BaseButton, OutlineButton, PrimaryButton, SecondaryButton } from './button.styled';

function Button({children, type, btnDisable, ...rest}) {
    console.log(type);

    const decideButton = () => {
        switch (type){
            case 'primary':
                return PrimaryButton
            case "secondary":
                return SecondaryButton

            case "outline" :
                return OutlineButton
    
            default:
                return PrimaryButton
    
        }
    }

    const ButtonTheme = decideButton();
    

    return (
       <ButtonTheme disabled={btnDisable} {...rest}>
            {children}
       </ButtonTheme>
    );
}

export default Button;