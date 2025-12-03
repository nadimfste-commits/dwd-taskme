// TaskMe – Logique de gestion des tâches

let currentEditId = null;

// Charger les tâches au chargement de la page

document.addEventListener("DOMContentLoaded", () => {
  displayTasks();

  const btn = document.getElementById("btn-submit");
  if (btn) {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      createOrUpdateTask(currentEditId);
    });
  }
});


// Créer ou Mettre à jour une tâche

const createOrUpdateTask = (id) => {
  // 1. Récupérer les valeurs du formulaire
  const taskName = document.getElementById("taskName").value.trim();
  const description = document.getElementById("description").value.trim();
  const dueDate = document.getElementById("dueDate").value;
  const remuneration = document.getElementById("remuneration").value;
  const vehicle = document.getElementById("vehicle").checked ? "oui" : "non";
  const mode = document.getElementById("mode").value;
  const taskStatus = document.getElementById("status").value;

  // 2. Valider les champs obligatoires
  if (!taskName || !description || !dueDate) {
    showNotification("Veuillez remplir les champs obligatoires !","warning");
    return;
  }

  // 3. Construire l’objet tâche
  const task = {
    id: id ? id : crypto.randomUUID(),
    taskName,
    description,
    dueDate,
    remuneration,
    vehicle,
    mode,
    taskStatus
  };

  // 4. Récupérer les tâches depuis localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // 5. CRÉER ou METTRE À JOUR
  if (!id) {
    // CRÉATION
    tasks.push(task);
    showNotification("Tâche ajoutée avec succès !","success");
  } else {
    // MISE À JOUR
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = task;
      showNotification("Tâche mise à jour avec succès !","success");
    }
  }

  // 6. Enregistrer les modifications
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // 7. Réinitialiser le formulaire
  document.querySelector("form").reset();
  currentEditId = null;

  // 8. Réinitialiser le texte du bouton
  document.getElementById("btn-submit").textContent = "Ajouter";

  // 9. Rafraîchir l’affichage
  displayTasks();
};


// Afficher toutes les tâches

const displayTasks = () => {
  const tbody = document.getElementById("taskTableBody");
  tbody.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    const row = `
      <tr>
        <td>${task.taskName}</td>
        <td>${task.description}</td>
        <td>${task.dueDate}</td>
        <td>${task.taskStatus}</td>
        <td>
          <button onclick="editTask('${task.id}')">Éditer</button>
          <button onclick="deleteTask('${task.id}')">Supprimer</button>
        </td>
      </tr>
    `;

    tbody.insertAdjacentHTML("beforeend", row);
  });
};


// Éditer une tâche

const editTask = (id) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let task = tasks.find(t => t.id === id);

  if (!task) return showNotification("Tâche introuvable");

  // Remplir le formulaire avec les données de la tâche
  document.getElementById("taskName").value = task.taskName;
  document.getElementById("description").value = task.description;
  document.getElementById("dueDate").value = task.dueDate;
  document.getElementById("remuneration").value = task.remuneration;
  document.getElementById("vehicle").value = task.vehicle;
  document.getElementById("mode").checked = task.mode === "oui";
  document.getElementById("status").value = task.taskStatus;

  // Changer le texte du bouton en “Mettre à jour”
  document.getElementById("btn-submit").textContent = "Mettre à jour";

  // Enregistrer l’ID en mémoire
  currentEditId = task.id;

  // Faire défiler jusqu’au formulaire
  document.querySelector("form").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
};


// Supprimer une tâche

const deleteTask = (id) => {
  showConfirmModal(
    "Voulez-vous vraiment supprimer cette tâche ?",
    () => deletetheTask(id)
  );
};

const deletetheTask = (id) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.filter(t => t.id !== id);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  showNotification("Tâche supprimée avec succès !","success");
  displayTasks();
};
