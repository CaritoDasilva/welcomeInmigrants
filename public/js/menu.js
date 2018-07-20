function toggleMenu() {
  if (sideMenu.className.indexOf('menu_closed') >= 0) {
    openMenu();
  } else {
    closeMenu();
  }
}

function openMenu() {
  sideMenu.classList.remove('menu_closed');
  sideMenu.classList.add('menu_open');
}

function closeMenu() {
  sideMenu.classList.add('menu_closed');
  sideMenu.classList.remove('menu_open');
}

// Cambio de páginas
function chatPage() {
  menuContent.classList.remove('show');
  forumPost.classList.add('d-none');
  welcomeUser.classList.remove('d-none');
}

// Cambio de páginas
function forumPage() {
  menuContent.classList.remove('show');
  welcomeUser.classList.add('d-none');
  forumPost.classList.remove('d-none');
}