
//function for removing button styles 

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");

  for(let btn of buttons) {
    btn.classList.remove("border-teal-600");
  }
};

//load specific type pet details to  show
const loadSpecDetails = async (petId) => {
  console.log(petId);
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.petData);

};


//load pet details to  show
const loadDetails = async (petId) => {
  console.log(petId);
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.petData);

};

// show pet details
const displayDetails = (petData) => {
  console.log(petData);
  const detailContainer = document.getElementById("modalContent");

  detailContainer.innerHTML = `
  <div><img class="w-full rounded-b-2xl" src=${petData.image}/></div>
  <div class="w-full">
  <h2 class="text-2xl	font-semibold	pt-4">${petData.pet_name}</h2>
  <p><i class="fa-solid fa-table-cells-large"></i> Breed: ${petData.breed}</p>
  <p><i class="fa-solid fa-mercury"></i> Gender: ${petData.gender}</p>
  <p><i class="fa-solid fa-mercury"></i> Vaccination Status: ${petData.vaccinated_status}</p>
  <p><i class="fa-regular fa-calendar-minus"></i> Birth: ${petData.date_of_birth}</p>
  <p><i class="fa-solid fa-dollar-sign"></i> Price: ${petData.price}</p>
  </div>
  <div>
  <h2 class="text-lg font-semibold">Details Information:</h2>
  <p>${petData.pet_details}</p>
  </div>
  
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn w-96 mr-12 bg-teal-50 border-teal-600">Cancel</button>
              </form>
            </div>
            `;
  

  document.getElementById("showModalData").click();
};


//fetch categories button

const loadCategoryDemo = (category) => {
  const spinner = document.getElementById("loadingSpinner");
  spinner.classList.remove("hidden");

  const fetchData = fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json());

  const delay = new Promise((resolve) => setTimeout(resolve, 2000));

  Promise.all([fetchData, delay])
    .then(([data]) => {
      spinner.classList.add("hidden");

      
      const activeBtn = document.getElementById(`btn-${category}`);
      removeActiveClass();
      activeBtn.classList.add("border-teal-600");

      if (data && data.data) {
        displayCategory(data.data); 
      } else {
        console.log('No data found for this category.');
      }
    })
    .catch((error) => {
      console.log(error);
      spinner.classList.add("hidden");
    });
};

// Load categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// Display categories
const displayCategories = (categories) => {
  const catergoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    console.log(item);

    // Create button for each category
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${item.category}" onclick="loadCategoryDemo('${item.category}')" class="btn bg-teal-50 px-10 rounded-3xl category-btn">
        <img class="w-6" src="${item.category_icon}" alt="">${item.category}
      </button>`;

    // Add button
    catergoryContainer.append(buttonContainer);
  });
};

loadCategories();

// Load all random cards
const loadCards = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllCategories(data.pets))
    .catch((error) => console.log(error));
};


// Handle adoption process
const handleAdopt = (button) => {
  let countdown = 3;
  button.disabled = true;
  
  
  openModal();

  const countdownElement = document.getElementById("countdown");
  countdownElement.textContent = countdown;

  const interval = setInterval(() => {
    if (countdown > 0) {
      countdownElement.textContent = countdown;
      countdown--;
    } else {
      clearInterval(interval);
      button.textContent = "Adopted";
      button.classList.add("btn-disabled");

      // Change modal content to show "Adopted"
      document.getElementById("modalTitle").textContent = "Adoption Complete";
      
      setTimeout(() => {
        closeModal();
      }, 1500);
    }
  }, 1000);
};

// Function to open the modal
const openModal = () => {
  const modal = document.getElementById("adoptModal");
  modal.classList.add("modal-open");
};

// Function to close the modal
const closeModal = () => {
  const modal = document.getElementById("adoptModal");
  modal.classList.remove("modal-open");
  document.getElementById("modalTitle").textContent = "Congrates";
};






// Display all categories
const displayAllCategories = (pets) => {
  const cardsContainer = document.getElementById("allcards");
  pets.forEach((item) => {
    console.log(item);

    // Create card for each pet
    const card = document.createElement("div");
    card.classList = "card card-compact bg-base-100 shadow-xl";
    card.innerHTML = `
      <figure class="h-[200px]">
        <img class="h-full w-full object-cover" src="${item.image}" alt="Pet Image" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${item.pet_name || "Not available"}</h2>
        <p><i class="fa-solid fa-table-cells-large"></i> Breed: ${item.breed || "Not available"}</p>
        <p><i class="fa-regular fa-calendar-minus"></i> Birth: ${item.date_of_birth || "Not available"}</p>
        <p><i class="fa-solid fa-mercury"></i> Gender: ${item.gender || "Not available"}</p>
        <p><i class="fa-solid fa-dollar-sign"></i> Price: ${item.price ? `$${item.price}` : "Not available"}</p>
        <div class="card-actions flex flex-row justify-center">
          <button class="likeButton btn  border-teal-800 bg-slate-50 text-teal-800" data-image="${item.image}"><i class="fa-regular fa-thumbs-up"></i></button>
          <button class="btn adoptButton  border-teal-800 bg-slate-50 text-teal-800">Adopt</button>
          <button onclick="loadDetails('${item.petId}')" class="btn  border-teal-800 bg-slate-50 text-teal-800">Details</button>
        </div>
      </div>`;

    // Add the card to the container
    cardsContainer.append(card);
  });

  // Handle like button click
  document.querySelectorAll('.likeButton').forEach((button) => {
    button.addEventListener('click', function() {
      const imageUrl = this.getAttribute('data-image');
      const imageDiv = document.getElementById('likedCards');
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.style.borderRadius = "10px";
      imgElement.style.padding = "5px";
      imageDiv.appendChild(imgElement);
    });
  });
  document.querySelectorAll('.adoptButton').forEach((button) => {
    button.addEventListener('click', function() {
      handleAdopt(button);
    });
  });
};

// Display specific category
const displayCategory = (data) => {
  const cardsContainer = document.getElementById("allcards");
  cardsContainer.innerHTML = "";

  if (data.length == 0) {
    cardsContainer.classList.remove("grid");
    cardsContainer.innerHTML = 
    `<div class="flex flex-col justify-center w-full ">
<img class="h-2/4 w-3/12 mx-auto pt-10" src="./images/error.webp" alt="">
<h2 class="text-4xl font-bold text-center pt-5">No Information Available</h2>
<p class="text-xl text-center w-full mx-auto pt-4">The data for the birds category is absent in the server at the moment.please reach out to our support and leave a complaint.</p>
</div>`;
    return;
   }     else{
    cardsContainer.classList.add("grid");
   }

  
  data.forEach((item) => {
    const petName = item.pet_name ? item.pet_name : "Not available";
    const breed = item.breed ? item.breed : "Not available";
    const dateOfBirth = item.date_of_birth ? item.date_of_birth : "Not available";
    const gender = item.gender ? item.gender : "Not available";
    const price = item.price ? `$${item.price}` : "Not available";
    const image = item.image ? item.image : "https://img.freepik.com/free-vector/cute-animal-friends-together_1308-169700.jpg?size=626&ext=jpg&ga=GA1.1.1173543546.1720171727&semt=ais_hybrid"; 
    
    const card = document.createElement("div");
    card.classList = "card card-compact bg-base-100 shadow-xl";
    card.innerHTML = `
      <figure class="h-[200px]">
        <img class="h-full w-full object-cover" src="${image}" alt="Pet Image" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${petName}</h2>
        <p><i class="fa-solid fa-table-cells-large"></i> Breed: ${breed}</p>
        <p><i class="fa-regular fa-calendar-minus"></i> Birth: ${dateOfBirth}</p>
        <p><i class="fa-solid fa-mercury"></i> Gender: ${gender}</p>
        <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price}</p>
        <div class="card-actions flex flex-row justify-center">
          <button class="likeButton btn  border-teal-800 bg-slate-50 text-teal-800" data-image="${image}"><i class="fa-regular fa-thumbs-up "></i></button>
          <button class="btn adoptButton  border-teal-800 bg-slate-50 text-teal-800">Adopt</button>
          <button onclick="loadSpecDetails('${item.petId}')" class="btn  border-teal-800 bg-slate-50 text-teal-800">Details</button>
        </div>
      </div>`;

    cardsContainer.append(card);
  });

  // Handle like button click for newly loaded cards
  document.querySelectorAll('.likeButton').forEach((button) => {
    button.addEventListener('click', function() {
      const imageUrl = this.getAttribute('data-image');
      const imageDiv = document.getElementById('likedCards');
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.style.borderRadius = "10px";
      imgElement.style.padding = "5px";
      imageDiv.appendChild(imgElement);
    });
  });
  document.querySelectorAll('.adoptButton').forEach((button) => {
    button.addEventListener('click', function() {
      handleAdopt(button);
    });
  });
};

loadCards();


//spinner codes 

const showSpinner = () => {
  const spinner = document.getElementById('loadingSpinner');
  spinner.classList.remove('hidden');
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById('loadingSpinner');
  spinner.classList.add('hidden');
};

//view more button 
document.getElementById("viewMoreBtn").addEventListener("click", function() {
  document.getElementById("adoptSection").scrollIntoView({ behavior: "smooth" });
});


// Get the hamburger button and the mobile menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle mobile menu visibility when hamburger button is clicked
hamburgerBtn.addEventListener('click', function () {
  mobileMenu.classList.toggle('hidden');
});