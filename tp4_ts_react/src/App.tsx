import React, { useEffect, useState } from "react"; 
import './index.css'; 
import Header from "./components/layout/header/Header";
import Sidebar from "./components/layout/sidebar/Sidebar";
import BackToTopBtn from "./components/layout/backToTopBtn/BackToTopBtn";
import Footer from "./components/layout/footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import TaskPage from "./pages/TaskPage";
import { NotificationContext, NotificationItem, NotificationProvider } from "./context/NotificationContext";
 
const App = () => {
  
  const [theme, setTheme] = useState<null | string>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(()=>{
      const savedTheme = localStorage.getItem("theme");
      if(savedTheme) setTheme(savedTheme);
  },[])

  useEffect(()=>{
    theme==='dark'?document.body.classList.add('dark-mode'):document.body.classList.remove('dark-mode') 
    if(theme==='dark' || theme=='light') localStorage.setItem('theme',theme);
  },[theme])


  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    theme==='dark'?setTheme('light'):setTheme('dark')
  }

  useEffect(()=>{
    const sidebar = document.getElementById('sidebar');
    open?sidebar?.classList.add('open'):sidebar?.classList.remove('open');
  },[open]);

  const toggleSidebar = () => {
    setOpen(!open);
  }

  const closeSidebar = () => {
    setOpen(false);
  }




  return ( 
    <>

         <NotificationProvider>
               <BrowserRouter>
              <Header  toggleSidebar={toggleSidebar} theme={theme} toggleTheme={toggleTheme}/>
              <Sidebar/>
              <main onClick={closeSidebar} className="main-content">
                  <Routes>
                      <Route path='/' element={<HomePage/>}/>
                      <Route path='/profile' element={<ProfilePage/>}/>
                      <Route path='/tasks' element={<TaskPage/>}/>
                  </Routes>
              </main>
              <BackToTopBtn/>
              <Footer/>
            </BrowserRouter>
         </NotificationProvider>
   
    </>
  ); 
}
 
export default App; 