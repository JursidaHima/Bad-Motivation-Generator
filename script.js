const QUOTES = [
  "Ask fewer questions. Ship faster. Regret everything later.",
  "Pitch your pitch before the product exists.",
  "Outsource your feelings to a spreadsheet.",
  "No plan is still a plan if you're convincing enough.",
  "If it hurts, post about it. Validation is a mindset.",
  "Become the kind of chaos you can monetize.",
  "Set tiny goals, then ignore the rest until next quarter.",
  "Buy the domain first. The work can come later.",
  "Tell your calendar you're booked for success.",
  "Fake productivity with ten tabs and a big to-do list.",
  "Present your confusion as creative ambiguity.",
  "Schedule a follow-up for your follow-ups.",
  "Use buzzwords liberally; credibility follows lazily.",
  "If all else fails, blame the algorithm.",
  "Turn your failures into a viral story.",
  "Be the energy your inbox needs — chaotic and caffeinated.",
  "Reject the roadmap. Embrace the detour.",
  "Say yes to everything and let fate sort it out.",
  "Make your failure look intentional.",
  "When in doubt, call it a side project.",
];

const CATEGORIES = [
  { name: "Startup Advice", icon: "🚀" },
  { name: "Career Advice", icon: "💼" },
  { name: "Relationship Advice", icon: "💘" },
  { name: "Fitness Advice", icon: "🏋️" },
  { name: "Financial Advice", icon: "💸" },
  { name: "Productivity Advice", icon: "⚡" },
  { name: "Developer Advice", icon: "🖥️" },
];

const EMOJIS = [
  "🤖",
  "😏",
  "🙃",
  "🫠",
  "😵‍💫",
  "🤡",
  "🦄",
  "💤",
  "🍕",
  "📉",
  "🔥",
  "💀",
];
const BADGES = [
  "First Bad Decision",
  "Chaos Enthusiast",
  "Professional Regret Collector",
];

const generateBtn = document.getElementById("generateBtn");
const shareHeroBtn = document.getElementById("shareHeroBtn");
const copyBtn = document.getElementById("copyBtn");
const shareXBtn = document.getElementById("shareXBtn");
const saveBtn = document.getElementById("saveBtn");
const categoriesGrid = document.getElementById("categoryGrid");
const adviceQuote = document.getElementById("quoteHero");
const loadingHero = document.getElementById("loadingHero");
const confidenceHero = document.getElementById("confidenceHero");
const counterHero = document.getElementById("counterHero");
const leaderWorst = document.getElementById("leaderWorst");
const leaderShared = document.getElementById("leaderShared");
const toast = document.getElementById("toast");
const cursorGlow = document.getElementById("cursorGlow");

let adviceCount = Number(localStorage.getItem("badMotivationCount")) || 11;
let currentQuote = "Ask fewer questions. Ship faster. Regret everything later.";
let currentEmoji = "🤖";
let currentConfidence = 121;
let activeCategory =
  localStorage.getItem("badMotivationCategory") || "Startup Advice";
let favorites = JSON.parse(
  localStorage.getItem("badMotivationFavorites") || "[]",
);

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function setTheme(theme) {
  document.body.classList.toggle("light-mode", theme === "light");
  localStorage.setItem("badMotivationTheme", theme);

  if (theme === "light") {
    document.body.style.background = "";
  } else {
    setBackground();
  }
}

function getTheme() {
  return localStorage.getItem("badMotivationTheme") || "dark";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast.hideTimeout);
  toast.hideTimeout = setTimeout(() => toast.classList.remove("show"), 1800);
}

function updateStats() {
  confidenceHero.textContent = `${currentConfidence}%`;
  counterHero.textContent = adviceCount;
}

function updateLeaderboards() {
  leaderWorst.textContent = currentQuote;
  leaderShared.textContent = `Most shared: ${randomItem(QUOTES)}`;
}

function animateText(text) {
  adviceQuote.textContent = "";
  const chars = [...text];
  let index = 0;
  const interval = setInterval(() => {
    if (index >= chars.length) {
      clearInterval(interval);
      return;
    }
    adviceQuote.textContent += chars[index];
    index += 1;
  }, 20);
}

function spawnConfetti() {
  for (let i = 0; i < 18; i += 1) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = randomItem([
      "#FF80B3",
      "#C084FC",
      "#FFD36D",
      "#8B5CF6",
    ]);
    piece.style.width = `${6 + Math.random() * 8}px`;
    piece.style.height = `${8 + Math.random() * 6}px`;
    document.body.appendChild(piece);
    const animation = piece.animate(
      [
        { transform: "translateY(0px) rotate(0deg)", opacity: 1 },
        {
          transform: `translateY(${180 + Math.random() * 120}px) rotate(${120 + Math.random() * 240}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 1100 + Math.random() * 500,
        easing: "cubic-bezier(.2,.7,.6,1)",
      },
    );
    animation.onfinish = () => piece.remove();
  }
}

function setBackground() {
  const hue = Math.floor(Math.random() * 360);
  document.body.style.background = `radial-gradient(circle at 15% 10%, rgba(255, 128, 179, 0.18), transparent 18%), radial-gradient(circle at 90% 6%, rgba(192, 132, 252, 0.14), transparent 16%), linear-gradient(140deg, hsl(${hue}, 35%, 8%), hsl(${(hue + 35) % 360}, 36%, 17%), hsl(${(hue + 70) % 360}, 50%, 20%))`;
}

function generateAdvice() {
  loadingHero.classList.remove("hidden");
  adviceQuote.classList.add("dimmed");
  generateBtn.disabled = true;

  setTimeout(() => {
    const quote = randomItem(QUOTES);
    currentEmoji = randomItem(EMOJIS);
    currentConfidence = Math.floor(96 + Math.random() * 24);
    currentQuote = `${currentEmoji} ${quote}`;

    animateText(currentQuote);
    adviceCount += 1;
    localStorage.setItem("badMotivationCount", adviceCount);
    updateStats();
    updateLeaderboards();
    showToast(randomItem(BADGES));
    setBackground();
    loadingHero.classList.add("hidden");
    adviceQuote.classList.remove("dimmed");
    generateBtn.disabled = false;
  }, 900);
}

async function copyAdvice() {
  if (!currentQuote) {
    showToast("Generate advice first");
    return;
  }

  try {
    await navigator.clipboard.writeText(
      `${currentQuote} — AI Confidence: ${currentConfidence}%`,
    );
    showToast("Copied to clipboard");
    spawnConfetti();
  } catch (error) {
    showToast("Copy failed");
  }
}

function shareToX() {
  const text = encodeURIComponent(`${currentQuote} #BadMotivationGenerator`);
  window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
}

function saveFavorite() {
  favorites.unshift({
    quote: currentQuote,
    confidence: currentConfidence,
    category: activeCategory,
    ts: Date.now(),
  });
  favorites = favorites.slice(0, 24);
  localStorage.setItem("badMotivationFavorites", JSON.stringify(favorites));
  showToast("Saved favorite");
}

function renderCategories() {
  categoriesGrid.innerHTML = CATEGORIES.map(
    (category) => `
    <button class="category-card ${category.name === activeCategory ? "active" : ""}" data-category="${category.name}" type="button">
      <span class="category-icon">${category.icon}</span>
      <div class="category-meta"><h3>${category.name}</h3></div>
    </button>
  `,
  ).join("");

  categoriesGrid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      localStorage.setItem("badMotivationCategory", activeCategory);
      renderCategories();
      showToast(`Category set to ${activeCategory}`);
    });
  });
}

function initTheme() {
  setTheme(getTheme());
  const themeToggle = document.querySelector("#themeToggle");
  if (themeToggle) {
    themeToggle.checked = getTheme() === "light";
    themeToggle.addEventListener("change", () =>
      setTheme(themeToggle.checked ? "light" : "dark"),
    );
  }
}

function initCursor() {
  window.addEventListener("mousemove", (event) => {
    cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  });
}

window.addEventListener("load", () => {
  renderCategories();
  initTheme();
  initCursor();
  updateStats();
  updateLeaderboards();
  generateBtn.addEventListener("click", generateAdvice);
  shareHeroBtn.addEventListener("click", shareToX);
  copyBtn.addEventListener("click", copyAdvice);
  shareXBtn.addEventListener("click", shareToX);
  saveBtn.addEventListener("click", saveFavorite);
  adviceQuote.textContent = currentQuote;
  setBackground();
});
