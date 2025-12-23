import React from "react";

const ProfilePage : React.FC = () => {

    return (
        <>
             <section aria-labelledby="profile-section">
      <h2 id="profile-section">Profile</h2>

      <figure>
        <img src="images/photo_profile.png" alt="Photo de profil" width="180"/>
        <figcaption>Photo de profil</figcaption>
      </figure>

      <div className="user-info">
        <p><strong>Nom :</strong> <span data-user-name="Ali Rafiki">Ali Rafiki</span></p>
        <p><strong>Rôle :</strong> <span data-user-role="administrateur">Administrateur</span></p>
        <p><strong>Email :</strong> <span data-user-email="ali.rafiki@example.com">Ali.Rafiki@example.com</span></p>
        <p><strong>Téléphone :</strong> <span data-user-phone="+212 6 12 34 56 78">+212 6 12 34 56 78</span></p>
        <p><strong>Statut :</strong> <span data-user-status="actif">Actif</span></p>
      </div>

      <details>
        <summary>Compétences</summary>
        <ul>
          <li>Gestion de projet</li>
          <li>Coordination d'équipe</li>
          <li>Maintenance</li>
        </ul>
      </details>
    </section>
        </>
    )
}

export default ProfilePage;