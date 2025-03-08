import{j as e,$ as a,r as m,L as p}from"./app-BQOZl2BO.js";import{y as u,V as h,W as g,X as j}from"./index-CcyPS-_5.js";import{A as y,u as b}from"./AuthenticatedLayout-DqdaXiHp.js";import"./ApplicationLogo-BJqtGEMD.js";import"./transition-C4U-Xi44.js";function f(){return e.jsxs("div",{className:"text-center py-8 bg-blue-500 text-white",children:[e.jsx("h1",{className:"text-4xl md:text-5xl font-extrabold leading-tight",children:"Take Your Career to the Next Level with Kyeeyo!"}),e.jsx("p",{className:"mt-4 text-xl md:text-2xl",children:"Showcase your projects to top construction companies, and build a powerful portfolio."})]})}function v(){return e.jsxs("div",{className:"p-6 bg-white dark:bg-gray-800 shadow-md",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-200 leading-relaxed",children:"Projects not only provide valuable opportunities for technicians to showcase their skills and expertise but also serve as a stepping stone for career growth. By taking part in diverse projects, technicians gain hands-on experience, improve their problem-solving abilities, and build a strong portfolio. As a technician, engaging in a variety of construction projects enhances your credibility, expands your professional network, and increases your chances of securing more lucrative and impactful job opportunities."}),e.jsx("p",{className:"text-gray-700 dark:text-gray-200 leading-relaxed mt-4",children:"Whether you're working on large-scale projects or smaller, specialized ones, every project offers a chance to refine your craft and stand out in a competitive job market. Kyeeyo Connect makes it easier than ever to access top construction projects and build a solid reputation as a skilled professional in your field."}),e.jsx("div",{className:"text-center mt-8",children:e.jsx(a,{href:route("projects.create"),className:"inline-block bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300",children:"Add Your Project"})})]})}function C({auth:i,permissions:o,avator:n,projects:l}){const[s,c]=m.useState(null),{can:d}=b(o),x=t=>{c(s===t?null:t)};return e.jsxs(y,{user:i.user,permissions:o,avator:n,children:[e.jsx(p,{title:"Projects"}),e.jsx("div",{className:"py-2",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsx("div",{className:"bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("div",{className:"text-gray-900 dark:text-gray-100",children:[e.jsx(f,{}),e.jsx(v,{})]})}),e.jsx("div",{className:"mt-6 border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4",children:e.jsx("div",{className:"space-y-4",children:l.map((t,r)=>e.jsxs("div",{className:"border-b border-gray-300 dark:border-gray-700",children:[e.jsx("div",{className:"flex justify-between items-center",children:d("Update Project")&&e.jsxs(a,{href:route("projects.edit",t.id),className:"inline-flex items-center text-blue-500 dark:text-green-500 hover:text-blue-700 dark:hover:text-green-300 transition",children:[e.jsx(u,{className:"mr-2"}),e.jsx("span",{children:"Update Project Details"})]})}),e.jsxs("button",{onClick:()=>x(r),className:"w-full text-left px-4 py-3 font-semibold text-xl text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none flex items-center justify-between",children:[e.jsx("span",{children:t.title}),e.jsx("span",{children:s===r?e.jsx(h,{size:20}):e.jsx(g,{size:20})})]}),s===r&&e.jsx("div",{className:"px-4 py-2 text-gray-700 dark:text-gray-200",dangerouslySetInnerHTML:{__html:t.description}}),e.jsx("div",{className:"px-4 py-2",children:e.jsxs(a,{href:route("projects.gallery",{id:t.id}),className:"inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200",children:[e.jsx(j,{className:"mr-2"}),"View ",t.title," Gallery"]})})]},r))})})]})})]})}export{C as default};
