import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_Bjjum5b8emi8hKAb8pVjIMjTeAscmxJgp00CquD32GMm4tc05hVKr2Clp0vqLY3r';

export async function fetchBreeds() {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
}

export async function fetchCatByBreed(breedId) {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data[0];
}
