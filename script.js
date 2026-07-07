const carGrid = document.getElementById('car-grid');
const searchInput = document.getElementById('searchInput');
let allCars = [];

// Fetch data from the fm5.json file
fetch('data/fm5.json')
    .then(response => response.json())
    .then(data => {
        allCars = data;
        renderCars(allCars);
    })
    .catch(error => console.error('Error loading data:', error));

// Function to display cars
function renderCars(cars) {
    carGrid.innerHTML = cars.map(car => `
        <div class="car-card">
            <img src="assets/fm5/${car.thumbnail}" alt="${car.make} ${car.model}">
            <h3>${car.make} ${car.model}</h3>
            <p>
                Year: ${car.year} | 
                <img src="assets/flags/${car.country}.png" alt="${car.country}" style="width: 20px; vertical-align: middle;"> 
                ${car.country}
            </p>
            <p>Class: ${car.class} | Rating: ${car.rating}</p>
        </div>
    `).join('');
}

// Search functionality: Searches by Make, Model, or Country
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allCars.filter(car => 
        car.make.toLowerCase().includes(term) || 
        car.model.toLowerCase().includes(term) ||
        car.country.toLowerCase().includes(term)
    );
    renderCars(filtered);
});
