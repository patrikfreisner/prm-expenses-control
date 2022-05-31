import { TextField } from '@mui/material'
import React from 'react'
import { Controller, ErrorOption } from 'react-hook-form'
import { ControlledDateInputProps, errorHandler, typoHandler } from './ControlledComponentConfig'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import brLocale from 'date-fns/locale/pt-BR'

export const ControlledDatePicker = ({ name, rules: { validate, ...rules }, messages, controller: { control, watch, formState: { errors }, setError }, datePickerOptions, ...props }: ControlledDateInputProps) => {
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
                            onError={(error) => {
                                console.log(error);
                                setError(name, { message: error, type: "datePickerError" } as ErrorOption);
                            }}
                            renderInput={(params) => <TextField
                                {...props}
                                {...params}
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
