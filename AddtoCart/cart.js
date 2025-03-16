document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('#products-list');
    const cartItems = document.querySelector('#cart-items');
    const emptyCartMess = document.querySelector('#empty-cart');
    const cartTotal = document.querySelector('#cart-total');
    const totalPrice = document.querySelector('#total-price');
    const checkOutBtn = document.querySelector('#checkout-btn');

    const productsOnDisplay = [
        {
            id: 1,
            productName: 'Product 1',
            price: 250.90,
            image: 'https://via.placeholder.com/100'
        },
        {
            id: 2,
            productName: 'Product 2',
            price: 200.90,
            image: 'https://via.placeholder.com/100'
        },
        {
            id: 3,
            productName: 'Product 3',
            price: 150.11,
            image: 'https://via.placeholder.com/100'
        }
    ];

    let storeProduct =JSON.parse(localStorage.getItem('getProduct')) || [];

    // Display products
    productsOnDisplay.forEach((product) => {
        const addProducts = document.createElement('div');
        addProducts.setAttribute('class', 'product-card');
        addProducts.innerHTML = `
            <img src="${product.image}" alt="${product.productName}">
            <span>${product.productName} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(addProducts);
    });

    // Add product to cart
    productList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productID = parseInt(e.target.getAttribute('data-id'));
            const getProduct = productsOnDisplay.find(p => p.id === productID);
            storeProduct.push(getProduct);
            renderCart();
            saveLocalStorage();
        }
    });

    // Render the cart with updated total price
    function renderCart() {
        cartItems.innerHTML = '';
        let totalPrices = 0;

        if (storeProduct.length === 0) {
            emptyCartMess.classList.remove('hidden');
            cartTotal.classList.add('hidden');
            totalPrice.textContent = `$0.00`;
        } else {
            emptyCartMess.classList.add('hidden');
            cartTotal.classList.remove('hidden');

            storeProduct.forEach((product, index) => {
                totalPrices += product.price;
                const cartItem = document.createElement('div');
                cartItem.setAttribute('class', 'cart-item');
                cartItem.innerHTML = `
                    <img src="${product.image}" alt="${product.productName}">
                    <span>${product.productName} - $${product.price.toFixed(2)}</span>
                    <button class="delete-btn" data-index="${index}">Remove</button>
                `;
                cartItems.appendChild(cartItem);

                // Handle item removal
                cartItem.querySelector('.delete-btn').addEventListener('click', () => {
                    storeProduct.splice(index, 1);
                    renderCart();
                    saveLocalStorage();
                });
            });

            totalPrice.textContent = `$${totalPrices.toFixed(2)}`;
        }
    }

    // Checkout button to clear cart
    checkOutBtn.addEventListener('click', () => {
        storeProduct = [];
        renderCart();
        saveLocalStorage();
        cartTotal.classList.add('hidden');
    });

    // Save to localStorage
    function saveLocalStorage() {
        localStorage.setItem('getProduct', JSON.stringify(storeProduct));
    }

    // Initial render
    renderCart();
});
