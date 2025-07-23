const fs = require('fs');
const cheerio = require('cheerio');
const sharp = require('sharp');
const {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  PageOrientation,
  ImageRun,
  BorderStyle,
} = require('docx');

// Rutas
const svgPath = './Credenciales_Laumir.svg';
const imagePath = './foto.png';
const outputSvgPath = './archivo_editado.svg';
const outputPngPath = './credencial_generada.png';
const outputDocxPath = './credenciales_nuevo4.docx';

// Datos que quieres insertar en el SVG
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

async function generarCredencial() {
  // Leer SVG
  const svgContent = fs.readFileSync(svgPath, 'utf8');

  // Leer imagen y codificar en base64
  const imageBase64 = fs.readFileSync(imagePath).toString('base64');
  const imageMimeType = 'image/png';

  // Cargar SVG
  const $ = cheerio.load(svgContent, { xmlMode: true });

  // Asegurar namespace xlink
  $('svg').attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');

  // Reemplazar textos
  for (const id in valores) {
    const tspan = $(`#${id}`).find('tspan');
    if (tspan.length) {
      tspan.text(valores[id]);
    } else {
      console.warn(`⚠️ No se encontró el elemento con ID: ${id}`);
    }
  }

  // Reemplazar rect por imagen
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
    console.warn('⚠️ No se encontró <rect id="rect11">.');
  }

  // Guardar nuevo SVG
  const nuevoSvg = $.xml();
  fs.writeFileSync(outputSvgPath, nuevoSvg);
  console.log('✅ SVG actualizado guardado.');

  // Convertir SVG a PNG con mayor resolución
  await sharp(Buffer.from(nuevoSvg))
    .png()
    .resize({ width: 1400, height: 1000 }) // Aumentado para máxima nitidez
    .toFile(outputPngPath);
  console.log('✅ PNG generado correctamente.');

  // Crear Word con 4 credenciales
  await crearDocConTarjetas(outputPngPath, outputDocxPath);
  console.log('✅ Word generado con credenciales.');
}

// Función para generar el DOCX
async function crearDocConTarjetas(imagenPath, outputDocx) {
  const imageBuffer = fs.readFileSync(imagenPath);

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: {
            orientation: PageOrientation.LANDSCAPE,
          },
          margin: {
            top: 0,    // Sin márgenes
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      children: [
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ children: [new ImageRun({
                    data: imageBuffer,
                    transformation: { width: Math.round(20 * 28.35), height: Math.round(13.5 * 28.35) },
                  })] })],
                  width: { size: Math.round(20 * 28.35), type: WidthType.DXA }, // Ancho fijo: 14 cm
                  margins: { top: 0, bottom: 0, left: 0, right: 0 },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ children: [new ImageRun({
                    data: imageBuffer,
                    transformation: { width: Math.round(20 * 28.35), height: Math.round(13.5 * 28.35) },
                  })] })],
                  width: { size: Math.round(20 * 28.35), type: WidthType.DXA }, // Ancho fijo: 14 cm
                  margins: { top: 0, bottom: 0, left: 0, right: 0 },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                  },
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ children: [new ImageRun({
                    data: imageBuffer,
                    transformation: { width: Math.round(20 * 28.35), height: Math.round(13.5 * 28.35) },
                  })] })],
                  width: { size: Math.round(20 * 28.35), type: WidthType.DXA }, // Ancho fijo: 14 cm
                  margins: { top: 0, bottom: 0, left: 0, right: 0 },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ children: [new ImageRun({
                    data: imageBuffer,
                    transformation: { width: Math.round(20 * 28.35), height: Math.round(13.5 * 28.35) },
                  })] })],
                  width: { size: Math.round(20 * 28.35), type: WidthType.DXA }, // Ancho fijo: 14 cm
                  margins: { top: 0, bottom: 0, left: 0, right: 0 },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                  },
                }),
              ],
            }),
          ],
          width: { size: Math.round(28 * 28.35), type: WidthType.DXA }, // Ancho total de la tabla: 28 cm
          margins: { top: 0, bottom: 0, left: 0, right: 0 },
        }),
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputDocx, buffer);
}

// Ejecutar
generarCredencial().catch(console.error);