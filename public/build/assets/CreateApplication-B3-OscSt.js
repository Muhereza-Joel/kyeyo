import{r as d,j as e,m as S,L}from"./app-tivWJvp6.js";import{A,a as P}from"./AlertSuccess-8NrKJLtn.js";import{y,L as B}from"./index-DwjXVqNV.js";import{G as F,A as I,u as R}from"./AuthenticatedLayout-DYZWC_Nm.js";import{I as N}from"./InputError-DDmWR0Ah.js";import{I as E}from"./InputLabel-DJAYo9Sg.js";import{P as U}from"./PrimaryButton-DQTCPIK6.js";import{Q as _}from"./QuillEditor-DHR0ie_U.js";import"./ApplicationLogo-BCAIRMQh.js";import"./transition-B3xeowyv.js";function D(r){return F({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"3 6 5 6 21 6"},child:[]},{tag:"path",attr:{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"},child:[]},{tag:"line",attr:{x1:"10",y1:"11",x2:"10",y2:"17"},child:[]},{tag:"line",attr:{x1:"14",y1:"11",x2:"14",y2:"17"},child:[]}]})(r)}function M(r){return F({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"},child:[]},{tag:"polyline",attr:{points:"17 8 12 3 7 8"},child:[]},{tag:"line",attr:{x1:"12",y1:"3",x2:"12",y2:"15"},child:[]}]})(r)}const C=({label:r,name:a,required:l=!1,maxSizeMB:m=2,onFileSelect:h})=>{const[i,o]=d.useState(""),[k,p]=d.useState(0),n=d.useRef(null),g=c=>{const t=c.target.files[0];if(!t)return;if(t.size/(1024*1024)>m){y.error(`File size exceeds ${m}MB limit.`);return}o(t.name),p(0),v(),h(a,t)},v=c=>{let t=0;const f=setInterval(()=>{t+=10,p(t),t>=100&&clearInterval(f)},200)},x=()=>{l&&!i&&(y.error(`Please upload a file for ${r}.`),n.current.focus())},j=()=>{o(""),p(0),n.current.value="",h(a,null),y.info(`${r} file removed.`)};return e.jsxs("div",{children:[e.jsxs("label",{htmlFor:a,className:"block font-medium text-gray-700 dark:text-gray-200",children:[r," ",l&&e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsxs("div",{className:"flex items-center gap-2 border p-2 rounded cursor-pointer dark:border-gray-600 dark:bg-gray-800",onClick:()=>n.current.click(),onBlur:x,children:[e.jsx(M,{className:"text-gray-600 dark:text-gray-300"}),e.jsx("span",{className:"text-gray-600 dark:text-gray-300",children:i||"Choose a file"})]}),e.jsx("input",{ref:n,type:"file",name:a,accept:".pdf,.doc,.docx",onChange:g,className:"hidden",required:l,onBlur:x}),i&&e.jsxs("div",{className:"flex justify-between items-center mt-2",children:[e.jsxs("p",{className:"text-gray-600 dark:text-gray-300 text-sm",children:["Selected: ",i]}),e.jsx("button",{onClick:c=>{c.stopPropagation(),j()},className:"text-red-500 hover:text-red-700",children:e.jsx(D,{})})]})]})};function X({auth:r,success:a,error:l,permissions:m,job_id:h}){const{can:i}=R(m),o=d.useRef(null),[k,p]=d.useState(null),[n,g]=d.useState(null),{data:v,setData:x,post:j,processing:c,errors:t,reset:f}=S({job_id:h,cover_letter:"",cv:k,transcript:n}),b=(s,u)=>{x(s,u),s==="cv"&&p(u?u.name:""),s==="transcript"&&g(u?u.name:"")},w=s=>{s.preventDefault(),j(route("applications.store"),{onSuccess:()=>{f(),o.current&&o.current.getEditor().setText("")}})};return e.jsxs(I,{user:r.user,permissions:m,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-100 dark:text-gray-200 leading-tight",children:"Create New Application"}),children:[e.jsx(L,{title:"Create New Application"}),e.jsxs("div",{className:"py-2 max-w-7xl mx-auto sm:px-6 lg:px-8",children:[a&&e.jsx(A,{success:a}),l&&e.jsx(P,{error:l}),e.jsx("div",{className:"max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800",children:e.jsx("div",{className:"px-4 pt-4 pb-2",children:e.jsxs("form",{onSubmit:w,className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx(E,{htmlFor:"cover_letter",value:"Please explain why you think you are the best candidate for this position"}),e.jsx(_,{id:"cover_letter",ref:o,value:v.cover_letter,onChange:s=>x("cover_letter",s.target.value),style:{height:"300px",marginBottom:"3.5em"},placeholder:"Write your explanation here..."}),e.jsx(N,{message:t.cover_letter,className:"mt-2"})]}),e.jsx(C,{label:"Upload Request Letter (PDF, DOC, DOCX)",name:"cv",required:!0,onFileSelect:b}),e.jsx(N,{message:t.cv,className:"mt-2"}),e.jsx(C,{label:"Upload Transcript (Optional)",name:"transcript",onFileSelect:b}),e.jsx(N,{message:t.transcript,className:"mt-2"}),i("Create Application")&&e.jsx("div",{className:"flex items-center justify-start",children:e.jsx(U,{className:"ms-0 mt-2 mb-3",disabled:c,children:"Save"})}),e.jsx(B,{})]})})})]})]})}export{X as default};
