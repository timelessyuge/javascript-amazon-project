import { cart } from "../../data/cart.js";

export function renderCheckoutHeader(){
  let itemQuantity = 0;
  cart.forEach(cartItem => {
    itemQuantity += cartItem.quantity;
  })
  document.querySelector('.js-return-to-home-link-item-quantity')
    .textContent = `${itemQuantity} items`;
};