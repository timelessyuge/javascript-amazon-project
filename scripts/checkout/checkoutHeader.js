export function renderCheckoutHeader(itemQuantity){  
  document.querySelector('.js-return-to-home-link-item-quantity')
    .textContent = `${itemQuantity} items`;
};