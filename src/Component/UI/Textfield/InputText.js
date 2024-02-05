import React from 'react';
import { InputBox, ErrorSpan} from './text.styled';

function InputText({ children, errorText, type, ...rest }) {
    console.log(errorText);

    return (
        <>
            <InputBox {...rest}>
                {children}
            </InputBox>

            {/* {error = <errorSpan>{error}</errorSpan>} */}
            <ErrorSpan error={errorText} {...rest}>{errorText}</ErrorSpan>
        </>
    );
}

export default InputText;