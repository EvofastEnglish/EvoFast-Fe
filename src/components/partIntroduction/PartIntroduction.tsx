"use client";

import { borderSolidColor } from "@/utils/constants";
import { Input } from "antd";

const { TextArea } = Input;

interface Props {
  content: string;
}

const PartIntroduction: React.FC<Props> = (prop) => {
  const { content } = prop;
  return (
    <div
      className="relative shadow w-4/5 md:w-1/2 inset-0 m-auto min-h-[400px] flex items-center"
      style={{ border: `1px solid ${borderSolidColor}` }}
    >
      <TextArea
        autoSize={true}
        value={content}
        variant="borderless"
        readOnly
        style={{ resize: "none", color: "#000" }}
      />
    </div>
  );
};

export default PartIntroduction;
