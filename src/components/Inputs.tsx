import * as React from "react";
import { ChangeEvent } from "react";

interface InputsProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  type: "text" | "number" | "date";
  min?: string;
  disabled?: boolean;
}

export default function Inputs(props: InputsProps) {
  return (
    <div className="md:w-auto w-full">
      <div className="block mb-2">
        <label className="font-semibold">{props.label}</label>
      </div>
      <input
        disabled={props.disabled}
        value={props.value}
        onChange={props.onChange}
        className={`border-b-2 border-x-0 border-t-0 ${
          props.error ? "border-red-600" : "border-black"
        } ${
          props.disabled && "cursor-not-allowed bg-transparent"
        } md:w-auto w-full outline-none focus:ring-0 ring-0 pb-2 text-gray-600`}
        type={props.type}
        min={props.min}
      />
    </div>
  );
}
