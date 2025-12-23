import React from "react";

const HomePage:React.FC = () => {
    return (
        <>
            <section aria-labelledby="presentation">
      <h2 id="presentation">Présentation de Taskme</h2>
      <p>Taskme est une application web conçue pour améliorer la collaboration en entreprise en gérant l’affectation des tâches.</p>
      <ul>
        <li>Accepter une tâche</li>
        <li>Refuser une tâche</li>
        <li>Déléguer une tâche</li>
      </ul>
    </section>

    <section aria-labelledby="features">
      <h2 id="features">Fonctionnalités principales</h2>
      <article>
        <ol>
          <li>Chat interne</li>
          <li>Parc véhicules</li>
          <li>Tableau de bord</li>
        </ol>
      </article>

      <figure>
        <img src="images/taskme.png" alt="Illustration de Taskme" width="600"/>
        <figcaption>Exemple d’interface Taskme</figcaption>
      </figure>
    </section>
        </>
    )
}

export default HomePage;