'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });






// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
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



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}

/**
 * Typing animation logic
 */
const words = ["AI Systems", "LLM Pipelines", "Full-Stack Apps", "Automation Workflows"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const typingText = document.querySelector(".typing-text");
  if (!typingText) return;

  const currentWord = words[wordIndex];
  const fullText = "I build " + currentWord;
  
  if (isDeleting) {
    typingText.textContent = fullText.substring(0, charIndex--);
  } else {
    typingText.textContent = fullText.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex > fullText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000); // Wait at end
  } else if (isDeleting && charIndex === 8) { // "I build " length
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}

/**
 * AI Chat Demo Logic
 */
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");
const chatMessages = document.getElementById("chat-messages");

const responses = {
  "tech stack": "Abdul's core stack includes Next.js, React, FastAPI, Node.js, and PostgreSQL. He also uses Python for most AI/ML tasks.",
  "skills": "He specializes in AI Systems (LLMs, RAG), Full-Stack development, and Automation workflows (n8n).",
  "legiflow": "Legiflow is an AI legal document pipeline Abdul built at Devsarch using Gemini and Vector DBs. It reduced processing time by 90%!",
  "contact": "You can reach Abdul at abasita33@gmail.com or through the Contact tab.",
  "hire": "Abdul is open to Associate or Mid-level roles in AI/Full-stack Engineering. Check out his Resume tab for details!",
  "education": "He holds a BSc in Software Engineering from Lahore Garrison University (CGPA 3.06)."
};

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleChat() {
  const userText = chatInput.value.trim().toLowerCase();
  if (!userText) return;

  addMessage(chatInput.value, "user");
  chatInput.value = "";

  // Fake "typing" delay
  setTimeout(() => {
    let response = "That's a great question! Abdul is passionate about that. You should check his Projects or Resume for more specifics.";
    
    for (const key in responses) {
      if (userText.includes(key)) {
        response = responses[key];
        break;
      }
    }
    
    addMessage(response, "system");
  }, 600);
}

if (chatSend) {
  chatSend.addEventListener("click", handleChat);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleChat();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
  observeImpact();
  
  // Scroll Progress
  const scrollProgress = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = progress + "%";
  });

  // Copy Email
  const copyBtn = document.getElementById("copy-email");
  const copyText = document.getElementById("copy-text");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("abasita33@gmail.com").then(() => {
        copyText.textContent = "Email Copied!";
        setTimeout(() => {
          copyText.textContent = "Copy Email";
        }, 2000);
      });
    });
  }
});

/**
 * Impact Counter Animation
 */
function observeImpact() {
  const counters = document.querySelectorAll(".impact-number");
  const options = { threshold: 0.5 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  counters.forEach(counter => observer.observe(counter));
}

function startCounter(el) {
  const target = +el.dataset.target;
  const suffix = el.querySelector("span").outerHTML;
  let current = 0;
  const increment = target / 50;

  const update = () => {
    current += increment;
    if (current < target) {
      el.innerHTML = Math.ceil(current) + suffix;
      setTimeout(update, 30);
    } else {
      el.innerHTML = target + suffix;
    }
  };
  update();
}

/**
 * Project Modal functionality
 */
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalIcon = document.getElementById("modal-icon");
const modalProblem = document.getElementById("modal-problem");
const modalSolution = document.getElementById("modal-solution");
const modalImpact = document.getElementById("modal-impact");
const modalTech = document.getElementById("modal-tech");
const modalLink = document.getElementById("modal-link");

const projectModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add event to all project items
const modalBtns = document.querySelectorAll("[data-modal-btn]");

for (let i = 0; i < modalBtns.length; i++) {
  modalBtns[i].addEventListener("click", function () {
    const data = this.dataset;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalIcon.setAttribute("name", data.icon);
    modalProblem.textContent = data.problem;
    modalSolution.textContent = data.solution;
    modalImpact.textContent = data.impact;
    modalLink.setAttribute("href", data.link);

    // handle tech tags
    modalTech.innerHTML = "";
    const tags = data.tech.split(",");
    tags.forEach(tag => {
      const span = document.createElement("span");
      span.classList.add("tech-tag");
      span.textContent = tag.trim();
      modalTech.appendChild(span);
    });

    projectModalFunc();
  });
}

// add event to close button and overlay
modalCloseBtn.addEventListener("click", projectModalFunc);
overlay.addEventListener("click", projectModalFunc);