let loadPhone;
let count = 0;
let pPrice = 0;
let productTax = 0;
let totalProductPrice = 0;
let restData = [];

const phoneData = async() => {
    const res = await fetch("../data.json");
    const data = await res.json();
    loadPhone = data
    displayData(data)
}

phoneData()

function displayData(data){
    const container = document.getElementById("display-container");
    data.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("card", "bg-base-100", "shadow-xl", "p-3")
        div.innerHTML = `
                    
                    <figure><img class="rounded-lg w-auto h-[350px]" src=${element.img} alt="Shoes" /></figure>
                    <div>
                        <div class="flex justify-between px-3 py-2">
                            <h2 class="card-title">${element.name}</h2>
                            <div>
                                <span><i class="fa-solid fa-heart mr-2 text-slate-500"></i></span>
                                <span><i class="fa-solid fa-square-minus text-red-500"></i></span>
                            </div>
                        </div>
                        <p class="px-3">If a dog chews shoes whose shoes does he choose?</p>
                        <h3 class="px-3 my-2 text-xl">Price:$${element.price}</h3>
                        <div class="flex justify-between px-3 py-2">
                            <label onclick="handleSingleData('${element.id}')"for="my-modal-3" class="btn modal-button btn-primary btn-outline w-[46%]"><i
                                    class="fa-solid fa-circle-info mr-2"></i>Details</label>

                            <button onclick="handleBuyBtn('${element.id}')" class="btn btn-secondary btn-outline w-[46%]"><i
                                    class="fa-solid fa-bag-shopping mr-2"></i>Buy Now</button>
                        </div>
                    </div>
    `
    container.appendChild(div)
    });
}


function handleSingleData(id) {
    const findPhone = loadPhone.find(phone => phone.id === id);
    const {name, img, price} = findPhone;
    const showModal = document.getElementById("show-modal")
    showModal.innerText = "";
    const div = document.createElement("div");
    div.classList.add("py-5", "flex", "flex-col", "gap-3" )
    div.innerHTML = `
                    <img class="w-96 h-[350px] rounded-lg" src=${img} alt="">
                    <h2 class="text-2xl font-bold"><span class="text-fuchsia-600">Products: </span>${name}</h2>
                    <p class="text-gray-500 text-lg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
                        doloremque quos necessitatibus placeat, iure praesentium assumenda excepturi enim eius provident
                        quis mollitia, hic maiores reiciendis fuga vel suscipit at repudiandae a consectetur quod sunt
                        possimus. Veritatis quae reiciendis ex ipsa.</p>
                    <h2 class="text-2xl font-bold text-fuchsia-600">Featears:</h2>
                    <p>Features1, Features2, Features3, Features4</p>
                    <h2 class="text-2xl font-bold">Price: <span class="text-fuchsia-600"> $${price}</span></h2>
              
    `;
    showModal.appendChild(div)
}



function selectItems(seleceId){
    const element = document.getElementById(seleceId)
    return element;
}


function handleBuyBtn(Id){
    count++;
    const similarData = restData.find(similarId => similarId.id === Id)
    if(similarData){
        alert("already added")
        return;
    }
    const findPhone = loadPhone.find(phone => phone.id === Id);
    restData.push(findPhone);
    
    
    const localData = getItems("cart");
    setItems("cart", [...localData, findPhone])

    const {id:productId, name, img, price } = findPhone;
    pPrice = pPrice + price;
    productTax = pPrice * 0.1;
    totalProductPrice = pPrice + productTax;
    const drawerSection = document.getElementById("show-drawer");
    const div = document.createElement("div");
    div.classList.add("flex", "flex-col", "gap-3", "mb-2")
    div.innerHTML = `
        <div class="flex justify-between border-2 rounded-lg items-center py-2 px-3 bg-gray-300">
            <img class="w-[15%] h-[60px] rounded-lg" src=${img} alt="">
                <p>${name}</p>
                <p class="border-2 border-black rounded-lg py-1 px-4">1</p>
                <span onclick="clearSingleProduct('${productId}')"><i  class="fa-solid fa-trash text-lg text-red-500 cursor-pointer"></i></span>
        </div>
    `;
    drawerSection.appendChild(div)
    selectItems('badge-count').innerText = count;
    selectItems('product').innerText = count;
    selectItems('price').innerText = pPrice.toFixed(2)
    selectItems('tax').innerText = productTax.toFixed(2)
    selectItems('totalPrice').innerText = totalProductPrice.toFixed(2)
    selectItems('clearBtn').style.display = 'block';
}


function clearAllBtn(){
    const drawerSection = document.getElementById("show-drawer");
    drawerSection.innerText = "";
    restData = [];
    selectItems('clearBtn').style.display = 'none';
    selectItems('badge-count').innerText = 0;
    selectItems('product').innerText = 0;
    selectItems('price').innerText = 0;
    selectItems('tax').innerText = 0;
    selectItems('totalPrice').innerText = 0;
    count = 0;
    pPrice = 0;
    productTax = 0;
    totalProductPrice = 0;
    clearItem()
}


function clearSingleProduct(id){
    const drawerSection = document.getElementById("show-drawer");
    drawerSection.innerHTML = '';
    count--;
    const findPhone = restData.filter(phone => phone.id !== id);
    restData = findPhone;
    count = findPhone.length || 0;
    pPrice = 0;
    totalProductPrice = 0;
    productTax = 0;
    setItems("cart", findPhone)

    findPhone.forEach(item => {
        const { id: productId, name, img, price } = item;
        pPrice = pPrice + price;
        productTax = pPrice * 0.1;
        totalProductPrice = pPrice + productTax;

        const div = document.createElement("div");
        div.classList.add("flex", "flex-col", "gap-3", "mb-2")
        div.innerHTML = `
        <div class="flex justify-between border-2 rounded-lg items-center py-2 px-3 bg-gray-300">
            <img class="w-[15%] h-[60px] rounded-lg" src=${img} alt="">
                <p>${name}</p>
                <p class="border-2 border-black rounded-lg py-1 px-4">1</p>
                <i onclick="clearSingleProduct('${productId}')" class="fa-solid fa-trash text-lg text-red-500 cursor-pointer"></i>
        </div>
    `;
        drawerSection.appendChild(div)
    })
    


    selectItems('badge-count').innerText = count;
    selectItems('product').innerText = count;
    selectItems('price').innerText = pPrice.toFixed(2)
    selectItems('tax').innerText = productTax.toFixed(2)
    selectItems('totalPrice').innerText = totalProductPrice.toFixed(2)
    selectItems('clearBtn').style.display = 'block';
}

const displayLocalData = () => {
    const localData = getItems("cart");
    const drawerSection = document.getElementById("show-drawer");
    drawerSection.innerHTML = '';
    restData = localData;
    count = localData.length || 0;

    localData.forEach(item => {
        const { id: productId, name, img, price } = item;
        pPrice = pPrice + price;
        productTax = pPrice * 0.1;
        totalProductPrice = pPrice + productTax;

        const div = document.createElement("div");
        div.classList.add("flex", "flex-col", "gap-3", "mb-2")
        div.innerHTML = `
        <div class="flex justify-between border-2 rounded-lg items-center py-2 px-3 bg-gray-300">
            <img class="w-[15%] h-[60px] rounded-lg" src=${img} alt="">
                <p>${name}</p>
                <p class="border-2 border-black rounded-lg py-1 px-4">1</p>
                <i onclick="clearSingleProduct('${productId}')" class="fa-solid fa-trash text-lg text-red-500 cursor-pointer"></i>
        </div>
    `;
        drawerSection.appendChild(div)
    })



    selectItems('badge-count').innerText = count;
    selectItems('product').innerText = count;
    selectItems('price').innerText = pPrice.toFixed(2)
    selectItems('tax').innerText = productTax.toFixed(2)
    selectItems('totalPrice').innerText = totalProductPrice.toFixed(2)
    selectItems('clearBtn').style.display = 'block'; 
}

displayLocalData()