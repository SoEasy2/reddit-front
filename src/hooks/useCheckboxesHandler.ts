import React, { useState } from "react";

export const useCheckboxesHandler = () => {
  const [inputChecked, setInputChecked] = useState<string[]>([]);

  const itemCheckedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setInputChecked((prev) => [...prev, e.target.id]);
    }
    if (inputChecked.includes(e.target.id)) {
      setInputChecked((prev) => [
        ...prev.filter((session) => session !== e.target.id),
      ]);
    }
  };
  return {
    inputChecked,
    setInputChecked,
    itemCheckedHandler,
  };
};
