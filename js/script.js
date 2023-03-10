const cartIcon = document.querySelector(".cart-icon");
const cartDropdown = document.querySelector(".cart-dropdown");
const cartItems = document.querySelector(".cart-items");
let cartCount = document.querySelector(".cart-count");
let cartTotal = document.querySelector(".total-price");

let productList = document.querySelector(".products-list");

const body = document.body;
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const closeModalBtn = document.querySelector(".close-modal-btn");

let cartProducts;

function toggleCartDropdown() {
  cartDropdown.classList.toggle("show-cart");
}

cartIcon.addEventListener("click", toggleCartDropdown);

(renderProducts = () => {
  // Loop through each product and create a string with HTML to display it
  let productListUI = products.map(
    ({
      product_id,
      product_desc,
      product_price,
      product_image,
      product_name,
      added_to_cart,
    }) => `<div class="product-card">
    <div class="product-img-wrap">
      <img
        src=${product_image}
        alt=${product_name}
        class="product-card-img"
      />
    </div>
    <div class="product-card-content">
      <div class="product-card-details">
        <h3 class="prduct-name">${product_name}</h3>
        <h4 class="product-price">${product_price} $</h4>
        <div class="product-desc">
         ${product_desc}
        </div>
      </div>
      <div class="product-card-buttons">
      ${
        added_to_cart
          ? `<div class="added-to-cart">
              <span>Added To Cart </span>
              <img
                src="./images/check-solid.svg"
                alt="added to cart"
                class="check-icon"
              />
              <img
                src="./images/xmark-solid.svg"
                alt="remove fromcrṁt"
                class="remove-icon"
                onclick="removeFromCart(${product_id})"
              />
            </div>`
          : `<div class="add-to-cart-btn" onclick="addToCart(${product_id})">
              <span>Add To Cart </span>
              <img src="./images/cart-plus-solid.svg" alt="add to cart" />
            </div>`
      }
      <div class="view-btn" onclick="showModal(${product_id})">
        <img src="./images/eye-solid.svg" alt="view product" />
      </div>
    </div>
    </div>
  </div>`
  );

  // Add HTML code to DOM
  productList.innerHTML = productListUI.join("");
})();

// A function that renders shopping cart UI based on the products added by user

(renderShoppingCart = () => {
  cartProducts = products.filter((product) => product.added_to_cart === true);
  if (cartProducts.length === 0) {
    cartItems.innerHTML = `<h4 class="empty-cart-items">No items in cart</h4>`;
    cartCount.innerText = "0";
    cartTotal.innerText = "0";
  } else {
    // Mapping over the filtered products to generate cart product UI elements
    let cartProductUI = cartProducts.map(
      ({ product_price, product_image, product_name }) =>
        `  <li class="cart-item">
    <img
      src=${product_image}
      alt=${product_name}
      class="cart-item-img"
    />
    <div class="cart-item-details">
      <h4 class="cart-item-name">${product_name}</h4>
      <span class="cart-item-price">${product_price} $</span>
    </div>
  </li>`
    );

    // Injecting the generated cart product UI into the HTML element with ID "cartItems"

    cartItems.innerHTML = cartProductUI.join("");

    // Updating the number of cart items in 'cartCount' HTML element

    cartCount.innerText = cartProducts.length;

    // Calculating total price of all the cart items and injecting it into 'cartTotal' HTML element

    let totalPrice = cartProducts.reduce((total, product) => {
      let price = parseFloat(product.product_price);
      return total + price;
    }, 0);

    cartTotal.innerText = totalPrice;
  }
})();

//Defines a function that takes in a product id as an argument and adds it to the cart
const addToCart = (productId) => {
  //uses find() method on products array to retrieve the product with the corresponding id
  let selectedProduct = products.find((product) => {
    return product.product_id === productId;
  });

  //sets the `added_to_cart` property of the selected product to true
  selectedProduct.added_to_cart = true;

  //adds the selected product to the `cartProducts` array using push() method
  cartProducts = [...cartProducts, selectedProduct];

  //calls renderShoppingCart() function to update the shopping cart UI after adding the product to the cart, and calls renderProducts() function to update the product list UI to reflect the

  renderShoppingCart();
  renderProducts();
};

//A function that removes a product from the cart if it exists.

const removeFromCart = (productId) => {
  let selectedProduct = products.find((product) => {
    return product.product_id === productId;
  });

  if (selectedProduct) {
    selectedProduct.added_to_cart = false;
    cartProducts = cartProducts.filter((product) => {
      return product.product_id !== productId;
    });

    renderShoppingCart();
    renderProducts();
  }
};

// This function renders the modal content based on the selected product ID:

const renderModalContent = (productId) => {
  // find the product that matches the selected product ID
  let {
    product_id,
    product_desc,
    product_price,
    product_image,
    product_name,
    added_to_cart,
  } = products.find((product) => product.product_id === productId);

  // create a string of HTML DOM elements to represent the modal content data
  let modalContent = `
  <div class="modal-header">
  <h4 class="modal-title">Product Details</h4>
  <img
    src="./images/circle-xmark-regular.svg"
    class="close-modal-btn"
    alt="close-modal"
    onclick="hideModal()"
  />
</div>
<div class="modal-content">
    <div class="modal-img-wrap">
      <img src=${product_image} alt=${product_name} class="modal-img" />
    </div>
    <div class="modal-details">
      <h3 class="modal-product-name">${product_name}</h3>
      <h4 class="modal-product-price">${product_price} $</h4>
    </div>
    <div class="modal-product-desc">${product_desc}</div>
    <div class="${added_to_cart ? "remove" : "add"}-modal-btn" onclick="${
    added_to_cart ? `removeFromCart(${product_id})` : `addToCart(${product_id})`
  };hideModal()">${added_to_cart ? "Remove From Cart" : "Add To Cart"}
  </div>
  </div>`;

  // Set the innerHTML of the modal content div to the created HTML string.
  modal.innerHTML = modalContent;
};

// A function that shows the modal by rendering its content

const showModal = (productId) => {
  // Render the modal content using the provided product ID
  renderModalContent(productId);
  modal.classList.remove("modal-closed");

  overlay.style.display = "block";
  body.style.overflow = "hidden";

  // Add event listener to the overlay only once when the modal is opened
  if (!overlay.hasAttribute("data-listener")) {
    overlay.setAttribute("data-listener", true);
    overlay.addEventListener("click", hideModal);
  }
};

// This function is called when we need to hide the modal element

const hideModal = () => {
  modal.classList.add("modal-closed");

  overlay.style.display = "none";
  body.style.overflow = "";

  // overlay.removeEventListener("click", hideModal);
};

// overlay.addEventListener("click", hideModal);
modal.addEventListener("click", (event) => event.stopPropagation());
