import React, { useEffect, useState } from 'react'
import { useRegisterContext } from '../../../Context/RegisterContext';

export const RegisterComponent = () => {
    const { registerNewUser } = useRegisterContext();


    const register = () => {
        registerNewUser({
            email: "patrikfr.nx@gmail.com",
            password: "@Tst12345",
            name: "Patrik Reisner",
            nickname: "patrikfr"
        }, (msg: any, response: any) => {
            console.log(">>> Resposne msg: ", msg, response);
        });
    }

    const register2 = () => {
        registerNewUser({
            email: "lilliavitoria@gmail.com",
            password: "@Tst12345",
            name: "Lillia Lirio",
            nickname: "lillialirio"
        }, (msg: any, response: any) => {
            console.log(">>> Resposne msg: ", msg, response);
        });
    }

    return (
        <>
            <div>RegisterComponent</div>
            <button type='button' onClick={register}>
                Register
            </button>
        </>
    )
}
