const cart = document.querySelector('.cart');
const clearButton = document.querySelector('.empty-cart');
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('input');
const p = document.createElement('p');
p.className = 'total-price';
cart.insertBefore(p, clearButton);
let query = '';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const displayTotalPrice = (totalPrice) => {
  p.innerText = `Subtotal: R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
};

const sumPrices = () => {
  let totalPrice = 0;
  const productList = document.querySelectorAll('.cart__item');
  productList.forEach((element) => {
    const position = (element.innerText).indexOf('$');
    const price = parseFloat((element.innerText.replaceAll(',', '.')).substring(position + 1));
    totalPrice += price;
  });
  displayTotalPrice(totalPrice);
  return totalPrice;
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function attCartList() {
  localStorage.clear('cartItems');
  const ol = document.querySelector('ol');
  saveCartItems(ol.innerHTML);
  sumPrices();
}

function cartItemClickListener(event) {
  const shopCart = document.querySelector('.cart__items');
  if (event.target.className === 'details_container') {
    shopCart.removeChild(event.target.parentElement);
  } else {
    shopCart.removeChild(event.target.parentElement.parentElement);
  }
  attCartList();
}

function loadSavedCart() {
  const savedProductList = getSavedCartItems();
  const ol = document.querySelector('ol');
  ol.innerHTML = savedProductList;
  const productList = document.querySelectorAll('.cart__item');
  productList.forEach((element) => {
    element.addEventListener('click', (event) => {
      cartItemClickListener(event);
    });
  });
  attCartList();
}

clearButton.addEventListener('click', () => {
  const ol = document.querySelector('ol');
  ol.innerHTML = '';
  localStorage.removeItem('cartItems');
  attCartList();
});

const loadingScreen = (param) => {
  if (param === 'add') {
    const itemsSection = document.querySelector('.items');
    itemsSection.appendChild(createCustomElement('p', 'loading', 'carregando...'));
  }
  if (param === 'remove') {
    const itemsSection = document.querySelector('.items');
    itemsSection.removeChild(itemsSection.childNodes[0]);
  }
};

function createCartItemElement({ title: name, price: salePrice, thumbnail: image }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = (`
    <div class='cart_item_img_container'>
      <img class='cart_item_img' src=${image}/>
    </div>
    <div class='details_container'>
      <span class='cart_item_name'>${name}</span>
      <span class='cart_item_price'>R$ ${salePrice.toFixed(2).replace('.', ',')}</span>
    </div>
  `);
  li.addEventListener('click', cartItemClickListener);
  const itemCart = document.querySelector('.cart__items');
  itemCart.appendChild(li);
  return li;
}

const addProductToCart = async (sku) => {
  const product = await fetchItem(sku);
  createCartItemElement(product);
  attCartList();
};

function createProductItemElement({ id: sku, title: name, thumbnail: image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image.replace('-I', '-O')));
  section.appendChild(createCustomElement(
    'span', 'item__price', `R$ ${price.toFixed(2).replace('.', ',')}`,
  ));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(button);
  button.addEventListener('click', async () => addProductToCart(sku));

  return section;
}

const createFetchProducts = async () => {
  loadingScreen('add');
  const itemsContainer = document.querySelector('.items');
  const productsArray = await fetchProducts(query);
  loadingScreen('remove');
  itemsContainer.innerHTML = '';
  productsArray.forEach((product) => {
    const productCard = createProductItemElement(product);
    itemsContainer.appendChild(productCard);
  });
};

searchButton.addEventListener('click', async () => {
  await createFetchProducts();
});

searchInput.addEventListener('keypress', (event) => {
  query = event.target.value;
  if (event.key === 'Enter') {
    event.preventDefault();
    searchButton.click();
  }
});

window.onload = () => {
  loadSavedCart();
};
