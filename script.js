const carGrid = document.getElementById('car-grid');
const searchInput = document.getElementById('searchInput');
const tabs = document.querySelectorAll('.tab');
let allCars = [];

// Helper: Ensure you have this function defined elsewhere or included
function getFlagEmoji(country) {
    // Basic implementation: if you have a mapping, use it here.
    // Otherwise, this serves as a placeholder.
    return "🏁"; 
}

function renderCars(cars) {
    if (!cars || cars.length === 0) {
        carGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">No cars found.</p>';
        return;
    }

    carGrid.innerHTML = cars.map(car => {
        const imagePath = `assets/${car.game}/cars/${car.thumbnail}`;
        return `
            <div class="car-card">
                <div class="image-wrapper">
                    <img src="${imagePath}" alt="${car.make} ${car.model}" onerror="this.src='assets/placeholder.png'">
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

// Search Logic
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allCars.filter(car => 
        car.make.toLowerCase().includes(searchTerm) || 
        car.model.toLowerCase().includes(searchTerm)
    );
    renderCars(filtered);
});

function loadGameData(gameKey) {
    fetch(`data/${gameKey}.json`)
        .then(response => response.json())
        .then(data => {
            allCars = data;
            renderCars(allCars);
        })
        .catch(error => {
            console.error('Error loading data:', error);
            carGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Error loading car data.</p>';
        });
}

// Tabs
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        loadGameData(tab.getAttribute('data-game'));
        searchInput.value = '';
    });
});
