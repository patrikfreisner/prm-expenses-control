import { Switch } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { ControlledSwitchInputProps } from './ControlledComponentConfig'

export const ControlledSwitch = ({ name, rules: { validate, ...rules }, messages, controller: { control }, value, ...props }: ControlledSwitchInputProps) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={{ validate, ...rules }}
            render={({ field: { value, onChange } }) => {
                return <Switch
                    {...props}
                    checked={value}
                    onChange={onChange}
                />
            }} />
    )
}
