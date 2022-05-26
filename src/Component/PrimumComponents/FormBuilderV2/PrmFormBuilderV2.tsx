import React, { useState } from "react";
import { SubmitHandler, useForm, ValidationMode, useFormState } from "react-hook-form";

// Find a way to get PrmFormInput dinamicaly

const MAX_LOOP_LIMIT: number = 20;

interface PrmFormBuilderEntryObject {
  onSubmit: SubmitHandler<Function>,
  defaultValues: any,
  mode: keyof ValidationMode,
  children?: any
}

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
