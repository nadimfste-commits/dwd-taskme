// SIDEBAR TOGGLE
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('open-sidebar');
  const sidebar = document.getElementById('sidebar');
  const main = document.querySelector('.main-content');

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      main.classList.toggle('open');
    });

    // fermer la sidebar si on clique en dehors
    if(main)
    {
        main.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });
    }
  }
});
