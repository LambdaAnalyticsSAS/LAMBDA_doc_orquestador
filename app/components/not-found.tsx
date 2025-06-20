import { Link } from "react-router";
import { buttonVariants } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[87vh] px-2 sm:py-28 py-36 flex flex-col gap-4 items-center">
      <div className="text-center flex flex-col items-center justify-center w-fit gap-2">
        <h2 className="text-7xl font-bold pr-1">404</h2>
        <p className="text-muted-foreground text-md font-medium">
          Página no encontrada {":("}
        </p>
        <p>Oops! La página que buscas no existe.</p>
      </div>
      <Link to="/" className={buttonVariants({})}>
        Volver al inicio
      </Link>
    </div>
  );
}
