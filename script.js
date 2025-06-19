const products = [
  // Electronics
  { name: "Wireless Earbuds", category: "electronics", price: 1999, image: "https://tse2.mm.bing.net/th?id=OIP.dVfJuk_WPbGJ45UBzCrCnQHaHt&pid=Api&P=0&h=180" },
  { name: "Smartphone", category: "electronics", price: 15999, image: "https://tse1.mm.bing.net/th?id=OIP.OcdSqY5gftJvJieB7BYLpwHaHa&pid=Api&P=0&h=180" },
  { name: "Laptop", category: "electronics", price: 49999, image: "https://tse4.mm.bing.net/th?id=OIP.okPHK-lOk_E5nzOZsGx2dwHaFI&pid=Api&P=0&h=180" },
  { name: "Smart Watch", category: "electronics", price: 6999, image: "https://tse2.mm.bing.net/th?id=OIP.WGOZNjuNIvkVixSj9rQBcAHaIs&pid=Api&P=0&h=180h" },
  { name: "Bluetooth Speaker", category: "electronics", price: 2499, image: "https://tse1.mm.bing.net/th?id=OIP.P2-VvoieEgA0-3ZXJ41eCAHaLT&pid=Api&P=0&h=180" },
  { name: "Portable Fan", category: "electronics", price: 1199, image: "https://tse1.mm.bing.net/th?id=OIP.3bpe1eGv3X1qor4yKLK5jQHaHa&pid=Api&P=0&h=180" },
  { name: "Water Bottle", category: "electronics", price: 299, image: "https://tse1.mm.bing.net/th?id=OIP.DFf6aiDUY8EHysp_5rmmugHaDt&pid=Api&P=0&h=180" },

  // Clothing
  { name: "T-Shirt", category: "clothing", price: 499, image: "https://tse3.mm.bing.net/th?id=OIF.yBpha9ys7nik2CCggCExQQ&pid=Api&P=0&h=180" },
  { name: "Jacket", category: "clothing", price: 2499, image: "https://tse1.mm.bing.net/th?id=OIP.MZxdrRupfUMH_GW5Ua6XugHaHa&pid=Api&P=0&h=180" },
  { name: "Sneakers", category: "clothing", price: 2999, image: "https://tse1.mm.bing.net/th?id=OIP.Vy9cgMyN_NQUgM1hPhsjJQAAAA&pid=Api&P=0&h=180" },
  { name: "Backpack", category: "clothing", price: 1299, image: "https://tse1.mm.bing.net/th?id=OIP.JC4OloN4qqeX2uGN18w-VwAAAA&pid=Api&P=0&h=180" },
  { name: "Jeans", category: "clothing", price: 1799, image: "https://tse1.mm.bing.net/th?id=OIP.GKbDVS0grWumDU4BUANodAHaJ3&pid=Api&P=0&h=180" },
  { name: "Cap", category: "clothing", price: 299, image: "https://tse3.mm.bing.net/th?id=OIP.pMOolKunycfd3QhnM_InnQHaGU&pid=Api&P=0&h=180" },

  // Furniture
  { name: "Wooden Dining Table", category: "furniture", price: 7999, image: "https://tse3.mm.bing.net/th?id=OIP.uAcsAW4TeGUoH4es1fFy3AHaFG&pid=Api&P=0&h=180" },
  { name: "Sofa Set", category: "furniture", price: 18999, image: "https://tse3.mm.bing.net/th?id=OIP.BprRCWbrVRK81ATQj40lwgHaGL&pid=Api&P=0&h=180" },
  { name: "Office Chair", category: "furniture", price: 2999, image: "https://tse4.mm.bing.net/th?id=OIP.8cAfNEudGgAfrNUFz-3gwQHaHa&pid=Api&P=0&h=180" },
  { name: "Bookshelf", category: "furniture", price: 3999, image: "https://tse4.mm.bing.net/th?id=OIP.n3hAbvwH6euj0HsBPIKDNQHaHa&pid=Api&P=0&h=180" },
  { name: "Bed Frame", category: "furniture", price: 9999, image: "https://tse2.mm.bing.net/th?id=OIP.oWBvfJKCvzooOtrnKovV_AHaHa&pid=Api&P=0&h=180" },
  { name: "Wall Clock", category: "furniture", price: 899, image: "https://tse1.mm.bing.net/th?id=OIP.5mlJP2YNPAa5IsGK3noUGAHaHT&pid=Api&P=0&h=180" },
  { name: "Curtains", category: "furniture", price: 1499, image: "http://4.bp.blogspot.com/-KdIaWwDL6jg/UoKcB3u5IaI/AAAAAAAADMA/fBx3bHaZqhs/s1600/living-room-interior-Design-with-sewing-curtains-curtains-living-room-Design-ideas-sewing+(7).jpg" }
];

const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const sortBy = document.getElementById("sortBy");
const cartItems = document.getElementById("cartItems");
const themeSelect = document.getElementById("themeSelect");
const searchInput = document.getElementById("searchInput");
const totalPrice = document.getElementById("totalPrice");

let cart = [];

function displayProducts(items) {
  productList.innerHTML = "";
  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy"/>
      <h3>${product.name}</h3>
      <p>₹${product.price.toLocaleString()}</p>
      <button onclick='addToCart("${product.name}", ${product.price})'>Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function applyFilters() {
  let filtered = [...products];
  const category = categoryFilter.value;
  const sort = sortBy.value;
  const search = searchInput.value.toLowerCase();

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
  }

  if (sort === "priceLowHigh") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "priceHighLow") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price.toLocaleString()}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  totalPrice.textContent = `Total: ₹${total.toLocaleString()}`;
}

// Event Listeners
categoryFilter.addEventListener("change", applyFilters);
sortBy.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);
themeSelect.addEventListener("change", () => {
  document.body.className = themeSelect.value + "-theme";
});

// Initialize
displayProducts(products);
