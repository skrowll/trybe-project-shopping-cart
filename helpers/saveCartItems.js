const saveCartItems = (productList) => {
  const cartSaved = localStorage.setItem('cartItems', productList);
  return cartSaved;
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
