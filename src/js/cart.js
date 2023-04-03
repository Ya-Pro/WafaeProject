let cartIcon = document.querySelector(".cart_icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector(".close_cart");
cartIcon.addEventListener("click", () => {
  cart.classList.toggle("active");
});
closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});
// start from the document stop
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
// =============== function start =================
function start() {
  addEvents();
}
// update content function and render
function upDate() {
  addEvents();
  updateTotal();
}
// addevents function
function addEvents() {
  // removeItems
  let removeItem = document.querySelectorAll(".remove_product");
  removeItem.forEach((btn) => {
    btn.addEventListener("click", removeProduct);
  });
  //   change Item quantity
  let totalQuantity = document.querySelectorAll(".quantity");
  totalQuantity.forEach((input) => {
    input.addEventListener("change", handleTotalPrice);
  });
  //   add products to the cart
  let addToCart = document.querySelectorAll(".add_cart");
  addToCart.forEach((add) => {
    add.addEventListener("click", addProductToCart);
    add.addEventListener("click", () => {
      // increase number of products in shopping cart
      let productNumber = document.querySelector(".cart_icon span");
      productNumber.classList.add("show_number");
      productNumber.innerHTML = itemsAdded.length;
    });
  });
}
// add products to the cart
let itemsAdded = [];
function addProductToCart() {
  let product = this.parentElement;
  let imgS = product.querySelector(".product_img").src;
  let title = product.querySelector(".product_title").innerHTML;
  let price = product.querySelector(".product_price").innerHTML;
  console.log(price, title, imgS);
  let newToAdd = {
    imgS,
    title,
    price,
  };
  //   handle item it already exit
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    let popup = document.querySelector(".popup");
    popup.classList.add("show_popup");
    let popupButton = popup.querySelector("button");
    let popupP = popup.querySelector("p");
    popupP.innerHTML = `Your order has been successfully added to the cart !`;
    popupButton.addEventListener("click", () => {
      popup.classList.remove("show_popup");
    });
    return;
  } else {
    itemsAdded.push(newToAdd);
  }
  // add product to cart
  let cartBoxElement = cartContentElements(imgS, title, price);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  let insideCartContent = cart.querySelector(".cart_content");
  insideCartContent.appendChild(newNode);
  upDate();
}
// remove products from the cart
function removeProduct() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title != this.parentElement.querySelector(".cart_title").innerHTML
  );
  let productNumber = document.querySelector(".cart_icon span");
  productNumber.innerHTML -= 1;
  upDate();
}
// handleTotalPrice function
function handleTotalPrice() {
  if (isNaN(this.value) || this.value < 0) {
    this.value = 1;
  }
  this.value = Math.floor(this.value);
  upDate();
}
// the update of total amount
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart_box");
  let totalPrice = document.querySelector(".total_price");
  let total = 0;
  cartBoxes.forEach((cartB) => {
    let contentPrice = cartB.querySelector(".cart_price");
    let price = parseFloat(contentPrice.innerHTML.replace("$", ""));
    let quantity = cartB.querySelector(".quantity").value;
    total += price * quantity;
  });
  totalPrice.innerHTML = total + "$";
}

// cartContent
// ======================= HTML COMPONENTS=======================
function cartContentElements(imgS, title, price) {
  return `
            <div class="cart_box">
                <img src=${imgS} alt="makeup">
                <div class="cart_details">
                <p class="cart_title">${title}</p>
                    <h4 class="cart_price">${price}</h4>
                    <input type="number" value ="1" name="price" class="quantity">
                </div>
                <i class="fas fa-trash remove_product"></i>
            </div>
     `;
}
// buy products
let buyBtn = document.querySelector(".buy_button");
buyBtn.addEventListener("click", () => {
  if (itemsAdded.length <= 0) {
    let popup = document.querySelector(".popup");
    popup.classList.add("show_popup");
    let popupButton = popup.querySelector("button");
    let popupP = popup.querySelector("p");
    popup.firstElementChild.style.display = "none";
    popup.lastElementChild.style = "background-color:red;";
    popupP.innerHTML = `Your cart is empty please fill it  !`;
    popupButton.addEventListener("click", () => {
      popup.classList.remove("show_popup");
    });
  } else {
    let cartC = document.querySelector(".cart_content");
    cartC.innerHTML = "";
    alert("Your products have been added Successfully 😍");
    itemsAdded = [];
  }

  upDate();
});
// continue shopping button

let continueShopping = document.querySelector(".continue_shopping");
continueShopping.addEventListener("click", () => {
  cart.classList.remove("active");
});
