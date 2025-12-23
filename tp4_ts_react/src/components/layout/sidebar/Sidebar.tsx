import React from "react"; 
import './Sidebar.css' 
 
const Sidebar: React.FC = () => { 
    return ( 
        <aside id="sidebar" className="sidebar"> 
        <h2>Taskme</h2> 
            <ul> 
                <li><a href="/"> Accueil</a></li> 
                <li><a href="/profile"> Profil</a></li> 
                <li><a href="/tasks"> Tâches</a></li> 
            </ul> 
        </aside> 
    ); 
}; 
 
export default Sidebar; 