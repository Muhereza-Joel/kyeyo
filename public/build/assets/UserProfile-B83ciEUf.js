import{r as u,j as e,m as A,L as D}from"./app-tivWJvp6.js";import{A as L,a as U}from"./AlertSuccess-8NrKJLtn.js";import{I as o}from"./InputError-DDmWR0Ah.js";import{I as i}from"./InputLabel-DJAYo9Sg.js";import{P as B}from"./PrimaryButton-DQTCPIK6.js";import{S as H}from"./SelectInput-SH3srNIP.js";import{T as c}from"./TextInput-DhvUhrjg.js";import{A as T,j as G}from"./AuthenticatedLayout-DYZWC_Nm.js";import"./ApplicationLogo-BCAIRMQh.js";import"./transition-B3xeowyv.js";const O=u.forwardRef(function({type:g="date",className:h="",isFocused:x=!1,...l},f){const d=f||u.useRef();return u.useEffect(()=>{x&&d.current.focus()},[]),e.jsx("input",{...l,type:g,className:"border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm "+h,ref:d})});function $({auth:p,success:g,error:h,permissions:x,user:l,logo:f}){var v,b,j,N,y,w,_,C;const[d,F]=u.useState(null),[z,k]=u.useState(null),{data:r,setData:t,post:E,processing:I,errors:s}=A({fullname:((v=l.profile)==null?void 0:v.fullname)||"",phone_number:((b=l.profile)==null?void 0:b.phone_number)||"",nin:((j=l.profile)==null?void 0:j.nin)||"",date_of_birth:((N=l.profile)==null?void 0:N.date_of_birth)||"",gender:((y=l.profile)==null?void 0:y.gender)||"",country:((w=l.profile)==null?void 0:w.country)||"",district:((_=l.profile)==null?void 0:_.district)||"",village:((C=l.profile)==null?void 0:C.village)||"",logo:f||null,cover_image:null,user_id:l.id}),P=a=>{const n=a.target.files[0];if(n){t("cover_image",n);const m=new FileReader;m.onload=()=>k(m.result),m.readAsDataURL(n)}},R=a=>{const n=a.target.files[0];if(n){t("logo",n);const m=new FileReader;m.onload=()=>F(m.result),m.readAsDataURL(n)}},S=a=>{a.preventDefault(),console.log(r),E(route("updateBioData"))};return e.jsxs(T,{user:p.user,permissions:x,children:[e.jsx(D,{title:"Create Your Profile"}),e.jsxs("div",{className:"py-2 max-w-7xl mx-auto sm:px-6 lg:px-8",children:[g&&e.jsx(L,{success:g}),h&&e.jsx(U,{error:h}),e.jsx("div",{className:"max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800",children:e.jsx("div",{className:"px-4 pb-2",children:e.jsxs("form",{onSubmit:S,className:"mt-6 space-y-6",children:[e.jsxs("div",{className:"relative w-full h-96 mb-20 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center",children:[r.cover_image?e.jsx("img",{src:URL.createObjectURL(r.cover_image),alt:"Cover Preview",className:"w-full h-full object-cover"}):e.jsx("span",{className:"text-gray-500",children:"No Cover Image Selected"}),e.jsx("input",{type:"file",id:"cover_image",accept:"image/*",className:"hidden",onChange:P}),e.jsx("label",{htmlFor:"cover_image",className:"absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600",children:"Change Cover"}),e.jsxs("div",{className:"absolute bottom-[-80px] left-1/2 transform -translate-x-1/2 w-52 h-52 bg-gray-300 dark:bg-gray-700 rounded-full border-4 border-white shadow-lg z-10",children:[d?e.jsx("img",{src:d,alt:"Logo Preview",className:"w-full h-full rounded-full object-cover"}):e.jsx("div",{className:"w-full h-full flex items-center justify-center text-gray-500",children:"No Avator"}),e.jsx("input",{type:"file",id:"logo",accept:"image/*",onChange:R,className:"hidden"}),e.jsx("label",{htmlFor:"logo",className:"absolute bottom-0 right-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600",children:e.jsx(G,{className:"text-xl"})}),e.jsx(o,{message:s.logo,className:"mt-2"})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ",children:[e.jsxs("div",{children:[e.jsx(i,{htmlFor:"fullname",value:"Fullname"}),e.jsx(c,{id:"name",className:"mt-1 block w-full",value:r.fullname,onChange:a=>t("fullname",a.target.value),placeholder:"Enter your fullname here",isFocused:!0,autoComplete:"fullname"}),e.jsx(o,{className:"mt-2",message:s.fullname})]}),e.jsxs("div",{children:[e.jsx(i,{htmlFor:"phone_number",value:"Phone Number"}),e.jsx(c,{id:"phone_number",className:"mt-1 block w-full",value:r.phone_number,onChange:a=>t("phone_number",a.target.value),placeholder:"Enter your phone number here",isFocused:!0,autoComplete:"phone_number"}),e.jsx(o,{className:"mt-2",message:s.phone_number})]}),e.jsxs("div",{children:[e.jsx(i,{htmlFor:"nin",value:"NIN Number"}),e.jsx(c,{id:"nin",className:"mt-1 block w-full",value:r.nin,onChange:a=>t("nin",a.target.value),placeholder:"Enter your nin number here",isFocused:!0,autoComplete:"nin"}),e.jsx(o,{className:"mt-2",message:s.nin})]}),e.jsxs("div",{children:[e.jsx(i,{htmlFor:"date_of_birth",value:"Date of Birth"}),e.jsx(O,{id:"date_of_birth",className:"mt-1 block w-full",value:r.date_of_birth,onChange:a=>t("date_of_birth",a.target.value),placeholder:"Enter your date of birth here",isFocused:!0,autoComplete:"date_of_birth"}),e.jsx(o,{className:"mt-2",message:s.date_of_birth})]}),e.jsxs("div",{children:[e.jsx(i,{htmlFor:"gender",value:"Gender"}),e.jsx(H,{id:"gender",name:"gender",isFocused:!1,className:"mt-1 block w-full",options:[{value:"",label:"Select Gender"},{value:"male",label:"Male"},{value:"female",label:"Female"},{value:"other",label:"Other"}],value:r.gender||"",onChange:a=>t("gender",a.target.value)}),e.jsx(o,{message:s.gender,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(i,{htmlFor:"country",value:"Home Country"}),e.jsx(c,{id:"country",className:"mt-1 block w-full",value:r.country,onChange:a=>t("country",a.target.value),placeholder:"Enter your home country here",isFocused:!0,autoComplete:"country"}),e.jsx(o,{className:"mt-2",message:s.country})]}),e.jsxs("div",{children:[e.jsx(i,{htmlFor:"district",value:"Home District"}),e.jsx(c,{id:"district",className:"mt-1 block w-full",value:r.district,onChange:a=>t("district",a.target.value),placeholder:"Enter your home district here",isFocused:!0,autoComplete:"district"}),e.jsx(o,{className:"mt-2",message:s.district})]}),e.jsxs("div",{children:[e.jsx(i,{htmlFor:"village",value:"Home Village"}),e.jsx(c,{id:"village",className:"mt-1 block w-full",value:r.village,onChange:a=>t("village",a.target.value),placeholder:"Enter your home district here",isFocused:!0,autoComplete:"village"}),e.jsx(o,{className:"mt-2",message:s.village})]})]}),e.jsx("div",{className:"flex items-center gap-4",children:e.jsx(B,{disabled:I,children:"Save"})})]})})})]})]})}export{$ as default};
