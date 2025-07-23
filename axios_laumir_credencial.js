const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const sharp = require('sharp');

// Ruta al archivo SVG y a la imagen externa
const svgPath = './Credenciales_Laumir.svg';
const imageUrl = 'https://labsaenzrenauld.com/wp-content/uploads/2020/10/Perfil-hombre-ba%CC%81sico_738242395.jpg';

// Función principal
async function editarSVG() {
  // Leer el SVG original
  const svgContent = fs.readFileSync(svgPath, 'utf8');

  // Descargar imagen y convertir a Base64
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const imageBuffer = Buffer.from(response.data, 'binary');
  const imageBase64 = imageBuffer.toString('base64');
  const imageMimeType = 'image/jpeg'; // porque la URL apunta a un JPG

  // Cargar SVG en cheerio
  const $ = cheerio.load(svgContent, { xmlMode: true });

  // Asegurar namespace xlink
  $('svg').attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');

  // Datos a insertar
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

  // Reemplazo de textos
  for (const id in valores) {
    const tspan = $(`#${id}`).find('tspan');
    if (tspan.length) {
      tspan.text(valores[id]);
    } else {
      console.warn(`⚠️ No se encontró el elemento con ID: ${id}`);
    }
  }

  // Insertar imagen en lugar del <rect id="rect11">
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

  // Convertir a SVG final
  const svgFinal = $.xml();

  // Guardar archivo SVG editado
  fs.writeFileSync('archivo_editado.svg', svgFinal);
  console.log('✅ SVG actualizado correctamente.');

  // Convertir SVG a PNG con sharp
  await sharp(Buffer.from(svgFinal))
    .png()
    .toFile('credencial_final.png');

  console.log('✅ PNG generado correctamente: credencial_final.png');
}

// Ejecutar
editarSVG().catch(err => {
  console.error('❌ Error:', err);
});
