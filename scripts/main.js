document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Fetch products from JSON
    fetch("scripts/products.json")
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                // Create product card
                const card = document.createElement("div");
                card.className = "col";
                card.innerHTML = `
                    <div class="card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Price: ₹${product.price}</p>
                            <div class="rating">${generateStars(product.rating)}</div>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                `;
                productsContainer.appendChild(card);
            });

            // Attach event listeners to Add to Cart buttons
            document.querySelectorAll(".add-to-cart").forEach(button => {
                button.addEventListener("click", event => {
                    const productId = parseInt(event.target.getAttribute("data-id"));
                    const product = products.find(p => p.id === productId);
                    addToCart(product);
                });
            });
        })
        .catch(error => console.error("Error loading products:", error));

    // Generate star rating
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        return (
            "★".repeat(fullStars) +
            (halfStar ? "½" : "") +
            "☆".repeat(emptyStars)
        );
    }

    // Add product to cart
    function addToCart(product) {
        const existingProduct = cart.find(p => p.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} has been added to the cart!`);
    }
});
