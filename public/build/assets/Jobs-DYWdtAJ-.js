import{K as L,m as w,j as e,r as b,a as y,L as q,$ as o}from"./app-BQOZl2BO.js";import{A,u as $}from"./AuthenticatedLayout-DqdaXiHp.js";import{x as F,y as J,z as C,A as R}from"./index-CcyPS-_5.js";import{d as T}from"./default-logo-Cb_SdEyz.js";import{L as D,y as j}from"./index-CS1T6uRM.js";import{F as E,P as O}from"./Pagination-xIUyHpQj.js";import{T as U}from"./TextInput-DsDNrlaC.js";import"./ApplicationLogo-BJqtGEMD.js";import"./transition-C4U-Xi44.js";const V=()=>{const{url:d}=L(),i=new URLSearchParams(new URL(d,window.location.origin).search),{data:a,setData:m,get:c,processing:x,reset:u}=w({query:i.get("query")||""}),g=n=>{if(n.preventDefault(),!a.query.trim())return;const r=new URLSearchParams(i);r.set("query",a.query.trim()),c(`/search/jobs?${r.toString()}`,{onSuccess:()=>u()})};return e.jsx("div",{children:e.jsxs("form",{className:"relative flex items-center",onSubmit:g,children:[e.jsx(U,{id:"query",name:"query",value:a.query,className:"ps-10 mt-1 block w-full",autoComplete:"query",onChange:n=>m("query",n.target.value),placeholder:"What are you looking for..."}),e.jsx(F,{className:"absolute left-3 top-4 text-gray-500 dark:text-gray-400"}),e.jsx("button",{type:"submit",disabled:x||!a.query.trim(),className:`ml-2 px-5 py-2 rounded-lg focus:outline-none focus:ring 
                        ${x||!a.query.trim()?"bg-gray-300 cursor-not-allowed":"bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300"}`,children:"Search"})]})})};function M({auth:d,permissions:i,jobs:a,tags:m,currentTag:c,seniorities:x,industries:u,professions:g,avator:n}){var f;const{can:r}=$(i),{data:N,setData:p}=w({});b.useEffect(()=>{const s=new URLSearchParams(location.search),t={};t.published=s.get("published"),t.profession=s.get("profession"),t.industry=s.get("industry"),t.seniority=s.get("seniority"),p(t)},[p]);const k=[{name:"published",type:"select",options:["Published","Last 1 Week","Last 30 Days","Latest 24 Hours"],defaultValue:"Published"},{name:"profession",type:"select",options:["Profession",...g],defaultValue:"Profession"},{name:"industry",type:"select",options:["Industry",...u],defaultValue:"Industry"},{name:"seniority",type:"select",options:["Seniority",...x],defaultValue:"Seniority"}],[h,v]=b.useState(a.data.reduce((s,t)=>(s[t.id]=t.active,s),{}));y.defaults.headers.common["X-CSRF-TOKEN"]=(f=document.querySelector('meta[name="csrf-token"]'))==null?void 0:f.getAttribute("content");const S=s=>{const t={weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"};return new Date(s).toLocaleString("en-GB",t)},P=async s=>{const t=!h[s];console.log(`Toggling job ${s} to ${t}`);try{await y.patch(route("jobs.toggle",s),{active:t}),v(l=>({...l,[s]:t})),j.success(`Job ${t?"application enabled":"application disabled"}!`)}catch(l){console.error("Error updating job status:",l),j.error("Failed to update job status.")}};return e.jsxs(A,{user:d.user,permissions:i,avator:n,header:e.jsxs("div",{className:"flex flex-wrap justify-between items-center w-full gap-4",children:[e.jsxs("div",{className:"flex flex-wrap items-center space-x-4 w-full max-w-3xl",children:[e.jsx("div",{className:"w-full max-w-lg flex-grow",children:e.jsx(V,{})}),c&&e.jsxs("div",{className:"ml-4 mt-2 flex items-center space-x-2",children:[e.jsx(R,{className:"text-gray-100 dark:text-blue-400"}),e.jsx("span",{className:"text-sm text-gray-500 dark:text-gray-400",children:"Tagged:"}),e.jsx("h3",{className:"text-sm font-semibold text-blue-400 dark:text-blue-400 line-clamp-1",children:c})]})]}),r("Create Job")&&e.jsx(o,{href:route("jobs.create"),className:"inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150",children:"Add New Job"})]}),children:[e.jsx(q,{title:"Jobs"}),e.jsxs("div",{className:"pb-2",children:[e.jsx("div",{className:"max-w-12xl mx-auto mb-3  bg-gray-900 dark:bg-gray-900 py-3 sm:px-2 lg:px-8 flex flex-col md:flex-row gap-2 ",children:e.jsx("div",{className:"flex flex-wrap justify-start px-4 sm:px-10 md:px-20 lg:px-28 items-start w-full",children:e.jsx(E,{filtersConfig:k,className:"mr-4 flex-grow",url:"jobs.index",filters:N})})}),e.jsxs("div",{className:"max-w-7xl mx-auto sm:px-2 lg:px-8 flex flex-col md:flex-row gap-1",children:[e.jsx("div",{className:"w-full md:w-3/4",children:e.jsx("div",{className:"bg-neutral dark:bg-gray-900 overflow-hidden  sm:rounded-lg",children:e.jsx("div",{className:"pb-2 text-gray-900 dark:text-gray-100",children:e.jsx("div",{className:"grid grid-cols-1 gap-1 mt-1",children:a.data.map(s=>e.jsxs("div",{className:"bg-neutral dark:bg-gray-900 rounded-lg shadow-sm p-2 flex gap-4 items-center",children:[e.jsx("div",{className:"w-32 h-32 flex-shrink-0",children:e.jsx("img",{src:s.logo||T,alt:`${s.title} logo`,className:"w-full h-full object-cover rounded-sm border"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h4",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full",children:s.title}),e.jsxs("p",{className:"text-sm text-gray-500 dark:text-gray-400 mt-2",children:["Posted On:"," ",S(s.created_at)]}),Array.isArray(s.tags)&&s.tags.length>0&&e.jsxs("div",{className:"mt-2 flex flex-wrap gap-2",children:["Tags:"," ",s.tags.map((t,l)=>e.jsx(o,{href:route("jobs-tagged",t.slug.en),className:"text-xs bg-blue-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-md",children:t.name.en},l))]}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between mt-4 gap-2",children:[e.jsxs("div",{className:"flex items-center space-x-4",children:[r("Update Job")&&e.jsxs(o,{href:route("jobs.edit",s.id),className:"inline-flex items-center text-blue-500 dark:text-green-500 hover:text-blue-700 dark:hover:text-green-300 transition",children:[e.jsx(J,{className:"mr-2"}),e.jsx("span",{className:"hidden sm:inline",children:"Edit"})]}),r("View Jobs")&&e.jsxs(o,{href:route("jobs.show",s.id),className:"inline-flex items-center text-blue-500 dark:text-green-500 hover:text-blue-700 dark:hover:text-green-300 transition",children:[e.jsx("span",{className:"hidden sm:inline",children:"Read More"}),e.jsx(C,{className:"ml-2"})]})]}),r("Create Job")&&s.creator===d.user.id&&e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsxs("span",{className:"text-sm text-gray-700 dark:text-gray-300",children:["Applications"," ",e.jsx("span",{className:"font-semibold",children:s.active===1?"Enabled":"Disabled"})]}),e.jsx("label",{className:"flex items-center space-x-2 cursor-pointer",children:e.jsxs("label",{className:"switch",children:[e.jsx("input",{type:"checkbox",checked:h[s.id],onChange:()=>P(s.id)}),e.jsx("span",{className:"slider round"})]})})]})]})]})]},s.id))})})})}),e.jsxs("div",{className:"w-full md:w-1/4 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3",children:"Popular Tags"}),e.jsx("div",{className:"flex flex-wrap gap-2",children:m.map((s,t)=>e.jsxs(o,{href:route("jobs-tagged",s.slug.en),className:"flex items-center space-x-2 text-xs bg-gray-200 dark:bg-gray-300 text-gray-800 dark:text-gray-900 px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-300",children:[e.jsx("span",{children:s.name.en}),e.jsx("span",{className:`px-2 py-0.5 rounded-full text-xs font-semibold ${s.jobs_count===0?"bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100":"bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"}`,children:s.jobs_count===0?"No Jobs":`${s.jobs_count} job${s.jobs_count>1?"s":""}`})]},t))})]})]}),e.jsx("div",{children:e.jsx(O,{links:a.links})})]}),e.jsx(D,{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0}),e.jsx("style",{jsx:!0,children:`
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 44px;
                    height: 20px;
                    z-index: 0;
                }

                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    transition: 0.4s;
                    border-radius: 50px;
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: 12px;
                    width: 12px;
                    border-radius: 50px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    transition: 0.4s;
                }

                input:checked + .slider {
                    background-color: #4caf50;
                }

                input:checked + .slider:before {
                    transform: translateX(22px);
                }
            `})]})}export{M as default};
