const fetchItem = async ($ItemID) => {
  // seu código aqui
  const END_POINT = `https://api.mercadolibre.com/items/${$ItemID}`;
  try {
    if (!$ItemID) {
      throw new Error('ERRO');
    } else {
      const response = await fetch(END_POINT);
      const result = await response.json();
      return result;
    }
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
