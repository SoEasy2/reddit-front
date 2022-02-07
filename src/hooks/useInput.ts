import React, { useState } from "react";
import { useValidation } from "./useValidation";

export const useInput = (initialValues: string, validations: any) => {
  const [value, setValue] = useState(initialValues);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};
