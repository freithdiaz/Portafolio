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

/* Typing effect for hero */
const phrases = [
  'Arquitecturas Inteligentes.',
  'Automatizaciones con IA.',
  'Despliegues rápidos y confiables.'
];
const typedEl = document.getElementById('typed');
let tIndex = 0;
let charIndex = 0;

function typeNext() {
  if (!typedEl) return;
  const current = phrases[tIndex];
  typedEl.textContent = current.slice(0, charIndex);
  charIndex++;
  if (charIndex > current.length) {
    setTimeout(() => {
      charIndex = 0;
      tIndex = (tIndex + 1) % phrases.length;
      setTimeout(typeNext, 500);
    }, 1400);
  } else {
    setTimeout(typeNext, 80);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeNext, 600);
});

/* Terminal mock behavior */
const termOut = document.getElementById('terminal-output');
const termInput = document.getElementById('terminal-input');
if (termInput && termOut) {
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = termInput.value.trim();
      if (cmd === '') return;
      if (cmd === 'help') {
        termOut.textContent += '\n$ help\nhelp - show commands\nstack - show tech stack\nclear - clear screen\n';
      } else if (cmd === 'stack') {
        termOut.textContent += '\n$ stack\nPython • Flask • OpenCV • React Native • GitHub Pages\n';
      } else if (cmd === 'clear') {
        termOut.textContent = '';
      } else {
        termOut.textContent += `\n$ ${cmd}\nCommand not found: ${cmd}\n`;
      }
      termInput.value = '';
      termOut.scrollTop = termOut.scrollHeight;
    }
  });
}
