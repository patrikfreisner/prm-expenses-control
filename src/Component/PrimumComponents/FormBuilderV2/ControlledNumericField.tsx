import { TextField } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { ControlledNumericFeldInputProps, errorHandler, typoHandler } from './ControlledComponentConfig'

export const ControlledNumericField = ({ name, rules: { validate, ...rules }, messages, controller: { control, watch, formState: { errors } }, mask, ...props }: ControlledNumericFeldInputProps) => {
    return (
        <>
            <Controller
                control={control}
                name={name}
                rules={{ validate, ...rules }}
                render={({ field: { onChange, ...field } }) => {
                    return (
                        <NumberFormat
                            {...field}
                            {...props}
                            {...mask}
                            {...errorHandler({
                                control: typoHandler(control?._fields, name)?._f,
                                type: typoHandler(errors, name)?.type,
                                messages: messages
                            })}
                            customInput={TextField}
                            isNumericString={true}
                            fixedDecimalScale={true}
                            decimalScale={2}
                            onValueChange={(values) => {
                                onChange(values.value);
                            }}
                        />
                    )
                }}
            />
        </>
    );
}
