const fs = require('fs');
const cheerio = require('cheerio');
const sharp = require('sharp');

// Archivos de entrada y salida
const svgPath = './Credenciales_Laumir.svg';
const imagePath = './foto.png';
const outputSvgPath = './archivo_editado.svg';
const outputPngPath = './credencial_generada.png';

// Leer SVG original
const svgContent = fs.readFileSync(svgPath, 'utf8');

// Leer y codificar imagen en base64
const imageBase64 = fs.readFileSync(imagePath).toString('base64');
const imageMimeType = 'image/png'; // Cambia a image/jpeg si es JPG

// Cargar SVG con cheerio
const $ = cheerio.load(svgContent, { xmlMode: true });

// Asegurar el uso de xlink
$('svg').attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');

// Datos a insertar en el SVG
const valores = {
  text1: "Gerente de Operaciones",
  text2: "CURP123456HDFABC09",
  text3: "98765432100",
  text4: "O+",
  text5: "Ninguna",
  text6: "23/07/2025",
  text7: "23/07/2029",
  text8: "Juan Pérez",
  text9: "Hermano",
  text10: "55 1234 5678",
  text11: "Carlos Eduardo Martínez"
};

// Reemplazar los textos por ID
for (const id in valores) {
  const tspan = $(`#${id}`).find('tspan');
  if (tspan.length) {
    tspan.text(valores[id]);
  } else {
    console.warn(`⚠️ No se encontró el elemento con ID: ${id}`);
  }
}

// Reemplazar el <rect id="rect11"> con una imagen
const rect = $('#rect11');
if (rect.length) {
  const x = rect.attr('x');
  const y = rect.attr('y');
  const width = rect.attr('width');
  const height = rect.attr('height');

  const imageTag = `
    <image
      id="img1"
      x="${x}"
      y="${y}"
      width="${width}"
      height="${height}"
      xlink:href="data:${imageMimeType};base64,${imageBase64}" />
  `;

  rect.replaceWith(imageTag);
  console.log('✅ Imagen insertada correctamente.');
} else {
  console.warn('⚠️ No se encontró el <rect id="rect11"> para reemplazar.');
}

// Guardar el SVG modificado
const nuevoSvg = $.xml();
fs.writeFileSync(outputSvgPath, nuevoSvg);
console.log('✅ SVG actualizado guardado.');

// Convertir SVG a PNG usando sharp
sharp(Buffer.from(nuevoSvg))
  .resize({ width: 1000 }) // puedes ajustar el tamaño
  .png()
  .toFile(outputPngPath)
  .then(() => {
    console.log(`✅ Imagen PNG generada correctamente en: ${outputPngPath}`);
  })
  .catch(err => {
    console.error('❌ Error al convertir a PNG:', err);
  });
