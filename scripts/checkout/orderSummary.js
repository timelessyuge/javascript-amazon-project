import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions, getDateString, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';


export function renderOrderSummary() {
  let cartItemsHTML = '';

  cart.forEach((cartItem) => {
    const matchingItem = getProduct(cartItem.productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = getDateString(deliveryOption);

    cartItemsHTML += `
    <div class="cart-item-container 
      js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingItem.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  ${matchingItem.getPrice()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options" 
                data-product-id="${matchingItem.id}">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingItem, cartItem)}
              </div>
            </div>
          </div>
  `;
  });



  function deliveryOptionsHTML(matchingItem, cartItem) {

    let html = '';

    deliveryOptions.forEach(deliveryOption => {
      
      const dateString = getDateString(deliveryOption);

      /*
      let priceString;
  
      if(optionPriceCents === 0) {
        priceString = 'FREE Shipping';
      } else {
        priceString = `$${formatCurrency(optionPriceCents)} - Shipping`;
      }
        */

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;


      html += `<div class="delivery-option js-delivery-option" 
              data-product-id="${matchingItem.id}"
              data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio" 
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}"
                    >
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>
                `;

    });
    return html;
  }

 
  document.querySelector('.js-order-summary')
    .innerHTML = cartItemsHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);      
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        const itemQuantity = renderPaymentSummary();
        renderCheckoutHeader(itemQuantity);
      })
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach(element => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      })
    })


}




