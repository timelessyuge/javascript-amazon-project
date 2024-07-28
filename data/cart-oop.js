// export let cart = JSON.parse(localStorage.getItem('cart'));
function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,
    
        loadFromStorage: function () {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)); // change spot
    
            if (!this.cartItems) { // change spot
                this.cartItems = [ // change spot
                    {
                        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                        quantity: 2,
                        deliveryOptionId: '1',
                    }, {
                        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                        quantity: 1,
                        deliveryOptionId: '2',
                    }
                ];
            }
        },
    
    
        saveToStorage() { // this is a shorthand method syntax
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
        addToCart(productId) {
            let matchingItem;
            this.cartItems.forEach(cartItem => {
                if (cartItem.productId === productId) {
                    matchingItem = this.cartItem;
                }
            });
        
            if (matchingItem) {
                matchingItem.quantity += 1;
            } else {
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: '1', // this is the default delivery option for a new item added to the cart.
                })
            }
        
            this.saveToStorage();
        
        },
    
        removeFromCart(productId) {
            const newCart = [];
            this.cartItems.forEach(cartItem => {
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
            });
        
            this.cartItems = newCart;
        
            this.saveToStorage();
        },
    
        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;
            this.cartItems.forEach(cartItem => {
                if (cartItem.productId === productId) {
                    matchingItem = cartItem;
                }
            });
        
            matchingItem.deliveryOptionId = deliveryOptionId;
        
            this.saveToStorage();
        }
    
    };

    return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");

cart.loadFromStorage();
console.log(cart);

businessCart.loadFromStorage();
console.log(businessCart);














