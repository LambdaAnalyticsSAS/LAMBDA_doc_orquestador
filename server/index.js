import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, createCookieSessionStorage, useLocation, Link as Link$1, Outlet, Meta, ScrollRestoration, Scripts, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { createElement, useState, useEffect, Children, useMemo, Fragment as Fragment$1, useRef } from "react";
import { createThemeSessionResolver, useTheme, Theme, createThemeAction, ThemeProvider, PreventFlashOnWrongTheme } from "remix-themes";
import { Sun, Moon, XIcon, TriangleIcon, HeartIcon, ChevronRight, ChevronDown, AlignLeftIcon, GithubIcon, TerminalSquareIcon, CheckIcon, CopyIcon, FileIcon, FolderOpenIcon, FolderIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import clsx$1, { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import matter from "gray-matter";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import path from "path";
import { promises } from "fs";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";
import { MDXRemote } from "next-mdx-remote";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__remix-themes",
    // domain: 'remix.run',
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"]
    // secure: true,
  }
});
const themeSessionResolver = createThemeSessionResolver(sessionStorage);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatDate(dateStr) {
  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return date.toLocaleDateString("en-US", options);
}
function formatDate2(dateStr) {
  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric"
  };
  return date.toLocaleDateString("en-US", options);
}
function stringToDate(date) {
  const [day, month, year] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}
const fileExtensionIconMap = {
  js: "javascript",
  ts: "typescript",
  jsx: "react",
  tsx: "react",
  java: "java",
  css: "css3",
  md: "markdown",
  mdx: "markdown",
  go: "go",
  astro: "astro",
  prisma: "prisma",
  py: "python",
  kt: "kotlin",
  php: "php",
  gitignore: "git",
  cs: "csharp",
  cpp: "cplusplus",
  c: "c",
  bash: "bash",
  html: "html5"
};
function hasSupportedExtension(name) {
  const splittedNames = name.split(".");
  const ext = splittedNames[splittedNames.length - 1];
  if (!ext) return false;
  return !!fileExtensionIconMap[ext];
}
function getIconName(name) {
  const splittedNames = name.split(".");
  const ext = splittedNames[splittedNames.length - 1];
  return fileExtensionIconMap[ext];
}
const not_found = "_not_found";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 rounded-md px-8 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function ModeToggle() {
  const [, setTheme] = useTheme();
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
      /* @__PURE__ */ jsx(Sun, { className: "!h-[1.2rem] !w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
      /* @__PURE__ */ jsx(Moon, { className: "absolute !h-[1.2rem] !w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setTheme(Theme.LIGHT), children: "Light" }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setTheme(Theme.DARK), children: "Dark" })
    ] })
  ] });
}
function Anchor({
  absolute,
  className = "",
  activeClassName = "",
  disabled,
  children,
  ...props
}) {
  const { pathname: path2 } = useLocation();
  let isMatch = absolute ? props.to.toString().split("/")[1] == path2.split("/")[1] : path2 === props.to;
  if (props.to.toString().includes("http")) isMatch = false;
  if (disabled)
    return /* @__PURE__ */ jsx("div", { className: cn(className, "cursor-not-allowed"), children });
  return /* @__PURE__ */ jsx(Link$1, { className: cn(className, isMatch && activeClassName), ...props, children });
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetClose({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Close, { "data-slot": "sheet-close", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function FooterButtons() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Link$1,
      {
        to: "https://vercel.com/templates/next.js/documentation-template",
        className: buttonVariants({ variant: "outline", size: "sm" }),
        children: [
          /* @__PURE__ */ jsx(TriangleIcon, { className: "h-[0.8rem] w-4 mr-2 text-primary fill-current" }),
          "Deploy"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Link$1,
      {
        to: "https://github.com/sponsors/nisabmohd",
        className: buttonVariants({ variant: "outline", size: "sm" }),
        children: [
          /* @__PURE__ */ jsx(HeartIcon, { className: "h-4 w-4 mr-2 text-red-600 fill-current" }),
          "Sponsor"
        ]
      }
    )
  ] });
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    ScrollAreaPrimitive.Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsx(ScrollBar, {}),
        /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ScrollAreaPrimitive.ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
const ROUTES = [
  {
    title: "Empezando",
    href: "/empezando",
    noLink: true,
    items: [
      { title: "Introducción", href: "/introduccion" },
      { title: "Guía de inicio rápido", href: "/guia-inicio-rapido" }
    ]
  },
  {
    title: "Django",
    href: "/django",
    noLink: true,
    items: [
      { title: "Creando un proyecto en Django", href: "" }
    ]
  },
  {
    title: "Orquestador",
    href: "/orquestador",
    noLink: true,
    items: [
      { title: "Estructura del proyecto", href: "/estructuras" },
      { title: "Ejecutor de proyectos", href: "/ejecutor" },
      { title: "Pasos y flujo de ejecución", href: "/pasos" }
    ]
  }
];
function getRecurrsiveAllLinks(node) {
  var _a;
  const ans = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  (_a = node.items) == null ? void 0 : _a.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}
const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
function Collapsible({
  ...props
}) {
  return /* @__PURE__ */ jsx(CollapsiblePrimitive.Root, { "data-slot": "collapsible", ...props });
}
function CollapsibleTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CollapsiblePrimitive.CollapsibleTrigger,
    {
      "data-slot": "collapsible-trigger",
      ...props
    }
  );
}
function CollapsibleContent({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CollapsiblePrimitive.CollapsibleContent,
    {
      "data-slot": "collapsible-content",
      ...props
    }
  );
}
function SubLink({
  title,
  href,
  items,
  noLink,
  level,
  isSheet,
  tag
}) {
  const { pathname: path2 } = useLocation();
  const [isOpen, setIsOpen] = useState(level == 0);
  useEffect(() => {
    if (path2 == href || path2.includes(href)) setIsOpen(true);
  }, [href, path2]);
  const Comp = /* @__PURE__ */ jsxs(
    Anchor,
    {
      activeClassName: "text-primary dark:font-medium font-semibold",
      to: href,
      children: [
        title,
        tag && /* @__PURE__ */ jsx("span", { className: "dark:bg-blue-700 bg-blue-500 rounded-md px-1.5 py-0.5 mx-2 text-xs text-white !font-normal", children: tag })
      ]
    }
  );
  const titleOrLink = !noLink ? isSheet ? /* @__PURE__ */ jsx(SheetClose, { asChild: true, children: Comp }) : Comp : /* @__PURE__ */ jsxs("h4", { className: "font-medium sm:text-sm text-primary", children: [
    title,
    tag && /* @__PURE__ */ jsx("span", { className: "dark:bg-blue-700 bg-blue-500 rounded-md px-1.5 py-0.5 mx-2 text-xs text-white !font-normal", children: tag })
  ] });
  if (!items) {
    return /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: titleOrLink });
  }
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1 w-full", children: /* @__PURE__ */ jsxs(Collapsible, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsx(CollapsibleTrigger, { className: "w-full pr-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between cursor-pointer w-full", children: [
      /* @__PURE__ */ jsx("span", { className: "w-[95%] overflow-hidden text-ellipsis text-start", children: titleOrLink }),
      /* @__PURE__ */ jsx("span", { className: "sm:ml-0 -mr-1.5", children: !isOpen ? /* @__PURE__ */ jsx(ChevronRight, { className: "h-[0.9rem] w-[0.9rem]" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "h-[0.9rem] w-[0.9rem]" }) })
    ] }) }),
    /* @__PURE__ */ jsx(CollapsibleContent, { children: /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "flex flex-col items-start sm:text-sm dark:text-stone-300/85 text-stone-800 ml-0.5 mt-2.5 gap-3",
          level > 0 && "pl-4 border-l ml-1.5"
        ),
        children: items == null ? void 0 : items.map((innerLink) => {
          const modifiedItems = {
            ...innerLink,
            href: `${href + innerLink.href}`,
            level: level + 1,
            isSheet
          };
          return /* @__PURE__ */ jsx(SubLink, { ...modifiedItems }, modifiedItems.href);
        })
      }
    ) })
  ] }) });
}
function DocsMenu({ isSheet = false }) {
  const { pathname } = useLocation();
  if (!pathname.startsWith("/docs")) return null;
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3.5 mt-5 pr-2 pb-6 sm:text-base text-[14.5px]", children: ROUTES.map((item, index) => {
    const modifiedItems = {
      ...item,
      href: `/docs${item.href}`,
      level: 0,
      isSheet
    };
    return /* @__PURE__ */ jsx(SubLink, { ...modifiedItems }, item.title + index);
  }) });
}
function Leftbar() {
  return /* @__PURE__ */ jsx("aside", { className: "md:flex hidden w-[20rem] sticky top-16 flex-col h-[93.75vh] overflow-y-auto", children: /* @__PURE__ */ jsx(ScrollArea, { className: "py-4 px-2", children: /* @__PURE__ */ jsx(DocsMenu, {}) }) });
}
function SheetLeftbar() {
  return /* @__PURE__ */ jsxs(Sheet, { children: [
    /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "md:hidden flex", children: /* @__PURE__ */ jsx(AlignLeftIcon, { className: "!w-[1.25rem] !h-[1.25rem]" }) }) }),
    /* @__PURE__ */ jsxs(SheetContent, { className: "flex flex-col gap-4 px-0", side: "left", children: [
      /* @__PURE__ */ jsx(DialogTitle, { className: "sr-only", children: "Menu" }),
      /* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsx(SheetClose, { className: "px-5", asChild: true, children: /* @__PURE__ */ jsx(Logo, {}) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 overflow-y-auto", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2.5 mt-3 mx-2 px-5", children: /* @__PURE__ */ jsx(NavMenu, { isSheet: true }) }),
        /* @__PURE__ */ jsx("div", { className: "ml-2 pl-5", children: /* @__PURE__ */ jsx(DocsMenu, { isSheet: true }) }),
        /* @__PURE__ */ jsx("div", { className: "p-6 pb-4 flex gap-2.5", children: /* @__PURE__ */ jsx(FooterButtons, {}) })
      ] })
    ] })
  ] });
}
const NAVLINKS = [
  {
    title: "Documentación",
    href: `/docs${page_routes[0].href}`
  },
  {
    title: "Blog",
    href: "/blog"
  }
];
function Navbar() {
  return /* @__PURE__ */ jsx("nav", { className: "w-full border-b h-16 sticky top-0 z-50 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "sm:container mx-auto w-[95vw] h-full flex items-center sm:justify-between md:gap-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center sm:gap-5 gap-2.5", children: [
      /* @__PURE__ */ jsx(SheetLeftbar, {}),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:flex hidden", children: /* @__PURE__ */ jsx(Logo, {}) }),
        /* @__PURE__ */ jsx("div", { className: "md:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground", children: /* @__PURE__ */ jsx(NavMenu, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center sm:justify-normal justify-between sm:gap-3 ml-1 sm:w-fit w-[90%]", children: [
      /* @__PURE__ */ jsx("div", {}),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between sm:gap-2", children: /* @__PURE__ */ jsxs("div", { className: "flex ml-4 sm:ml-0", children: [
        /* @__PURE__ */ jsx(
          Link$1,
          {
            to: "https://github.com/LambdaAnalyticsSAS/LAMBDA_orquestador",
            className: buttonVariants({
              variant: "ghost",
              size: "icon"
            }),
            children: /* @__PURE__ */ jsx(GithubIcon, { className: "!h-[1.1rem] !w-[1.1rem]" })
          }
        ),
        /* @__PURE__ */ jsx(ModeToggle, {})
      ] }) })
    ] })
  ] }) });
}
function Logo() {
  return /* @__PURE__ */ jsxs(Link$1, { to: "/", className: "flex items-center gap-2.5", children: [
    /* @__PURE__ */ jsx("img", { src: "/icono_lambda.png", alt: "Logo", className: "w-6 h-6" }),
    /* @__PURE__ */ jsx("h2", { className: "text-md font-bold font-code", children: "Orquestador - Lambda" })
  ] });
}
function NavMenu({ isSheet = false }) {
  return /* @__PURE__ */ jsx(Fragment, { children: NAVLINKS.map((item) => {
    const Comp = /* @__PURE__ */ jsx(
      Anchor,
      {
        activeClassName: "!text-primary dark:font-medium font-semibold",
        absolute: true,
        className: "flex items-center gap-1 sm:text-sm text-[14.5px] dark:text-stone-300/85 text-stone-800",
        to: item.href,
        children: item.title
      },
      item.title + item.href
    );
    return isSheet ? /* @__PURE__ */ jsx(SheetClose, { asChild: true, children: Comp }, item.title + item.href) : Comp;
  }) });
}
function NotFound() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-[87vh] px-2 sm:py-28 py-36 flex flex-col gap-4 items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center flex flex-col items-center justify-center w-fit gap-2", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-7xl font-bold pr-1", children: "404" }),
      /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-md font-medium", children: [
        "Página no encontrada ",
        ":("
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Oops! La página que buscas no existe." })
    ] }),
    /* @__PURE__ */ jsx(Link$1, { to: "/", className: buttonVariants({}), children: "Volver al inicio" })
  ] });
}
function ErrorComp({ error }) {
  let message = "We're sorry, but an error occurred while processing your request.";
  if (error instanceof Error) message = error.message;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-[87vh] px-2 sm:py-28 py-36 flex flex-col gap-4 items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center flex flex-col items-center justify-center w-fit gap-2", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-7xl font-bold pr-1", children: "Oops!" }),
      /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-md font-medium", children: [
        "Something went wrong ",
        ":`("
      ] }),
      /* @__PURE__ */ jsx("p", { children: message })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(Link$1, { to: "/", className: buttonVariants({}), children: "Back to homepage" }) })
  ] });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css",
  type: "text/css"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
}];
const action = createThemeAction(themeSessionResolver);
function Layout({
  children
}) {
  const data = useLoaderData();
  return /* @__PURE__ */ jsx(ThemeProvider, {
    specifiedTheme: data == null ? void 0 : data.theme,
    themeAction: "/",
    children: /* @__PURE__ */ jsx(AppWithProviders, {
      children
    })
  });
}
function AppWithProviders({
  children
}) {
  const data = useLoaderData();
  const [theme] = useTheme();
  return /* @__PURE__ */ jsxs("html", {
    lang: "es",
    className: clsx$1(theme),
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "/icono_lambda.png",
        type: "image/x-icon"
      }), /* @__PURE__ */ jsx(PreventFlashOnWrongTheme, {
        ssrTheme: Boolean(data.theme)
      })]
    }), /* @__PURE__ */ jsxs("body", {
      className: "font-regular antialiased tracking-wide",
      children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx("main", {
        className: "sm:container mx-auto w-[90vw] h-auto scroll-smooth",
        children
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
async function loader$3({
  request
}) {
  const {
    getTheme
  } = await themeSessionResolver(request);
  return {
    theme: getTheme()
  };
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  if (isRouteErrorResponse(error) && error.status === 404 || error instanceof Error && error.message == not_found) {
    return /* @__PURE__ */ jsx(NotFound, {});
  }
  return /* @__PURE__ */ jsx(ErrorComp, {
    error
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  action,
  default: root,
  links,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
function meta$3({}) {
  return [{
    title: "Documentación - Orquestador"
  }, {
    name: "description",
    content: "El Orquestador de Lambda es una librería en Python que estandariza y automatiza proyectos para mejorar su organización, ejecución y mantenimiento."
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex sm:min-h-[87.5vh] min-h-[82vh] flex-col sm:items-center justify-center text-center sm:py-8 py-12",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-[2.4rem] sm:px-8 leading-10 sm:leading-[4.5rem] font-bold mb-4 sm:text-6xl text-left sm:text-center",
      children: "Orquesta y estandariza proyectos de datos, automatización y Django sin esfuerzos."
    }), /* @__PURE__ */ jsx("p", {
      className: "mb-8 sm:text-lg max-w-[1200px] text-muted-foreground text-left sm:text-center",
      children: "El Orquestador de Lambda es una librería en Python que simplifica la creación, estructura y ejecución de proyectos de analítica, automatización y digitalización. Mejora la organización del código, acelera el desarrollo y permite validar resultados, incluso por usuarios no técnicos.."
    }), /* @__PURE__ */ jsxs("div", {
      className: "sm:flex sm:flex-row grid grid-cols-2 items-center sm;gap-5 gap-3 mb-8",
      children: [/* @__PURE__ */ jsx(Link$1, {
        to: `/docs${page_routes[0].href}`,
        className: buttonVariants({
          className: "px-6",
          size: "lg"
        }),
        children: "Empieza ahora"
      }), /* @__PURE__ */ jsx(Link$1, {
        to: "/blog",
        className: buttonVariants({
          variant: "secondary",
          className: "px-6",
          size: "lg"
        }),
        children: "Lee el Blog"
      })]
    }), /* @__PURE__ */ jsxs("span", {
      className: "sm:flex hidden flex-row items-start sm:gap-2 gap-0.5 text-muted-foreground text-md mt-9 -mb-12 max-[800px]:mb-12 font-code sm:text-base text-sm font-medium border rounded-full p-2.5 px-5 bg-muted/55",
      children: [/* @__PURE__ */ jsx(TerminalSquareIcon, {
        className: "w-5 h-5 sm:mr-1 mt-0.5"
      }), "pip install git+https://github.com/LambdaAnalyticsSAS/LAMBDA_orquestador.git"]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const blogLayout = withComponentProps(function BlogLayout() {
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-col items-start justify-center pt-8 pb-10 w-full mx-auto",
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: blogLayout
}, Symbol.toStringTag, { value: "Module" }));
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center gap-2 text-muted-foreground font-mono -mb-28 w-full border-b",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap px-1.5 py-[0.58rem] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-primary border-b-2 border-transparent data-[state=active]:text-foreground font-code cursor-pointer",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
function Copy({ content }) {
  const [isCopied, setIsCopied] = useState(false);
  async function handleCopy() {
    console.log("trigg");
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2e3);
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "secondary",
      className: "border",
      size: "icon",
      onClick: handleCopy,
      children: isCopied ? /* @__PURE__ */ jsx(CheckIcon, { className: "!w-[0.9rem] !h-[0.9rem]" }) : /* @__PURE__ */ jsx(CopyIcon, { className: "!w-[0.8rem] !h-[0.8rem]" })
    }
  );
}
function Pre({
  children,
  raw,
  ...rest
}) {
  return /* @__PURE__ */ jsxs("div", { className: "my-5 relative group", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: /* @__PURE__ */ jsx(Copy, { content: raw }) }),
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("pre", { ...rest, children }) })
  ] });
}
function Note({
  children,
  title = "Note",
  type = "note"
}) {
  const noteClassNames = clsx$1({
    "dark:bg-stone-950/25 bg-stone-50": type == "note",
    "dark:bg-red-950 bg-red-100 border-red-200 dark:border-red-900": type === "danger",
    "dark:bg-orange-950 bg-orange-100 border-orange-200 dark:border-orange-900": type === "warning",
    "dark:bg-green-950 bg-green-100 border-green-200 dark:border-green-900": type === "success"
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "border rounded-md px-5 pb-0.5 mt-5 mb-7 text-sm tracking-wide",
        noteClassNames
      ),
      children: [
        /* @__PURE__ */ jsxs("p", { className: "font-bold -mb-2.5", children: [
          title,
          ":"
        ] }),
        " ",
        children
      ]
    }
  );
}
function Stepper({ children }) {
  const length = Children.count(children);
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: Children.map(children, (child, index) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "border-l pl-12 ml-3 relative pb-1 pr-2 py-3",
          clsx$1({
            "pb-5 ": index < length - 1
          })
        ),
        children: [
          /* @__PURE__ */ jsx("div", { className: "bg-muted w-8 h-8 text-xs font-medium rounded-md border flex items-center justify-center absolute -left-4 font-code", children: index + 1 }),
          /* @__PURE__ */ jsx("div", { className: "prose-headings:mt-0 prose-p:mb-3 prose-p:mt-3 last:prose-p:mb-0", children: child })
        ]
      }
    );
  }) });
}
function StepperItem({
  children,
  title
}) {
  return /* @__PURE__ */ jsxs("div", { className: "pt-0.5", children: [
    /* @__PURE__ */ jsx("h5", { className: "mt-0 font-semibold", children: title }),
    /* @__PURE__ */ jsx("div", { children })
  ] });
}
function Image({
  src,
  alt = "alt",
  width = 800,
  height = 350,
  ...props
}) {
  if (!src) return null;
  return /* @__PURE__ */ jsx("img", { src, alt, width, height, ...props });
}
function Link({ href, ...props }) {
  if (!href) return null;
  return /* @__PURE__ */ jsx(Link$1, { to: href, ...props, target: "_blank", rel: "noopener noreferrer" });
}
function FileSys({
  items: children,
  sorted = false
}) {
  const items = useMemo(() => {
    if (sorted && children) return sortFileAndFolder(children);
    return children;
  }, [sorted, children]);
  return /* @__PURE__ */ jsx("div", { className: "dark:bg-stone-950/25 bg-stone-50/25 rounded-md p-4 px-3 border flex flex-col gap-1.5 font-code max-w-full overflow-x-auto", children: items.map((f) => {
    if (isFile(f)) return /* @__PURE__ */ createElement(File, { ...f, key: f.name });
    return /* @__PURE__ */ createElement(Folder, { ...f, key: f.name, sorted });
  }) });
}
function File({ name, highlight, indicator }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-1.5 w-full hover:dark:bg-neutral-900 hover:bg-neutral-100 px-3 py-1 rounded-md relative",
        highlight && "dark:text-blue-400 text-blue-500"
      ),
      children: [
        hasSupportedExtension(name) ? /* @__PURE__ */ jsx(
          "i",
          {
            className: `devicon-${getIconName(
              name
            )}-plain text-[17px] mr-[0.14rem]`
          }
        ) : /* @__PURE__ */ jsx(FileIcon, { className: "sm:min-w-[1.2rem] sm:min-h-[1.2rem] sm:w-[1.2rem] sm:h-[1.2rem] min-w-[1rem] min-h-[1rem] w-[1rem] h-[1rem] text-current" }),
        /* @__PURE__ */ jsxs("div", { className: "sm:text-[15px] text-[13.5px]", children: [
          name,
          indicator && /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "text-[13px] ml-3 px-1.5 rounded-md py-0.5 pb-1",
                indicator == "delete" && "dark:text-red-400 text-red-500 bg-red-400/10",
                indicator == "add" && "dark:text-green-400 text-green-500 bg-green-400/10"
              ),
              children: indicator == "delete" ? "remove" : "add"
            }
          )
        ] })
      ]
    }
  );
}
function Folder({
  name,
  children,
  isOpen: defaultOpen,
  highlight,
  sorted = false,
  indicator
}) {
  const [isOpen, setIsOpen] = useState(() => {
    return defaultOpen ?? false;
  });
  const items = useMemo(() => {
    if (sorted && children) return sortFileAndFolder(children);
    return children;
  }, [sorted, children]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "cursor-pointer flex items-center gap-1.5 w-full hover:dark:bg-neutral-900 hover:bg-neutral-00 px-3 py-1 rounded-md",
          highlight && "dark:text-blue-400 text-blue-500"
        ),
        onClick: () => setIsOpen(!isOpen),
        children: [
          isOpen ? /* @__PURE__ */ jsx(FolderOpenIcon, { className: "sm:min-w-[1.2rem] sm:min-h-[1.2rem] sm:w-[1.2rem] sm:h-[1.2rem] min-w-[1rem] min-h-[1rem] w-[1rem] h-[1rem]" }) : /* @__PURE__ */ jsx(FolderIcon, { className: "sm:min-w-[1.2rem] sm:min-h-[1.2rem] sm:w-[1.2rem] sm:h-[1.2rem] min-w-[1rem] min-h-[1rem] w-[1rem] h-[1rem]" }),
          /* @__PURE__ */ jsxs("div", { className: "sm:text-[15px] text-[13.5px]", children: [
            name,
            indicator && /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "text-[13px] ml-3 px-1.5 rounded-md py-0.5 pb-1",
                  indicator == "delete" && "dark:text-red-400 text-red-500 bg-red-400/10",
                  indicator == "add" && "dark:text-green-400 text-green-500 bg-green-400/10"
                ),
                children: indicator == "delete" ? "remove" : "add"
              }
            )
          ] })
        ]
      }
    ),
    isOpen && (items == null ? void 0 : items.length) != 0 && /* @__PURE__ */ jsx("div", { className: "pl-2 pt-1 flex flex-col gap-1.5 border-l ml-5", children: items == null ? void 0 : items.map((f) => {
      if (isFile(f)) return /* @__PURE__ */ createElement(File, { ...f, key: f.name });
      return /* @__PURE__ */ createElement(Folder, { ...f, key: f.name });
    }) })
  ] });
}
function isFile(f) {
  return f.type == "file";
}
function sortFileAndFolder(items) {
  return [...items.sort((a, b) => a.name.localeCompare(b.name))];
}
function Files(props) {
  return /* @__PURE__ */ jsx(FileSys, { ...props });
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
const components = {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  pre: Pre,
  Note,
  Stepper,
  StepperItem,
  img: Image,
  a: Link,
  Files,
  table: Table,
  thead: TableHeader,
  th: TableHead,
  tr: TableRow,
  tbody: TableBody,
  t: TableCell
};
async function parseMdx(rawMdx) {
  return serialize(rawMdx, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [
        preProcess,
        rehypeCodeTitles,
        rehypeCodeTitlesWithLogo,
        rehypePrism,
        rehypeSlug,
        rehypeAutolinkHeadings,
        postProcess
      ],
      remarkPlugins: [remarkGfm]
    }
  });
}
function getPreviousNext(path2) {
  const index = page_routes.findIndex(({ href }) => href == `/${path2}`);
  return {
    prev: page_routes[index - 1],
    next: page_routes[index + 1]
  };
}
function sluggify(text) {
  const slug = text.toLowerCase().replace(/\s+/g, "-");
  return slug.replace(/[^a-z0-9-]/g, "");
}
function justGetFrontmatterFromMD(rawMd) {
  return matter(rawMd).data;
}
const preProcess = () => (tree) => {
  visit(tree, (node) => {
    var _a;
    if ((node == null ? void 0 : node.type) === "element" && (node == null ? void 0 : node.tagName) === "pre") {
      const [codeEl] = node.children;
      if (codeEl.tagName !== "code") return;
      node.raw = (_a = codeEl.children) == null ? void 0 : _a[0].value;
    }
  });
};
const postProcess = () => (tree) => {
  visit(tree, "element", (node) => {
    if ((node == null ? void 0 : node.type) === "element" && (node == null ? void 0 : node.tagName) === "pre") {
      node.properties["raw"] = node.raw;
    }
  });
};
function rehypeCodeTitlesWithLogo() {
  return (tree) => {
    visit(tree, "element", (node) => {
      var _a, _b;
      if ((node == null ? void 0 : node.tagName) === "div" && ((_b = (_a = node == null ? void 0 : node.properties) == null ? void 0 : _a.className) == null ? void 0 : _b.includes("rehype-code-title"))) {
        const titleTextNode = node.children.find(
          (child) => child.type === "text"
        );
        if (!titleTextNode) return;
        const titleText = titleTextNode.value;
        const match = hasSupportedExtension(titleText);
        if (!match) return;
        const splittedNames = titleText.split(".");
        const ext = splittedNames[splittedNames.length - 1];
        const iconClass = `devicon-${getIconName(ext)}-plain text-[17px]`;
        if (iconClass) {
          node.children.unshift({
            type: "element",
            tagName: "i",
            properties: { className: [iconClass, "code-icon"] },
            children: []
          });
        }
      }
    });
  };
}
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
function getDocsContentPath(slug) {
  return path.join(process.cwd(), "/app/contents/docs/", `${slug}/index.mdx`);
}
async function getDocsForSlug(slug) {
  try {
    const contentPath = getDocsContentPath(slug);
    const rawMdx = await promises.readFile(contentPath, "utf-8");
    return await parseMdx(rawMdx);
  } catch (err) {
    console.log(err);
  }
}
async function getDocsTocs(slug) {
  try {
    const contentPath = getDocsContentPath(slug);
    const rawMdx = await promises.readFile(contentPath, "utf-8");
    const headingsRegex = /^(#{2,4})\s(.+)$/gm;
    let match;
    const extractedHeadings = [];
    while ((match = headingsRegex.exec(rawMdx)) !== null) {
      const headingLevel = match[1].length;
      const headingText = match[2].trim();
      const slug2 = sluggify(headingText);
      extractedHeadings.push({
        level: headingLevel,
        text: headingText,
        href: `#${slug2}`
      });
    }
    return extractedHeadings;
  } catch {
    return [];
  }
}
async function getAllBlogsFrontmatter() {
  const blogFolder = path.join(process.cwd(), "/app/contents/blogs/");
  const files = await promises.readdir(blogFolder);
  const uncheckedRes = await Promise.all(
    files.map(async (file) => {
      if (!file.endsWith(".mdx")) return void 0;
      const filepath = path.join(process.cwd(), `/app/contents/blogs/${file}`);
      const rawMdx = await promises.readFile(filepath, "utf-8");
      return {
        ...justGetFrontmatterFromMD(rawMdx),
        slug: file.split(".")[0]
      };
    })
  );
  return uncheckedRes.filter((it) => !!it);
}
async function getBlogForSlug(slug) {
  const blogFile = path.join(
    process.cwd(),
    "/app/contents/blogs/",
    `${slug}.mdx`
  );
  try {
    const rawMdx = await promises.readFile(blogFile, "utf-8");
    return await parseMdx(rawMdx);
  } catch {
    return void 0;
  }
}
async function loader$2() {
  const blogs = (await getAllBlogsFrontmatter()).sort((a, b) => stringToDate(b.date).getTime() - stringToDate(a.date).getTime());
  return blogs;
}
function meta$2() {
  return [{
    title: "Orquestador - Blog"
  }];
}
const blogIndex = withComponentProps(function BlogIndex({
  loaderData: blogs
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col gap-1 sm:min-h-[91vh] min-h-[88vh] pt-2",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "mb-7 flex flex-col gap-2",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "sm:text-3xl text-2xl font-extrabold",
        children: "Los últimos blogs del Orquestador."
      }), /* @__PURE__ */ jsx("p", {
        className: "text-muted-foreground sm:text-[16.5px] text-[14.5px]",
        children: "Entérate de las últimas noticias y novedades del Orquestador aquí."
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4 mb-5",
      children: blogs.map((blog) => /* @__PURE__ */ createElement(BlogCard, {
        ...blog,
        slug: blog.slug,
        key: blog.slug
      }))
    })]
  });
});
function BlogCard({
  date,
  title,
  description,
  slug,
  cover,
  authors
}) {
  return /* @__PURE__ */ jsxs(Link$1, {
    to: `/blog/${slug}`,
    className: "flex flex-col gap-2 items-start border rounded-md py-5 px-3 min-h-[400px]",
    children: [/* @__PURE__ */ jsx("h3", {
      className: "text-md font-semibold -mt-1 pr-7",
      children: title
    }), /* @__PURE__ */ jsx("div", {
      className: "w-full",
      children: /* @__PURE__ */ jsx("img", {
        src: cover,
        alt: title,
        width: 400,
        height: 150,
        className: "w-full rounded-md object-cover h-[180px] border"
      })
    }), /* @__PURE__ */ jsx("p", {
      className: "text-sm text-muted-foreground",
      children: description
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex items-center justify-between w-full mt-auto",
      children: [/* @__PURE__ */ jsxs("p", {
        className: "text-[13px] text-muted-foreground",
        children: ["Published on ", formatDate2(date)]
      }), /* @__PURE__ */ jsx(AvatarGroup, {
        users: authors
      })]
    })]
  });
}
function AvatarGroup({
  users,
  max = 4
}) {
  const displayUsers = users.slice(0, max);
  const remainingUsers = Math.max(users.length - max, 0);
  return /* @__PURE__ */ jsxs("div", {
    className: "flex items-center",
    children: [displayUsers.map((user, index) => /* @__PURE__ */ jsxs(Avatar, {
      className: `inline-block border-2 w-9 h-9 border-background ${index !== 0 ? "-ml-3" : ""} `,
      children: [/* @__PURE__ */ jsx(AvatarImage, {
        src: user.avatar,
        alt: user.username
      }), /* @__PURE__ */ jsx(AvatarFallback, {
        children: user.username.slice(0, 2).toUpperCase()
      })]
    }, user.username)), remainingUsers > 0 && /* @__PURE__ */ jsx(Avatar, {
      className: "-ml-3 inline-block border-2 border-background hover:translate-y-1 transition-transform",
      children: /* @__PURE__ */ jsxs(AvatarFallback, {
        children: ["+", remainingUsers]
      })
    })]
  });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: blogIndex,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function Typography({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "prose sm:prose-base prose-sm prose-zinc dark:prose-invert prose-code:font-normal prose-code:font-code dark:prose-code:bg-stone-900/25 prose-code:bg-stone-50 prose-pre:bg-background prose-headings:scroll-m-20 w-[85vw] sm:w-full sm:mx-auto prose-code:text-sm prose-code:leading-6 dark:prose-code:text-white prose-code:text-stone-800 prose-code:p-[0.085rem]  prose-code:rounded-md prose-code:border pt-2 !min-w-full prose-img:rounded-md prose-img:border prose-code:before:content-none prose-code:after:content-none prose-code:px-1.5 prose-code:overflow-x-auto !max-w-[500px] prose-img:my-3 prose-h2:my-4 prose-h2:mt-8 prose-code:break-all md:prose-code:break-normal", children });
}
async function loader$1({
  params
}) {
  const {
    slug
  } = params;
  const res = await getBlogForSlug(slug);
  return res;
}
function meta$1({
  data
}) {
  if (!data) return [];
  const {
    title,
    description
  } = data.frontmatter;
  return [{
    title
  }, {
    name: "description",
    content: description
  }];
}
const blogSlug = withComponentProps(function BloogWithSlug({
  loaderData
}) {
  if (!loaderData) throw new Error(not_found);
  const frontmatter = loaderData.frontmatter;
  return /* @__PURE__ */ jsxs("div", {
    className: "lg:w-[60%] sm:[95%] md:[75%] mx-auto",
    children: [/* @__PURE__ */ jsxs(Link$1, {
      className: buttonVariants({
        variant: "link",
        className: "!mx-0 !px-0 mb-7 !-ml-1 "
      }),
      to: "/blog",
      children: [/* @__PURE__ */ jsx(ArrowLeftIcon, {
        className: "w-4 h-4 mr-1.5"
      }), " Volver al Blog"]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col gap-3 pb-7 w-full mb-2",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-muted-foreground text-sm",
        children: formatDate(frontmatter.date)
      }), /* @__PURE__ */ jsx("h1", {
        className: "sm:text-3xl text-2xl font-extrabold",
        children: frontmatter.title
      }), /* @__PURE__ */ jsxs("div", {
        className: "mt-6 flex flex-col gap-3",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-sm text-muted-foreground",
          children: "Posteado por"
        }), /* @__PURE__ */ jsx(Authors, {
          authors: frontmatter.authors
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "!w-full",
      children: [/* @__PURE__ */ jsx("div", {
        className: "w-full mb-7",
        children: /* @__PURE__ */ jsx("img", {
          src: loaderData.frontmatter.cover,
          alt: "cover",
          width: 700,
          height: 400,
          className: "w-full h-[400px] rounded-md border object-cover"
        })
      }), /* @__PURE__ */ jsx(Typography, {
        children: /* @__PURE__ */ jsx(MDXRemote, {
          ...loaderData,
          components
        })
      })]
    })]
  });
});
function Authors({
  authors
}) {
  return /* @__PURE__ */ jsx("div", {
    className: "flex items-center gap-8 flex-wrap",
    children: authors.map((author) => {
      return /* @__PURE__ */ jsxs(Link$1, {
        to: author.handleUrl,
        className: "flex items-center gap-2",
        children: [/* @__PURE__ */ jsxs(Avatar, {
          className: "w-10 h-10",
          children: [/* @__PURE__ */ jsx(AvatarImage, {
            src: author.avatar
          }), /* @__PURE__ */ jsx(AvatarFallback, {
            children: author.username.slice(0, 2).toUpperCase()
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium",
            children: author.username
          }), /* @__PURE__ */ jsxs("p", {
            className: "font-code text-[13px] text-muted-foreground",
            children: ["@", author.handle]
          })]
        })]
      }, author.username);
    })
  });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: blogSlug,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const docsLayout = withComponentProps(function DocsLayout() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex items-start gap-8",
    children: [/* @__PURE__ */ jsx(Leftbar, {}, "leftbar"), /* @__PURE__ */ jsx("div", {
      className: "flex-[5.25]",
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: docsLayout
}, Symbol.toStringTag, { value: "Module" }));
function Pagination({ pathname }) {
  const res = getPreviousNext(pathname);
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 flex-grow sm:py-10 py-4 pt-5 gap-5", children: [
    /* @__PURE__ */ jsx("div", { children: res.prev && /* @__PURE__ */ jsxs(
      Link$1,
      {
        className: buttonVariants({
          variant: "outline",
          className: "no-underline w-full flex flex-col sm:pl-7 pl-3 sm:py-10 py-8 !items-start text-xs sm:text-sm"
        }),
        to: `/docs${res.prev.href}`,
        children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center text-muted-foreground text-xs", children: [
            /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "w-[1rem] h-[1rem] mr-1" }),
            "Anterior"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "mt-1 ml-1", children: res.prev.title })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { children: res.next && /* @__PURE__ */ jsxs(
      Link$1,
      {
        className: buttonVariants({
          variant: "outline",
          className: "no-underline w-full flex flex-col sm:pr-7 pr-3 sm:py-10 py-8 !items-end text-xs sm:text-sm"
        }),
        to: `/docs${res.next.href}`,
        children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center text-muted-foreground text-xs", children: [
            "Siguiente",
            /* @__PURE__ */ jsx(ChevronRightIcon, { className: "w-[1rem] h-[1rem] ml-1" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "mt-1 mr-1", children: res.next.title })
        ]
      }
    ) })
  ] });
}
function Breadcrumb({ ...props }) {
  return /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...props });
}
function BreadcrumbList({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      ),
      ...props
    }
  );
}
function BreadcrumbItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: cn("inline-flex items-center gap-1.5", className),
      ...props
    }
  );
}
function BreadcrumbLink({
  asChild,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "breadcrumb-link",
      className: cn("hover:text-foreground transition-colors", className),
      ...props
    }
  );
}
function BreadcrumbPage({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("text-foreground font-normal", className),
      ...props
    }
  );
}
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:size-3.5", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsx(ChevronRight, {})
    }
  );
}
function DocsBreadcrumb({ paths }) {
  return /* @__PURE__ */ jsx("div", { className: "pb-5", children: /* @__PURE__ */ jsx(Breadcrumb, { children: /* @__PURE__ */ jsxs(BreadcrumbList, { children: [
    /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbLink, { children: "Docs" }) }),
    paths.map((path2, index) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: index < paths.length - 1 ? /* @__PURE__ */ jsx(BreadcrumbLink, { className: "a", children: toTitleCase(path2) }) : /* @__PURE__ */ jsx(BreadcrumbPage, { className: "b", children: toTitleCase(path2) }) })
    ] }, path2))
  ] }) }) });
}
function toTitleCase(input) {
  const words = input.split("-");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
}
function TocObserver({ data }) {
  const [activeId, setActiveId] = useState(null);
  const observer = useRef(null);
  useEffect(() => {
    const handleIntersect = (entries) => {
      const visibleEntry = entries.find((entry2) => entry2.isIntersecting);
      if (visibleEntry) {
        setActiveId(visibleEntry.target.id);
      }
    };
    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-20px 0px 0px 0px",
      threshold: 0.1
    });
    const elements = data.map(
      (item) => document.getElementById(item.href.slice(1))
    );
    elements.forEach((el) => {
      if (el && observer.current) {
        observer.current.observe(el);
      }
    });
    return () => {
      if (observer.current) {
        elements.forEach((el) => {
          if (el) {
            observer.current.unobserve(el);
          }
        });
      }
    };
  }, [data]);
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2.5 text-sm dark:text-stone-300/85 text-stone-800 ml-0.5", children: data.map(({ href, level, text }, index) => {
    return /* @__PURE__ */ jsx(
      "a",
      {
        href,
        className: clsx$1({
          "pl-0": level == 2,
          "pl-4": level == 3,
          "pl-8 ": level == 4,
          "dark:font-medium font-semibold text-primary": activeId == href.slice(1)
        }),
        children: text
      },
      href + text + level + index
    );
  }) });
}
function Toc({
  tocs
}) {
  return /* @__PURE__ */ jsx("div", { className: "xl:flex toc hidden w-[20rem] py-9 sticky top-16 h-[96.95vh] pl-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 w-full pl-2", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-medium text-sm", children: "En esta página" }),
    /* @__PURE__ */ jsx(ScrollArea, { className: "pb-2 pt-0.5 overflow-y-auto", children: /* @__PURE__ */ jsx(TocObserver, { data: tocs }) })
  ] }) });
}
async function loader({
  params
}) {
  let path2 = params["*"];
  const mdx = await getDocsForSlug(path2);
  const tocs = await getDocsTocs(path2);
  return {
    mdx,
    tocs
  };
}
function meta({
  data
}) {
  if (!data.mdx) return [];
  const {
    title,
    description
  } = data.mdx.frontmatter;
  return [{
    title
  }, {
    name: "description",
    content: description
  }];
}
const docs = withComponentProps(function DocsPage({
  loaderData,
  params
}) {
  if (!loaderData.mdx) throw new Error(not_found);
  let path2 = params["*"];
  const frontmatter = loaderData.mdx.frontmatter;
  return /* @__PURE__ */ jsxs("div", {
    className: "flex items-start gap-10",
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex-[4.5] py-10 mx-auto",
      children: /* @__PURE__ */ jsxs("div", {
        className: "w-full mx-auto",
        children: [/* @__PURE__ */ jsx(DocsBreadcrumb, {
          paths: path2.split("/")
        }), /* @__PURE__ */ jsxs(Typography, {
          children: [/* @__PURE__ */ jsx("h1", {
            className: "sm:text-3xl text-2xl !-mt-0.5",
            children: frontmatter.title
          }), /* @__PURE__ */ jsx("p", {
            className: "-mt-4 text-muted-foreground sm:text-[16.5px] text-[14.5px]",
            children: frontmatter.description
          }), /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx(MDXRemote, {
              ...loaderData.mdx,
              components
            })
          }), /* @__PURE__ */ jsx(Pagination, {
            pathname: path2
          })]
        })]
      })
    }), /* @__PURE__ */ jsx(Toc, {
      tocs: loaderData.tocs
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: docs,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/LAMBDA_doc_orquestadorassets/entry.client-DoTqWd1L.js", "imports": ["/LAMBDA_doc_orquestadorassets/chunk-XJI4KG32-CQ4juLUX.js", "/LAMBDA_doc_orquestadorassets/index-5MZIq5ND.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/LAMBDA_doc_orquestadorassets/root-gv5e8blI.js", "imports": ["/LAMBDA_doc_orquestadorassets/chunk-XJI4KG32-CQ4juLUX.js", "/LAMBDA_doc_orquestadorassets/index-5MZIq5ND.js", "/LAMBDA_doc_orquestadorassets/with-props-dGXkNs7L.js", "/LAMBDA_doc_orquestadorassets/navbar-BnnNky_n.js", "/LAMBDA_doc_orquestadorassets/routes-config-DZ_GWBA1.js", "/LAMBDA_doc_orquestadorassets/button-D-CrAU8X.js", "/LAMBDA_doc_orquestadorassets/index-BczcaVIA.js", "/LAMBDA_doc_orquestadorassets/scroll-area-C1D3WxUX.js"], "css": ["/LAMBDA_doc_orquestadorassets/root-B0pOWY_I.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/LAMBDA_doc_orquestadorassets/home-B1KKz2lH.js", "imports": ["/LAMBDA_doc_orquestadorassets/with-props-dGXkNs7L.js", "/LAMBDA_doc_orquestadorassets/chunk-XJI4KG32-CQ4juLUX.js", "/LAMBDA_doc_orquestadorassets/button-D-CrAU8X.js", "/LAMBDA_doc_orquestadorassets/routes-config-DZ_GWBA1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/blog-layout": { "id": "routes/blog-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/LAMBDA_doc_orquestadorassets/blog-layout-Bl6XH8aS.js", "imports": ["/LAMBDA_doc_orquestadorassets/with-props-dGXkNs7L.js", "/LAMBDA_doc_orquestadorassets/chunk-XJI4KG32-CQ4juLUX.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/blog-index": { "id": "routes/blog-index", "parentId": "routes/blog-layout", "path": "blog", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/LAMBDA_doc_orquestadorassets/blog-index-CsRXqnc5.js", "imports": ["/LAMBDA_doc_orquestadorassets/with-props-dGXkNs7L.js", "/LAMBDA_doc_orquestadorassets/chunk-XJI4KG32-CQ4juLUX.js", "/LAMBDA_doc_orquestadorassets/tabs-COMPDyOw.js", "/LAMBDA_doc_orquestadorassets/routes-config-DZ_GWBA1.js", "/LAMBDA_doc_orquestadorassets/avatar-PHfIu528.js", "/LAMBDA_doc_orquestadorassets/index-BczcaVIA.js", "/LAMBDA_doc_orquestadorassets/index-5MZIq5ND.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/blog-slug": { "id": "routes/blog-slug", "parentId": "routes/blog-layout", "path": "blog/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/LAMBDA_doc_orquestadorassets/blog-slug-15X0rpTW.js", "imports": ["/LAMBDA_doc_orquestadorassets/with-props-dGXkNs7L.js", "/LAMBDA_doc_orquestadorassets/chunk-XJI4KG32-CQ4juLUX.js", "/LAMBDA_doc_orquestadorassets/typography-CVLAM4st.js", "/LAMBDA_doc_orquestadorassets/button-D-CrAU8X.js", "/LAMBDA_doc_orquestadorassets/routes-config-DZ_GWBA1.js", "/LAMBDA_doc_orquestadorassets/avatar-PHfIu528.js", "/LAMBDA_doc_orquestadorassets/tabs-COMPDyOw.js", "/LAMBDA_doc_orquestadorassets/index-BczcaVIA.js", "/LAMBDA_doc_orquestadorassets/index-5MZIq5ND.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/docs-layout": { "id": "routes/docs-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/LAMBDA_doc_orquestadorassets/docs-layout-DdojRmTu.js", "imports": ["/LAMBDA_doc_orquestadorassets/with-props-dGXkNs7L.js", "/LAMBDA_doc_orquestadorassets/chunk-XJI4KG32-CQ4juLUX.js", "/LAMBDA_doc_orquestadorassets/navbar-BnnNky_n.js", "/LAMBDA_doc_orquestadorassets/button-D-CrAU8X.js", "/LAMBDA_doc_orquestadorassets/routes-config-DZ_GWBA1.js", "/LAMBDA_doc_orquestadorassets/index-BczcaVIA.js", "/LAMBDA_doc_orquestadorassets/index-5MZIq5ND.js", "/LAMBDA_doc_orquestadorassets/scroll-area-C1D3WxUX.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/docs": { "id": "routes/docs", "parentId": "routes/docs-layout", "path": "docs/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/LAMBDA_doc_orquestadorassets/docs-37IX-6yS.js", "imports": ["/LAMBDA_doc_orquestadorassets/with-props-dGXkNs7L.js", "/LAMBDA_doc_orquestadorassets/chunk-XJI4KG32-CQ4juLUX.js", "/LAMBDA_doc_orquestadorassets/typography-CVLAM4st.js", "/LAMBDA_doc_orquestadorassets/button-D-CrAU8X.js", "/LAMBDA_doc_orquestadorassets/scroll-area-C1D3WxUX.js", "/LAMBDA_doc_orquestadorassets/routes-config-DZ_GWBA1.js", "/LAMBDA_doc_orquestadorassets/tabs-COMPDyOw.js", "/LAMBDA_doc_orquestadorassets/index-BczcaVIA.js", "/LAMBDA_doc_orquestadorassets/index-5MZIq5ND.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/LAMBDA_doc_orquestadorassets/manifest-fe0e412d.js", "version": "fe0e412d" };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = ["/", "/blog", "/docs/empezando/introduccion", "/docs/empezando/guia-inicio-rapido", "/docs/django", "/docs/orquestador/estructuras", "/docs/orquestador/ejecutor", "/docs/orquestador/pasos"];
const publicPath = "/LAMBDA_doc_orquestador";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/blog-layout": {
    id: "routes/blog-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/blog-index": {
    id: "routes/blog-index",
    parentId: "routes/blog-layout",
    path: "blog",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/blog-slug": {
    id: "routes/blog-slug",
    parentId: "routes/blog-layout",
    path: "blog/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/docs-layout": {
    id: "routes/docs-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/docs": {
    id: "routes/docs",
    parentId: "routes/docs-layout",
    path: "docs/*",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
