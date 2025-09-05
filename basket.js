const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  alert("Please log in to your account first");
  window.location.href = "login.html";
}

const listEl = document.getElementById("basketList");
const emptyEl = document.getElementById("emptyState");
const totalWrapEl = document.getElementById("basketTotal");
const totalValEl = document.getElementById("totalValue");
const itemTpl = document.getElementById("basket-item-template");

// берём общий объект корзин
let carts = JSON.parse(localStorage.getItem("cart")) || {};
// корзина текущего юзера
let cart = carts[currentUser.login] || [];

function saveCart() {
  carts[currentUser.login] = cart;
  localStorage.setItem("cart", JSON.stringify(carts));
}

function formatPrice(n) {
  return `${n.toFixed(2)} M ₸ 🪙`;
}

function renderCart() {
  listEl.textContent = "";
  if (!cart.length) {
    emptyEl.hidden = false;
    totalWrapEl.hidden = true;
    return;
  }
  emptyEl.hidden = true;

  let total = 0;

  cart.forEach((item) => {
    const node = itemTpl.content.cloneNode(true);

    const img = node.querySelector("img");
    const nameEl = node.querySelector(".name");
    const priceEl = node.querySelector(".price");
    const qtyEl = node.querySelector(".qty");

    const btnDec = node.querySelector(".dec");
    const btnInc = node.querySelector(".inc");
    const btnRemove = node.querySelector(".remove");

    img.src = item.img;
    img.alt = item.name;
    nameEl.textContent = item.name;
    priceEl.textContent = `Price: ${item.price} M ₸`;
    qtyEl.textContent = `Amount: ${item.qty}`;
    total += item.price * item.qty;

    btnDec.addEventListener("click", () => {
      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        cart = cart.filter(i => i.id !== item.id);
      }
      saveCart();
      renderCart();
    });

    btnInc.addEventListener("click", () => {
      item.qty += 1;
      saveCart();
      renderCart();
    });

    btnRemove.addEventListener("click", () => {
      cart = cart.filter(i => i.id !== item.id);
      saveCart();
      renderCart();
    });

    listEl.appendChild(node);
  });

  totalValEl.textContent = formatPrice(total);
  totalWrapEl.hidden = false;
}

renderCart();
