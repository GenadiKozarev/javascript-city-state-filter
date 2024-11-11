const endpoint =
    'https://gist.githubusercontent.com/GenadiKozarev/2e69b5f26527e3de0c464f15753ac77e/raw/0cc0086c0a8a1485faf1cc9b44a2dbed37d59ad5/usa_cities.json';

const searchFrom = [];

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
