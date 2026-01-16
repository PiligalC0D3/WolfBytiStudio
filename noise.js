const canvas = document.getElementById("noiseCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const chars = [".", "+", "x"];
const particles = [];

for (let i = 0; i < 1800; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    char: chars[Math.floor(Math.random() * chars.length)],
    size: 8 + Math.random() * 10,
    speed: 0.1 + Math.random() * 0.4,
    jitter: Math.random() * 1.5
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const t = Date.now() * 0.002;

  particles.forEach(p => {
    ctx.font = p.size + "px monospace";
    ctx.fillStyle = "#00ff66";

    const jx = Math.sin(t + p.x) * p.jitter;
    const jy = Math.cos(t + p.y) * p.jitter;

    ctx.globalAlpha = 0.2 + Math.random() * 0.3;
    ctx.fillText(p.char, p.x + jx, p.y + jy);

    p.x += p.speed;
    if (p.x > canvas.width) {
      p.x = -30;
      p.y = Math.random() * canvas.height;
    }
  });

  requestAnimationFrame(animate);
}

animate();
