// Configuración de reemplazos de emojis a iconos Bootstrap
const replacements = {
  // Logo del mouse
  '🖱️': '<i class="bi bi-mouse"></i>',
  
  // Botón de tema
  '🌗': '<i class="bi bi-moon-stars-fill"></i>',
  
  // Íconos de secciones
  '🎯': '<i class="bi bi-bullseye"></i>',
  '🧪': '<i class="bi bi-flask"></i>',
  '💻': '<i class="bi bi-laptop"></i>',
  '⚡': '<i class="bi bi-lightning-charge"></i>',
  '📋': '<i class="bi bi-clipboard-check"></i>',
  '📊': '<i class="bi bi-bar-chart"></i>',
  '🚀': '<i class="bi bi-rocket-takeoff"></i>',
  '👥': '<i class="bi bi-people"></i>',
  '🔄': '<i class="bi bi-arrow-repeat"></i>',
  '📈': '<i class="bi bi-graph-up"></i>',
  '🔔': '<i class="bi bi-bell"></i>',
  '📱': '<i class="bi bi-phone"></i>',
  '🔋': '<i class="bi bi-battery-charging"></i>',
  '🎬': '<i class="bi bi-play-circle"></i>',
  '📄': '<i class="bi bi-file-earmark-text"></i>',
  '📝': '<i class="bi bi-pencil-square"></i>',
  '⚙️': '<i class="bi bi-gear"></i>',
  '🔍': '<i class="bi bi-search"></i>',
  '📂': '<i class="bi bi-folder"></i>',
  '📁': '<i class="bi bi-folder"></i>',
  '📌': '<i class="bi bi-pin-angle"></i>',
  '🔗': '<i class="bi bi-link"></i>',
  '📎': '<i class="bi bi-paperclip"></i>',
  '📅': '<i class="bi bi-calendar"></i>',
  '⏱️': '<i class="bi bi-stopwatch"></i>',
  '📏': '<i class="bi bi-rulers"></i>',
  '📐': '<i class="bi bi-ruler"></i>',
  '📊': '<i class="bi bi-bar-chart"></i>',
  '📈': '<i class="bi bi-graph-up"></i>',
  '📉': '<i class="bi bi-graph-down"></i>',
  '📋': '<i class="bi bi-clipboard"></i>',
  '📑': '<i class="bi bi-bookmark"></i>',
  '📄': '<i class="bi bi-file-earmark"></i>',
  '📝': '<i class="bi bi-pencil"></i>',
  '📌': '<i class="bi bi-pin"></i>',
  '📎': '<i class="bi bi-paperclip"></i>',
  '📁': '<i class="bi bi-folder"></i>',
  '📂': '<i class="bi bi-folder2-open"></i>',
  '📅': '<i class="bi bi-calendar"></i>',
  '⏰': '<i class="bi bi-alarm"></i>',
  '🔔': '<i class="bi bi-bell"></i>',
  '🔍': '<i class="bi bi-search"></i>',
  '🔎': '<i class="bi bi-zoom-in"></i>',
  '📱': '<i class="bi bi-phone"></i>',
  '💻': '<i class="bi bi-laptop"></i>',
  '⌨️': '<i class="bi bi-keyboard"></i>',
  '🖱️': '<i class="bi bi-mouse"></i>',
  '🖥️': '<i class="bi bi-display"></i>',
  '💾': '<i class="bi bi-save"></i>',
  '📀': '<i class="bi bi-disc"></i>',
  '📷': '<i class="bi bi-camera"></i>',
  '📹': '<i class="bi bi-camera-video"></i>',
  '🎥': '<i class="bi bi-camera-reels"></i>',
  '📺': '<i class="bi bi-tv"></i>',
  '📻': '<i class="bi bi-radio"></i>',
  '🎙️': '<i class="bi bi-mic"></i>',
  '🎚️': '<i class="bi bi-sliders"></i>',
  '🎛️': '<i class="bi bi-sliders2"></i>',
  '🔊': '<i class="bi bi-volume-up"></i>',
  '🔉': '<i class="bi bi-volume-down"></i>',
  '🔇': '<i class="bi bi-volume-mute"></i>',
  '🔔': '<i class="bi bi-bell"></i>',
  '📢': '<i class="bi bi-bell"></i>',
  '📣': '<i class="bi bi-megaphone"></i>',
  '📯': '<i class="bi bi-bell"></i>',
  '🔔': '<i class="bi bi-bell"></i>',
  '🎵': '<i class="bi bi-music-note"></i>',
  '🎶': '<i class="bi bi-music-note-list"></i>',
  '🎼': '<i class="bi bi-music-note-beamed"></i>',
  '🎤': '<i class="bi bi-mic"></i>',
  '🎧': '<i class="bi bi-headphones"></i>',
  '🎷': '<i class="bi bi-music-note"></i>',
  '🎸': '<i class="bi bi-guitar"></i>',
  '🎺': '<i class="bi bi-music-note"></i>',
  '🎻': '<i class="bi bi-music-note"></i>',
  '🥁': '<i class="bi bi-drum"></i>',
  '🎲': '<i class="bi bi-dice-6"></i>',
  '🎯': '<i class="bi bi-bullseye"></i>',
  '🎳': '<i class="bi bi-bowling-ball"></i>',
  '🎮': '<i class="bi bi-joystick"></i>',
  '🎰': '<i class="bi bi-coin"></i>',
  '🎲': '<i class="bi bi-dice-6"></i>'
};

// Archivos a actualizar
const filesToUpdate = [
  'semana16/index.html',
  'semana14/index.html',
  'semana12/index.html',
  'semana10/index.html',
  'semana08/index.html',
  'semana06/index.html',
  'semana04/index.html',
  'semana02/index.html',
  'innovacion/index.html',
  'index.html'
];

// Función para reemplazar emojis
function replaceEmojis(content) {
  let newContent = content;
  Object.entries(replacements).forEach(([emoji, icon]) => {
    const regex = new RegExp(emoji, 'g');
    newContent = newContent.replace(regex, icon);
  });
  return newContent;
}

// Asegurar que el CDN de Bootstrap Icons esté presente
function ensureBootstrapIcons(content) {
  const bootstrapIconsLink = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">';
  
  if (!content.includes('bootstrap-icons.css')) {
    // Insertar después del último meta tag o title
    content = content.replace(
      /(<meta[^>]*>|\s*<title>[\s\S]*?<\/title>\s*)(?=<link|\s*<style|\s*<script|\s*<\/head>)/i,
      `$1\n    ${bootstrapIconsLink}`
    );
  }
  
  return content;
}

// Actualizar archivos
const fs = require('fs');
const path = require('path');

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Asegurar Bootstrap Icons
      content = ensureBootstrapIcons(content);
      
      // Reemplazar emojis
      content = replaceEmojis(content);
      
      // Solo guardar si hubo cambios
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Actualizado: ${file}`);
      } else {
        console.log(`ℹ️  Sin cambios: ${file}`);
      }
    } catch (error) {
      console.error(`❌ Error al procesar ${file}:`, error.message);
    }
  } else {
    console.warn(`⚠️  Archivo no encontrado: ${file}`);
  }
});

console.log('\n✅ Proceso completado. Todos los emojis han sido reemplazados por iconos de Bootstrap.');
