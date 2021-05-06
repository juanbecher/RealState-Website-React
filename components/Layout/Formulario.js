import styled from '@emotion/styled';

export const Formulario = styled.form`
    box-shadow: 1px 1px 20px 0 rgb(0 0 0 / 10%);
    max-width: 500px;
    width: 95%;
    margin: 5rem auto 0 auto;
    padding:1rem 2rem 2rem 2rem;
    transition: 0.2s, opacity 0.2s;

    h2{
        text-align:center;
        padding-bottom:1rem;
        font-family: 'PT Sans', sans-serif;
    }
    fieldset {
        margin: 2rem 0;
        border: 1px solid #e1e1e1;
        font-size: 2rem;
        padding: 2rem;
    }
    &:hover {
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    /* transform: scale(1.03) translate(0, -2px); */
  }
`;

export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    label {
        flex: 0 0 150px;
        font-size: 1.4rem;
    }
    input, 
    textarea, select {
        flex: 1;
        padding: 0.8rem;
    }
    textarea {
        height: 400px;
    }
`;

export const InputSubmit = styled.input`

    background-color: #A63F5A;
    width: 100%;
    padding: 1rem;
    text-align: center;
    color: #FFF;
    font-size: 1.4rem;
    text-transform: uppercase;
    border: none;
    border-radius:5px;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    &:hover {
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }
`;

export const Error = styled.p`
        font-family: 'PT Sans',sans-serif;
    font-weight: 600;
    font-size: 0.8rem;
    color: red;
    text-transform: uppercase;

`;