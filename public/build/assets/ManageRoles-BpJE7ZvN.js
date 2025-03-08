import{r as i,m as P,j as e,L as Z}from"./app-CjaHgz8i.js";import{A as _,a as ee}from"./AlertSuccess-C9Jw-JXb.js";import{S as o,D as R}from"./SecondaryButton-D88VrcB-.js";import{I as D}from"./InputError-FEPySgpc.js";import{I as E}from"./InputLabel-C689ebPE.js";import{P as C}from"./PrimaryButton-D5raLki9.js";import{T as S}from"./TextInput-BXXnfmYJ.js";import{A as se,u as te}from"./AuthenticatedLayout-DHA9zIoR.js";import"./ApplicationLogo-_tbeXFIx.js";import"./transition-EW8rDKNA.js";function ue({auth:w,success:x,error:u,roles:p,permissions:h,userPermissions:g,avator:A}){const[a,j]=i.useState("roles"),[n,y]=i.useState(null),[d,b]=i.useState(null),[r,l]=i.useState(null),{can:t}=te(g),{data:f,setData:N,post:F,put:I,delete:M,processing:U,errors:T,reset:m}=P({name:""}),{data:k,setData:v,post:B,put:L,delete:V,processing:$,errors:z,reset:c}=P({name:""}),q=s=>{s.preventDefault(),F(route("roles.store"),{onSuccess:()=>m()})},G=s=>{s.preventDefault(),I(route("roles.update",n.uuid),{data:{name:f.name},onSuccess:()=>{m(),y(null)}})},H=s=>{s.preventDefault(),B(route("permissions.store"),{onSuccess:()=>c()})},J=s=>{s.preventDefault(),L(route("permissions.update",d.uuid),{data:{name:k.name},onSuccess:()=>{c(),b(null)}})},K=s=>{y(s),N({name:s.name})},O=s=>{b(s),v({name:s.name})},Q=s=>{l({type:"role",uuid:s.uuid})},W=s=>{l({type:"permission",uuid:s.uuid})},X=()=>{r.type==="role"?M(route("roles.destroy",r.uuid),{onSuccess:()=>{console.log("Role deleted successfully")},onError:s=>{console.log("Error deleting role:",s)}}):r.type==="permission"&&V(route("permissions.destroy",r.uuid),{onSuccess:()=>{console.log("Permission deleted successfully")},onError:s=>{console.log("Error deleting permission:",s)}}),l(null)},Y=()=>{l(null)};return e.jsxs(se,{user:w.user,permissions:g,avator:A,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-900 dark:text-gray-200 leading-tight",children:"Manage User Roles and Permissions"}),children:[e.jsx(Z,{title:"Manage Roles & Permissions"}),e.jsxs("div",{className:"py-2 max-w-7xl mx-auto sm:px-6 lg:px-8",children:[x&&e.jsx(_,{success:x}),u&&e.jsx(ee,{error:u}),e.jsx("div",{className:"bg-white dark:bg-gray-800 shadow sm:rounded-lg mx-2",children:e.jsxs("div",{className:"p-6",children:[e.jsxs("div",{className:"flex space-x-4 mb-6",children:[t("Create Role")&&e.jsx("button",{className:`px-4 py-2 rounded ${a==="roles"?"bg-blue-500 text-white":"bg-gray-300"}`,onClick:()=>j("roles"),children:"Manage Roles"}),t("Create Permissions")&&e.jsx("button",{className:`px-4 py-2 rounded ${a==="permissions"?"bg-blue-500 text-white":"bg-gray-300"}`,onClick:()=>j("permissions"),children:"Manage Permissions"})]}),a==="roles"&&e.jsxs(e.Fragment,{children:[t("Create Role")&&e.jsx("form",{onSubmit:n?G:q,children:e.jsxs("div",{className:"mt-4 space-y-6",children:[e.jsxs("div",{children:[e.jsx(E,{htmlFor:"roleName",value:"Role"}),e.jsx(S,{id:"roleName",name:"name",type:"text",value:f.name,autoComplete:"off",className:"mt-1 block w-full",onChange:s=>N("name",s.target.value),placeholder:"Enter role name here."}),e.jsx(D,{message:T.name,className:"mt-2"})]}),e.jsxs("div",{className:"flex items-center justify-start",children:[e.jsx(C,{disabled:U,children:n?"Update Role":"Save Role"}),e.jsx(o,{className:"ms-2",onClick:s=>m(),children:"Reset Form"})]})]})}),t("View Roles")&&e.jsxs("div",{className:"mt-6",children:[e.jsx("h3",{className:"font-semibold text-lg mb-2 text-dark-200 dark:text-gray-200",children:"Existing Roles"}),p.length>0?e.jsxs("table",{className:"w-fit mt-4 mx-2 text-left table-auto min-w-max border-collapse border border-blue-gray-200 dark:border-gray-700",children:[e.jsx("thead",{className:"border-b",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-2 text-left text-dark-200 dark:text-gray-200",children:"Role Name"}),e.jsx("th",{className:"px-4 py-2 text-left text-dark-200 dark:text-gray-200",children:"Actions"})]})}),e.jsx("tbody",{children:p.map(s=>e.jsxs("tr",{className:"border-b dark:border-gray-600",children:[e.jsx("td",{className:"px-4 py-2 text-dark-200 dark:text-gray-200",children:s.name}),e.jsx("td",{className:"px-4 py-2",children:e.jsxs("div",{className:"flex space-x-2",children:[t("Update Role")&&e.jsx(o,{onClick:()=>K(s),children:"Edit"}),t("Delete Role")&&e.jsx(R,{onClick:()=>Q(s),children:"Delete"})]})})]},s.uuid))})]}):e.jsx("p",{className:"text-dark-200 dark:text-gray-200",children:"No roles found."})]})]}),a==="permissions"&&e.jsxs(e.Fragment,{children:[t("Create Permissions")&&e.jsx("form",{onSubmit:d?J:H,children:e.jsxs("div",{className:"mt-4 space-y-6",children:[e.jsxs("div",{children:[e.jsx(E,{htmlFor:"permissionName",value:"Permission"}),e.jsx(S,{id:"permissionName",name:"name",type:"text",value:k.name,autoComplete:"off",className:"mt-1 block w-full",onChange:s=>v("name",s.target.value),placeholder:"Enter permission name here."}),e.jsx(D,{message:z.name,className:"mt-2"})]}),e.jsxs("div",{className:"flex items-center justify-start",children:[e.jsx(C,{disabled:$,children:d?"Update Permission":"Save Permission"}),e.jsx(o,{className:"ms-2",onClick:s=>c(),children:"Reset Form"})]})]})}),t("View Permissions")&&e.jsxs("div",{className:"mt-6",children:[e.jsx("h3",{className:"font-semibold text-lg mb-2 text-dark-200 dark:text-gray-200",children:"Existing Permissions"}),h.length>0?e.jsxs("table",{className:"w-fit mt-4 mx-2 text-left table-auto min-w-max border-collapse border border-blue-gray-200 dark:border-gray-700",children:[e.jsx("thead",{className:"border-b",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-2 text-left text-dark-200 dark:text-gray-200",children:"Permission Name"}),e.jsx("th",{className:"px-4 py-2 text-left text-dark-200 dark:text-gray-200",children:"Actions"})]})}),e.jsx("tbody",{children:h.map(s=>e.jsxs("tr",{className:"border-b dark:border-gray-600",children:[e.jsx("td",{className:"px-4 py-2 text-dark-200 dark:text-gray-200",children:s.name}),e.jsx("td",{className:"px-4 py-2",children:e.jsxs("div",{className:"flex space-x-2",children:[t("Update Permission")&&e.jsx(o,{onClick:()=>O(s),children:"Edit"}),t("Delete Permission")&&e.jsx(R,{onClick:()=>W(s),children:"Delete"})]})})]},s.uuid))})]}):e.jsx("p",{className:"text-dark-200 dark:text-gray-200",children:"No permissions found."})]})]})]})})]}),t("Delete Role")&&t("Delete Permission")&&r&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50",children:e.jsxs("div",{className:"bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg",children:[e.jsxs("p",{className:"text-gray-900 dark:text-gray-300",children:["Are you sure you want to delete this"," ",r.type,"?"]}),e.jsxs("div",{className:"mt-4 flex justify-end space-x-4",children:[e.jsx("button",{onClick:Y,className:"text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200",children:"Cancel"}),r.type==="role"&&t("Delete Role")||r.type==="permission"&&t("Delete Permission")?e.jsx("button",{onClick:X,className:"text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400",children:"Delete"}):null]})]})})]})}export{ue as default};
