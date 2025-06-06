// ***************************** IMAGE GALLERY *********************************
const images = [
  "https://plus.unsplash.com/premium_photo-1661881801573-6506e682cbd6?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxjb2RlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI3fHxjb2RlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1618388810903-840bb0d15ea5?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY0fHxjb2RlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1567603452926-68cb8672c818?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fG9ubGluZSUyMGNvbW11bml0eXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1590126698754-510069860d27?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fG9ubGluZSUyMGNvbW11bml0eXxlbnwwfHwwfHx8MA%3D%3D",
];

let currentIndex = 0;

function updateGallery() {
  const gallery = document.getElementById("imageGallery");
  gallery.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const img = document.createElement("img");
    img.src = images[(currentIndex + i) % images.length];
    gallery.appendChild(img);
  }
  currentIndex = (currentIndex + 1) % images.length;
}

updateGallery();
setInterval(updateGallery, 1000);

// ***************************** NETWORK ANIMATION *********************************
const canvas = document.getElementById("network-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = document.querySelector(".hero-section").offsetHeight;

let nodes = [];
const NODE_COUNT = 70;
const CONNECT_DISTANCE = 150;

for (let i = 0; i < NODE_COUNT; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nodes.forEach((node, i) => {
    node.x += node.vx;
    node.y += node.vy;
    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
    ctx.beginPath();
    ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#A7EFFF";
    ctx.shadowColor = "#A7EFFF";
    ctx.shadowBlur = 8;
    ctx.fill();
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const dx = node.x - nodes[j].x;
      const dy = node.y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECT_DISTANCE) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(167, 239, 255, ${1 - dist / CONNECT_DISTANCE})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(draw);
}

draw();

// ***************************** NAVBAR ACTIVE LINK *********************************
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
