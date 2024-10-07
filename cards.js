console.log("added")

//fetch catergories button

const loadCategories = () => {
    //fetch

    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then(data => displayCategories(data.categories))
    .catch((error) => console.log(error));
}




const displayCategories = (categories) => {

const catergoryContainer = document.getElementById("categories")


        categories.forEach( item => {
        console.log(item);

        //creating button

        const button =document.createElement("button");
        button.classList = "btn";
        button.innerHTML = `<img class="w-6" src="${item.category_icon}" alt="">${item.category}</img>`

        //add button
        catergoryContainer.append(button);
    });
};

loadCategories();

//load all random cards

const loadCards = () => {
    //fetch

    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then(data => displayAllCategories(data.pets))
    .catch((error) => console.log(error));
}

const displayAllCategories = (pets) => {

    const cardsContainer = document.getElementById("allcards")
    
    
            pets.forEach( (item) => {
            console.log(item);
    
            //creating button
    
            const card =document.createElement("div");
            card.classList = "card card-compact bg-base-100 shadow-xl"
            card.innerHTML = 
`
  <figure class="h-[200px]">
    <img 
      class="h-full w-full object-cover"
      src=${item.image}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${item.pet_name}</h2>
    <p><i class="fa-solid fa-table-cells-large"></i> Breed: ${item.breed}</p>
    <p><i class="fa-regular fa-calendar-minus"></i> Birth: ${item.date_of_birth}</p>
    <p><i class="fa-solid fa-mercury"></i> Gender: ${item.gender}</p>
    <p><i class="fa-solid fa-dollar-sign"></i> Price: ${item.price}</p>
    <div class="card-actions flex flex-row justify-center">
      <button class="btn btn-primary"><i class="fa-regular fa-thumbs-up"></i></button>
      <button class="btn btn-primary">Adopt</button>
      <button class="btn btn-primary">Details</button>
    </div>
  </div>`
    
            //add button
            cardsContainer.append(card);
        });
    };

    loadCards();

    //{
      //"petId": 1,
      //"breed": "Golden Retriever",
      //"category": "Dog",
      //"date_of_birth": "2023-01-15",
      //"price": 1200,
     // "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
      //"gender": "Male",
      //"pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
      //"vaccinated_status": "Fully",
      //"pet_name": "Sunny"
      //},