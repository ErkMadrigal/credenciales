const fs = require('fs');

const empleado = {
  nombre: "JUAN PÉREZ LÓPEZ",
  cargo: "GUARDIA",
  curp: "PEPJ800101HDFLLR01",
  nss: "12345678901",
  sangre: "O+",
  alergias: "NINGUNA",
  expedicion: "2025-01-01",
  vigencia: "2026-01-01",
  telefono: "56-10-07-48-09",
  correo: "gestion@gestoriapermisos.com",
  foto: "./foto.jpg",
};

// Contenido del SVG
const svgContent = `
<svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
  <!-- Fondo -->
  <rect width="400" height="250" fill="#f0f0f0" rx="10" ry="10"/>
  
  <!-- Título -->
  <text x="20" y="30" font-family="Arial" font-size="16" font-weight="bold" fill="#333">CREDENCIAL DE EMPLEADO</text>
  
  <!-- Foto -->
  <image x="20" y="50" width="100" height="100" href="${empleado.foto}"/>
  
  <!-- Información -->
  <text x="140" y="60" font-family="Arial" font-size="12" fill="#333">Nombre: ${empleado.nombre}</text>
  <text x="140" y="80" font-family="Arial" font-size="12" fill="#333">Cargo: ${empleado.cargo}</text>
  <text x="140" y="100" font-family="Arial" font-size="12" fill="#333">CURP: ${empleado.curp}</text>
  <text x="140" y="120" font-family="Arial" font-size="12" fill="#333">NSS: ${empleado.nss}</text>
  <text x="140" y="140" font-family="Arial" font-size="12" fill="#333">Tipo de sangre: ${empleado.sangre}</text>
  <text x="140" y="160" font-family="Arial" font-size="12" fill="#333">Alergias: ${empleado.alergias}</text>
  <text x="140" y="180" font-family="Arial" font-size="12" fill="#333">Expedición: ${empleado.expedicion}</text>
  <text x="140" y="200" font-family="Arial" font-size="12" fill="#333">Vigencia: ${empleado.vigencia}</text>
  <text x="140" y="220" font-family="Arial" font-size="12" fill="#333">Teléfono: ${empleado.telefono}</text>
  <text x="140" y="240" font-family="Arial" font-size="12" fill="#333">Correo: ${empleado.correo}</text>
</svg>
`;

// Escribir el archivo SVG
fs.writeFileSync('credencial.svg', svgContent, (err) => {
  if (err) {
    console.error('Error al escribir el archivo SVG:', err);
  } else {
    console.log('Archivo SVG generado exitosamente: credencial.svg');
  }
});