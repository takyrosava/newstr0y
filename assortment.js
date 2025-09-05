const products = [
  { id: 1, name: "Atamura urpaq", price: 27.7, img: "https://bi.group/file/images/realEstates/c369113b-ffd5-11ef-a832-001dd8b72708/c369113b-ffd5-11ef-a832-001dd8b72708_foto_1600.jpg" },
  { id: 2, name: "1st by BI", price: 145.4, img: "https://bi.group/file/images/realEstates/9abe5caa-830b-4542-8750-38a9c6e7904a/9abe5caa-830b-4542-8750-38a9c6e7904a_foto_1600.jpg" },
  { id: 3, name: "4Seasons. Dream", price: 18.0, img: "https://bi.group/file/images/realEstates/76d0552b-7765-11f0-a834-001dd8b726aa/76d0552b-7765-11f0-a834-001dd8b726aa_foto_1600.jpg" },
  { id: 4, name: "4Seasons. Joy", price: 17.9, img: "https://bi.group/file/images/realEstates/e21dcc81-a26b-41a0-aa9d-dce0422ed097/e21dcc81-a26b-41a0-aa9d-dce0422ed097_foto_1600.jpg" },
  { id: 5, name: "4YOU Shymkent", price: 28.4, img: "https://bi.group/file/images/realEstates/fc374268-2b9d-11ee-a828-001dd8b72708/fc374268-2b9d-11ee-a828-001dd8b72708_foto_1600.jpg" },
  { id: 6, name: "Abyroi", price: 28.5, img: "https://bi.group/file/images/realEstates/b42a5e8b-4e96-46ed-9056-560139708590/b42a5e8b-4e96-46ed-9056-560139708590_foto_1600.jpg" },
  { id: 7, name: "Aisar", price: 20.5, img: "https://bi.group/file/images/realEstates/32453f14-664f-11ed-a82b-001dd8b726aa/32453f14-664f-11ed-a82b-001dd8b726aa_foto_1600.jpg" },
  { id: 8, name: "Aktau Riviera", price: 53.8, img: "https://bi.group/file/images/realEstates/025d0375-2025-11eb-a837-00155d101d74/025d0375-2025-11eb-a837-00155d101d74_foto_1600.jpg" },
  { id: 9, name: "Altyn Zaman", price: 39.5, img: "https://bi.group/file/images/realEstates/8b0982ce-04d4-11ec-a829-001dd8b726aa/8b0982ce-04d4-11ec-a829-001dd8b726aa_foto_1600.jpg" }
];

const productsDiv = document.getElementById("products");
const template = document.getElementById("product-template");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
function renderProducts(list) {
  productsDiv.innerHTML = "";
  list.forEach(p => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("img").src = p.img;
    clone.querySelector("img").alt = p.name;
    clone.querySelector("h3").textContent = p.name;
    clone.querySelector("p").textContent = `from ${p.price} M ₸ 💵`;
    clone.querySelector("button").onclick = () => addToCart(p.id);
    productsDiv.appendChild(clone);
  });
}
renderProducts(products);
function addToCart(id) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Please login first!");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (!cart[currentUser.login]) cart[currentUser.login] = [];

  const product = products.find(p => p.id === id);
  const item = cart[currentUser.login].find(i => i.id === id);

  if (item) item.qty++;
  else cart[currentUser.login].push({ ...product, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}
searchInput.addEventListener("input", () => {
  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  renderProducts(filtered);
});
sortSelect.addEventListener("change", () => {
  let list = [...products];
  if (sortSelect.value === "price-asc") list.sort((a, b) => a.price - b.price);
  if (sortSelect.value === "price-desc") list.sort((a, b) => b.price - a.price);
  if (searchInput.value.trim() !== "") {
    list = list.filter(p =>
      p.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  }

  renderProducts(list);
});
