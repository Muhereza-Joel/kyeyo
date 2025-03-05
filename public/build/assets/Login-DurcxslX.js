import{j as e,m as x,r as f,L as p,$ as i}from"./app-tivWJvp6.js";import{G as b}from"./GuestLayout-_j2VDGZA.js";import{I as n}from"./InputError-DDmWR0Ah.js";import{I as l}from"./InputLabel-DJAYo9Sg.js";import{P as h}from"./PrimaryButton-DQTCPIK6.js";import{T as m}from"./TextInput-DhvUhrjg.js";import{A as y}from"./ApplicationLogo-BCAIRMQh.js";function j({className:a="",...s}){return e.jsx("input",{...s,type:"checkbox",className:"rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800 "+a})}function I({status:a,canResetPassword:s}){const{data:t,setData:o,post:c,errors:d,reset:g}=x({email:"",password:"",remember:!1});f.useEffect(()=>()=>{g("password")},[]);const u=r=>{r.preventDefault(),c(route("login"))};return e.jsxs(b,{children:[e.jsx(p,{title:"Log in"}),e.jsx("div",{className:"flex items-center justify-center  border-2 border-gray-300 dark:border-gray-700",children:e.jsxs("div",{className:`w-full max-w-sm p-3 rounded-lg  bg-white dark:bg-gray-900 
                                 
                          text-gray-900 dark:text-white transition-all duration-300`,children:[e.jsx(y,{className:"w-72 h-40 fill-current text-gray-500"}),e.jsx("div",{className:"mb-6 text-center",children:e.jsx("p",{className:"text-lg font-extrabold  text-gray-900 dark:text-gray-300",children:"Gain experience. Build your career."})}),a&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-300",children:a}),e.jsxs("form",{onSubmit:u,className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx(l,{htmlFor:"email",value:"Email"}),e.jsx(m,{id:"email",type:"email",name:"email",value:t.email,className:"w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ",autoComplete:"username",isFocused:!0,onChange:r=>o("email",r.target.value),placeholder:"Enter your email"}),e.jsx(n,{message:d.email,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"password",value:"Password"}),e.jsx(m,{id:"password",type:"password",name:"password",value:t.password,className:"w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ",autoComplete:"current-password",onChange:r=>o("password",r.target.value),placeholder:"Enter your password"}),e.jsx(n,{message:d.password,className:"mt-2"})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("label",{className:"flex items-center text-gray-100 dark:text-gray-300",children:[e.jsx(j,{name:"remember",checked:t.remember,onChange:r=>o("remember",r.target.checked)}),e.jsx("span",{className:"ms-2 text-sm text-gray-900 dark:text-blue-400",children:"Remember me"})]}),s&&e.jsx(i,{href:route("password.request"),className:"text-sm text-gray-900 dark:text-blue-400 hover:underline",children:"Forgot password?"})]}),e.jsxs("div",{className:"flex flex-col space-y-4",children:[e.jsx(h,{className:"w-full bg-gray-900 text-indigo-600 dark:bg-indigo-500 dark:text-white hover:bg-gray-200 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 focus:bg-gray-800 dark:focus:bg-indigo-600 flex items-center justify-center",children:"Log in"}),e.jsx("div",{className:"text-center",children:e.jsxs("span",{className:"text-sm text-blue-400 dark:text-gray-300",children:["New here?"," ",e.jsx(i,{href:route("register"),className:"text-blue-400 dark:text-blue-400 font-medium hover:underline",children:"Create Your Account"})]})})]})]})]})})]})}export{I as default};
