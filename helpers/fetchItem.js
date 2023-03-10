const fetchItem = async ($ItemID) => {
  const END_POINT = `https://api.mercadolibre.com/items/${$ItemID}`;
  try {
    const response = await fetch(END_POINT);
    const result = await response.json();
    return result;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
