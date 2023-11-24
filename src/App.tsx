import * as React from "react";
import Header from "./components/Header";
import { FormEvent, useState } from "react";
import Inputs from "./components/Inputs";
import Days from "./components/Days";
import Footer from "./components/Footer";

function App() {
  const [clicked, setClicked] = useState<
    "segunda" | "terca" | "quarta" | "quinta" | "sexta"
  >("segunda");

  const [errors, setErrors] = useState({
    professor: false,
    disciplina: false,
    turma: false,
  });

  const [formValues, setFormValues] = useState({
    professor: "",
    disciplina: "",
    turma: "",
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: {
      professor: boolean;
      disciplina: boolean;
      turma: boolean;
    } = {
      professor: false,
      disciplina: false,
      turma: false,
    };

    if (formValues.professor.trim() === "") {
      newErrors.professor = true;
    }

    if (formValues.disciplina.trim() === "") {
      newErrors.disciplina = true;
    }

    if (formValues.turma.trim() === "") {
      newErrors.turma = true;
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
    }
  };

  const cancelButton = () => {
    setFormValues({
      professor: "",
      disciplina: "",
      turma: "",
    });
    setErrors({
      professor: false,
      disciplina: false,
      turma: false,
    });
  };

  return (
    <>
      <Header />
      <main className="font-poppins px-6 py-16 lg:px-8">
        <section className="shadow-xl max-w-7xl mx-auto rounded-3xl shadow-3D px-6 py-12 lg:p-12">
          <h1 className="text-center text-2xl">Cadastro de horários</h1>
          <form onSubmit={onSubmit} className="">
            <div className="flex md:flex-row flex-col items-center gap-y-12 md:gap-x-12 py-12">
              <Inputs
                value={formValues.professor}
                label={"Professor:"}
                error={errors.professor}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    professor: e.target.value,
                  })
                }
              />
              <Inputs
                value={formValues.disciplina}
                label={"Disciplina:"}
                error={errors.disciplina}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    disciplina: e.target.value,
                  })
                }
              />
              <Inputs
                value={formValues.turma}
                label={"Turma:"}
                error={errors.turma}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    turma: e.target.value,
                  })
                }
              />
            </div>

            <article className="flex flex-col md:flex-row flex-end justify-between">
              <div className="flex flex-col gap-y-3 max-w-[714px]">
                <h1 className="font-semibold">Horários:</h1>
                <div className="flex sm:flex-row flex-col sm:items-center gap-y-6 sm:gap-x-6">
                  <input
                    type="date"
                    className="p-2 border-2 border-black placeholder:italic shadow-sm"
                    placeholder="Selecione o dia"
                  />
                  <input
                    type="time"
                    className="p-2 border-2 border-black placeholder:italic shadow-sm"
                    placeholder="Selecione o início"
                  />
                  <input
                    type="time"
                    className="p-2 border-2 border-black placeholder:italic shadow-sm"
                    placeholder="Selecione o final"
                  />
                </div>
                <div className="flex items-center justify-start md:justify-end gap-x-6">
                  <span className="cursor-pointer px-3 py-1 text-lg transition-all hover:opacity-80 hover:bg-gray-300 border-2 border-black font-semibold">
                    +
                  </span>
                  <span className="cursor-pointer px-3 py-1 text-lg transition-all hover:opacity-80 border-2 border-black font-black text-white bg-green-500">
                    ✓
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-end gap-x-6 sm:pt-0 pt-12">
                <span
                  onClick={cancelButton}
                  className="cursor-pointer text-[#C70000] transition-all hover:opacity-90 hover:underline"
                >
                  Cancelar
                </span>
                <button type="submit" className="cursor-pointer transition-colors border-transparent w-28 h-12 rounded-[24px] text-white bg-[#893D3D] hover:border-2 hover:border-[#893D3D] hover:bg-white hover:text-black ">
                  Salvar
                </button>
              </div>
            </article>
          </form>
        </section>

        <section className="mx-auto max-w-[1440px] py-20">
          <div className="flex sm:flex-row flex-col items-center gap-x-5">
            <Days
              onClicked={() => setClicked("segunda")}
              className={`${
                clicked === "segunda"
                  ? "text-white bg-[#893D3D] shadow-lg"
                  : "text-black bg-transparent"
              }`}
              day="segunda"
            />
            <Days
              onClicked={() => setClicked("terca")}
              className={`${
                clicked === "terca"
                  ? "text-white bg-[#893D3D] shadow-lg"
                  : "text-black bg-transparent"
              }`}
              day="terça"
            />
            <Days
              onClicked={() => setClicked("quarta")}
              className={`${
                clicked === "quarta"
                  ? "text-white bg-[#893D3D] shadow-lg"
                  : "text-black bg-transparent"
              }`}
              day="quarta"
            />
            <Days
              onClicked={() => setClicked("quinta")}
              className={`${
                clicked === "quinta"
                  ? "text-white bg-[#893D3D] shadow-lg"
                  : "text-black bg-transparent"
              }`}
              day="quinta"
            />
            <Days
              onClicked={() => setClicked("sexta")}
              className={`${
                clicked === "sexta"
                  ? "text-white bg-[#893D3D] shadow-lg"
                  : "text-black bg-transparent"
              }`}
              day="sexta"
            />
          </div>
          <div className="py-5"></div>
          <div className="grid place-items-center grid-rows-6 grid-cols-6">
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
            <div className="w-full h-14 border-[1px] border-[#893D3D]"></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
