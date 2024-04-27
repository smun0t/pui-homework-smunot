
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

let cart = [];
let totalPrice= 0;  


const packDict = {"1": 1, "3": 3, "6": 5, "12": 10};
const glazingDict = {
	"Keep original": 0.0,
	"Sugar milk": 0.0,
	"Vanilla milk": 0.50,
	"Double chocolate": 1.50};


/* 
//HW 5
//hard coded values for testing 


const item04 = new Roll('Apple','Keep original',3, rolls.Apple.basePrice)
cart.push(item04);

const item03 = new Roll('Raisin','Sugar milk', 3 ,rolls.Raisin.basePrice)
cart.push(item03);

const item02 = new Roll('Walnut', 'Vanilla milk', 12,rolls.Walnut.basePrice)
cart.push(item02);

const item01 = new Roll('Original','Sugar milk',1 ,rolls.Original.basePrice)
cart.push(item01);
console.log(cart)

*/



function removeClick(item) {
    if(cart.length !== 0){
		item.element.remove();
		cart.pop(item);
        delItemPrice = findItemPrice(item) * 1
        // MULTIPLYING BY 1 TO CHANGE TYPE TO NUMBER FROM STRING
		totalPrice = totalPrice - delItemPrice;
        totalPrice = totalPrice.toFixed(2);
		document.querySelector(".cart-total-price").innerText = totalPrice;
    
	}

    saveCartLocal()

    document.querySelector('.notification').textContent = cart.length.toString();
}

function createCartElem(item) {
    //Clone the cart item template
	const template = document.querySelector('#cart-template');
	const clone = template.content.cloneNode(true);
	item.element = clone.querySelector('.cart-item-outer');

	// Add the cloned element to the cart list
	const cartListElem = document.querySelector(".cart-list");
	cartListElem.prepend(item.element);

    const deleteButton = document.querySelector('.remove');

    // DEBUGGING OF THIS PART IS IMPORTANT 

    //console.log(deleteButton); // check if this is null
    deleteButton.addEventListener("click", () => {
    //console.log("deletion activated");
    removeClick(item);
    });
    

	// Update the element content
	makeChanges(item);
}


function makeChanges(item) {
	// Step 1: Get HTML elements that need updating
    const size = item.element.querySelector("#cart-desc-size");

	const price= item.element.querySelector("#cart-price");

	const image = item.element.querySelector("#cart-img");

	const glazing =item.element.querySelector("#cart-desc-glazing");

    const type = item.element.querySelector("#cart-desc-type");

    //console.log("size is " + size.innerText);
	// Step 2: Update content
	image.src ="../assets/products/" +rolls[item.type].imageFile;
	size.innerText= "Pack Size:" + " " + item.size;
    type.innerText = item.type + " "+ "Cinnamon Roll";
	glazing.innerText = "Glazing:" + " " + item.glazing;

	// Step 3: Calculate and update total price of the item

    itemTotal = findItemPrice(item)
	price.innerHTML = "<br> $" + itemTotal;
    itemTotalNum = itemTotal *1;
    //console.log(typeof itemTotalNum);

    totalPrice = totalPrice + itemTotalNum;
    //console.log(totalPrice)

    price.innerHTML = "<br> $" + itemTotal;
    document.querySelector(".cart-total-price").innerText =  totalPrice.toFixed(2);
    document.querySelector('.notification').textContent = cart.length.toString();
    saveCartLocal()
}


function findItemPrice(item) {  
    //printing:
    //console.log("bp is " + rolls[item.type].basePrice);
    //console.log("gp is " + glazingDict[item.glazing]);
    //console.log("pp is " + packDict[String(item.size)]);

    itemTotal = ((rolls[item.type].basePrice + glazingDict[item.glazing])) * packDict[String(item.size)];
    itemTotal =itemTotal.toFixed(2);
    //console.log("tp for item is " + itemTotal);
    //console.log(typeof itemTotal);
    return itemTotal;
  }



for (const newItem of cart) {
	createCartElem(newItem);
  }

// Function to retrieve cart from local storage and populate DOM with items
function retrieveLocal() {
    const cartListString = localStorage.getItem('cartItems');
    console.log(cartListString);
    if (cartListString) {
        const localCart = JSON.parse(cartListString);
        let i=0;
        while (i < localCart.length) {
            const rollInfo = localCart[i];
            const item = new Roll(rollInfo.type, rollInfo.glazing, rollInfo.size, rollInfo.basePrice);
            cart.push(item);
            createCartElem(item)
            i++;
        }
    }
}

retrieveLocal();

function saveCartLocal() {
    let cartListString = JSON.stringify(Array.from(cart));
    console.log(cartListString);
    localStorage.setItem('cartItems', cartListString);
}