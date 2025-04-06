
document.querySelectorAll('img').forEach(function(img){
    img.setAttribute('loading','lazy');
    
    });



function openNav () {
    document.getElementById("mySidenav").style.width = "100%";
    document.querySelector(".dark").style.display = "block";
document.body.style.overflow = "hidden";
if(window.innerWidth < 768){
    document.getElementById("mySidenav").style.width = "100%";

 document.querySelector(".dark").style.height = "90%";
    document.getElementById("mySidenav").style.height = "90%";

}
else{
    document.getElementById("mySidenav").style.width = "50%";
    document.querySelector(".dark").style.height = "100%";

    document.getElementById("mySidenav").style.height = "100%";



}










  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.querySelector(".dark").style.display = "none";
    document.body.style.overflow = "auto";


  }







  const main = document.querySelectorAll('#chefs');
  main.forEach((main) =>{
  let isDragging = false ;
  let initialMouseX;
  let initialScrollX;
  
  main.addEventListener (
  'mousedown', (event) => {
      event.preventDefault();
      isDragging = true;
      initialMouseX = event.clientX;
  initialScrollX = main.scrollLeft
  
  
  });
  main.addEventListener('mousemove', (event) => {
      event.preventDefault();
  if(isDragging) {
     
  const distanceX = event.clientX - initialMouseX ;
  main.scrollLeft = initialScrollX - distanceX ;
  }
  }  );
  main.addEventListener('mouseup', (event) => {
  isDragging = false;
  
  });

})

function viewProuct(evt, productId) {
    let cont = evt.target.closest('.recipe-img');
    let contimg = cont.children[0].src;
    console.log(contimg);
    let contTextp = cont.parentElement.children[1].children[0].innerHTML;
    let contTexth = cont.parentElement.children[1].children[1].innerHTML;
    console.log(contTextp);
    console.log(contTexth);
    let conprice = cont.parentElement.children[2].children[0].children[1].innerHTML;
    console.log(conprice);
  
    // Get the cart from localStorage, or initialize as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    // Create the product object
    let product = {
      id: productId,
      img: contimg,
      text1: contTextp,
      text2: contTexth,
      price: conprice,
    };
  
    let product2 = {
        id: productId,
        img: contimg,
        text1: contTextp,
        name: contTexth,
        price: conprice,
      };




    // Check if the product is already in the cart
    let productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
    //   alert("Item has already been added to the cart.");
    } else {
      // Add the product to the cart
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
     
    }
    localStorage.setItem('previewPage', JSON.stringify(product2));

        // Redirect to preview.html (if needed)
        window.location.href = "preview.html";
    // Preview the product
 
 
    displayc();
}





function addtocart(event){

  let addcat = event.target.closest('.addcart');
let addImg = addcat.parentElement.parentElement.querySelector('.foodie').src;
console.log(addImg);
let addName = addcat.parentElement.querySelector(".fname").children[0].innerHTML;
let addP = addcat.parentElement.querySelector(".fname").children[1].children[0].innerHTML;
console.log(addP);
console.log(addName);
  let cart2 = JSON.parse(localStorage.getItem('cart2')) || [];
  const cartItems = document.querySelector('.cart-con');
  console.log(cartItems);
let product = {
img : addImg,
name: addName,
price: addP,
quantity: 1,
}
let productIndex = cart2.findIndex(item=> item.img === addImg )

if(productIndex > -1){
  
  const alertBox = document.getElementById('warningAlert');
  alertBox.classList.add('show');
  setTimeout(() => {
      alertBox.classList.remove('show');
  }, 4000);  // Hide after 4 seconds


}
else{
cart2.push(product);
console.log(cart2);
localStorage.setItem('cart2', JSON.stringify(cart2));
const alertBox = document.getElementById('successAlert');
alertBox.classList.add('show');
setTimeout(() => {
    alertBox.classList.remove('show');
}, 2000);  // Hide after 4 seconds



}

setTimeout(() => {
  location.reload();
}, 3000);  // Hide after 4 seconds





cartUpdate();
 



}

let cart2 = JSON.parse(localStorage.getItem('cart2')) || [];


function cartUpdate(){ 


  if(cart2.length === 0){
  let notice = document.getElementsByClassName('cart-num-item');
for(let i = 0; i < notice.length; i++) {
  notice[i].style.setProperty('display', 'none', 'important');
  
}

  }
else{
  let notice = document.getElementsByClassName('cart-num-item');
for(let i = 0; i < notice.length; i++) {
  notice[i].style.setProperty('display', 'flex', 'important');
  notice[i].innerHTML = cart2.length;
}
}

}




cartUpdate();






function openCart(){
let cart2 = JSON.parse(localStorage.getItem('cart2')) || [];
let cartIcon = document.querySelector(".cart-icon");
if (cart2.length === 0){
  document.querySelector(".empty").classList.add("show") ;
  setTimeout(() => {
    document.querySelector(".empty").classList.remove("show") ;
  },2000);



}
else{
  window.location.href = "./cart.html";
}




}

function returnPage(){

  let cart2 = JSON.parse(localStorage.getItem('cart2')) || [];

  if (cart2.length === 0){

window.history.back();



  }






}








 function displayc(){ 
let cart2 = JSON.parse(localStorage.getItem('cart2')) || [];
let cartCon = document.getElementById("cart-items" );

if (cart2.length === 0){
 

}
else{
  cartCon.innerHTML = ``;
cart2.forEach(item=>{

let cartItems = document.createElement("div");
cartItems.classList.add("cartItems");
cartItems.innerHTML= `
<div class="cart">
<div class="cart-img">
    <img src="${item.img}" alt="">

    <div class="text">
<h2>${item.name}
</h2>
<span class="price"> <span>$</span><span class="priceE"> ${item.price}</span>   </span>
<div class="shop-icon">
    <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

            </path>
        </g>
    </svg>
</div>
    </div>

</div>
<div class="cart-btn">
<button onclick="add(event)"> + </button>
<button class="num"> 1 </button>
<button onclick="sub(event)"> - </button>

<div class="del" onclick = "del('${item.img}')">
     <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.5 7.08499V21.415C6.5 21.695 6.72 21.915 7 21.915H17C17.28 21.915 17.5 21.695 17.5 21.415V7.08499" stroke="#0F0F0F" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 5.08499H10V3.58499C10 3.30499 10.22 3.08499 10.5 3.08499H13.5C13.78 3.08499 14 3.30499 14 3.58499V5.08499Z" stroke="#0F0F0F" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 5.08499H19" stroke="#0F0F0F" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 10.465V17.925" stroke="#0F0F0F" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 9.465V18.925" stroke="#0F0F0F" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 9.465V18.925" stroke="#0F0F0F" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g>
    </svg>
</div>

</div>



</div>


`
cartCon.appendChild(cartItems)


})


}

}

document.addEventListener("DOMContentLoaded", function (){
  displayc();
  


})



function total(){
  let check = JSON.parse(localStorage.getItem('check')) || [];
  let total = 0;
  let cartItems = document.querySelectorAll(".cartItems");
  cartItems.forEach((item)=>{
    let price = item.querySelector(".priceE").textContent;
    console.log(price)
    let quantity = item.querySelector(".num").textContent;
    let itemTotal = price * quantity;
    total += itemTotal;

  })
  
  let mainTotal = document.querySelector(".totalprice");
mainTotal.innerHTML = total;
check.push(total);


localStorage.setItem('check', JSON.stringify(check));

console.log(check.at(-1));
}

document.addEventListener('DOMContentLoaded',function(){
  total();
 
})













function add(evt){
  let price = evt.target.parentElement.parentElement.querySelector(".priceE");
let actualV = evt.target.parentElement.querySelector(".num");



let priceValue = parseFloat(price.textContent);
let actualValue = parseFloat(actualV.textContent);
if (!isNaN(priceValue) && !isNaN(actualValue)) {
if(!price.dataset.originalValue){
price.dataset.originalValue = priceValue;
actualV.textContent = ++actualValue;
price.textContent = parseFloat(price.dataset.originalValue) * actualValue;

}


  
  else {
    // If original value exists, update quantity and recalculate the price
    actualV.textContent = ++actualValue;
    price.textContent = parseFloat(price.dataset.originalValue) * actualValue;
  }







}
total();

}


function sub(evt) {
  let price = evt.target.parentElement.parentElement.querySelector(".priceE");
  let actualV = evt.target.parentElement.querySelector(".num");




  let priceValue = parseFloat(price.textContent);
  let actualValue = parseInt(actualV.textContent);

  if (!isNaN(priceValue) && !isNaN(actualValue) && actualValue > 1) {
    // If original value exists, decrease quantity and recalculate the price
    actualV.textContent = --actualValue;  // Decrement quantity
    price.textContent = parseFloat(price.dataset.originalValue) * actualValue;  // Recalculate price
  } else if (actualValue <= 1) {
    console.log("Quantity can't be less than 1");
  } else {
    console.error("Invalid number");
  }

  total();
  
}


















function del(addImg){

  let cart2 = JSON.parse(localStorage.getItem('cart2')) || [];

cart2 = cart2.filter(item => item.img !== addImg);
localStorage.setItem('cart2', JSON.stringify(cart2));



displayc();
returnPage();

}



  function preview() {
    let product2 = JSON.parse(localStorage.getItem('previewPage')) || [];




 
    // Set the product details to the preview page
    let foodImg = document.querySelector('.foodie');
    let foodName = document.querySelector('.fname').children[0];
    let foodPrice = document.querySelector('.fname').children[1].children[0];




if(foodImg){
    foodImg.src=product2.img;
}

if(foodName){
    foodName.innerHTML = product2.name;
}

if(foodPrice){
    foodPrice.innerHTML=product2.price;
}





console.log(foodName);
foodPrice=product2.price;
    
console.log(product2.img);


  }
  




// function viewProuct(evt, productId) {
//     let cont = evt.target.closest('.recipe-img');
//     let contimg = cont.children[0].src;
//     let contTextp = cont.parentElement.children[1].children[0].innerHTML;
//     let contTexth = cont.parentElement.children[1].children[1].innerHTML;
//     let conprice = cont.parentElement.children[2].children[0].children[1].innerHTML;

//     // Get the cart from localStorage, or initialize as an empty array
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     // Create the product object
//     let product = {
//         id: productId,
//         img: contimg,
//         text1: contTextp,
//         text2: contTexth,
//         price: conprice,
//     };

//     // Check if the product is already in the cart
//     let productIndex = cart.findIndex(item => item.id === productId);
//     if (productIndex > -1) {
//         // Item already in cart, no need to add it again
//         alert("Item already added to the cart.");
//     } else {
//         // Add the product to the cart
//         cart.push(product);
//         localStorage.setItem('cart', JSON.stringify(cart));
//         alert("Item added to the cart!");
//     }

//     // Redirect to preview.html to display the product preview
//     window.location.href = "preview.html";
// }

// // Function to display the product preview on preview.html
// function preview() {
//     // Get the cart from localStorage
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     // Check if there are items in the cart
//     if (cart.length > 0) {
//         // Assuming you want to preview the last added product
//         let product = cart[cart.length -1  ];

//         // Set the product details to the preview page
//         let foodImgElement = document.querySelector('.foodie');
//         let foodNameElement = document.querySelector('.fname');
//         let foodPriceElement = document.querySelector('.fname').children[1].children[0];

//         // Update the preview page with the product details
//         if (foodImgElement) foodImgElement.src = product.img;
//         if (foodNameElement) foodNameElement.children[0].innerHTML = product.text1;
//         if (foodPriceElement) foodPriceElement.innerHTML = product.price;
        
//         console.log('Preview product:', product);
//     } else {
//         console.log('No products in cart');
//     }
// }

// Ensure to call the preview function only after the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    preview();
    cartUpdate();
});




// Get the back button element
const backButton = document.querySelectorAll('.back-button');

// Add a click event listener to the button
backButton.forEach(btn => {
  btn.addEventListener('click', function() {
    // Go back to the previous page in the history
    window.history.back();
});  
}
)



  let currentIndex = 0;
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;

  // Function to change the active slide
  function changeSlide() {
    // Remove active class from the current item
    items[currentIndex].classList.remove('active');
    
    // Move to the next item, looping back to the first item if necessary
    currentIndex = (currentIndex + 1) % totalItems;
    
    // Add the active class to the new item
    items[currentIndex].classList.add('active');
  }

  // Set interval for automatic sliding (every 3 seconds)
  setInterval(changeSlide, 2500);



// Get the cart button element


  
  const dotsContainer = document.querySelector('.carousel-dots');

  // Function to create and display the dots
  function createDots() {
    for (let i = 0; i < totalItems; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.setAttribute('data-index', i); // Set an index for each dot
      dotsContainer.appendChild(dot);
    }
    // Set the first dot as active initially
    updateDots();
  }

  // Function to update active dot
  function updateDots() {
    const dots = document.querySelectorAll('.carousel-dots .dot');
    dots.forEach(dot => dot.classList.remove('active-dot'));
    dots[currentIndex].classList.add('active-dot');
  }

  // Function to jump to the selected slide when a dot is clicked
  function onDotClick(event) {
    const clickedIndex = event.target.getAttribute('data-index');
    currentIndex = parseInt(clickedIndex);
    items.forEach(item => item.classList.remove('active'));
    items[currentIndex].classList.add('active');
    updateDots();
  }

  // Add click event listener to each dot
  dotsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('dot')) {
      onDotClick(event);
    }
  });

  // Initialize dots
  createDots();
















































































































