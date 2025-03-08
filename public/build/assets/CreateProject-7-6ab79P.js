import{r as v,m as g,j as e,L as N}from"./app-BQOZl2BO.js";import{A as P,a as b}from"./AlertSuccess-95aCvO2Z.js";import{B as w}from"./BackArrow-Cy5NDT7C.js";import{I as n}from"./InputError-VjsYktqA.js";import{I as d}from"./InputLabel-CaP5mAlx.js";import{P as y}from"./PrimaryButton-DYu7s_sZ.js";import{Q as C}from"./QuillEditor-C3SaFz5y.js";import{T as A}from"./TextInput-DsDNrlaC.js";import{A as E,u as I}from"./AuthenticatedLayout-DqdaXiHp.js";import"./index-CcyPS-_5.js";import"./ApplicationLogo-BJqtGEMD.js";import"./transition-C4U-Xi44.js";function G({auth:p,permissions:r,avator:u,success:a,error:i}){const s=v.useRef(null),{can:o}=I(r),{data:l,setData:c,post:x,processing:j,errors:m,reset:h}=g({title:"",description:""}),f=t=>{t.preventDefault(),x(route("projects.store"),{onSuccess:()=>{h(),s.current&&s.current.getEditor().setText("")}})};return e.jsxs(E,{user:p.user,permissions:r,avator:u,header:e.jsx("div",{className:"flex items-center space-x-2",children:e.jsx(w,{link:"projects.index",text:" Create New Project"})}),children:[e.jsx(N,{title:"Create Projects"}),e.jsx("div",{className:"py-2",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[a&&e.jsx(P,{success:a}),i&&e.jsx(b,{error:i}),e.jsx("div",{className:"max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800",children:o("Create Project")&&e.jsx("form",{onSubmit:f,className:"space-y-8 p-4",children:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{children:[e.jsx(d,{htmlFor:"title",value:"Project Title"}),e.jsx(A,{id:"title",name:"title",value:l.title,className:"mt-1 block w-full",autoComplete:"title",onChange:t=>c("title",t.target.value),placeholder:"Project title goes here."}),e.jsx(n,{message:m.title,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(d,{htmlFor:"description",value:"Project Description"}),e.jsx(C,{id:"description",ref:s,value:l.description,onChange:t=>c("description",t.target.value),style:{height:"300px",marginBottom:"3.5em"},placeholder:"Write a good description about your project here..."}),e.jsx(n,{message:m.description,className:"mt-2"})]}),o("Create Project")&&e.jsx("div",{className:"flex items-center justify-start",children:e.jsx(y,{className:"ms-0 mt-2 mb-3",disabled:j,children:"Save"})})]})})})]})})]})}export{G as default};
