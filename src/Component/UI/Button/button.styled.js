import styled from 'styled-components';

export const BaseButton = styled.button`
    border: 0;
    padding: 10px 35px;
    transition: 0.4s;
    border-radius: 50px;
    margin-top: 20px;
    margin-bottom: 10px;
`;

export const PrimaryButton = styled(BaseButton)`
    background: ${props => props.disabled ? 'grey' : '#FF6337' } ;
    color: #fff;
    &:hover {
        background: ${props => props.disabled ? 'grey' : 'blue' } ;
    }
`

export const SecondaryButton = styled(BaseButton)`
    background: blue;
    color: #fff;
`

export const OutlineButton = styled(BaseButton)`
    border : 2px solid red;
`