
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


    
    // This would also be a good place to initialize other parts of the UI
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    // Check your console to see that the products are stored in the listOfProducts varible.
    
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
const mobil = JSON.parse(localStorage.getItem("mobil"));
function rendermobiles() {
    console.log (mobil)
  
    mobil.forEach((mobil) => {

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
        removebtn.innerHTML= '<i class="fa fa-shopping-cart fa-1x" aria-hidden="true"></i> Ta bort';
        
        // Delete specefic item. Right now it only deletes the FIST item.
        // page refresh is currently needed to see the update - ensure refreshing is not needed (smooth deletion)
        let indexToRemove;
        removebtn.addEventListener("click", () => {
          console.log("removed");
          const mobil = JSON.parse(localStorage.getItem("mobil"));
          mobil.splice(indexToRemove, 1)
          localStorage.setItem("mobil", JSON.stringify(mobil));
        })

       mainconten.appendChild(div)
    

});
// Complete the purches. And delete the cart after pop up messege. 
// page refresh is currently needed to see the update - ensure refreshing is not needed (smooth deletion)
let checkoutbtn = document.createElement("button");
checkoutbtn.className="btn btn-primary btn-xs"
checkout.appendChild(checkoutbtn);
checkoutbtn.innerHTML= '<i class="fa-sharp fa-solid fa-check"></i>Slutför ditt köp'
checkoutbtn.addEventListener("click", () => {
localStorage.removeItem("mobil");
    alert("Ditt köp är nu slutfört !")
}
    
)}

  rendermobiles()
  
 
function clicknumber(){
const local=JSON.parse(localStorage.getItem("mobil"));

var len=local.length;


document.querySelector(".number").innerHTML=len;



}

function totalprice(){
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







    // to reduce complexity and increase readability. Each function should have
    // an explainetory comment like the one for this function, see row 22.
    // Add your code here, remember to brake your code in to smaller function blocks
    // TODO: Remove the console.log and these comments when you've read them.
