import{r as u,l as C}from"./chunk-XJI4KG32-CQ4juLUX.js";import{c as p,S as V,b as j}from"./routes-config-DZ_GWBA1.js";/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),N=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(r,e,n)=>n?n.toUpperCase():e.toLowerCase()),f=t=>{const r=N(t);return r.charAt(0).toUpperCase()+r.slice(1)},y=(...t)=>t.filter((r,e,n)=>!!r&&r.trim()!==""&&n.indexOf(r)===e).join(" ").trim();/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var _={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=u.forwardRef(({color:t="currentColor",size:r=24,strokeWidth:e=2,absoluteStrokeWidth:n,className:o="",children:a,iconNode:v,...c},m)=>u.createElement("svg",{ref:m,..._,width:r,height:r,stroke:t,strokeWidth:n?Number(e)*24/Number(r):e,className:y("lucide",o),...c},[...v.map(([s,i])=>u.createElement(s,i)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=(t,r)=>{const e=u.forwardRef(({className:n,...o},a)=>u.createElement(E,{ref:a,iconNode:r,className:y(`lucide-${A(f(t))}`,`lucide-${t}`,n),...o}));return e.displayName=f(t),e},h=t=>typeof t=="boolean"?`${t}`:t===0?"0":t,x=p,L=(t,r)=>e=>{var n;if((r==null?void 0:r.variants)==null)return x(t,e==null?void 0:e.class,e==null?void 0:e.className);const{variants:o,defaultVariants:a}=r,v=Object.keys(o).map(s=>{const i=e==null?void 0:e[s],l=a==null?void 0:a[s];if(i===null)return null;const d=h(i)||h(l);return o[s][d]}),c=e&&Object.entries(e).reduce((s,i)=>{let[l,d]=i;return d===void 0||(s[l]=d),s},{}),m=r==null||(n=r.compoundVariants)===null||n===void 0?void 0:n.reduce((s,i)=>{let{class:l,className:d,...k}=i;return Object.entries(k).every(w=>{let[b,g]=w;return Array.isArray(g)?g.includes({...a,...c}[b]):{...a,...c}[b]===g})?[...s,l,d]:s},[]);return x(t,v,m,e==null?void 0:e.class,e==null?void 0:e.className)},O=L("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",{variants:{variant:{default:"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",destructive:"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",outline:"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",secondary:"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2 has-[>svg]:px-3",sm:"h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",lg:"h-11 rounded-md px-8 has-[>svg]:px-4",icon:"size-9"}},defaultVariants:{variant:"default",size:"default"}});function P({className:t,variant:r,size:e,asChild:n=!1,...o}){const a=n?V:"button";return C.jsx(a,{"data-slot":"button",className:j(O({variant:r,size:e,className:t})),...o})}export{P as B,O as b,B as c};
