const carGrid = document.getElementById('car-grid');
const searchInput = document.getElementById('searchInput');
const tabs = document.querySelectorAll('.tab');
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

// Function to render the cars to the grid
function renderCars(cars) {
    carGrid.innerHTML = cars.map(car => {
        // Construct the path dynamically based on the car's game property
        const imagePath = `assets/${car.game}/cars/${car.thumbnail}`;
        
        return `
            <div class="car-card">
                <div class="image-wrapper">
                    <img src="${imagePath}" alt="${car.make} ${car.model}">
                </div>
                
                <div class="year-country">
                    ${car.year} ${car.make.toUpperCase()} ${getFlagEmoji(car.country)}
                </div>
                
                <h3>${car.model.toUpperCase()}</h3>
                
                <div class="rating-badge">
                    <span class="class-box">${car.class}</span>
                    <span class="rating-number">${car.rating}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Function to fetch data based on the game tab
function loadGameData(gameKey) {
    // If 'all', fetches a master JSON, otherwise fetches specific file
    const filePath = (gameKey === 'all') ? 'data/all_cars.json' : `data/${gameKey}.json`;
    
    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            allCars = data;
            renderCars(allCars);
        })
        .catch(error => console.error('Error loading data:', error));
}

// Initial Load
loadGameData('fm5'); 

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

// Tab Click Event Listener for Filtering
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update UI: Remove active class from old tab, add to new one
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');

        // Fetch and re-render based on the selected data-game attribute
        const game = tab.getAttribute('data-game');
        loadGameData(game);
        
        // Clear search input when switching tabs
        searchInput.value = '';
    });
});
