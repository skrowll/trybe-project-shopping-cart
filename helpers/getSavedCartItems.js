const getSavedCartItems = () => {
  const cartSaved = localStorage.getItem('cartItems');
  return cartSaved;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
