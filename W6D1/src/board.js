const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 500;
canvas.width = 500;

function drawBoard(widthN, heightN) {
  for (let i = 0; i < (widthN * heightN); i += 1) {
    const x = (i % widthN) * 50;
    const y = Math.floor(i / widthN) * 50;
    ctx.fillRect(x, y, 45, 45);
  }
}

function draw() {
  ctx.clearRect(0, 0, 300, 300);
  ctx.fillStyle = 'rgb(99,138,127)';
  drawBoard(8, 8);
  window.requestAnimationFrame(draw);
}

function init() {
  window.requestAnimationFrame(draw);
}

ctx.beginPath();
ctx.strokeStyle = 'rgb(240, 227, 158)';
ctx.lineWidth = 10;
ctx.arc(72.5, 72.5, 50, 0, 2 * Math.PI);
ctx.arc(72.5, 72.5, 20, 0, 2 * Math.PI);
ctx.stroke();

init();
