import { Outlet } from 'react-router'
import AppBarComponent from './AppBar/AppBarComponent'

import "./WorkspaceStyle.css"

export const WorkspaceComponent = () => {
    return (
        <>
            <div className='appBarContainer'>
                <AppBarComponent />
            </div>
            <div className='workspaceContainerPadding'>
                <Outlet />
            </div>
        </>
    )
}
