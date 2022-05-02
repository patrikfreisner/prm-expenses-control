import React from 'react'
import CognitoService from '../../../assets/js/cognito-service';
import { useLoginContext } from '../../../Context/LoginContext'

export const LoginComponent = () => {
    const { authenticate } = useLoginContext();

    const logIn = () => {
        authenticate("patrikfr.nx@gmail.com", "@Tst12345", (msg: any, response: any) => {
            console.log(">>>> Authenticate!", msg, response);
        });
    }

    console.log(CognitoService);

    return (
        <>
            <div>LoginComponent</div>
            <button type='button' onClick={logIn}>
                Login
            </button>
        </>
    )
}
