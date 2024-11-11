const endpoint =
    'https://gist.githubusercontent.com/GenadiKozarev/2e69b5f26527e3de0c464f15753ac77e/raw/0cc0086c0a8a1485faf1cc9b44a2dbed37d59ad5/usa_cities.json';
const searchFrom = [];
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

fetch(endpoint)
    .then(res => res.json())
    .then(data =>
        data ? searchFrom.push(...data) : console.log('Missing data...')
    );

function findMatches(query, searchFrom) {
    return searchFrom.filter(result => {
        // 'g' - global flag ensures the search doesn't stop after the first query match
        // 'i' - insensitive flag means the search will be case-insensitive
        const regExp = new RegExp(query, 'gi');
        return result.city.match(regExp) || result.state.match(regExp);
    });
}

function numberWithCommas(input) {
    // e.g. 8405837 -> 8,405,837
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, searchFrom);
    const html = matchArray
        .map(result => {
            const regExp = new RegExp(this.value, 'gi');
            const cityName = result.city.replace(
                regExp,
                `<span class="highlight">${this.value}</span>`
            );
            const stateName = result.state.replace(
                regExp,
                `<span class="highlight">${this.value}</span>`
            );
            return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">population: ${numberWithCommas(
                    result.population
                )}</span>
            </li>
        `;
        })
        .join('');
    suggestions.innerHTML = html;
}

searchInput.addEventListener('keyup', displayMatches);
