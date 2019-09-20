import * as json from './transactions.json';

const {list} = json;
const transactionsBody = document.getElementsByClassName('list-body');
const invoiceBody = document.getElementsByClassName('invoice-list-body');
const showInvoice = $('#newInvoice');
const showInvoiceModal = $('#newInvoiceModal');
const form = $('#newInvoiceData');
let store = {};


showInvoice.click(function() {
    showInvoiceModal.show();
})

$('.btn-close').click(function() {
    showInvoiceModal.toggle();
})


$('.btn-save').click(function(e) {
        var elements = document.getElementById("newInvoiceData").elements;
        var obj ={};
        for(var i = 0 ; i < elements.length ; i++){
            var item = elements.item(i);
            obj[item.name] = item.value;
        }
    
        console.log("Form", obj); // {name: "Rupesh", amount: "10", radio: "on"}
        storeDataAndRender(obj);
});

function storeDataAndRender(obj) {
    if(!store['invoices']) {
        store['invoices'] = [];
    }
    store['invoices'].push(obj);
    renderInvoices();
}

function renderInvoices() {
    $('.invoice-list-body').empty();
    const list = store['invoices'];
    list.forEach((each, i) => {
        let id = i+1;
        const { name, radio, amount } = each;

        const tr = document.createElement('tr');
        const th = document.createElement('th');

        const nameNode = document.createElement('td');
        nameNode.innerText = name;

        const amountNode = document.createElement('td');
        amountNode.innerText = amount;

        const statusNode = document.createElement('td');
        const status = radio === 'on' ? 'Paid':'unpaid';
        statusNode.innerText = status;

        th.scope = 'row';
        th.innerText = id;
        tr.appendChild(th);
        tr.appendChild(nameNode);
        tr.appendChild(amountNode);
        tr.appendChild(statusNode);

        // debugger;
        invoiceBody[0].appendChild(tr);
    });
    showInvoiceModal.toggle();
}

function buildList() {
    list.forEach(each => {
        const {id, name, description, date, amount } = each;

        const tr = document.createElement('tr');
        const th = document.createElement('th');

        const nameNode = document.createElement('td');
        nameNode.innerText = name;

        const descNode = document.createElement('td');
        descNode.innerText = description;

        const dateNode = document.createElement('td');
        dateNode.innerText = date;

        const amountNode = document.createElement('td');
        amountNode.innerText = amount;

        th.scope = 'row';
        th.innerText = id;
        tr.appendChild(th);
        tr.appendChild(nameNode);
        tr.appendChild(descNode);
        tr.appendChild(dateNode);
        tr.appendChild(amountNode);

        // debugger;
        transactionsBody[0].appendChild(tr);
    });

}

buildList();

const returnList = () => {
    fetch('https://api.jikan.moe/v3/anime/1')
    .then(res => res.json())
    .then(val => console.log(val));
}



// Client
function mockDataService (url) {
    client2(url)
        .then(function(res) {
            filterData(res);
    }).catch(err => console.log("error", err));
};

// {id_response: 1 , item: 'ipad', price: 300 }
function filterData(res) {
    const {id_response} = res;

    const filteredRes = store['list'].filter(each => {
        const {id} = each;

        return id === id_response;
    }); 
    /*
        [{
            id: 1,
            name: 'Rupesh',
            description: 'Transaction for iPad',
            date: 'Thu Aug 29 2019 12:46:57 GMT-0700 (Pacific Daylight Time)',
            amount: '$300',
            status: 'unpaid'
        }]
    */
   renderInvoicesList(filteredRes);
}


// components/invoice.js
function renderInvoicesList(data) {
    data.forEach(each => {
        const {id, name, description, amount, status} = each;

        const tr = document.createElement('tr');
        const td = document.createElement('td');
    });
}


function fetchFactoryData(url) {
    return fetch(url)
        .then(res => res.json())
        .then(result => {
            // success
        }).catch((err) => {
            console.error("Exception", err);
        })
}

function unhandledExceptionHandler() {

}

function demo(url) {
    // does something.
    return new Promise(function(resolve, reject) => {
        setTimeout(function() {
            reject("Exception");
        }, 1000);
    });
}

function retryPromise(fn, limit=3, args) {
    return new Promise((resolve, reject) => {
        fn(...args).then(function(res){
            // Hurray!
            resolve(res);
        }).catch(e => {
            if(limit === 0) reject("error")
            retryPromise(fn, limit-1, args);
        });
    });
}

// Caller
const client = new retryPromise(demo, 3, ['http://google.com');
client.then( res => console.log(res))
      .catch(e => console.error("errr", e));

// Caller for fn


const client2 = new retryPromise(fetchFactoryData, 3, ['http://google.com']);
client2.then( res => console.log(res))
        .catch(e => console.error('err', e));

export default returnList;