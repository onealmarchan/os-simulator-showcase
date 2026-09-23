import { createFileRoute } from "@tanstack/react-router";
import { SlideDeck, SlideView } from "../components/SlideDeck";
import { SlideNavigator } from "../components/SlideNavigator";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Simulador de Sistemas Operativos — Gestión de CPU e Interrupciones" },
    { name: "description", content: "Presentación interactiva sobre planificación de CPU, algoritmos e interrupciones." },
    { property: "og:title", content: "Simulador de Sistemas Operativos" },
    { property: "og:description", content: "Gestión de CPU e interrupciones explicadas visualmente en 17 diapositivas." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Index() {
  return <SlideNavigator renderSlide={(index)=><SlideView index={index}/>}/>;
}
