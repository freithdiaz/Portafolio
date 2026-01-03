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
      // spawn particles from each char bounding box
      setTimeout(() => {
        const rects = [];
        spans.forEach(s => {
          const r = s.getBoundingClientRect();
          rects.push(r);
        });
        // compute canvas offset
        const canvasRect = canvas ? canvas.getBoundingClientRect() : { left:0, top:0 };
        spans.forEach((s, i) => {
          const r = rects[i];
          if (!r) return;
          const cx = r.left - canvasRect.left + r.width/2;
          const cy = r.top - canvasRect.top + r.height/2;
          // use computed color or neon
          const color = getComputedStyle(typedEl).color || '#64f0ff';
          spawnParticles(cx, cy, color, 6 + Math.floor(Math.random()*18));
        });
      }, 120);

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

/* Particle dust canvas for disintegration */
const canvas = document.getElementById('dust-canvas');
let ctx, particles = [];
function resizeCanvas() {
  if (!canvas) return;
  canvas.width = canvas.clientWidth * devicePixelRatio;
  canvas.height = canvas.clientHeight * devicePixelRatio;
  ctx = canvas.getContext('2d');
  ctx.scale(devicePixelRatio, devicePixelRatio);
}

if (canvas) {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function spawnParticles(x, y, color, count = 24) {
    for (let i = 0; i < count; i++) {
      particles.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 2.6,
        vy: -Math.random() * 2 - Math.random() * 1.2,
        life: 800 + Math.random() * 900,
        born: performance.now(),
        size: 1 + Math.random() * 3,
        color: color || '#64f0ff',
      });
    }
  }

  function animateParticles(now) {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio);
    particles = particles.filter(p => (now - p.born) < p.life);
    particles.forEach(p => {
      const t = (now - p.born) / p.life;
      p.x += p.vx * 1.2;
      p.y += p.vy * (1 + t*1.6) + t * 0.6;
      p.vy += 0.03; // gravity
      const alpha = 1 - t;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
  }

  requestAnimationFrame(animateParticles);
}

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

/* Simple local chatbot widget (rule-based FAQ). */
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.getElementById('chat-toggle');
  const widget = document.getElementById('chat-widget');
  const closeBtn = document.getElementById('chat-close');
  const botFloat = document.getElementById('bot-float');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');

  if (!widget || !form || !input || !messages) return;

  function appendMessage(text, who='bot'){
    const el = document.createElement('div');
    el.className = 'chat-msg ' + (who === 'user' ? 'user' : 'bot');
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  const faqs = [
    {q:['hola','buenas','buen día','buenas tardes','buenas noches'], a:'¡Hola! Soy el asistente. ¿En qué puedo ayudarte hoy?'},
    {q:['proyectos','trabajos','portfolio','portafolio'], a:'Puedes ver mis proyectos en la sección "Proyectos" o visitar mis repositorios en GitHub.'},
    {q:['contratar','colaborar','trabajar'], a:'Interesante — puedes escribirme por WhatsApp o enviar un correo desde la sección de contacto.'},
    {q:['tecnologías','stack','tecnologias'], a:'Trabajo con Python, Flask, OpenCV, JavaScript, React Native y despliegue en GitHub Pages.'},
    {q:['precio','tarifa','costo'], a:'Las tarifas dependen del alcance. Escríbeme los requerimientos y preparo una propuesta.'},
    {q:['cv','curriculum','hoja de vida'], a:'Puedes descargar mi portafolio/CV desde la sección de experiencia si está disponible.'}
  ];

  function botReplyFor(message){
    const text = message.toLowerCase();
    for (const item of faqs){
      for (const key of item.q){
        if (text.includes(key)) return item.a;
      }
    }
    // fallback: suggest contact or search
    return "Lo siento, no estoy seguro. ¿Quieres que te conecte con mi WhatsApp o prefieres ver proyectos relacionados?";
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      widget.classList.toggle('open');
      const isOpen = widget.classList.contains('open');
      widget.setAttribute('aria-hidden', !isOpen);
      if (isOpen) input.focus();
    });
  }
  // open chat when clicking the bot floating icon
  if (botFloat) {
    botFloat.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = widget.classList.toggle('open');
      widget.setAttribute('aria-hidden', !isOpen);
      if (isOpen) input.focus();
    });
  }
  closeBtn.addEventListener('click', () => {
    widget.classList.remove('open');
    widget.setAttribute('aria-hidden', 'true');
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widget.classList.contains('open')) {
      widget.classList.remove('open');
      widget.setAttribute('aria-hidden', 'true');
    }
  });

  // Close when clicking outside the widget
  document.addEventListener('click', (e) => {
    if (!widget.classList.contains('open')) return;
    const withinWidget = widget.contains(e.target) || (botFloat && botFloat.contains(e.target));
    if (!withinWidget) {
      widget.classList.remove('open');
      widget.setAttribute('aria-hidden', 'true');
    }
  });

  // seed greeting
  appendMessage('Hola — puedo responder preguntas sobre mi trabajo, tecnologías y cómo contactarme.');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    appendMessage(val, 'user');
    input.value = '';

    // simulate thinking
    appendMessage('...', 'bot');
    setTimeout(() => {
      // remove the '...' placeholder
      const last = Array.from(messages.querySelectorAll('.chat-msg.bot')).pop();
      if (last && last.textContent === '...') last.remove();

      const reply = botReplyFor(val);
      appendMessage(reply, 'bot');
    }, 600 + Math.floor(Math.random()*600));
  });

  // OPTIONAL: function to forward to external AI API (server-side required to keep API key secret)
  window.chatbotFetchRemote = async function(message){
    // Example placeholder: POST to your server endpoint which calls OpenAI/other AI and returns text
    // return fetch('/.netlify/functions/chat', { method: 'POST', body: JSON.stringify({ message }) }).then(r=>r.json()).then(j=>j.text);
    throw new Error('No remote chat endpoint configured. Implement server-side proxy to use a remote AI.');
  };
});
