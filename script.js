document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const resultsContainer = document.getElementById('results-container');
    const url = 'https://data.techforpalestine.org/api/v2/killed-in-gaza.min.json';

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = document.getElementById('name').value.toLowerCase();
        resultsContainer.innerHTML = ''; // Clear previous results

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm));
                if (filteredData.length === 0) {
                    resultsContainer.innerHTML = '<p class="text-white">No results found</p>';
                } else {
                    filteredData.forEach(item => {
                        const dataItem = document.createElement('div');
                        dataItem.classList.add('data-item');
                        dataItem.innerHTML = `<h3>${item.name}</h3><p>Age: ${item.age}</p>`;
                        resultsContainer.appendChild(dataItem);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                resultsContainer.innerHTML = '<p class="text-white">An error occurred while fetching data.</p>';
            });
    });
});
