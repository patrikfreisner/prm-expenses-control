import { TextField } from '@mui/material'
import React from 'react'
import { Controller, ErrorOption } from 'react-hook-form'
import { ControlledDateInputProps, errorHandler, typoHandler } from './ControlledComponentConfig'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import brLocale from 'date-fns/locale/pt-BR'
import { types } from 'util';

export const ControlledDatePicker = ({ name, rules: { validate, ...rules }, messages, controller: { control, formState: { errors } }, datePickerOptions, ...props }: ControlledDateInputProps) => {
    return (
        <>
            <Controller
                control={control}
                name={name}
                rules={{ validate, ...rules }}
                render={({ field }) => {
                    return <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={brLocale}>
                        <DatePicker
                            {...field}
                            {...datePickerOptions}
                            renderInput={(params) => <TextField
                                {...params}
                                {...props}
                                {...errorHandler({
                                    control: typoHandler(control?._fields, name)?._f,
                                    type: typoHandler(errors, name)?.type,
                                    messages: messages
                                })} />
                            }
                        />
                    </LocalizationProvider>
                }} />
        </>
    )
}
