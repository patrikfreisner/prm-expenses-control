import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import { getItem } from '../../Services/InvokeAWS/InvokeBaseDynamoDBAPI';

const MainPageComponent = () => {

    return (
        <>
            <Outlet />
        </>
    )
}

export default MainPageComponent