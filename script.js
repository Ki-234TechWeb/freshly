const products = [
  {id:"mango-paneer",name:"Sticky mango paneer",category:"favorites",image:"wha.avif",price:12,tag:"House favorite",time:"25 min",description:"Sweet mango glaze, golden paneer, fresh herbs."},
  {id:"crispy-bowl",name:"Crispy green goodness bowl",category:"lunch",image:"what-to1.avif",price:14,tag:"New on the menu",time:"20 min",description:"Bright greens, crisp bites, and a zippy dressing."},
  {id:"sunny-breakfast",name:"Sunny morning plate",category:"breakfast",image:"collect.avif",price:11,tag:"Feel-good pick",time:"15 min",description:"A cozy, nourishing start made for slow mornings."},
  {id:"spiced-supper",name:"Spiced supper bowl",category:"dinner",image:"what-to2.avif",price:16,tag:"House favorite",time:"30 min",description:"Warm spices, hearty grains, and a little crunch."},
  {id:"colorful-lunch",name:"The colorful lunchbox",category:"lunch",image:"packed1.avif",price:13,tag:"Easy lunch",time:"15 min",description:"A fresh, satisfying lunch for wherever today goes."},
  {id:"garden-breakfast",name:"Garden breakfast toast",category:"breakfast",image:"collect1.avif",price:10,tag:"Morning favorite",time:"10 min",description:"A feel-good breakfast with plenty of fresh flavor."},
  {id:"weeknight-bowl",name:"Weeknight comfort bowl",category:"dinner",image:"what-to3.avif",price:15,tag:"Ready in 20 min",time:"20 min",description:"Comforting, colorful, and wonderfully uncomplicated."},
  {id:"little-lunch",name:"Little lunch, big flavor",category:"lunch",image:"packed2.avif",price:12,tag:"Easy lunch",time:"15 min",description:"A bright little pick-me-up for busy afternoons."},
  {id:"harvest-plate",name:"The harvest plate",category:"favorites",image:"what-to4.avif",price:17,tag:"House favorite",time:"25 min",description:"Seasonal flavors, thoughtfully brought together."},
  {id:"brunch-bowl",name:"Sunday brunch bowl",category:"breakfast",image:"collect2.avif",price:12,tag:"Weekend mood",time:"15 min",description:"A slow-morning kind of meal, any day of the week."},
  {id:"lunch-and-go",name:"Lunch and go",category:"lunch",image:"packed3.avif",price:11,tag:"On-the-go",time:"10 min",description:"Fresh, filling, and ready when your day is."},
  {id:"cozy-dinner",name:"Cozy table dinner",category:"dinner",image:"what-to5.avif",price:18,tag:"Made for sharing",time:"35 min",description:"A lovely dinner moment, without the long prep."}
];

const cart = new Map();
const favorites = new Set();
const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#product-search");
const countLabel = document.querySelector("#result-count");
const cartDrawer = document.querySelector("#cart-drawer");
const scrim = document.querySelector("#scrim");
const toast = document.querySelector("#toast");
let activeCategory = "all";
let toastTimer;
let lastFocus;

function productCard(product) {
  const isFavorite = favorites.has(product.id);
  return `<article class="product-card">
    <div class="product-photo"><img src="./img/${product.image}" alt="${product.name}" loading="lazy" /><span class="product-badge">${product.tag}</span><button class="favorite-button" type="button" data-favorite="${product.id}" aria-label="${isFavorite ? "Remove" : "Add"} ${product.name} ${isFavorite ? "from" : "to"} favorites" aria-pressed="${isFavorite}">♡</button></div>
    <div class="product-info"><div class="product-meta"><span>${product.time} · ${product.category}</span><span class="rating" aria-label="Rated 4.9 out of 5">★ 4.9</span></div><h3>${product.name}</h3><p class="product-description">${product.description}</p><div class="product-buy-row"><span class="product-price">$${product.price.toFixed(2)}</span><button class="add-button" type="button" data-add="${product.id}" aria-label="Add ${product.name} to bag"><span>+</span> Add to bag</button></div></div>
  </article>`;
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = products.filter((product) => {
    const categoryMatch = activeCategory === "all" || product.category === activeCategory || (activeCategory === "favorites" && favorites.has(product.id));
    const queryMatch = !query || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });
  productGrid.innerHTML = visible.map(productCard).join("");
  document.querySelector("#no-results").hidden = visible.length > 0;
  countLabel.textContent = `${visible.length} ${visible.length === 1 ? "delicious thing" : "delicious things"}`;
}

function money(value) {
  return `$${value.toFixed(2)}`;
}

function renderCart() {
  const items = [...cart.values()];
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  document.querySelector("#cart-count").textContent = count;
  document.querySelector("#drawer-count").textContent = `(${count})`;
  document.querySelector("#subtotal").textContent = money(subtotal);
  document.querySelector("#checkout-total").textContent = money(subtotal);
  document.querySelector("#cart-empty").hidden = count > 0;
  document.querySelector("#drawer-footer").hidden = count === 0;
  document.querySelector("#delivery-message").textContent = subtotal >= 45 ? "You’ve unlocked free delivery. Nice." : `You’re ${money(45 - subtotal)} away from free delivery`;
  document.querySelector("#progress-fill").style.width = `${Math.min((subtotal / 45) * 100, 100)}%`;
  document.querySelector("#cart-items").innerHTML = items.map(({product, quantity}) => `<article class="cart-line"><img src="./img/${product.image}" alt="" /><div><h3>${product.name}</h3><span class="line-price">${money(product.price)} each</span><div class="quantity-control" aria-label="Quantity for ${product.name}"><button type="button" data-quantity="${product.id}" data-change="-1" aria-label="Remove one ${product.name}">−</button><span>${quantity}</span><button type="button" data-quantity="${product.id}" data-change="1" aria-label="Add one ${product.name}">+</button></div></div><button class="remove-item" type="button" data-remove="${product.id}">Remove</button></article>`).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function openCart() {
  lastFocus = document.activeElement;
  scrim.hidden = false;
  requestAnimationFrame(() => scrim.classList.add("visible"));
  cartDrawer.inert = false;
  cartDrawer.setAttribute("aria-hidden", "false");
  cartDrawer.classList.add("open");
  document.body.classList.add("no-scroll");
  document.querySelector("#close-cart").focus();
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartDrawer.inert = true;
  scrim.classList.remove("visible");
  document.body.classList.remove("no-scroll");
  window.setTimeout(() => { scrim.hidden = true; }, 250);
  lastFocus?.focus();
}

function openCheckout() {
  closeCart();
  const modal = document.querySelector("#checkout-modal");
  modal.inert = false;
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("open");
  document.body.classList.add("no-scroll");
  document.querySelector("#customer-name").focus();
}

function closeCheckout() {
  const modal = document.querySelector("#checkout-modal");
  modal.classList.remove("open");
  modal.inert = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  document.querySelector("#open-cart").focus();
}

productGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const favoriteButton = event.target.closest("[data-favorite]");
  if (addButton) {
    const product = products.find((item) => item.id === addButton.dataset.add);
    if (!product) return;
    const existing = cart.get(product.id);
    cart.set(product.id, {product, quantity: (existing?.quantity ?? 0) + 1});
    renderCart();
    showToast(`${product.name} added to your bag`);
  }
  if (favoriteButton) {
    const {favorite} = favoriteButton.dataset;
    favorites.has(favorite) ? favorites.delete(favorite) : favorites.add(favorite);
    renderProducts();
  }
});

document.querySelector(".category-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  document.querySelectorAll(".category-tab").forEach((tab) => {
    const selected = tab === button;
    tab.classList.toggle("selected", selected);
    tab.setAttribute("aria-pressed", String(selected));
  });
  renderProducts();
});

searchInput.addEventListener("input", renderProducts);
document.querySelector("#clear-search").addEventListener("click", () => {
  searchInput.value = "";
  activeCategory = "all";
  document.querySelectorAll(".category-tab").forEach((tab) => {
    const selected = tab.dataset.category === "all";
    tab.classList.toggle("selected", selected);
    tab.setAttribute("aria-pressed", String(selected));
  });
  renderProducts();
  searchInput.focus();
});

document.querySelector("#open-cart").addEventListener("click", openCart);
document.querySelector("#close-cart").addEventListener("click", closeCart);
document.querySelector("#start-shopping").addEventListener("click", () => {
  closeCart();
  document.querySelector("#shop").scrollIntoView({behavior: "smooth"});
});
scrim.addEventListener("click", closeCart);
document.querySelector("#cart-items").addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) {
    const item = cart.get(quantityButton.dataset.quantity);
    if (!item) return;
    item.quantity += Number(quantityButton.dataset.change);
    if (item.quantity <= 0) cart.delete(quantityButton.dataset.quantity);
    renderCart();
  }
  if (removeButton) {
    cart.delete(removeButton.dataset.remove);
    renderCart();
  }
});
document.querySelector("#checkout-button").addEventListener("click", openCheckout);
document.querySelector("#close-checkout").addEventListener("click", closeCheckout);
document.querySelector("#checkout-modal").addEventListener("click", (event) => {
  if (event.target.id === "checkout-modal") closeCheckout();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (document.querySelector("#checkout-modal").classList.contains("open")) closeCheckout();
    else if (cartDrawer.classList.contains("open")) closeCart();
  }
});
document.querySelector("#checkout-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  if (cart.size === 0) {
    closeCheckout();
    showToast("Your bag is empty. Add something tasty first.");
    return;
  }
  const orderNumber = Math.random().toString(36).slice(2, 8).toUpperCase();
  event.currentTarget.reset();
  cart.clear();
  renderCart();
  closeCheckout();
  showToast(`Demo order #${orderNumber} placed — no payment taken`);
});
document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
