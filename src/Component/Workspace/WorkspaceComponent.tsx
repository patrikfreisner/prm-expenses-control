import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import AppBarComponent from './AppBar/AppBarComponent'
import { EventHandlerComponent } from './EventHandlerComponent/EventHandlerComponent'

import "./WorkspaceStyle.css"

export const WorkspaceComponent = () => {
    return (
        <>
            <EventHandlerComponent />
            <Box className='appBarContainer'>
                <AppBarComponent />
            </Box>
            <Box className='workspaceContainerPadding'>
                <Outlet />
            </Box>
        </>
    )
}
