//HW#4

// create empty cart array
var cartList=[];

//code from hw instructions: class definition
//When the user clicks on “Add to Cart,” save all of the current product information 
//(roll type, glazing, pack size, base price) into an instance of the class Roll. 

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}


// get everything after ? in url 
//given in hw instructions:
const qString = window.location.search; 
console.log(qString);

// organises search parameters as key value pairs
//given in hw instructions:
const parameters = new URLSearchParams(qString);
console.log(parameters);


//get the string of the type selected (the value to the key "roll")
const chosenType=parameters.get('roll');
console.log(chosenType);

const chosenImage = rolls[chosenType]['imageFile'];
console.log(chosenImage);

const chosenBasePrice = rolls[chosenType]['basePrice'];
console.log(chosenBasePrice);

// updating the roll's name, image, price based on selection
function updateRollName(type) {
    const rollName = document.getElementById('page-description');
    if (rollName) {
        rollName.textContent = type + ' ' + 'Cinnamon Roll';
    } else {
        console.error("Error finding page-description ID");
    }
}

function updateRollImage(imageurl) {
    const rollImg = document.getElementById('roll-image');
    console.log(rollImg);
    rollImg.src = "../assets/products/" + imageurl;
}

function updateRollPrice(price) {
    const rollPrice = document.getElementById('total-price');
    rollPrice.textContent = " " + price;
}

updateRollImage(chosenImage);
updateRollName(chosenType);
updateRollPrice(chosenBasePrice);

//HW#3 update price based on base price of roll type and dropdown selctions (glazing and pack size)
// Objects 
const glazingOptions ={
    "glaze1" : 0, // keep original
    "glaze2" : 0, // sugar milk
    "glaze3" : 0.50, // vanilla milk
    "glaze4": 1.50  // double chocolate 
    };
  
const packSizeMultiplier ={
    "size1" : 1, //1
    "size2": 3,//3
    "size3" :5,//6
    "size4": 10 //12
};
  
// get the values then compute and update the price based on user selections
function updatePrice() {

    // Get the user's selection
    const glazingMenu = document.getElementById("glazing-menu");
    const userGlaze = glazingMenu.value;

    const packSizeMenu = document.getElementById("pack-size-menu");
    const userSize = packSizeMenu.value;

  
    //Convert options selected to numbers
    const glazingPrice = glazingOptions[userGlaze];
    const packSizePrice = packSizeMultiplier[userSize];

    // conditionals for undefined values
    let glazingPriceVal;
    if (glazingPrice !== undefined) {
    glazingPriceVal = glazingPrice;
    } else {
    glazingPriceVal = 0;
    }

    let packSizePriceVal;
    if (packSizePrice !== undefined) {
    packSizePriceVal = packSizePrice;
    } else {
    packSizePriceVal = 1;
    }
  
    //console.log("Glazing price value:", glazingPriceVal);
    //console.log("Pack size price value:", packSizePriceVal);

    const basePrice = rolls[chosenType].basePrice;
    //console.log("Base price:",basePrice );

    const totalPrice = (basePrice+glazingPriceVal) * packSizePriceVal;
  
    console.log("Total price:", totalPrice);
  
    // Update the price 

    const PriceElem = document.getElementById("total-price");
    // round to 2 decimal places: used this StackOverflow
    // citation: https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
    const totalPriceString = totalPrice.toFixed(2);

    // citations: https://www.w3schools.com/jsref/prop_node_textcontent.asp
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    PriceElem.textContent = totalPriceString;
  }

function cartAdd() {
    const packSizeElem= document.getElementById("pack-size-menu")
    const rollGlazingElem= document.getElementById("glazing-menu")

    const packSizeIndex= packSizeElem.options.selectedIndex; 
    const rollGlazingIndex= rollGlazingElem.options.selectedIndex; 

    const packSize= document.getElementById("pack-size-menu").options[packSizeIndex].innerHTML;
    const rollGlazing= document.getElementById("glazing-menu").options[rollGlazingIndex].innerHTML;

	let itemAdd = new Roll(chosenType, rollGlazing, packSize,chosenBasePrice);
	cartList.push(itemAdd)
	console.log(cartList)
}


let cart = [];
let totalPrice= 0

const item01 = new Roll('Original','Sugar milk',1 ,rolls.Original.basePrice)
cart.push(item01);

const item02 = new Roll('Walnut', 'Vanilla milk', 12,rolls.Walnut.basePrice)
cart.push(item02);

const item03 = new Roll('Raisin','Sugar milk', 3 ,rolls.Raisin.basePrice)
cart.push(item03);

const item04 = new Roll('Apple','Keep original',3, rolls.Apple.basePrice)
cart.push(item04);


function removeClick(item) {
    deleteNote(item);
}

function createElement(item) {
	const template = document.querySelector('#cart-template');
	const clone = template.content.cloneNode(true);
	item.element = clone.querySelector('.cart-item');

	const deleteButton = item.element.querySelector('.remove');
    console.log(item.element);
	console.log( deleteButton );
    deleteBtn.style.cursor = "pointer";
	deleteButton.addEventListener('click', removeClick(item));

    const cartListElem = document.querySelector(".cart-list");
    cartListElem.prepend(item.element);
    updateElement(item);
}


function updateElement(item) {
    // get HTML elements that need updating 
    const image = item.element.querySelector("#cart-img");
    const type = item.element.querySelector("#cart-desc-type");
    const glazing = item.element.querySelector("#cart-desc-glazing");
    const size = item.element.querySelector("#cart-desc-size");
    const price = item.element.querySelector("#cart-price");
    
    // update content
    image.src = "../assets/products/" + rolls[item.type].imageFile;
    type.innerText = item.type + " Cinnamon Roll";
    glazing.innerText = "Glazing: "+item.glazing;
    size.innerText = "Pack Size: " + item.size;
    //const totalPrice = (item.basePrice + priceAdjust.glazing[item.glazing]) * priceAdjust.size[item.size];
    //price.innerHTML = "<br> $" + totalPrice.toFixed(precision);

    // add to price list array
    //priceList.push(totalPrice.toFixed(precision));

    // proof reading 
    //console.log(item.basePrice + ' + ' + priceAdjust.glazing[item.glazing] + ' x ' + priceAdjust.size[item.size] + ' = ' + totalPrice.toFixed(precision));
}