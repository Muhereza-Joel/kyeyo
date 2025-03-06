import{j as e,m as p,r as n,L as b,$ as l}from"./app-DV4hzqak.js";import{G as y}from"./GuestLayout-CYMvQn7f.js";import{I as m}from"./InputError-Cvw9P8BV.js";import{I as c}from"./InputLabel-C9gmeYos.js";import{P as j}from"./PrimaryButton-CGYOI5sv.js";import{T as g}from"./TextInput-DoKtSoW0.js";import{A as k}from"./ApplicationLogo-xiXgMLcC.js";function w({className:s="",...a}){return e.jsx("input",{...a,type:"checkbox",className:"rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800 "+s})}function F({status:s,canResetPassword:a}){const{data:t,setData:o,post:u,errors:d,reset:x}=p({email:"",password:"",remember:!1});n.useEffect(()=>()=>{x("password")},[]);const[i,f]=n.useState(!1),h=r=>{r.preventDefault(),u(route("login"))};return e.jsxs(y,{children:[e.jsx(b,{title:"Log in"}),e.jsx("div",{className:"flex items-center justify-center",children:e.jsxs("div",{className:`w-full max-w-sm p-3 rounded-lg  bg-neutral-50 dark:bg-gray-900 
                                 
                          text-gray-900 dark:text-white transition-all duration-300`,children:[e.jsx(k,{className:"w-72 h-40 fill-current text-gray-500"}),e.jsx("div",{className:"mb-6 text-center",children:e.jsx("p",{className:"text-lg font-extrabold  text-gray-900 dark:text-gray-300",children:"Gain experience. Build your career."})}),s&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-300",children:s}),e.jsxs("form",{onSubmit:h,className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx(c,{htmlFor:"email",value:"Email"}),e.jsx(g,{id:"email",type:"email",name:"email",value:t.email,className:"w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ",autoComplete:"username",isFocused:!0,onChange:r=>o("email",r.target.value),placeholder:"Enter your email"}),e.jsx(m,{message:d.email,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(c,{htmlFor:"password",value:"Password"}),e.jsxs("div",{className:"relative",children:[e.jsx(g,{id:"password",type:i?"text":"password",name:"password",value:t.password,className:"w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ",autoComplete:"current-password",onChange:r=>o("password",r.target.value),placeholder:"Enter your password"}),e.jsx("button",{type:"button",onClick:()=>f(!i),className:"absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5",children:i?"Hide":"Show"})]}),e.jsx(m,{message:d.password,className:"mt-2"})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("label",{className:"flex items-center text-gray-100 dark:text-gray-300",children:[e.jsx(w,{name:"remember",checked:t.remember,onChange:r=>o("remember",r.target.checked)}),e.jsx("span",{className:"ms-2 text-sm text-gray-900 dark:text-blue-400",children:"Remember me"})]}),a&&e.jsx(l,{href:route("password.request"),className:"text-sm text-gray-900 dark:text-blue-400 hover:underline",children:"Forgot password?"})]}),e.jsxs("div",{className:"flex flex-col space-y-4",children:[e.jsx(j,{className:"w-full bg-gray-900 text-indigo-600 dark:bg-indigo-500 dark:text-white hover:bg-gray-200 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 focus:bg-gray-800 dark:focus:bg-indigo-600 flex items-center justify-center",children:"Log in"}),e.jsx("div",{className:"text-center",children:e.jsxs("span",{className:"text-sm text-blue-400 dark:text-gray-300",children:["New here?"," ",e.jsx(l,{href:route("register"),className:"text-blue-400 dark:text-blue-400 font-medium hover:underline",children:"Create Your Account"})]})})]})]})]})})]})}export{F as default};
