require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  it('Verifica se `fetchProducts` é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifica se fetch foi chamada ao executar a função fetchProducts com o argumento `computador`', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se ao chamar a função fetchProducts com o argumento `computador`, a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador".', async () => {
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  it('Verifica se o retorno da função fetchProducts com o argumento `computador` é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const fecthProducts = await fetchProducts('computador');
    expect(fecthProducts).toEqual(computadorSearch.results);
  });

  it('Verifica se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    const fecthProducts = await fetchProducts();
    expect(fecthProducts).toEqual(new Error('You must provide an url'));
  });
});


