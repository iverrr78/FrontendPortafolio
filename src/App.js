import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Navbar} from './Components/navbar.components';
import { Blog } from './Views/blog.views';
import { Contacto } from './Views/contacto.views';
import { Home } from './Views/home.views';
import {Projects} from './Views/projects.views'
import { SingleBlog } from './Views/singleblog.views';
import { LogIn } from './Views/login.views';
import { AdminBlog } from './Views/adminblogs.views';
import { AdminCreateBlog } from './Views/admincreateblog.views';
import {AdminProjects} from "./Views/adminprojects.views";
import {AdminStacks} from "./Views/adminstacks.views";
import {AdminCategories} from "./Views/admincategories.views";
import { NavbarAdmin } from './Components/navbaradmin.components';
import { AdminCreateProjects } from './Views/admincreateproject.views';
import {AdminCreateStacks} from './Views/admincreatestacks.views';
import { AdminCreateCategory } from './Views/admincreatecategory.views';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route index element={<Home/>}/>
          <Route path="/proyectos" element={<Projects/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/contacto" element={<Contacto/>}/>
          <Route path="/singleblog" element={<SingleBlog/>}/>
        </Route>
        
        <Route path="login" element={<LogIn/>}/>
        
        <Route path="/admin/*" element ={<NavbarAdmin/>}>
          <Route index element={<AdminProjects/>}/>
          <Route path="adminblogs"   element={<AdminBlog/>}/>
          <Route path="admincategories"   element = {<AdminCategories/>}/>
          <Route path="adminstacks"   element = {<AdminStacks/>}/>
          <Route path="admincreateblog/:slug"   element ={<AdminCreateBlog/>}/>
          <Route path="admincreateproject/:slug"   element = {<AdminCreateProjects/>}/>
          <Route path="admincreatestack/:slug"   element = {<AdminCreateStacks/>}/>
          <Route path="admincreatecategory/:slug"   element = {<AdminCreateCategory/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
