import * as React from "react";
import Header from "./components/Header";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Inputs from "./components/Inputs";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Days from "./components/Days";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Footer from "./components/Footer";
import Loading from "./components/icons/Loading";

function App() {
  const localizer = momentLocalizer(moment);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState<
    "segunda" | "terca" | "quarta" | "quinta" | "sexta"
  >("segunda");

  const [events, setEvents] = useState([]);

  // Obter eventos cadastrados e convertê-los para o formato aceito pelo react-big-calendar
  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("dados_cadastrados");
    if (dataFromLocalStorage !== null) {
      const savedData = JSON.parse(dataFromLocalStorage);
      const formattedEvents = savedData.map((item: any, index: any) => ({
        id: index,
        title: `${item.disciplina} - ${item.turma} | ${item.professor}`,
        start: new Date(item.inicioAulas),
        end: new Date(item.fimAulas),
      }));
      setEvents(formattedEvents);
    }
  }, []);

  const [errors, setErrors] = useState({
    professor: false,
    disciplina: false,
    turma: false,
    duracao: false,
    inicioAulas: false,
    fimAulas: false,
  });

  const [formValues, setFormValues] = useState({
    professor: "",
    disciplina: "",
    turma: "",
    duracao: 0,
    inicioAulas: "",
    fimAulas: "",
  });

  const retrieveData = () => {
    const dataFromLocalStorage = localStorage.getItem("dados_cadastrados");
    if (dataFromLocalStorage !== null) {
      const savedData = JSON.parse(dataFromLocalStorage);
      console.log(savedData);
    } else {
      console.log("Nenhum dado encontrado.");
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newErrors: {
      professor: boolean;
      disciplina: boolean;
      turma: boolean;
      duracao: boolean;
      inicioAulas: boolean;
      fimAulas: boolean;
    } = {
      professor: false,
      disciplina: false,
      turma: false,
      duracao: false,
      inicioAulas: false,
      fimAulas: false,
    };

    if (formValues.professor.trim() === "") {
      newErrors.professor = true;
      setLoading(false);
    }

    if (formValues.disciplina.trim() === "") {
      newErrors.disciplina = true;
      setLoading(false);
    }

    if (formValues.turma.trim() === "") {
      newErrors.turma = true;
      setLoading(false);
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      const dataFromLocalStorage = localStorage.getItem("dados_cadastrados");
      if (dataFromLocalStorage !== null) {
        const savedData = JSON.parse(dataFromLocalStorage);
        const professorAlreadyExists = savedData.some(
          (item: any) =>
            item.professor === formValues.professor &&
            ((item.inicioAulas <= formValues.inicioAulas &&
              formValues.inicioAulas <= item.fimAulas) ||
              (item.inicioAulas <= formValues.fimAulas &&
                formValues.fimAulas <= item.fimAulas) ||
              (formValues.inicioAulas <= item.inicioAulas &&
                item.inicioAulas <= formValues.fimAulas) ||
              (formValues.inicioAulas <= item.fimAulas &&
                item.fimAulas <= formValues.fimAulas))
        );

        if (professorAlreadyExists) {
          setLoading(false);
          alert("Professor já está cadastrado em aulas nesse período.");
          return;
        }
      }

      setLoading(false);
      alert(`Cadastro feito com sucesso!`);
      if (dataFromLocalStorage !== null) {
        const savedData = JSON.parse(dataFromLocalStorage) || [];
        savingData([...savedData, formValues]);
      } else {
        savingData([formValues]);
      }

      retrieveData();
      window.location.reload();
    }
  };

  const resetForm = () => {
    setFormValues({
      professor: "",
      disciplina: "",
      turma: "",
      duracao: 0,
      inicioAulas: "",
      fimAulas: "",
    });

    setErrors({
      professor: false,
      disciplina: false,
      turma: false,
      duracao: false,
      inicioAulas: false,
      fimAulas: false,
    });
  };

  const savingData = (data: any) => {
    localStorage.setItem("dados_cadastrados", JSON.stringify(data));
  };

  const cancelButton = () => {
    resetForm();
  };

  const isWeekend = (date: any) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const calculateEndDate = (startDate: any, duration: any) => {
    const start = new Date(startDate);
    let daysToAdd = duration;

    while (daysToAdd > 0) {
      start.setDate(start.getDate() + 1);
      if (!isWeekend(start)) {
        daysToAdd--;
      }
    }

    return start.toISOString().split("T")[0];
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const duration = parseInt(e.target.value);
    if (duration > 0) {
      const startDate = new Date();
      const endDate = calculateEndDate(startDate, duration);

      setFormValues({
        ...formValues,
        duracao: duration,
        inicioAulas: startDate.toISOString().split("T")[0],
        fimAulas: endDate,
      });
      setErrors({ ...errors, duracao: false });
    } else {
      setErrors({ ...errors, duracao: true });
    }
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
                type="text"
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
                type="text"
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
                type="text"
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

            <article className="flex flex-col lg:flex-row flex-end justify-between">
              <div className="flex md:flex-row flex-col max-w-[714px] lg:gap-y-0 gap-y-12 relative">
                <article className="">
                  <Inputs
                    type="number"
                    label="Duração (em dias):"
                    value={formValues.duracao.toString()}
                    error={errors.duracao}
                    onChange={handleDurationChange}
                    min="1"
                  />
                </article>
                {formValues.duracao > 0 && (
                  <article className="flex md:flex-row flex-col gap-y-12 md:gap-x-12 items-center md:absolute md:bottom-0 md:translate-x-[250px]">
                    <Inputs
                      type="date"
                      disabled
                      label="Data de ínicio:"
                      value={formValues.inicioAulas}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          inicioAulas: e.target.value,
                        })
                      }
                    />
                    <Inputs
                      type="date"
                      disabled
                      label="Data de Fim:"
                      value={formValues.fimAulas}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fimAulas: e.target.value,
                        })
                      }
                    />
                  </article>
                )}
              </div>

              <div className="flex items-end justify-center sm:justify-end md:pt-0 pt-12">
                <div className="flex items-center gap-x-6">
                  <span
                    onClick={cancelButton}
                    className="cursor-pointer text-[#C70000] transition-all hover:opacity-90 hover:underline"
                  >
                    Cancelar
                  </span>
                  <button
                    type="submit"
                    className="cursor-pointer transition-colors border-transparent w-28 h-12 rounded-[24px] text-white bg-[#893D3D] hover:border-2 hover:border-[#893D3D] hover:bg-white hover:text-black flex justify-center items-center"
                  >
                    {loading ? <Loading /> : "Salvar"}
                  </button>
                </div>
              </div>
            </article>
          </form>
        </section>

        <section className="mx-auto max-w-[1440px] py-20">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            views={["week", "day", "agenda"]}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
