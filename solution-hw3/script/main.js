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
  
    console.log("Glazing price value:", glazingPriceVal);
    console.log("Pack size price value:", packSizePriceVal);
  
    // Compute the total price using formula
    const basePrice = 2.49;
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

// Event listeners
const glazingMenu = document.getElementById("glazing-menu");
glazingMenu.addEventListener('change', updatePrice);

const packSizeMenu = document.getElementById("pack-size-menu");
packSizeMenu.addEventListener('change', updatePrice);