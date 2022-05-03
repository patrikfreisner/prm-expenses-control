import React from 'react'
import { Outlet } from 'react-router'

const MainPageComponent = () => {
    return (
        <>
            <div>MainPageComponent</div>
            <Outlet />
        </>
    )
}

export default MainPageComponent