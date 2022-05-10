import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import { getItem } from '../../Services/InvokeAWS/InvokeBaseDynamoDBAPI';

const MainPageComponent = () => {

    getItem("PRMDB001", {
        Key: {
            "pk": "CSPRM000001",
            "sk": "CD#01"
        }
    }).then((data) => {
        console.log("It works!!!");
        console.log(data);
    }).catch((error) => {
        console.error(error);
    });

    return (
        <>
            <Outlet />
        </>
    )
}

export default MainPageComponent