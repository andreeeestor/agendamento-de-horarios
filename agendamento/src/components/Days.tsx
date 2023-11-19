import * as React from "react";

interface DaysProps {
    day: string
    onClicked: () => void
    className: string
}

export default function Days(props: DaysProps) {
    return(
        <span onClick={props.onClicked} className={`${props.className} cursor-pointer rounded text-lg flex justify-center w-full border-transparent border-[3px] transition-all hover:border-[#893D3D] font-bold uppercase py-4`}>
            {props.day}
        </span>
    )
}

// ${props.clicked ? "text-white bg-[#893D3D] shadow-lg" : "text-black"}