import React from "react";
import './BackToTopBtn.css'

const BackToTopBtn:React.FC = () => {
    return (
        <div className="back-to-top">
            <p><a href="#top">Revenir en haut ↑</a></p>
        </div>
    )
}

export default BackToTopBtn;