   function toggleMenu() {
     if (sideMenu.className.indexOf("menu_closed") >= 0) {
       openMenu(); 
     } else {
       closeMenu(); 
     }
   }

   function openMenu() {
     sideMenu.classList.remove("menu_closed"); 
     sideMenu.classList.add("menu_open");
   }

   function closeMenu() {
     sideMenu.classList.add("menu_closed"); 
     sideMenu.classList.remove("menu_open");
   } 

   