document.addEventListener("DOMContentLoaded", () => {
    const cartItemsTable = document.querySelector("#cart-items tbody");
    const cartSummary = document.getElementById("cart-summary");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Render Cart Items
    function renderCart() {
        cartItemsTable.innerHTML = "";
        let totalAmount = 0;

        cart.forEach((product, index) => {
            const total = product.price * product.quantity;
            totalAmount += total;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>₹${product.price}</td>
                <td>
                    <input type="number" value="${product.quantity}" min="1" class="form-control quantity-input" data-index="${index}">
                </td>
                <td>₹${total}</td>
                <td>
                    <button class="btn btn-danger remove-btn" data-index="${index}">Remove</button>
                </td>
            `;
            cartItemsTable.appendChild(row);
        });

        cartSummary.innerHTML = `
            <h4>Cart Summary</h4>
            <p>Total Amount: ₹${totalAmount}</p>
            <button class="btn btn-success" id="checkout-btn">Proceed to Checkout</button>
        `;

        attachEventListeners();
    }

    // Update Quantity
    function updateQuantity(index, quantity) {
        cart[index].quantity = parseInt(quantity, 10);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    // Remove Item
    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    // Attach Event Listeners
    function attachEventListeners() {
        document.querySelectorAll(".quantity-input").forEach(input => {
            input.addEventListener("change", event => {
                const index = event.target.getAttribute("data-index");
                updateQuantity(index, event.target.value);
            });
        });

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", event => {
                const index = event.target.getAttribute("data-index");
                removeItem(index);
            });
        });

        document.getElementById('checkout-btn').addEventListener('click', function () {
            // Here, you can generate an order ID or fetch it from the backend
            const orderId = Math.floor(Math.random() * 100000); // Example random order ID
        
            // Redirect to success page with the order ID
            window.location.href = `success.html?orderId=${orderId}`;
        });
        
    }

    renderCart();
});
