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



function initSite() {
    loadProducts();
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
    });    
        
  }

}
const mobil = JSON.parse(localStorage.getItem("mobil"));
function rendermobiles() {
    console.log (mobil)

    mobil.forEach((mobil) => {
        
        const h1 = document.createElement("h1")
        h1.innerText = mobil.title
        mainconten.appendChild(h1)

        const p=document.createElement("p");
        p.innerText=mobil.description;
        mainconten.appendChild(p);
    
        const img=document.createElement("img");
        img.setAttribute("src" ,`assets/${mobil.image}`);
        mainconten.appendChild(img);
    
        const price=document.createElement("p");
        price.innerText=mobil.price + " kr";
        mainconten.appendChild(price);
     
       


    });
}
  rendermobiles()
    

    // to reduce complexity and increase readability. Each function should have
    // an explainetory comment like the one for this function, see row 22.
    // Add your code here, remember to brake your code in to smaller function blocks
    // TODO: Remove the console.log and these comments when you've read them.