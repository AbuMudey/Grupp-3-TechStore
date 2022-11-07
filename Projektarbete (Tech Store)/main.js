
function welcome(){

 console.log("yes");
}

// Function for signing in a registered user
function login() {
  const objPeople=JSON.parse(localStorage.getItem("loggin"));
var username= document.getElementById("username").value
var password= document.getElementById("password").value

for(i=0;i<objPeople.length;i++){
  if(username==objPeople[i].username && password==objPeople[i].password){
     console.log(username+"is loggged in: ");
     
      welcome() ;
      localStorage.setItem(username,"isloggin");
    
  }else if(username==objPeople[i].username && password!=objPeople[i].password){
    alert("fel lösenord");
  }
  }
}

//Function for registrer a new user and stores it in localstorage.
function registister(){

  var regististerUser = document.getElementById("newuser").value
  var registerPassword= document.getElementById("newpassword").value
  var newUser={
      username:regististerUser,
      password:registerPassword
  }
  if (!localStorage.getItem("loggin")){
    localStorage.setItem("loggin", JSON.stringify([newUser]));
   }else {
    const objPeople = JSON.parse(localStorage.getItem("loggin"));
    objPeople.push(newUser);
    localStorage.setItem("loggin", JSON.stringify(objPeople));
   }
}

var listOfProducts;
var kundnr=document.getElementById("kundvagnnr");
const mainconten = document.getElementById("maincontent")
/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage();
    });
}

const local=JSON.parse(localStorage.getItem("mobil"));
var len=local.length;
document.querySelector(".number").innerHTML=len;

function initSite() {
    loadProducts();
    totalprice()
}

// render products on first page from the JSON file.
function addProductsToWebpage() {
    console.log(listOfProducts);
  for(const product of listOfProducts){
    const h1=document.createElement("h1");
    h1.classList.add("heading");
    h1.innerText=product.title;
    bildblock.appendChild(h1);
    
    const p=document.createElement("p");
    p.classList.add("description");
    p.innerText=product.description;
    bildblock.appendChild(p);

    const img=document.createElement("img");
    img.classList.add("image");
    img.setAttribute("src" ,`assets/${product.image}`);
    bildblock.appendChild(img);

    const price=document.createElement("p");
    price.classList.add("price");
    price.innerText=product.price + " kr";
    bildblock.appendChild(price);

    const addbutton=document.createElement("button");
    addbutton.className="btn btn-primary btn-xs"
    bildblock.appendChild(addbutton);
    addbutton.innerHTML= '<i class="fa fa-shopping-cart fa-1x" aria-hidden="true"></i> Lägg till i kundvagnen';
    
    addbutton.addEventListener("click", () => {
 
       if (!localStorage.getItem("mobil")){
        localStorage.setItem("mobil", JSON.stringify([product]));
       }else {
        const mobil = JSON.parse(localStorage.getItem("mobil"));
        mobil.push(product);
        localStorage.setItem("mobil", JSON.stringify(mobil));
       }
         clicknumber();
    });         
  }
}

// render the selected products and displays them in the cart.
function rendermobiles() {
   mainconten.innerHTML="";
  
  const mobils = JSON.parse(localStorage.getItem("mobil"));
    mobils.forEach((mobil) => {

        const div = document.createElement("div");
        div.classList.add("mobile-product")
        
        const img=document.createElement("img");
        img.classList.add("img-kundvagn")
        img.setAttribute("src" ,`assets/${mobil.image}`);
        div.appendChild(img);

        const h2 = document.createElement("h4")
        h2.innerText = mobil.title
        h2.classList.add("title-kundvagn");
        div.appendChild(h2)

        const price=document.createElement("p");
        price.classList.add("price-kundvagn")
        price.innerText=mobil.price + " kr";
        div.appendChild(price);

        const removebtn=document.createElement("button");
        removebtn.className="btn btn-danger btn-xs"
        removebtn.classList.add("removebtn")
        div.appendChild(removebtn);
        removebtn.innerHTML= '<i class="fa-regular fa-trash-can"></i>  Ta bort';

        removebtn.addEventListener("click",()=>removeitem(mobil));
       mainconten.appendChild(div)
});
}

let checkoutbtn = document.createElement("button");
checkoutbtn.className="btn btn-primary btn-xs"
checkout.appendChild(checkoutbtn);
checkoutbtn.innerHTML= '<i class="fa-sharp fa-solid fa-check"></i>Slutför ditt köp'
checkoutbtn.addEventListener("click", () => {

localStorage.removeItem("mobil");
    alert("Ditt köp är nu slutfört !");
    rendermobiles();
    clicknumber();
    totalprice();
});
  rendermobiles()
 

  // function for removing items from cart.
 function removeitem(mobil){
     const mobils=JSON.parse(localStorage.getItem("mobil"));
     const sett=mobils.findIndex(product=>product.title===mobil.title);
          mobils.splice(sett,1);
          localStorage.setItem("mobil",JSON.stringify(mobils));
          rendermobiles();
          clicknumber();
          totalprice();
 }  

// Displays how many products there are in the cart.
function clicknumber(){
const local=JSON.parse(localStorage.getItem("mobil"));
var len=local.length;
document.querySelector(".number").innerHTML=len;
}

// calculates total price and displays it in the cart.
function totalprice(){
  priss.innerHTML="";
  const leng=JSON.parse(localStorage.getItem("mobil"));
  var total=0;
for (var i=0;i<leng.length;i++) {
  total += leng[i].price;
}

const totalprice=document.createElement("h1");
totalprice.classList.add("totalprice")
totalprice.innerText="Totalt pris: "+total+" kr";
priss.appendChild(totalprice);
}