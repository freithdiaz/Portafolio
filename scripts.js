const links = document.querySelectorAll("a[href^='#']");

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  });
});
