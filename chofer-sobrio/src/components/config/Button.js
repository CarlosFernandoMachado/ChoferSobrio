import styled from 'styled-components';

export const ButtonContainer = styled.button`
text-transform: capitalize;
font-size: 1.4rem;
background:transparent;
border:0.5rem solid var(--green);
border-color:${props => (props.cart? "var(--teal)":"var(--grey)")};
color: ${prop => prop.cart ?  "var(--lightBlue)":"var(--lightBlue)"};
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor: pointer;
margin: 0.2rem 0.5rem 0.2rem 0
transition: all 0.5s esase-in-out;
&:hover{
    background: ${prop => prop.cart ? "var(--mainDarkRed)":"var(--mainDarkRed)"};
    color: var(--mainSalmon);
}

&:focus{
    outline: none;
}
`;