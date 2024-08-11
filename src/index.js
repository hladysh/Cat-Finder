import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_Bjjum5b8emi8hKAb8pVjIMjTeAscmxJgp00CquD32GMm4tc05hVKr2Clp0vqLY3r';

document.addEventListener('DOMContentLoaded', function () {
    new SlimSelect({
        select: '.breed-select',
    });

    async function loadBreeds() {
        try {
            const breedSelect = document.querySelector('.breed-select');

            document.querySelector('.loader').classList.remove('hidden');
            breedSelect.classList.add('hidden');
            document.querySelector('.error').classList.add('hidden');

            const response = await axios.get('https://api.thecatapi.com/v1/breeds');
            const breeds = response.data;

            breedSelect.innerHTML = breeds
                .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
                .join('');

            breedSelect.classList.remove('hidden');
        } catch (error) {
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        } finally {
            document.querySelector('.loader').classList.add('hidden');
        }
    }

    async function loadCatByBreed(breedId) {
        try {
            document.querySelector('.loader').classList.remove('hidden');
            document.querySelector('.cat-info').classList.add('hidden');
            document.querySelector('.breed-select').classList.add('hidden');
            document.querySelector('.error').classList.add('hidden');

            const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
            const catData = response.data[0];

            const catInfoDiv = document.querySelector('.cat-info');
            catInfoDiv.innerHTML = `
        <img src="${catData.url}" alt="Cat Image">
        <h2>${catData.breeds[0].name}</h2>
        <p>${catData.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
      `;

            catInfoDiv.classList.remove('hidden');
        } catch (error) {
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        } finally {
            document.querySelector('.loader').classList.add('hidden');
            document.querySelector('.breed-select').classList.remove('hidden');
        }
    }

    document.querySelector('.breed-select').addEventListener('change', function (e) {
        const breedId = e.target.value;
        if (breedId) {
            loadCatByBreed(breedId);
        }
    });

    loadBreeds();
});
