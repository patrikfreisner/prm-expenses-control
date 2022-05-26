import React from 'react'
import { Control, Controller, RegisterOptions, UseFormHandleSubmit, UseFormReturn } from "react-hook-form";
import { BaseTextFieldProps, OutlinedInputProps, TextField, TextFieldProps } from '@mui/material';

interface ControlledInputProps extends BaseTextFieldProps {
    name: string,
    controller: UseFormReturn<any, any>,//UseFormReturn<any, any>,
    rules: RegisterOptions,
    messages?: any
}

export const ControlledTextField = ({ name, rules: { validate, ...rules }, messages, controller: { control, watch, formState: { errors } }, ...props }: ControlledInputProps) => {
    _exeValidateConfirmPassword(validate, watch);

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
                        {..._ErrorHandler({
                            control: _typoHandler(control?._fields, name)?._f,
                            type: _typoHandler(errors, name)?.type,
                            messages: messages
                        })}
                    />
                }} />
        </>
    )
}

const _typoHandler = (_var: any, field: any) => {
    if (!_var) return {};

    let varFields = Object.keys(_var);
    let hasValue = varFields.some((item) => {
        return item === field;
    });
    if (hasValue) {
        return _var[field];
    } else {
        return {};
    }
};

const _validateConfirmPassword = (watch: any) => {
    let _passw = watch("password");
    let _conf_passw = watch("confirm_password");
    return _passw === _conf_passw;
};

const _exeValidateConfirmPassword = (validate: any, watch: any) => {
    if (validate) {
        if (!!validate['confirm_password']) {
            validate['confirm_password'] = () => {
                return _validateConfirmPassword(watch);
            };
        }
    }
};

interface PrmErrorHandlerObject {
    control: any,
    type: any,
    messages: any
}

const _ErrorHandler = ({ control, type, messages }: PrmErrorHandlerObject) => {
    if (type === "required") {
        return {
            error: !!type,
            helperText: "Este campo é obrigatorio!"
        }
    } else if (type === "minLength") {
        return {
            error: !!type,
            helperText: "Campo não pode ser menor que " + control?.minLength + " caracteres! (atual " + control?.value?.length + ")"
        }
    } else if (type === "maxLength") {
        return {
            error: !!type,
            helperText: "Campo não pode ser maior que " + control?.minLength + " caracteres! (atual " + control?.value?.length + ")"
        }
    } else if (type === "pattern") {
        if (!messages) {
            return {
                error: !!type,
                helperText: "Por favor verifique o valor informado!"
            }
        } else if (!Object.keys(messages).some((key) => { return key === type })) {
            return {
                error: !!type,
                helperText: "Por favor verifique o valor informado!"
            }
        }

        return {
            error: !!type,
            helperText: messages[type]
        }
    } else if (!!type) {
        if (!messages) {
            return {
                error: !!type,
                helperText: "Por favor verifique o valor informado!"
            }
        } else if (!Object.keys(messages).some((key) => { return key === type })) {
            return {
                error: !!type,
                helperText: "Por favor verifique o valor informado!"
            }
        }

        return {
            error: !!type,
            helperText: messages[type]
        }
    } else {
        return {};
    }
};