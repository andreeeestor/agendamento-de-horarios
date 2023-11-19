import * as React from "react";
import Menu from "./icons/Menu";
import { useState } from "react";
import X from "./icons/X";

export default function Header() {
  const [header, setHeader] = useState(false);

  function toggleHeader() {
    if (header === false) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  }

  return (
    <header className="transition-all font-poppins text-white">
      <section className="w-full h-20 bg-[#893d3d] px-6 sm:px-24 flex items-center justify-between tracking-wide">
        <h1 className="text-lg font-medium">Agendamento de horários</h1>
        <ul className="sm:flex hidden items-center gap-x-6">
          <li>Cadastro</li>
          <li>Calendário</li>
        </ul>
        <div className="sm:hidden block">
          {!header === true ? (
            <Menu onClick={toggleHeader} />
          ) : (
            <X onClick={toggleHeader} />
          )}
        </div>
      </section>
      {header === true ? (
        <section className="sm:hidden block w-full h-32 bg-[#893d3d] rounded-b-[24px] px-6 pt-4">
          <ul>
            <li className="">Cadastro</li>
            <hr className="my-4 border-[1px]" />
            <li className="">Calendário</li>
          </ul>
        </section>
      ) : null}
    </header>
  );
}
