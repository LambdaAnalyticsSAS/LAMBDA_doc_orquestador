import { buttonVariants } from "~/components/ui/button";
import { MoveUpRightIcon, TerminalSquareIcon } from "lucide-react";
import type { Route } from "./+types/home";
import { Link } from "react-router";
import { page_routes } from "~/lib/routes-config";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Documentación - Orquestador" },
    {
      name: "description",
      content:
        "El Orquestador de Lambda es una librería en Python que estandariza y automatiza proyectos para mejorar su organización, ejecución y mantenimiento.",
    },
  ];
}

export default function Home() {
  return (
    <div className="flex sm:min-h-[87.5vh] min-h-[82vh] flex-col sm:items-center justify-center text-center sm:py-8 py-12">
      <h1 className="text-[2.4rem] sm:px-8 leading-10 sm:leading-[4.5rem] font-bold mb-4 sm:text-6xl text-left sm:text-center">
        Orquesta y estandariza proyectos de datos, automatización y Django sin esfuerzos.
      </h1>
      <p className="mb-8 sm:text-lg max-w-[1200px] text-muted-foreground text-left sm:text-center">
        El Orquestador de Lambda es una librería en Python que simplifica la creación, estructura y ejecución de proyectos de analítica, automatización y digitalización. Mejora la organización del código, acelera el desarrollo y permite validar resultados, incluso por usuarios no técnicos..
      </p>
      <div className="sm:flex sm:flex-row grid grid-cols-2 items-center sm;gap-5 gap-3 mb-8">
        <Link
          to={`/docs${page_routes[0].href}`}
          className={buttonVariants({ className: "px-6", size: "lg" })}
        >
          Empieza ahora
        </Link>
        <Link
          to="/blog"
          className={buttonVariants({
            variant: "secondary",
            className: "px-6",
            size: "lg",
          })}
        >
          Lee el Blog
        </Link>
      </div>
      <span className="sm:flex hidden flex-row items-start sm:gap-2 gap-0.5 text-muted-foreground text-md mt-9 -mb-12 max-[800px]:mb-12 font-code sm:text-base text-sm font-medium border rounded-full p-2.5 px-5 bg-muted/55">
        <TerminalSquareIcon className="w-5 h-5 sm:mr-1 mt-0.5" />
        {"pip install git+https://github.com/LambdaAnalyticsSAS/LAMBDA_orquestador.git"}
      </span>
    </div>
  );
}
