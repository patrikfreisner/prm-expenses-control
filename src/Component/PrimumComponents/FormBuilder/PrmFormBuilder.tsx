import React from "react";
import { SubmitHandler, useForm, ValidationMode } from "react-hook-form";
import PrmFormInputText from "./PrmFormInputText";

interface PrmFormBuilderEntryObject {
  onSubmit: SubmitHandler<Function>,
  defaultValues: any,
  mode: keyof ValidationMode,
  children?: any
}

function PrmFormBuilder({ onSubmit, defaultValues, mode, children }: PrmFormBuilderEntryObject) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode
  });

  return (
    <>
      {React.Children.map(children, (child) => {
        if (!child.props.name && child.type.name === "PrmFormInputText") {
          throw new Error("Can't accept 'PrmFormInputText' field type without 'name' attribute!");
        }

        if (child.props.type === "submit") {
          return React.createElement(child.type, {
            ...child.props,
            onClick: handleSubmit(onSubmit),
            // NEW PROPS HERE
          });

        } else if (child.props.name && child.type.name === "PrmFormInputText") {
          return React.createElement(child.type, {
            ...child.props,
            watch: watch,
            control: control,
            errors: errors,
          });
        } else if (child.props.name && child.type.name === "PrmFormMaskedInputText") {
          return React.createElement(child.type, {
            ...child.props,
            watch: watch,
            control: control,
            errors: errors,
          });
        } else {
          return <PrmFormInputText
            {...{
              ...child.props,
              watch,
              control,
              errors
            }}
            render={React.createElement(child.type, { ...child.props })} />
        }
      })}
    </>
  );
}

export default PrmFormBuilder;
