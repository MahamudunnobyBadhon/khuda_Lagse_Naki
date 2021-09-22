let orderedProductsArray = [];
let array = [0,0,0,0,0,0,0,0,0,0,0,0];
let total = 0;
const loadProducts = async() => {

        let resoponse2 = await fetch("https://calm-garden-13016.herokuapp.com/allfoods");
        let res2 = await resoponse2.json();
        console.log(res2);
        showProducts(res2);
        return res2;
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {

  // console.log(products);
  const allProducts= products.map((pd) => pd);
  for(const product of allProducts) {
     const image = product.imgSource;
     const id= product._id;
    // console.log(id);
     const div = document.createElement('div');
     div.classList.add('product');

     div.innerHTML = `
     <div class="mb-5 col">
           <div class="card h-100" onclick='singleMeal("${product.name}")'>
             <img class="img-fluid rounded mx-auto d-block"  style="height: 300px" src=${image}></img>
             <div class="card-body">
               <h4 class = "fw-bold"> ${product.name} </h4>
               <p class = "fw-bold"> Food Price: <span> ${product.price}</span> </p>
               <p class = "fw-bold"> Resturant Name : ${product.resturant} </p>
               <p><span> ${product.details}</span> </p>
               
             </div>
             <div class="card-footer d-flex justify-content-center">
                <button style="font-size: 20px" onclick="addToCart2('${product._id}')" id="addToCart-btn" class=" buy-now btn btn-success">add to cart</button>
             </div>
           </div>
         </div>
     `;
     div.style.padding = "10px";
     document.getElementById("all-products").appendChild(div);
  }
};

const singleMeal = (foodName) =>{
  console.log(foodName);
}
const addToCart2 = async (productId) => {

  let resoponse2 = await fetch("https://calm-garden-13016.herokuapp.com/allfoods");

  let res2 = await resoponse2.json();
  
  console.log(res2);
  let ar = [];
  if(window.localStorage.getItem('array') !== null){

    ar = (window.localStorage.getItem('array').split(','));
    for(let i =0; i< ar.length; i++){
        ar[i] = parseInt(ar[i]);
    }
  }
  

  if(ar.length > 0){
    for(let i =0; i< ar.length; i++){
      array[i] = ar[i];
    }
  }
  for(let i = 0; i<12; i++){
    if((res2[i]._id)==productId){
      array[i] = array[i]+1;
      total= total + (res2[i].price*array[i]);
      break;
    }
  }
  console.log(array);

  

  // for(let i=0; i<12; i++){ };

  console.log(total);
  window.localStorage.setItem("array",array);
  //  const isMealInArray = orderedProductsArray.find((p) => p._id == productId);

  //  console.log("hhhhhhhhhiiiiiiiiii", isMealInArray);

  // if (isMealInArray !== undefined) {
  //   isMealInArray.quantity++;
  //   updateCart();
  // } else {



  //   fetchedData(
  //     `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${productId}`
  //   ).then((data) => {
  //     const { strMeal, strMealThumb, idMeal } = data.meals[0];


    
  //     orderedProductsArray = [
  //       ...orderedProductsArray,
  //       { strMeal, strMealThumb, idMeal, quantity: 1 },
  //     ];

  //     updateCart();
  //     console.log("hello", orderedProductsArray);
  //   });
  // }
};

function updateCart() {
  document.getElementById("cartCount").innerText = orderedProductsArray.length;

  const cartDiv = document.getElementById("cartProducts");
  cartDiv.innerHTML = "";

  orderedProductsArray.map((p) => {
    const mealDiv = document.createElement("div");

    mealDiv.classList.add("card", "mb-3");
    mealDiv.style.maxWidth = "540px";

    mealDiv.innerHTML = `
  <div class="row g-0">
    <div class="col-md-4">
      <img src='${p.strMealThumb}' class="img-fluid rounded rounded-circle p-3" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body mt-3">
        <h5 class="card-title"> ${p.strMeal}</h5>
 <p>Quantity: ${p.quantity}</p>
      </div>

    </div>
  </div>
`;

    cartDiv.appendChild(mealDiv);
  });
}

