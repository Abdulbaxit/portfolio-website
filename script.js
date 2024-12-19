// Scroll to top functionality
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerText = "Top";
scrollToTopButton.style.position = "fixed";
scrollToTopButton.style.bottom = "20px";
scrollToTopButton.style.right = "20px";
scrollToTopButton.style.display = "none";
document.body.appendChild(scrollToTopButton);

window.addEventListener("scroll", () => {
  scrollToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
