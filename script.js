const auntyMessages = [
  "Entha dress ithu?",
  "Aiyyo, late again?",
  "Why no dupatta?",
  "Eat more, too thin!"
];

window.onload = function () {
  // other init code...

  const mapImg = document.getElementById('mapImage');
  if (mapImg.complete) {
    mapImg.style.opacity = '1';
  } else {
    mapImg.onload = () => {
      mapImg.style.opacity = '1';
    };
  }
};




function placeAunties() {
  const map = document.getElementById('map');
  document.querySelectorAll('.aunty').forEach(a => a.remove());

  for (let i = 0; i < 5; i++) {
    const aunty = document.createElement('div');
    aunty.className = 'aunty';
    aunty.style.left = `${Math.random() * 760 + 20}px`;
    aunty.style.top = `${Math.random() * 460 + 20}px`;
    aunty.dataset.message = auntyMessages[Math.floor(Math.random() * auntyMessages.length)];
    map.appendChild(aunty);
  }
}

function findPath() {
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;

  if (from === to) {
    alert("Aiyyo! Same place? No need for Aunty Radar!");
    return;
  }

  const spinner = document.getElementById('spinner');
  const loadingText = document.getElementById('loadingText');
  const mapImage = document.getElementById('mapImage');

  spinner.style.display = 'none';
  mapImage.style.display = 'none';
  loadingText.style.display = 'block';
  loadingText.textContent = "Scanning for Aunties... Adjusting dupattas...";

  setTimeout(() => {
    loadingText.style.display = 'none';
    mapImage.style.display = 'block';
    mapImage.style.opacity = 0; // Ensure opacity is 0 before loading
    const filename = `${from}-${to}.png`;
    mapImage.onload = function() {
      mapImage.style.opacity = 1;
    };
    mapImage.src = `assets/routes/${filename}`;

    const warnings = [
      "Warning: Aunty spotted near temple road. Avoid saree judgement.",
      "Beware! Aunties ahead near chaya kada. Hide that pierced nose.",
      "Alert! Aunty detected near church gate. Tuck in that shirt.",
      "Judgement levels high near canteen. Brace yourself."
    ];
    const randomWarning = warnings[Math.floor(Math.random() * warnings.length)];
    document.getElementById('warningText').textContent = randomWarning;

    placeAunties();
    document.getElementById('warning').style.display = Math.random() < 0.5 ? 'block' : 'none';
  }, 4500);
}

function closeWarning() {
  document.getElementById('warning').style.display = 'none';
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' || e.code === 'Space') {
    document.getElementById('introScreen').style.display = 'none';
    document.getElementById('mainScreen').style.display = 'block';
  }
});

document.getElementById('findPathBtn').addEventListener('click', findPath);

