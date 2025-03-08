import{r as v,m as g,j as e,L as N}from"./app-CjaHgz8i.js";import{A as P,a as b}from"./AlertSuccess-C9Jw-JXb.js";import{B as w}from"./BackArrow-Bgx7EFmr.js";import{I as d}from"./InputError-FEPySgpc.js";import{I as n}from"./InputLabel-C689ebPE.js";import{P as y}from"./PrimaryButton-D5raLki9.js";import{Q as E}from"./QuillEditor-CNYRYk_5.js";import{T as A}from"./TextInput-BXXnfmYJ.js";import{A as C,u as D}from"./AuthenticatedLayout-DHA9zIoR.js";import"./ApplicationLogo-_tbeXFIx.js";import"./transition-EW8rDKNA.js";function W({auth:p,permissions:r,avator:x,success:i,error:a,project:s}){const u=v.useRef(null),{can:l}=D(r),{data:o,setData:m,put:j,processing:h,errors:c}=g({title:s.title,description:s.description}),f=t=>{t.preventDefault(),j(route("projects.update",s.id),{})};return e.jsxs(C,{user:p.user,permissions:r,avator:x,header:e.jsx("div",{className:"flex items-center space-x-2",children:e.jsx(w,{link:"projects.index",text:"Update Project Details"})}),children:[e.jsx(N,{title:"Edit Project Details"}),e.jsx("div",{className:"py-2",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[i&&e.jsx(P,{success:i}),a&&e.jsx(b,{error:a}),e.jsx("div",{className:"max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800",children:l("Create Project")&&e.jsx("form",{onSubmit:f,className:"space-y-8 p-4",children:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{children:[e.jsx(n,{htmlFor:"title",value:"Project Title"}),e.jsx(A,{id:"title",name:"title",value:o.title,className:"mt-1 block w-full",autoComplete:"title",onChange:t=>m("title",t.target.value),placeholder:"Project title goes here."}),e.jsx(d,{message:c.title,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"description",value:"Project Description"}),e.jsx(d,{message:c.description,className:"mt-2"})]}),e.jsx(E,{id:"description",ref:u,value:o.description,onChange:t=>m("description",t.target.value),style:{height:"300px",marginBottom:"3.5em"},placeholder:"Write job description here..."}),l("Create Project")&&e.jsx("div",{className:"flex items-center justify-start",children:e.jsx(y,{className:"ms-0 mt-2 mb-3",disabled:h,children:"Save"})})]})})})]})})]})}export{W as default};
