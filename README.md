# Portafolio — Freith Jhoel Diaz Arias

Sitio one-page estático diseñado para publicar en GitHub Pages.

## Descripción

Portafolio personal que muestra perfil, competencias, proyectos (desplegados en GitHub Pages) y contacto. Tema oscuro con acentos cian/azul y efectos sutiles.

## Estructura

- `index.html` — página principal
- `styles.css` — estilos
- `scripts.js` — JavaScript mínimo (scroll suave)
- `assets/` — imágenes y SVG

## Ejecutar localmente

1. Abrir `index.html` en el navegador (basta doble-clic) o levantar un servidor local para evitar problemas con rutas relativas:

```powershell
# desde la carpeta del proyecto
python -m http.server 8000
# luego abrir http://localhost:8000
```

## Publicar en GitHub Pages

1. Ya subí el proyecto al repo remoto: `https://github.com/freithdiaz/Portafolio`.
2. En GitHub: ve a `Settings` → `Pages` → selecciona la rama `main` y la carpeta `/ (root)` como fuente, guarda.
3. Espera unos minutos y el sitio estará disponible en: `https://freithdiaz.github.io/Portafolio/`.

> Alternativa: usar la CLI `gh` para activar Pages si prefieres automatizar.

## Contacto

- Correo: `freithdiaz@gmail.com`
- WhatsApp: `+57 304 216 2719`
- LinkedIn / Instagram / Facebook: enlaces en la página

---

Si quieres, puedo:
- activar GitHub Pages automáticamente usando la CLI `gh` (necesitarás ejecutar un comando o proporcionarme un token),
- generar una versión `CNAME` si quieres un dominio personalizado,
- o añadir badges y meta tags para SEO/OG.