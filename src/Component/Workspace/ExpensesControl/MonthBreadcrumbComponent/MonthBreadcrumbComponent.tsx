import { Box, Breadcrumbs, Typography, Link } from '@mui/material'
import React from 'react'
import ExpenseSpeedDialComponent from '../ExpenseSpeedDialComponent/ExpenseSpeedDialComponent'

import './MonthBreadcrumbStyle.css'

export const MonthBreadcrumbComponent = () => {
    return (
        <Box className='component-outline-box'>
            <Breadcrumbs
                maxItems={3}
                itemsAfterCollapse={1}
                itemsBeforeCollapse={2}
                component={() => <h6>Hello</h6>}>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/"
                >
                    MUI
                </Link>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Core
                </Link>
                <Typography
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="text.primary"
                >
                    Breadcrumb
                </Typography>
                <Typography
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="text.primary"
                >
                    Breadcrumb
                </Typography>
                <Typography
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="text.primary"
                >
                    Breadcrumb
                </Typography>
                <Typography
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="text.primary"
                >
                    Breadcrumb
                </Typography>
                <Typography
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="text.primary"
                >
                    Breadcrumb
                </Typography>
            </Breadcrumbs>
        </Box>
    )
}
