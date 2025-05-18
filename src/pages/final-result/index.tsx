"use client";

import { borderSolidColor, contentFinalResult } from "@/utils/constants";
import { Input } from "antd";
import dynamic from "next/dynamic";

const BasicLayout = dynamic(() => import("@layout/BasicLayout"), {
  ssr: false,
});

const { TextArea } = Input;

const FinalResult: React.FC = () => {
  return (
    <BasicLayout
      content={
        <div>
          <div
            className="relative shadow w-4/5 md:w-1/2 inset-0 m-auto font-japaneseSans min-h-[400px] flex items-center"
            style={{ border: `1px solid ${borderSolidColor}` }}
          >
            <TextArea
              autoSize={true}
              value={contentFinalResult}
              variant="borderless"
              readOnly
              style={{ resize: "none", color: "#000" }}
            />
          </div>
        </div>
      }
    />
  );
};

export default FinalResult;
