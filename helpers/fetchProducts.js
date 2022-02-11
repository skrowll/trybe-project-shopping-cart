const fetchProducts = async ($QUERY) => {
  // seu código aqui
  const END_POINT = `https://api.mercadolibre.com/sites/MLB/search?q=${$QUERY}`;
  try {
    const response = await fetch(END_POINT);
      const { results } = await response.json();
      return results;
    } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
