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
    console.log(ar);
    for(let i =0; i< ar.length; i++){
        ar[i] = parseInt(ar[i]);
        console.log(ar[i]);
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

  console.log(total);
  window.localStorage.setItem("array",array);
};

