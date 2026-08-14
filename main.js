// ===============================
// MENU DATA
// ===============================
// ===============================
// DROPDOWN FILTER LOGIC
// ==============================
const categorySelect = document.getElementById("category-select");

categorySelect.addEventListener("change", function() {
    const selectedCategory = categorySelect.value;
    displayMenu(selectedCategory);
});

const menu = [
    {
        id: 1, name: "Nutella Crepe", price: 6, category: "crepe",
        image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600"
    },
    {
        id: 2, name: "Belgian Waffle", price: 7, category: "waffle",
        image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600"
    },
    {
        id: 3, name: "Chicken Crepe", price: 8, category: "crepe",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600"
    },
    {
        id: 4, name: "Ice Cream Waffle", price: 9, category: "waffle",
        image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=600"
    },
    {
        id: 5, name: "Strawberry Crepe", price: 7, category: "crepe",
        image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600"
    },
    {
        id: 6, name: "Chocolate Waffle", price: 8, category: "waffle",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600"
    },
    {
        id: 7, name: "Oreo Crepe", price: 8, category: "crepe",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600"
    },
    {
        id: 8, name: "Classic Waffle", price: 6, category: "waffle",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600"
    }
];
// ===============================
// CART
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const menuContainer = document.getElementById("menu-container");
const cartContainer = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

// ===============================
// SHOW MENU
// ===============================

// ===============================
// SHOW MENU
// ===============================
function displayMenu(categoryFilter = "all") {
    menuContainer.innerHTML = "";

    // Create a new list containing only the items that match the category
    let filteredMenu = menu;
    if (categoryFilter !== "all") {
        filteredMenu = menu.filter(item => item.category === categoryFilter);
    }

    filteredMenu.forEach(item => {
        menuContainer.innerHTML += `
        <div class="card">
            <img src="${item.image}" alt="${item.name}">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>Fresh and delicious.</p>
                <div class="price">$${item.price}</div>
                <button class="add-btn" onclick="addToCart(${item.id})">Add To Cart</button>
            </div>
        </div>
        `;
    });
}
// ===============================
// ADD TO CART
// ===============================

function addToCart(id){

    const product = menu.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            ...product,

            quantity:1

        });

    }

    saveCart();

    displayCart();

}
// ===============================
// DISPLAY CART
// ===============================

function displayCart(){

    if(cart.length===0){

        cartContainer.innerHTML="<p>Your cart is empty.</p>";

        totalPrice.textContent=0;

        return;

    }

    cartContainer.innerHTML="";

    let total=0;

    cart.forEach(item=>{

        total+=item.price*item.quantity;

        cartContainer.innerHTML+=`

        <div class="cart-item">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>$${item.price} × ${item.quantity}</p>

            </div>

            <div class="quantity">

                <button onclick="decreaseQuantity(${item.id})">-</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${item.id})">+</button>

                <button class="remove"
                onclick="removeItem(${item.id})">

                <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

        `;

    });

    totalPrice.textContent=total;

}

// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(id){

    const item=cart.find(product=>product.id===id);

    if(item){

        item.quantity++;

    }

    saveCart();

    displayCart();

}

// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(id){

    const item=cart.find(product=>product.id===id);

    if(!item) return;

    item.quantity--;

    if(item.quantity<=0){

        cart=cart.filter(product=>product.id!==id);

    }

    saveCart();

    displayCart();

}

// ===============================
// REMOVE ITEM
// ===============================

function removeItem(id){

    cart=cart.filter(product=>product.id!==id);

    saveCart();

    displayCart();

}
// ===============================
// SAVE CART
// ===============================

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// PLACE ORDER
// ===============================

const orderBtn = document.getElementById("order-btn");

orderBtn.addEventListener("click", placeOrder);

function placeOrder() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    let message = "🧾 Order Summary\n\n";

    cart.forEach(item => {
        message += `${item.name} x${item.quantity} - $${item.price * item.quantity}\n`;
    });

    message += `\nTotal: $${total}\n\n`;
    message += "Thank you for your order!";

    alert(message);

    cart = [];

    saveCart();

    displayCart();
}

// ===============================
// INITIALIZE WEBSITE
// ===============================

displayMenu();
displayCart();
// ===============================
// SCROLL TO TOP BUTTON
// ===============================
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show the button when scrolling down 300px from the top
window.addEventListener("scroll", function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});

// Scroll to the top when the button is clicked
scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});