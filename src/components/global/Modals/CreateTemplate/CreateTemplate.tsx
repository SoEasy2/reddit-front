import React, { useState } from "react";
import { ChoiseTemplate } from "./ChoiseTemplate";
import AutoPostingTemplate from "./Templates/AutoPostingTemplate/AutoPostingTemplate";
import { ApvoutTemplate } from "./Templates/ApvoutTemplate";
import { KarmaTemplate } from "./Templates/KarmaTemplate/KarmaTemplate";

interface IProps {
  close(): void;
}

const CreateTemplate: React.FC<IProps> = ({ close }) => {
  const [isTemplate, setTemplate] = useState<
    "Apvout" | "Karma" | "AutoPosting" | null
  >(null);
  return (
    <>
      {isTemplate == undefined ? (
        <ChoiseTemplate close={close} setTemplate={setTemplate} />
      ) : isTemplate === "Apvout" ? (
        <ApvoutTemplate close={close} />
      ) : isTemplate === "AutoPosting" ? (
        <AutoPostingTemplate close={close} />
      ) : (
        <KarmaTemplate close={close} />
      )}
    </>
  );
};

export { CreateTemplate };
