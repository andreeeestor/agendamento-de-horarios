import * as React from "react";

export default function Footer() {
    return(
    <footer className="w-full bg-[#893D3D] h-60 flex flex-col items-center justify-center font-poppins">
        <article className="text-white gap-y-2 flex flex-col">
            <h3 className=""><span className="mr-2 font-bold tracking-wide">Design:</span> Luiz Felipe e Felipe Araújo</h3>
            <h3 className=""><span className="mr-2 font-bold tracking-wide">Desenvolvimento:</span> André Nestor, Maria Eduarda e Marcello Zauza</h3>
        </article>
    </footer>    
    )
}