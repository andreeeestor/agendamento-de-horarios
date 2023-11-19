import * as React from "react";
import { ChangeEvent } from "react";

interface InputsProps {
  label: string;
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: boolean
}

export default function Inputs(props: InputsProps) {
  return (
    <div className="md:w-auto w-full">
      <div className="block mb-2">
        <label>{props.label}</label>
      </div>
      <input value={props.value} onChange={props.onChange} className={`border-b-2 border-x-0 border-t-0 ${props.error ? "border-red-600" : "border-black"} md:w-auto w-full outline-none focus:ring-0 ring-0 pb-2 text-gray-600`} type="text" />
    </div>
  );
}
