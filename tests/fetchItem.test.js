require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  it('Verifica se `fetchItem` é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Verifica se fetch foi chamada ao executar a função fetchItem com o argumento `MLB1615760527`', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se ao chamar a função fetchItem com o argumento `MLB1615760527`, a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527".', async () => {
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  it('Verifica se o retorno da função fetchItem com o argumento `MLB1615760527` é uma estrutura de dados igual ao objeto `item`, que já está importado no arquivo.', async () => {
    const fecthItem = await fetchItem('MLB1615760527');
    expect(fecthItem).toEqual(item);
  });

  it('Verifica se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    const fecthItem = await fetchItem();
    expect(fecthItem).toEqual(new Error('You must provide an url'));
  });
});
