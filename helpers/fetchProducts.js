const fetchProducts = async ($QUERY) => {
  // seu código aqui
  const END_POINT = `https://api.mercadolibre.com/sites/MLB/search?q=${$QUERY}`;
  try {
    if (!$QUERY) {
      throw new Error('ERRO');
    } else {
      const response = await fetch(END_POINT);
      const { results } = await response.json();
      return results;
    }
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
