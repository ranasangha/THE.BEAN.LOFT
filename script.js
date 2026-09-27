const menuData = {
  "sides-veg": [
    ["Avocado Toast", "₹220", "veg"],
    ["Nachos & Guacamole", "₹180", "veg"],
    ["Guacamole Bowl", "₹200", "veg"],
    ["Veg Puff", "₹40", "veg"],
    ["Cheese & Corn Kebab", "₹160", "veg"],
    ["Cheese & Corn Shot", "₹160", "veg"],
    ["Cheese & Corn Pocket", "₹160", "veg"],
    ["Peri Peri Cheese Finger", "₹160", "veg"],
    ["Paneer Peri Peri Pocket", "₹180", "veg"],
    ["Truffle Fries", "₹180", "veg"],
    ["Peri Peri Fries", "₹140", "veg"],
    ["Garlic Fries", "₹120", "veg"],
    ["Cheese Fries", "₹120", "veg"]
  ],
  "sides-nonveg": [
    ["Chicken Popcorn", "₹180", "nonveg"],
    ["Chicken Nuggets", "₹200", "nonveg"],
    ["Crab Claw Amritsari", "₹200", "nonveg"],
    ["Fish Popcorn", "₹180", "nonveg"],
    ["Chicken Pull", "₹150", "nonveg"]
  ],
  "bakery": [
    ["White Forest Pastry", "₹120", "bakery"],
    ["Chocolate Pastry", "₹130", "bakery"],
    ["Bombolini", "₹120", "bakery"],
    ["Biscoff Cheesecake", "₹220", "bakery"],
    ["Red Velvet Cheesecake", "₹220", "bakery"]
  ],
  "classic-hot": [
    ["Espresso", "₹100", "coffee"],
    ["Cortado", "₹120", "coffee"],
    ["Piccolo", "₹120", "coffee"],
    ["Macchiato", "₹120", "coffee"],
    ["Flat White", "₹120", "coffee"],
    ["Drip Tea", "₹120", "coffee"],
    ["Cappuccino", "₹120 / ₹130 / ₹140", "coffee", "Small / Medium / Large"],
    ["Latte", "₹120 / ₹130 / ₹140", "coffee", "Small / Medium / Large"],
    ["Mocha", "₹150 / ₹160 / ₹170", "coffee", "Small / Medium / Large"],
    ["Americano", "₹120 / ₹130 / ₹140", "coffee", "Small / Medium / Large"],
    ["Hot Chocolate", "₹150 / ₹160 / ₹170", "coffee", "Small / Medium / Large"]
  ],
  "classic-cold": [
    ["Iced Cappuccino", "₹150", "cold"],
    ["Iced Latte", "₹150", "cold"],
    ["Iced Mocha", "₹180", "cold"],
    ["Iced Americano", "₹150", "cold"],
    ["Cold Brew", "₹200", "cold"],
    ["Espresso Tonic", "₹100", "cold"],
    ["Iced Tea", "₹140", "cold"],
    ["Lemon Soda", "₹120", "cold"],
    ["Lemonade", "₹120", "cold"]
  ],
  "signature-hot": [
    ["Honey Cinnamon Latte", "₹180 / ₹190 / ₹200", "coffee", "Small / Medium / Large"],
    ["Salted Maple Latte", "₹190 / ₹190 / ₹200", "coffee", "Small / Medium / Large"],
    ["Spanish Latte", "₹180 / ₹190 / ₹200", "coffee", "Small / Medium / Large"],
    ["Hazelnut Cream Latte", "₹180 / ₹190 / ₹200", "coffee", "Small / Medium / Large"],
    ["Dirty Chai", "₹180 / ₹190 / ₹200", "coffee", "Small / Medium / Large"],
    ["Cinnamon Chai", "₹200", "coffee"]
  ],
  "signature-cold": [
    ["Honey Cinnamon Latte", "₹200", "cold"],
    ["Salted Maple Latte", "₹200", "cold"],
    ["Spanish Latte", "₹200", "cold"],
    ["Hazelnut Cream Latte", "₹200", "cold"],
    ["Affogato", "₹150", "cold"]
  ],
  "indian-hot": [
    ["Filter Coffee", "₹120", "coffee"],
    ["Kahwa", "₹120", "coffee"],
    ["Assam Tea", "₹120", "coffee"],
    ["Goan Rose Tea", "₹150", "coffee"]
  ],
  "smoothies": [
    ["Berry Blast", "₹180", "cold"],
    ["Mango Passion", "₹180", "cold"],
    ["Peanut Butter Banana", "₹180", "cold"],
    ["Tropical Green", "₹200", "cold"],
    ["Chocolate Protein", "₹220", "cold"]
  ],
  "mojitos": [
    ["Mint Mojito", "₹150", "cold"],
    ["Strawberry Mojito", "₹180", "cold"],
    ["Mango Mojito", "₹180", "cold"],
    ["Watermelon Mojito", "₹180", "cold"],
    ["Apple Mojito", "₹180", "cold"]
  ],
  "mocktails": [
    ["Lemongrass & Ginger Cooler", "₹200", "cold"],
    ["Shirley Temple", "₹200", "cold"],
    ["Virgin Colada", "₹200", "cold"],
    ["Virgin Mary", "₹200", "cold"],
    ["Chilly Guava", "₹200", "cold"],
    ["Strawberry Basil Fizz", "₹200", "cold"],
    ["Tropical Mango", "₹200", "cold"]
  ]
};

const lists = document.querySelectorAll("[data-list]");
const allItems = [];

function renderItem(item, listName) {
  const [name, price, type, size] = item;
  const el = document.createElement("div");
  el.className = "menu-item";
  el.dataset.type = type;
  el.dataset.name = name.toLowerCase();
  el.dataset.list = listName;
  el.innerHTML = `
    <div>
      <div class="item-name">${name}</div>
      ${size ? `<span class="item-size">${size}</span>` : ""}
    </div>
    <div class="item-price">${price}</div>
  `;
  allItems.push(el);
  return el;
}

lists.forEach(list => {
  const key = list.dataset.list;
  (menuData[key] || []).forEach(item => list.appendChild(renderItem(item, key)));
});

const searchButton = document.getElementById("searchButton");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const searchStatus = document.getElementById("searchStatus");
const filters = document.querySelectorAll(".filter");

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const activeFilter = document.querySelector(".filter.active")?.dataset.filter || "all";
  let visible = 0;

  allItems.forEach(item => {
    const matchesQuery = !query || item.dataset.name.includes(query);
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "veg" && item.dataset.type === "veg") ||
      (activeFilter === "nonveg" && item.dataset.type === "nonveg") ||
      (activeFilter === "coffee" && item.dataset.type === "coffee") ||
      (activeFilter === "cold" && item.dataset.type === "cold") ||
      (activeFilter === "bakery" && item.dataset.type === "bakery");

    const show = matchesQuery && matchesFilter;
    item.classList.toggle("hidden-by-filter", !show);
    if (show) visible++;
  });

  document.querySelectorAll(".menu-section, .feature-section, .drink-section, .mocktail-section").forEach(section => {
    const items = section.querySelectorAll(".menu-item");
    if (!items.length) return;
    const sectionVisible = [...items].some(i => !i.classList.contains("hidden-by-filter"));
    section.classList.toggle("section-hidden", !sectionVisible && (query || activeFilter !== "all"));
  });

  if (query || activeFilter !== "all") {
    searchStatus.hidden = false;
    searchStatus.textContent = visible
      ? `${visible} menu item${visible === 1 ? "" : "s"} found.`
      : "No menu items found. Try another search.";
  } else {
    searchStatus.hidden = true;
  }
}

searchButton.addEventListener("click", () => {
  searchPanel.hidden = !searchPanel.hidden;
  if (!searchPanel.hidden) {
    searchInput.focus();
    document.body.classList.add("search-open");
  } else {
    document.body.classList.remove("search-open");
  }
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  applyFilters();
  searchInput.focus();
});

searchInput.addEventListener("input", applyFilters);

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");
    applyFilters();
  });
});

document.getElementById("dockSearch")?.addEventListener("click", () => {
  searchPanel.hidden = false;
  searchInput.focus();
  window.scrollTo({ top: document.getElementById("menu").offsetTop - 80, behavior: "smooth" });
});

document.getElementById("year").textContent = new Date().getFullYear();

const categoryLinks = document.querySelectorAll(".nav-inner a");
const sections = [...document.querySelectorAll("[data-section]")];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      categoryLinks.forEach(link => link.classList.toggle(
        "active",
        link.dataset.category === entry.target.dataset.section
      ));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

sections.forEach(section => observer.observe(section));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
