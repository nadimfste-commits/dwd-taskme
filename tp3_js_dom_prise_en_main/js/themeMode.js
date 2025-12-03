
// 1. Fonction pour basculer le thème
function toggleTheme() {
  // 1. Récupérer l'élément body
  const body = document.body;
  // 2. Toggle la classe 'dark-mode' sur le body
  body.classList.toggle('dark-mode');

  // 3. Récupérer le bouton theme-toggle
  const themeBtn = document.getElementById('theme-toggle');

  // 4. Si dark-mode est actif, changer le texte en "☀️ Mode Clair"
  if (body.classList.contains('dark-mode')) {
    themeBtn.textContent = '☀️ Mode Clair';
    // 6. Sauvegarder la préférence dans localStorage
    localStorage.setItem('theme', 'dark');
  } else {
    // 5. Sinon, changer le texte en "🌙 Mode Sombre"
    themeBtn.textContent = '🌙 Mode Sombre';
    localStorage.setItem('theme', 'light');
  }
}

// 2. Fonction pour charger le thème au démarrage
function loadTheme() {
  // 1. Récupérer la préférence depuis localStorage
  const savedTheme = localStorage.getItem('theme');
  const body = document.body;
  const themeBtn = document.getElementById('theme-toggle');

  // 2. Si le thème est 'dark', appliquer la classe dark-mode
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    // 3. Mettre à jour le texte du bouton
    if (themeBtn) themeBtn.textContent = '☀️ Mode Clair';
  } else {
    // Par défaut ou light
    body.classList.remove('dark-mode');
    if (themeBtn) themeBtn.textContent = '🌙 Mode Sombre';
  }
}

// 3. Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  loadTheme();
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});


