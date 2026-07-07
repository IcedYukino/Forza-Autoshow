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
            <img src="assets/fm5/${car.image}" alt="${car.name}">
            <h3>${car.name}</h3>
            <p>Class: ${car.class}</p>
        </div>
    `).join('');
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allCars.filter(car => 
        car.name.toLowerCase().includes(term)
    );
    renderCars(filtered);
});
