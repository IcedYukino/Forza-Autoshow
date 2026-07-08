const carGrid = document.getElementById('car-grid');
const searchInput = document.getElementById('searchInput');
const tabs = document.querySelectorAll('.tab');
let allCars = [];

// ... (keep getFlagEmoji function the same) ...

function renderCars(cars) {
    // If no cars exist, clear the grid and exit
    if (!cars || cars.length === 0) {
        carGrid.innerHTML = '<p style="text-align:center; margin-top:20px;">Select a game to view the collection.</p>';
        return;
    }

    carGrid.innerHTML = cars.map(car => {
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

// Updated: Only fetches when a specific button is clicked
function loadGameData(gameKey) {
    fetch(`data/${gameKey}.json`)
        .then(response => response.json())
        .then(data => {
            allCars = data;
            renderCars(allCars);
        })
        .catch(error => {
            console.error('Error loading data:', error);
            carGrid.innerHTML = '<p>Error loading car data.</p>';
        });
}

// Initial State: Clear the grid on load
carGrid.innerHTML = '<p style="text-align:center; margin-top:20px;">Select a game to view the collection.</p>';

// Tab Click Event Listener
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const game = tab.getAttribute('data-game');
        loadGameData(game);
        searchInput.value = '';
    });
});

// Search functionality remains the same...
