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
    // Pause on full phrase, then run disintegration (Thanos-like)
    setTimeout(() => {
      const text = typedEl.textContent || current;
      typedEl.innerHTML = '';
      const chars = Array.from(text);
      const spans = chars.map((ch, i) => {
        const s = document.createElement('span');
        s.textContent = ch === ' ' ? '\u00A0' : ch;
        s.className = 'disintegrate';
        // staggered delay: small random jitter + index offset
        const delay = i * 35 + Math.floor(Math.random() * 80);
        s.style.animationDelay = delay + 'ms';
        typedEl.appendChild(s);
        return s;
      });

      // wait for last animation (approx max delay + duration)
      const maxDelay = chars.length * 35 + 160;
      setTimeout(() => {
        // clear and prepare next phrase
        typedEl.innerHTML = '';
        charIndex = 0;
        tIndex = (tIndex + 1) % phrases.length;
        setTimeout(typeNext, 200);
      }, maxDelay + 900);
    }, 900);
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
