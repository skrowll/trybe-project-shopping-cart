function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// ============================================================================================== //

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  const itemCart = document.querySelector('.cart__items');
  itemCart.appendChild(li);
  return li;
}

const addProductToCart = async (sku) => {
  const product = await fetchItem(sku);
  createCartItemElement(product);
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  // section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(button);
  button.addEventListener('click', async () => addProductToCart(sku));
  
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const createFetchProducts = async () => {
  const showProducts = document.querySelector('.items');
  showProducts.innerText = 'carregando...';
  const productsArray = await fetchProducts('computador');
  showProducts.innerText = null;
  productsArray.forEach((product) => {
    const productCard = createProductItemElement(product);
    showProducts.appendChild(productCard);
  });
};

window.onload = async () => { 
  await createFetchProducts();
};
