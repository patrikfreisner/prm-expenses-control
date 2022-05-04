import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

const MainPageComponent = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default MainPageComponent