const cartCount = document.querySelector('.cart-count');
const totalPrice = document.querySelector('.total');
const phonesWrapper = document.querySelector('.phones');
const cartItemsList = document.querySelector('.cart-items');
const addButtons = document.querySelectorAll('.add-btn');
const modelContainer = document.querySelectorAll('.model');
const clear = document.querySelector('.clear');

let count = 0;
let cartItems = [];
let total = 0;

addButtons.forEach(btn => {
    
    btn.addEventListener('click', e => {
        const parent = e.target.closest('.model');
        
        const event = new CustomEvent('phoneAdded', {
            bubbles: true,
            detail: { name: parent.dataset.name,
                price: parent.dataset.price
             }
        })
        
        btn.dispatchEvent(event);
        
    })
})


document.addEventListener('phoneAdded', e => {

    const model = { 
         name: e.detail.name,
         price: e.detail.price   
     }

     addToCartList(model);
     updateItemsList()
     updateTotalPrice();

     console.log(cartItems);
     
})

function addToCartList(item) {
    cartItems.push(item)
    cartCount.textContent = cartItems.length;
}

function updateTotalPrice() {
    total = cartItems.reduce( (total, item) => total += +item.price, 0);
    totalPrice.textContent = `$${total}`;
}


function updateItemsList() {
    cartItemsList.replaceChildren();   

    cartItems.forEach( item => {
       
        const newItem = document.createElement('li');
        const newItemName = document.createElement('p');
        const newItemPrice = document.createElement('span');
        
        const name = item.name;
        const price = item.price;
    
      
        newItemName.textContent = name;
        newItemPrice.textContent = price;

        newItem.append(newItemName, newItemPrice);
        cartItemsList.append(newItem);

        

    })
}

function clearCart() {
    cartItems = [];
    updateItemsList();
    updateTotalPrice(); 
    cartCount.textContent = 0;
}

clear.addEventListener('click', clearCart);