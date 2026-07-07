const carGrid = document.getElementById('car-grid');
const searchInput = document.getElementById('searchInput');
let allCars = [];

// Helper function to return the correct emoji for a country
function getFlagEmoji(country) {
    const flags = {
        "Italy": "🇮🇹",
        "Japan": "🇯🇵",
        "USA": "🇺🇸",
        "Germany": "🇩🇪",
        "United Kingdom": "🇬🇧",
        "France": "🇫🇷"
    };
    return flags[country] || "🏁"; 
}

// Fetch data from the fm5.json file
fetch('data/fm5.json')
    .then(response => response.json())
    .then(data => {
        allCars = data;
        renderCars(allCars);
    })
    .catch(error => console.error('Error loading data:', error));

function renderCars(cars) {
    carGrid.innerHTML = cars.map(car => {
        // Construct the full path
        const imagePath = `assets/fm5/cars/${car.thumbnail}`;
        
        return `
            <div class="car-card">
                <img src="${imagePath}" alt="${car.make} ${car.model}">
                
                <div class="year-country">
                    ${car.year} ${car.make.toUpperCase()} ${getFlagEmoji(car.country)}
                </div>
                
                <h3>${car.model.toUpperCase()}</h3>
                
                <div class="stats-container" style="display: none;">
                    ${Object.entries(car.stats).map(([key, value]) => `
                        <div class="stat-row">
                            <label>${key}</label>
                            <span>${value}</span>
                            <progress value="${value}" max="10"></progress>
                        </div>
                    `).join('')}
                </div>

                <div class="rating-badge">
                    <span class="class-box">${car.class}</span>
                    <span class="rating-number">${car.rating}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allCars.filter(car => 
        car.make.toLowerCase().includes(term) || 
        car.model.toLowerCase().includes(term) ||
        car.country.toLowerCase().includes(term)
    );
    renderCars(filtered);
});
