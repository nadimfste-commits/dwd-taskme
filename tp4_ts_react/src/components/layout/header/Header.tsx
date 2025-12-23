import React from "react"; 
import "./Header.css"; 
 
interface AppProps {
    theme: string | null;
    toggleTheme: () => void;
    toggleSidebar: () => void;
}

const Header: React.FC<AppProps> = ({theme, toggleTheme, toggleSidebar}) => { 
  return ( 
    <header className="header"> 
      <button onClick={toggleSidebar} id="open-sidebar" className="sidebar-toggle"> 
        ☰ 
      </button> 
 
      <div className="header-title"> 
        <h1>Taskme</h1> 
        <p>Gérez et affectez des tâches facilement.</p> 
      </div> 
 
      <button onClick={toggleTheme} id="theme-toggle" className="theme-btn"> 
        {theme==='light'?'Mode Sombre':'Mode Clair'} 
      </button> 
    </header> 
  ); 
}; 
 
export default Header; 