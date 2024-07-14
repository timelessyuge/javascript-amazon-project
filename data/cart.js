export const cart = [];

export function addToCart(productId) {
  let hasThisItem = false;

  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      cartItem.quantity++;
      hasThisItem = true;
    }
  });

  if (!hasThisItem) {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
}



