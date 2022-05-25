import React from "react";
import { SubmitHandler, useForm, ValidationMode } from "react-hook-form";
import PrmFormInputText from "./PrmFormInputText";

// Find a way to get PrmFormInput dinamicaly

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

        const _childBuilder = () => {
          if (child.props.type === "submit") {
            return React.createElement(child.type, {
              ...child.props,
              onClick: handleSubmit(onSubmit)
            });
          } else if (child.props.name && (child.type.name === "PrmFormInputText" || child.type.name === "PrmFormMaskedInputText")) {
            return React.createElement(child.type, {
              ...child.props,
              watch: watch,
              control: control,
              errors: errors
            });
          }

          return null;
        }

        let childRef = _childBuilder();
        if (childRef) {
          return childRef;
        } else {
          const _maxLoopingLimit: number = 20;
          let _auxChild: any = child.props.children;
          let _loopCount: number = 0;
          while (_loopCount < _maxLoopingLimit) {
            _auxChild = React.Children.map(_auxChild, (sChild) => {
              if (sChild?.type?.name === "submit" || sChild?.type?.name?.startsWith("PrmForm")) {
                return sChild;
              }
              return sChild.props.children;
            })[0];

            if (_auxChild?.type?.name === "submit" || _auxChild?.type?.name?.startsWith("PrmForm")) {
              child = _auxChild;
              childRef = _childBuilder();
              return childRef;
            }

            // Avoid looping, DO NOT REMOVE!
            _loopCount++;
          }
        }
      })}
    </>
  );
}

export default PrmFormBuilder;
