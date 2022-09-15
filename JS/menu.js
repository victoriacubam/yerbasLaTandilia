"use strict"
//MENU RESPONSIVE

let btnMenu = document.querySelector(".btnMenu");
btnMenu.addEventListener("click", toggleMenu);

function toggleMenu(e) {
   e.preventDefault();
   document.querySelector(".navegacion").classList.toggle("mostrar");
}