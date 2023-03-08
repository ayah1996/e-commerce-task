let cartIcon = document.querySelector(".cart-icon");
let cartDropdown = document.querySelector(".cart-dropdown");

let cartItems = document.querySelector(".cart-items");
let cartCount = document.querySelector(".cart-count");
let cartTotal = document.querySelector(".total-price");
let productList = document.querySelector(".products-list");

let cartProducts = [];

cartDropdown.style.display = "none";

cartIcon.addEventListener("click", () => {
  cartDropdown.style.display =
    cartDropdown.style.display === "none" ? "flex" : "none";
});

// Display All Products
(renderProducts = () => {
  // Loop through each product and create a string with HTML to display it
  let productListUI = products.map(
    (product) => `<div class="product-card">
    <div class="product-img-wrap">
      <img
        src=${product.product_image}
        alt=${product.product_name}
        class="product-card-img"
      />
    </div>
    <div class="product-card-content">
      <div class="product-card-details">
        <h3 class="prduct-name">${product.product_name}</h3>
        <h4 class="product-price">100 $</h4>
        <div class="product-desc">
         ${product.product_desc}
        </div>
      </div>
      <div class="product-card-buttons">
      <!--
      if statement to show whether or not the product has been added to cart,
      and provide buttons/links for 'Add to Cart', 'Remove from Cart', and 'View Product'
    -->
      ${
        product.added_to_cart
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
                onclick="removeFromCart(${product.product_id})"
              />
            </div>`
          : `<div class="add-to-cart-btn" onclick="addToCart(${product.product_id})">
              <span>Add To Cart </span>
              <img src="./images/cart-plus-solid.svg" alt="add to cart" />
            </div>`
      }
      <div class="view-btn">
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
  // Filtering out the products which have been added to cart

  cartProducts = products.filter((product) => product.added_to_cart === true);

  // Mapping over the filtered products to generate cart product UI elements

  let cartProductUI = cartProducts.map(
    (product) =>
      `  <li class="cart-item">
    <img
      src=${product.product_image}
      alt=${product.product_name}
      class="cart-item-img"
    />
    <div class="cart-item-details">
      <h4 class="cart-item-name">${product.product_name}</h4>
      <span class="cart-item-price">${product.product_price} $</span>
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
})();

//defines a function that takes in a product id as an argument and adds it to the cart
let addToCart = (productId) => {
  //uses find() method on products array to retrieve the product with the corresponding id
  let selectedProduct = products.find((product) => {
    return product.product_id === productId;
  });

  //sets the `added_to_cart` property of the selected product to true
  selectedProduct.added_to_cart = true;

  //adds the selected product to the `cartProducts` array using push() method
  cartProducts.push(selectedProduct);

  //calls renderShoppingCart() function to update the shopping cart UI after adding the product
  //to the cart, and calls renderProducts() function to update the product list UI to reflect the
  //updated state of the selected product
  renderShoppingCart();
  renderProducts();
};

let removeFromCart = (productId) => {
  let selectedProduct = products.find((product) => {
    return product.product_id === productId;
  });

  if (selectedProduct) {
    selectedProduct.added_to_cart = false;
    let selectedProductIndex = cartProducts.indexOf(selectedProduct);
    cartProducts.splice(selectedProductIndex, 1);
    renderShoppingCart();
    renderProducts();
  }
};
