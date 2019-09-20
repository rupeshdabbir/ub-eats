import * as json from './transactions.json';
const { list } = json;
const transactionsBody = document.getElementsByClassName('list-body');
const showCart = $('#newInvoice');
const showInvoiceModal = $('#newInvoiceModal');

// Global States
const cart = {};
let GlobalStore = {};


// Buid List.
function buildList() {
  returnList();
}

// eslint-disable-next-line no-use-before-define
returnList();

/* 
 *  Helper Method to call fetch() to read the data.
 */
function returnList() {
  fetch('https://dtmqucifgb.execute-api.us-east-2.amazonaws.com/prod/restaurants')
    .then((res) => res.json())
    .then((val) => {
      console.log(val);
      renderList(val);
    });
}

/* 
 *  Render List.
 */
function renderList(data) {
  GlobalStore = Object.assign({}, data);
  const { itemsMap, ingredientsMap } = data.store;

  const itemsArr = Object.values(itemsMap);

  itemsArr.forEach((each) => {
    const {
      imageUrl, title, itemDescription, price, ingredients, uuid
    } = each;
    const ingredientsMapping = [];
    ingredients.forEach((eachIng) => {
      if (ingredientsMap[eachIng]) {
        ingredientsMapping.push(ingredientsMap[eachIng]);
      }
    });

    const tr = document.createElement('tr');
    // const th = document.createElement('th');

    const imgNode = document.createElement('img');
    imgNode.src = imageUrl;
    imgNode.height = 100;
    imgNode.width = 100;

    const titleNode = document.createElement('td');
    titleNode.innerText = title;

    const descNode = document.createElement('td');
    descNode.innerText = itemDescription;

    const priceNode = document.createElement('td');
    priceNode.innerText = price;

    const ingredientsNode = document.createElement('td');
    ingredientsNode.innerText = ingredientsMapping;

    const buttonTD = document.createElement('td');

    const addCartButton = document.createElement('button');
    addCartButton.classList.add('addCart');
    addCartButton.classList.add('btn');
    addCartButton.classList.add('btn-primary');
    addCartButton.innerHTML = 'Add Item';
    addCartButton.uuid = uuid;

    buttonTD.appendChild(addCartButton);

    tr.appendChild(imgNode);
    tr.appendChild(titleNode);
    tr.appendChild(descNode);
    tr.appendChild(priceNode);
    tr.appendChild(ingredientsNode);
    // tr.appendChild(addCartButton);
    tr.appendChild(buttonTD);

    transactionsBody[0].appendChild(tr);
  });

  $('.addCart').click(addToCart);

showCart.click(function() {
    showInvoiceModal.show();
    showInvoiceData();
})

$('.btn-close').click(function() {
    showInvoiceModal.toggle();
})

function showInvoiceData() {
    const transactionsBody = document.getElementsByClassName('checkout-list-body');
    
    console.log("Cart", cart);
    const values = Object.values(cart);
    const storeMap = GlobalStore.store.itemsMap;
    let total = 0;

    values.forEach(eachItem => {
        const {uuid, quantity} = eachItem;
        const {title, price, taxRate} = storeMap[uuid];

        console.log("Qualitity", quantity);

        const tr = document.createElement('tr');

        const titleNode = document.createElement('td');
        titleNode.innerText = title;

        const priceNode = document.createElement('td');
        priceNode.innerText = price;

        const taxNode = document.createElement('td');
        taxNode.innerText = taxRate;

        const totalNode = document.createElement('td');
        totalNode.innerText = Number(price)+ Number(taxRate);
        total += Number(price)+ Number(taxRate);

        const quantityNode = document.createElement('td');
        quantityNode.innerText = Number(quantity);

        tr.appendChild(titleNode);
        tr.appendChild(priceNode);
        tr.appendChild(taxNode);
        tr.appendChild(totalNode);
        tr.appendChild(quantityNode);

        transactionsBody[0].appendChild(tr);

    });

    const grandTotal = document.createElement('div');
    grandTotal.innerText = `Your Grand Total: ${total}`;

    transactionsBody[0].appendChild(grandTotal);
}

  function addToCart(e) {
    console.log("E", e);
    const { uuid } = e.currentTarget;
    if(!cart[uuid]) {
        cart[uuid] = {};
        cart[uuid]['quantity'] = 1;
        cart[uuid]['uuid'] = uuid;
    } else {
        cart[uuid]['quantity']++;
    }

    console.log('cart', cart);
  }
}

$('.btn-save').click(function(e) {
    const cartValues = Object.values(cart);
    const postData = {};
    postData['items'] = [];
    postData['items'] = [...postData['items'], cartValues];

    console.log("Before Sending", postData);

    fetch('https://dtmqucifgb.execute-api.us-east-2.amazonaws.com/prod/orders', {
        method: 'post',
        body: JSON.stringify(cartValues)
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log("Success");
        showInvoiceModal.toggle();
      });
});

// export default returnList;
