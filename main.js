const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const countryContainer = document.getElementById("country-container");
const errorDiv = document.getElementById("error");
const countryDetails = document.getElementById("country-details");

function emptyContent(){
    searchInput.value = "";
    countryContainer.innerHTML = "";
    countryDetails.innerHTML = "";
}


searchBtn.addEventListener("click", captureInputValues);
function captureInputValues(){
    const search =  searchInput.value;
    if (search === "") {
        emptyContent();
        errorDiv.innerHTML = `
        <p style="display: inline; background-color: red; color: white; padding:10px;">Search field cannot be empty</p>
        `;
        return;
    } else {    
        emptyContent();
        const countryURL = `https://restcountries.eu/rest/v2/name/${search}`;
        fetch(countryURL)
        .then(res => res.json())
        .then(data => dataStorage(data));
        /* .then((data) => {
            function
        }); */
    }
}
// store data in this function
function dataStorage(data){
    if (data.status === 404) {
        errorDiv.innerHTML = `
        <p style="display: inline; background-color: red; color: white; padding:10px">No such country name found!</p>
        `;
    } else {
        errorDiv.innerText = "";
    }
    data.forEach(item => {
        // console.log(item);
        const itemDiv = document.createElement("div");
        // const itemDivClassList = ["col-md-3" , "col-12"];
        // itemDiv.classList.add(...itemDivClassList);
        itemDiv.classList.add("col-md-3" , "col-12");
        // Reference: https://stackoverflow.com/questions/11115998/is-there-a-way-to-add-remove-several-classes-in-one-single-instruction-with-clas

        itemDiv.innerHTML = `
        <div class="rounded overflow-hidden border p-2">
            <img class="w-100" src="${item.flag}" alt=""/>
        </div>
        <div class="py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">
            <h3>${item.name}</h3>
            <button class="btn btn-dark" onclick="showDetails('${item.alpha2Code}')">Learn More</button>
        </div>`;
        countryContainer.append(itemDiv);
    });
};

// Show details
function showDetails(countryCode){
    const alphaURL = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;
    fetch(alphaURL)
    .then(res => res.json())
    .then(data => showData(data))
};

function showData(item){
    // console.log(data)
    countryDetails.innerHTML = `
    <div class="col-md-6">
        <h2>Country details</h2>
        <img class="w-100" src="${item.flag}" alt=""/>
    </div> 
    <div class="col-md-6">
        <h1>${item.name}</h1>
        <p>Capital: ${item.capital}</p>
        <p>Currency Name: ${item.currencies[0].name}</p>
        <p>Population: ${item.population}</p>
    </div>
    <hr style="margin-top:20px" />`;
}

// 
// 
// 