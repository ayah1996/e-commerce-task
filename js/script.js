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

(renderProducts = () => {
  let productListUI = products.map((product) => {
    return `<div class="product-card">
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
      <div class="add-to-cart-btn" onclick="addToCart(${product.product_id})">
        <span>Add To Cart </span>
        <img src="./images/cart-plus-solid.svg" alt="add to cart" />
      </div>
      <div class="added-to-cart">
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
        />
      </div>
      <div class="view-btn">
        <img src="./images/eye-solid.svg" alt="view product" />
      </div>
    </div>
    </div>
  </div>`;
  });
  productList.innerHTML = productListUI.join("");
})();

(renderShoppingCart = () => {
  cartProducts = products.filter((product) => {
    return product.added_to_cart === true;
  });
  let cartProductUI = cartProducts.map((product) => {
    return `  <li class="cart-item">
    <img
      src=${product.product_image}
      alt=${product.product_name}
      class="cart-item-img"
    />
    <div class="cart-item-details">
      <h4 class="cart-item-name">${product.product_name}</h4>
      <span class="cart-item-price">${product.product_price} $</span>
    </div>
  </li>`;
  });

  cartItems.innerHTML = cartProductUI.join("");
  cartCount.innerText = cartProducts.length;

  let totalPrice = cartProducts.reduce((total, product) => {
    let price = parseFloat(product.product_price);
    return total + price;
  }, 0);
  cartTotal.innerText = totalPrice;
})();

let addToCart = (productId) => {
  console.log(
    "OUTPUT ~ file: script.js:93 ~ addToCart ~ productId:",
    productId
  );
  console.log("test");
  let selectedProduct = products.find((product) => {
    return product.product_id === productId;
  });

  selectedProduct.added_to_cart = true;
  cartProducts.push(selectedProduct);
  renderShoppingCart();
};

console.log(
  "OUTPUT ~ file: script.js:95 ~ addToCart ~ cartProducts:",
  cartProducts
);
