// Získání reference k HTML canvas elementu s id 'myCanvas'
let canvas = document.getElementById('myCanvas');

// Získání 2D vykreslovacího kontextu pro canvas
let ctx = canvas.getContext('2d');

// Nastavení barvy výplně na šedou
ctx.fillStyle = '#DCDCDC';

// Vykreslení obdélníka, který pokryje celý canvas touto šedou barvou
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Přidání posluchače událostí k celému dokumentu pro detekci stisku klávesy
document.addEventListener('keydown', function(event) {
    // Kontroluje, zda byla stisknuta klávesa Escape
    if (event.code === 'Escape') {
        // Pokud ano, znovu vykreslí celý canvas šedou barvou
        ctx.fillStyle = '#DCDCDC';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return; // Ukončení funkce
    }

    switch (event.key.toLowerCase()) {
        case 'e':
            randomElipse();
            break;
        case 's':
            randomRectangle();
            break;
        case 'c':
            drawConcentricCircles(50, 15);
            break;
        case 't':
            tileCanvasWithRectangles(50, 75, ['#000', '#FFF']);
            break;
        case 'l':
            let baseX = (Math.random() * (canvas.width - 400)) + 200;
            let baseY = (Math.random() * (canvas.height - 200)) + 200;
            let height = Math.random() * (canvas.height - 200) + 200;
            let numLines = Math.round(Math.random() * 10 + 5);
            drawTriangleWithLoop(baseX, baseY, height, numLines);
            break;
    }
});

// Funkce pro vykreslení obdélníka na plátno s danými parametry
function drawRectangle(x, y, w, h, col) {
    // Nastavení barvy výplně pro obdélník
    ctx.fillStyle = col;
    // Vykreslení obdélníka na plátno s danými souřadnicemi (x, y),
    // šířkou (w) a výškou (h)
    ctx.fillRect(x, y, w, h);
}

function randomRectangle()
{
    // Generuje náhodné souřadnice x a y uvnitř plátna
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;

    // Generuje náhodnou velikost obdélníka mezi 50 a 150
    let size = Math.random() * 100 + 50;

    // Generuje náhodnou barvu
    let col = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    // Vykreslí obdélník s náhodnými parametry
    drawSquare(x, y, size, col);
}

// Funkce pro vykreslení elipsy na plátno s danými parametry
function drawEllipse(x, y, w, h, col) {
    // Nastavení barvy výplně pro elipsu
    ctx.fillStyle = col;
    // Začátek nové cesty (to je důležité pro kreslení tvarů jako jsou kruhy, elipsy atd.)
    ctx.beginPath();
    // Vykreslení elipsy s centrem v bodě (x, y), s horizontálním poloměrem (w / 2),
    // vertikálním poloměrem (h / 2) a úhlem od 0 do 2π (což je celý kruh)
    ctx.ellipse(x, y, w / 2, h / 2, 0, 0, 2 * Math.PI);
    // Vyplnění elipsy nastavenou barvou
    ctx.fill();
}

// Funkce pro vykreslení kruhu na plátno s danými parametry
function drawCircle(x, y, r, col , fill) {
    // Nastavení barvy výplně pro kruh
    ctx.fillStyle = col;
    ctx.strokeStyle = col;
    ctx.lineWidth = 5;
    // Začátek nové cesty (to je důležité pro kreslení tvarů jako jsou kruhy, elipsy atd.)
    ctx.beginPath();
    // Vykreslení kruhu s centrem v bodě (x, y), poloměrem (r) a úhlem od 0 do 2π
    // (což je celý kruh)
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    // Vyplnění kruhu nastavenou barvou
    if (fill) {
        ctx.fill();
    }
    else {
        ctx.stroke()
    }
}

// Funkce pro vykreslení čtverce na plátno s danými parametry
function drawSquare(x, y, s, col) {
    // Nastavení barvy výplně pro čtverec
    ctx.fillStyle = col;
    // Vykreslení čtverce na plátno s danými souřadnicemi (x, y) a rozměry (s x s)
    ctx.fillRect(x, y, s, s);
}

function randomElipse() {
    const border = 10;
    let width = Math.random() * 100 + 50;
    let height = Math.random() * 100 + 50;
    let x = Math.random() * ((canvas.width - width) - (2 * border)) + border + (width / 2);
    let y = Math.random() * ((canvas.height - height) - (2 * border)) + border + (height / 2);
    let col = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    drawEllipse(x, y, width, height, col);
}

function drawConcentricCircles(count, gap) {
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let col = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    let base = Math.random() * 30 + 20;
    for (i = 0; i < count; i++) {
        drawCircle(x, y, base + (i * (gap / 2)), col, 0);
    }
}

function tileCanvasWithRectangles(rectWidth, rectHeight, colors) {
    for (let x = 0; x < canvas.width / rectWidth; x++) {
        for (y = 0; y < canvas.width / rectHeight; y++) {
            drawRectangle(x * rectWidth, y * rectHeight, rectWidth, rectHeight, colors[(x + y) % 2]);
        }
    }
}

function drawTriangleWithLoop(baseX, baseY, height, numLines) {
    let gap = height / numLines;
    let lineWidth = 1;
    let delta = 20;
    
    for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.moveTo(baseX - (delta * (i + 1)), baseY - (i * gap));
        ctx.lineTo(baseX + (delta * (i + 1)), baseY - (i * gap));
        ctx.stroke();
        lineWidth++;
    }
}

function drawTriangleWithLoop(baseX, baseY, height, numLines) {
    let gap = height / numLines;
    let lineWidth = 1;
    let delta = 20;
    
    for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.moveTo(baseX - (delta * (i + 1)), baseY - (i * gap));
        ctx.lineTo(baseX + (delta * (i + 1)), baseY - (i * gap));
        ctx.stroke();
        lineWidth++;
    }
}
