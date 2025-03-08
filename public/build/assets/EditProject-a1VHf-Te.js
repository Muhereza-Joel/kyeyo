import{r as v,m as g,j as e,L as N}from"./app-BQOZl2BO.js";import{A as P,a as b}from"./AlertSuccess-95aCvO2Z.js";import{B as w}from"./BackArrow-Cy5NDT7C.js";import{I as d}from"./InputError-VjsYktqA.js";import{I as n}from"./InputLabel-CaP5mAlx.js";import{P as y}from"./PrimaryButton-DYu7s_sZ.js";import{Q as E}from"./QuillEditor-C3SaFz5y.js";import{T as A}from"./TextInput-DsDNrlaC.js";import{A as C,u as D}from"./AuthenticatedLayout-DqdaXiHp.js";import"./index-CcyPS-_5.js";import"./ApplicationLogo-BJqtGEMD.js";import"./transition-C4U-Xi44.js";function z({auth:p,permissions:r,avator:x,success:i,error:a,project:s}){const u=v.useRef(null),{can:o}=D(r),{data:l,setData:m,put:j,processing:h,errors:c}=g({title:s.title,description:s.description}),f=t=>{t.preventDefault(),j(route("projects.update",s.id),{})};return e.jsxs(C,{user:p.user,permissions:r,avator:x,header:e.jsx("div",{className:"flex items-center space-x-2",children:e.jsx(w,{link:"projects.index",text:"Update Project Details"})}),children:[e.jsx(N,{title:"Edit Project Details"}),e.jsx("div",{className:"py-2",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[i&&e.jsx(P,{success:i}),a&&e.jsx(b,{error:a}),e.jsx("div",{className:"max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800",children:o("Create Project")&&e.jsx("form",{onSubmit:f,className:"space-y-8 p-4",children:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{children:[e.jsx(n,{htmlFor:"title",value:"Project Title"}),e.jsx(A,{id:"title",name:"title",value:l.title,className:"mt-1 block w-full",autoComplete:"title",onChange:t=>m("title",t.target.value),placeholder:"Project title goes here."}),e.jsx(d,{message:c.title,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"description",value:"Project Description"}),e.jsx(d,{message:c.description,className:"mt-2"})]}),e.jsx(E,{id:"description",ref:u,value:l.description,onChange:t=>m("description",t.target.value),style:{height:"300px",marginBottom:"3.5em"},placeholder:"Write job description here..."}),o("Create Project")&&e.jsx("div",{className:"flex items-center justify-start",children:e.jsx(y,{className:"ms-0 mt-2 mb-3",disabled:h,children:"Save"})})]})})})]})})]})}export{z as default};
