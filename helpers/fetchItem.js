const fetchItem = async (id) => {
  // seu código aqui
  const END_POINT = `https://api.mercadolibre.com/sites/MLB/search?q=${id}`;
  try {
    if (!id) {
      throw new Error('ERRO');
    } {
      const response = await fetch(END_POINT);
      const result = response.json();
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
