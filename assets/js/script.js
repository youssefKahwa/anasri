'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// theme toggle (dark by default)
const themeToggleBtn = document.querySelector("[data-theme-toggle]");

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-btn]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event to all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Map for multilingual page navigation
const pageMapping = {
  "about": ["About", "À propos", "حول", "نبذة عني"],
  "resume": ["Resume", "CV", "السيرة الذاتية"],
  "portfolio": ["Portfolio", "الأعمال", "الملف الشخصي"],
  "blog": ["Blog", "المدونة"],
  "contact": ["Contact", "اتصل", "اتصل بي"]
};

// add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const selectedText = this.innerText.trim();

    for (let pageKey in pageMapping) {
      if (pageMapping[pageKey].includes(selectedText)) {
        for (let j = 0; j < pages.length; j++) {
          if (pages[j].dataset.page === pageKey) {
            pages[j].classList.add("active");
            navigationLinks[i].classList.add("active");
            window.scrollTo(0, 0);
          } else {
            pages[j].classList.remove("active");
            navigationLinks[i].classList.remove("active");
          }
        }
        break;
      }
    }
  });
}
// Check URL for anchor (hash) and activate the corresponding section
document.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash.substring(1);  // Get the hash without the "#"
  
  if (hash) {
    for (let pageKey in pageMapping) {
      if (pageKey === hash) {
        for (let j = 0; j < pages.length; j++) {
          if (pages[j].dataset.page === pageKey) {
            pages[j].classList.add("active");
            window.scrollTo(0, 0); // Scroll to the top
          } else {
            pages[j].classList.remove("active");
          }
        }
      }
    }
  }
});

// youtube click-to-play facade (avoids loading multiple iframes upfront)
const youtubeFacades = document.querySelectorAll("[data-youtube-facade]");

for (let i = 0; i < youtubeFacades.length; i++) {
  youtubeFacades[i].addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    const videoId = this.dataset.videoId;
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    iframe.setAttribute("allowfullscreen", "");
    this.innerHTML = "";
    this.appendChild(iframe);
  });
}
