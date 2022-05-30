import React from 'react'
import { Controller } from "react-hook-form";
import { TextField } from '@mui/material';

import { ControlledTextFieldInputProps, exeValidateConfirmPassword, errorHandler, typoHandler } from "./ControlledComponentConfig"



export const ControlledTextField = ({ name, rules: { validate, ...rules }, messages, controller: { control, watch, formState: { errors } }, ...props }: ControlledTextFieldInputProps) => {    
    exeValidateConfirmPassword(validate, watch);

    return (
        <>
            <Controller
                control={control}
                name={name}
                rules={{ validate, ...rules }}
                render={({ field }) => {
                    return <TextField
                        {...props}
                        {...field}
                        {...errorHandler({
                            control: typoHandler(control?._fields, name)?._f,
                            type: typoHandler(errors, name)?.type,
                            messages: messages
                        })}
                    />
                }} />
        </>
    )
}