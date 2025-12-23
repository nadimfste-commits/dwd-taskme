import React from "react"; 
import './Footer.css'; 
 
const Footer: React.FC = ()=>{ 
    return ( 
        <footer className="footer"> 
      <p>Tous droits réservés © 2025 - Taskme</p> 
      <p> 
        <a href="https://example.com/mentions" target="_blank" rel="noopener noreferrer"> 
          Mentions légales 
        </a>{" "} 
        —{" "} 
        <a href="https://example.com/privacy" target="_blank" rel="noopener noreferrer"> 
          Politique de confidentialité 
        </a>{" "} 
        —{" "} 
        <a href="https://example.com/terms" target="_blank" rel="noopener noreferrer"> 
          Conditions d’utilisation 
        </a> 
      </p> 
    </footer> 
    ); 
} 
 
export default Footer;