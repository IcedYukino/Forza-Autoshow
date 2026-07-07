// 1. Load the data
fetch('Forza Horizon 6.json')
    .then(response => response.json())
    .then(data => {
        displayCars(data);
        
        // 2. Add search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            const filtered = data.filter(car => 
                car.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            displayCars(filtered);
        });
    });

// 3. Function to render the UI
function displayCars(cars) {
    const grid = document.getElementById('car-grid');
    grid.innerHTML = cars.map(car => `
        <div class="car-card">
            <h3>${car.name}</h3>
            <p>Class: ${car.class}</p>
        </div>
    `).join('');
}
