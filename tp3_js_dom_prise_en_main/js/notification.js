// notifications.js
function showNotification(message, type = 'info', duration = 3000) {
  const container = document.getElementById('notification-container');
  if (!container) return;

  const notification = document.createElement('div');
  notification.classList.add('notification', type);
  notification.textContent = message;
  container.appendChild(notification);

  // Limiter à 3 notifications
  while (container.children.length > 3) {
    container.removeChild(container.firstChild);
  }

  // Disparition automatique après la durée définie
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s forwards';
    notification.addEventListener('animationend', () => {
      notification.remove();
    });
  }, duration);
}



function showConfirmModal(message, onConfirm) {
  // 1. Créer les éléments du modal
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const msg = document.createElement("p");
  msg.textContent = message;

  const btnConfirm = document.createElement("button");
  btnConfirm.textContent = "Oui";
  btnConfirm.classList.add("confirm-btn");

  const btnCancel = document.createElement("button");
  btnCancel.textContent = "Non";
  btnCancel.classList.add("cancel-btn");

  // 2. Ajouter les éléments au DOM
  modalContent.appendChild(msg);
  modalContent.appendChild(btnConfirm);
  modalContent.appendChild(btnCancel);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // 3. Ajouter les écouteurs d'événements
  btnConfirm.addEventListener("click", () => {
    if (typeof onConfirm === "function") {
      onConfirm();  // exécuter la fonction de rappel
    }
    modal.remove(); // supprimer le modal
  });

  btnCancel.addEventListener("click", () => modal.remove());

  // Fermer le modal si clic en dehors du contenu
  modal.addEventListener("click", (event) => {
    if (!modalContent.contains(event.target)) {
      modal.remove();
    }
  });
}
