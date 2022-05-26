import React, { ReactElement } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { TextField } from '@mui/material';
import NumberFormat, { NumberFormatPropsBase } from "react-number-format";

interface PrmInputTextObject {
  name: string,
  rules: RegisterOptions,
  control?: any,
  errors?: any,
  watch?: any,
  messages?: any,
  render?: any,
  [key: string]: any
}

export default function PrmFormInputText({ control, errors, name, watch, rules: { validate, ...rules }, messages, render, ...props }: PrmInputTextObject) {
  _exeValidateConfirmPassword(validate, watch);

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ validate, ...rules }}
        render={({ field }) => {
          if (render) {
            return React.createElement(render.type, {
              ...render.props,
              ...field,
              ..._ErrorHandler({
                control: _typoHandler(control?._fields, name)?._f,
                type: _typoHandler(errors, name)?.type,
                messages: messages
              }),
            });
          } else {
            return (
              <TextField
                {...props}
                {...field}
                {..._ErrorHandler({
                  control: _typoHandler(control?._fields, name)?._f,
                  type: _typoHandler(errors, name)?.type,
                  messages: messages
                })}
              />
            )
          }
        }}
      />
      {/* <_ErrorHandler
        control={typoHandler(control?._fields, name)?._f}
        type={typoHandler(errors, name)?.type}
        messages={messages}
      ></_ErrorHandler> */}
    </>
  );
}

interface PrmInputCheckObject {
  children: any,
  value: any,
  onChange: Function
}

interface PrmMaskedInputTextObject extends PrmInputTextObject {
  mask: NumberFormatPropsBase<any>
}

export function PrmFormMaskedInputText({ control, errors, name, watch, rules: { validate, ...rules }, messages, mask, ...props }: PrmMaskedInputTextObject) {
  _exeValidateConfirmPassword(validate, watch);

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ validate, ...rules }}
        render={({ field: { onChange, name, value } }) => {
          return (
            <NumberFormat
              {...props}
              {...mask}
              // {...field}
              name={name}
              value={value}
              {..._ErrorHandler({
                control: _typoHandler(control?._fields, name)?._f,
                type: _typoHandler(errors, name)?.type,
                messages: messages
              })}
              customInput={TextField}
              isNumericString={true}
              onValueChange={(values) => {
                onChange(values.value);
              }} />
            // <TextField
            //   {...props}
            //   {...field}
            //   {..._ErrorHandler({
            //     control: _typoHandler(control?._fields, name)?._f,
            //     type: _typoHandler(errors, name)?.type,
            //     messages: messages
            //   })}
            // />
          )
        }}
      />
      {/* <_ErrorHandler
        control={typoHandler(control?._fields, name)?._f}
        type={typoHandler(errors, name)?.type}
        messages={messages}
      ></_ErrorHandler> */}
    </>
  );
}

export function PrmFormInputCheck({ children, value, onChange }: PrmInputCheckObject) {
  return React.createElement(children.type, {
    ...children.props,
    checked: value,
    onChange: onChange
  });
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