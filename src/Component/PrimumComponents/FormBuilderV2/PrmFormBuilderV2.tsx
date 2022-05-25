import React, { useState } from "react";
import { SubmitHandler, useForm, ValidationMode } from "react-hook-form";

// Find a way to get PrmFormInput dinamicaly

const MAX_LOOP_LIMIT: number = 20;

interface PrmFormBuilderEntryObject {
  onSubmit: SubmitHandler<Function>,
  defaultValues: any,
  mode: keyof ValidationMode,
  children?: any
}

// Components mark
// PRMSubmit
// PRMInput

export const PRMInputMark = { ...{ isPRMInputComponent: true } };
export const PRMSubmitMark = { ...{ isPRMSubmitComponent: true } };

export const FormBuilder = ({ onSubmit, defaultValues, mode, children }: PrmFormBuilderEntryObject) => {
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
      {children}
    </>
  );
}
