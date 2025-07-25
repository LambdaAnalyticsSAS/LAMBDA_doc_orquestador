// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
  tag?: string;
};

export const ROUTES: EachRoute[] = [
  {
    title: "Empezando",
    href: "/empezando",
    noLink: true,
    items: [
      { title: "Introducción", href: "/introduccion" },
      { title: "Guía de inicio rápido", href: "/guia-inicio-rapido" },
    ],
  },
  {
    title: "Django",
    href: "/django",
    noLink: true,
    items: [
      { title: "Creando un proyecto en Django", href: "" },
    ],
  },
  {
    title: "Orquestador",
    href: "/orquestador",
    noLink: true,
    items: [
      { title: "Estructura del proyecto", href: "/estructuras" },
      { title: "Ejecutor de proyectos", href: "/ejecutor" },
      { title: "Pasos y flujo de ejecución", href: "/pasos" },
    ],
  },
  
];


type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
