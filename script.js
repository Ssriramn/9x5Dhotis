const productsContainer = document.querySelector("#products");

const renderError = (message) => {
  productsContainer.innerHTML = `<p class="card">${message}</p>`;
};

const formatPrice = (price) => `₹${Number(price).toLocaleString("en-IN")}`;

const renderProducts = (items) => {
  if (!items.length) {
    renderError("No products available right now.");
    return;
  }

  productsContainer.innerHTML = items
    .map((product) => {
      const name = product.name || "Dhoti";
      const price = formatPrice(product.price ?? 0);
      const stock = product.stock ?? 0;
      return `
        <article class="card">
          <h3>${name}</h3>
          <p>${price}</p>
          <p>${stock} in stock</p>
          <a class="wa" href="https://wa.me/919999999999?text=I'm%20interested%20in%20${encodeURIComponent(
            name
          )}" target="_blank" rel="noopener noreferrer">Order on WhatsApp</a>
        </article>
      `;
    })
    .join("");
};

const loadProducts = async () => {
  try {
    const response = await fetch("data/products.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to load products.");
    }
    const data = await response.json();
    renderProducts(data.filter((product) => product.active));
  } catch (error) {
    renderError("Unable to load products. Please try again later.");
  }
};

loadProducts();
