import{j as e,r as y,m as N,L as w}from"./app-CjaHgz8i.js";import{A as k,a as A}from"./AlertSuccess-C9Jw-JXb.js";import{G as F,F as I,a as S,b as D,c as B,A as E,u as C}from"./AuthenticatedLayout-DHA9zIoR.js";import{B as R}from"./BackArrow-Bgx7EFmr.js";import{I as g}from"./InputError-FEPySgpc.js";import{I as h}from"./InputLabel-C689ebPE.js";import{P as L}from"./PrimaryButton-D5raLki9.js";import{Q as _}from"./QuillEditor-CNYRYk_5.js";import{S as P}from"./SelectInput-CuSkg-fS.js";import"./TextInput-BXXnfmYJ.js";import"./ApplicationLogo-_tbeXFIx.js";import"./transition-EW8rDKNA.js";function V(s){return F({attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"},child:[]}]})(s)}function n({title:s,children:a}){return e.jsxs("div",{className:"border-b border-gray-200 dark:border-gray-700 pb-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2",children:s}),e.jsx("div",{className:"space-y-2",children:a})]})}const $=s=>s.includes("pdf")?e.jsx(I,{className:"text-red-500 w-6 h-6"}):s.includes("image")?e.jsx(S,{className:"text-blue-500 w-6 h-6"}):s.includes("word")?e.jsx(D,{className:"text-blue-700 w-6 h-6"}):s.includes("excel")?e.jsx(B,{className:"text-green-500 w-6 h-6"}):e.jsx(V,{className:"text-gray-500 w-6 h-6"}),H=s=>s<1024?`${s} B`:s<1048576?`${(s/1024).toFixed(2)} KB`:`${(s/1048576).toFixed(2)} MB`,J=s=>new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});function M({application:s}){return e.jsx(n,{title:"Attached Files",children:s.media.length>0?e.jsx("div",{className:"space-y-2",children:s.media.map((a,i)=>e.jsxs("div",{className:"flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-sm",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[$(a.mime_type),e.jsxs("div",{children:[e.jsx("a",{href:a.original_url,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 dark:text-blue-400 hover:underline font-medium",children:a.name}),e.jsxs("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:[a.extension," ·"," ",H(a.size)]})]})]}),e.jsx("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:J(a.created_at)})]},i))}):e.jsx("p",{className:"text-gray-500 dark:text-gray-400",children:"No files attached."})})}function r({label:s,value:a}){return e.jsxs("div",{className:"flex justify-between text-sm text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{className:"font-medium",children:[s,":"]}),e.jsx("span",{children:a||"N/A"})]})}function T({label:s,value:a}){return e.jsxs("div",{className:"flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{className:"font-medium",children:[s,":"]}),e.jsx("div",{className:"max-w-full overflow-x-auto whitespace-pre-wrap break-words",dangerouslySetInnerHTML:{__html:a||"N/A"}})]})}function te({auth:s,success:a,error:i,permissions:c,application:t,comments:G,avator:j}){const{can:o}=C(c),d=y.useRef(null),{data:m,setData:x,put:b,processing:f,errors:u,reset:p}=N({comments:t.comments,status:t.status}),v=l=>{l.preventDefault(),b(route("applications.update",t.id),{onSuccess:()=>{p(),d.current&&d.current.getEditor().setText("")}})};return e.jsxs(E,{user:s.user,permissions:c,avator:j,header:e.jsxs("div",{className:"flex justify-between items-center",children:[o("View Applications")&&e.jsx(R,{link:"applications.index",text:"Application Details"}),e.jsxs("div",{className:"flex",children:[e.jsx("h2",{className:"font-semibold sm:pl-48 text-xl text-gray-100 dark:text-gray-200 leading-tight",children:"Application Details"}),e.jsxs("span",{className:`inline-block px-3 mx-3 py-1 rounded-full text-sm font-semibold ${t.status==="pending"?"bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100":t.status==="reviewed"?"bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100":t.status==="accepted"?"bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100":t.status==="rejected"?"bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100":""}`,children:["Application Status: ",t.status]})]})]}),children:[e.jsx(w,{title:"Application Details"}),e.jsxs("div",{className:"py-2 max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-2",children:[e.jsxs("div",{className:"col-span-2",children:[a&&e.jsx(k,{success:a}),i&&e.jsx(A,{error:i}),e.jsxs("div",{className:"max-w-full rounded shadow-sm p-2 overflow-hidden bg-white dark:bg-gray-800",children:[e.jsx("div",{className:"space-y-6 p-3",children:e.jsxs(n,{title:"Applicant Information",children:[e.jsx(r,{label:"Name",value:t.user.name}),e.jsx(r,{label:"Email Address",value:t.user.email})]})}),e.jsx("div",{className:"space-y-6 p-3 mt-3  dark:bg-gray-900",children:e.jsxs(n,{title:"Job Information",children:[e.jsx(r,{label:"Opportunity Title",value:t.job.title}),e.jsx(r,{label:"Category",value:t.job.profession.name})]})}),e.jsx("div",{className:"space-y-6 p-3 mt-3",children:e.jsxs(n,{title:"Job Information",children:[e.jsx(r,{label:"Opportunity Title",value:t.job.title}),e.jsx(r,{label:"Category",value:t.job.profession.name})]})}),e.jsx("div",{className:"space-y-6 p-3 mt-3 bg-gray-200 dark:bg-gray-900",children:e.jsx(n,{title:"Cover Letter",children:e.jsx(T,{label:"Reason why applicant thinks he/she is better for this position",value:t.cover_letter})})})]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"rounded shadow-sm p-4 bg-white dark:bg-gray-800",children:e.jsx(M,{application:t})}),o("Create Job")&&e.jsx("div",{className:"rounded shadow-sm p-4 bg-white dark:bg-gray-800",children:e.jsxs("form",{onSubmit:v,className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx(h,{htmlFor:"status",value:"Application Status"}),e.jsx(P,{id:"status",name:"status",value:m.status,isFocused:!1,className:"mt-1 block w-full",options:[{value:"",label:"Select Status"},{value:"pending",label:"Pending"},{value:"reviewed",label:"Reviewed"},{value:"accepted",label:"Accepted"},{value:"rejected",label:"Rejected"}],onChange:l=>x("status",l.target.value)}),e.jsx(g,{message:u.status,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(h,{htmlFor:"comments",value:"Add Comment"}),e.jsx(_,{id:"comments",ref:d,value:m.comments,onChange:l=>x("comments",l.target.value),style:{height:"150px",marginBottom:"4.5em",marginTop:"1.0em"},placeholder:"Write your comment here..."}),e.jsx(g,{message:u.comments,className:"mt-2"})]}),e.jsx("div",{className:"flex items-center justify-start",children:e.jsx(L,{className:"ms-0 mt-2 mb-3",disabled:f,children:"Update Application Details"})})]})})]})]})]})}export{te as default};
