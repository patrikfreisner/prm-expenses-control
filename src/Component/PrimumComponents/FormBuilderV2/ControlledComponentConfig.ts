import { RegisterOptions, UseFormReturn } from "react-hook-form";
import { BaseTextFieldProps, SwitchProps, SxProps, TextField } from '@mui/material';
import { NumberFormatProps } from "react-number-format";
import { DatePickerProps } from "@mui/x-date-pickers";

export interface ControlledTextFieldInputProps extends BaseTextFieldProps {
    name: string,
    controller: UseFormReturn<any, any>,
    rules: RegisterOptions,
    messages?: any
}

export interface ControlledNumericFeldInputProps extends NumberFormatProps<BaseTextFieldProps> {
    name: string,
    controller: UseFormReturn<any, any>,
    rules: RegisterOptions,
    messages?: any
}

export interface ControlledDateInputProps extends Partial<DatePickerProps<BaseTextFieldProps, Date>> {
    name: string,
    controller: UseFormReturn<any, any>,
    rules: RegisterOptions,
    messages?: any
}

export interface ControlledSwitchInputProps extends SwitchProps {
    name: string,
    controller: UseFormReturn<any, any>,
    rules: RegisterOptions,
    messages?: any
}

export interface PrmErrorHandlerObject {
    control: any,
    type: any,
    messages: any
}

export const typoHandler = (_var: any, field: any) => {
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

export const exeValidateConfirmPassword = (validate: any, watch: any) => {
    if (validate) {
        if (!!validate['confirm_password']) {
            validate['confirm_password'] = () => {
                return _validateConfirmPassword(watch);
            };
        }
    }
};

export const errorHandler = ({ control, type, messages }: PrmErrorHandlerObject) => {
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

const _validateConfirmPassword = (watch: any) => {
    let passw = watch("password");
    let conf_passw = watch("confirm_password");
    return passw === conf_passw;
};