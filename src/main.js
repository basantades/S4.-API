"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const stars = document.querySelectorAll('.star');
let rating = 0;
let actualJoke = '';
const reportAcudits = [];
function nextJokeRandom() {
    return __awaiter(this, void 0, void 0, function* () {
        resetRating();
        try {
            const response = yield fetch('https://icanhazdadjoke.com/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json', // Indicas que esperas una respuesta JSON
                },
            });
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = yield response.json(); // Parseas la respuesta como JSON
            const joke = data.joke;
            actualJoke = joke;
            console.log(joke);
            const jokeDiv = document.getElementById('joke');
            if (jokeDiv instanceof HTMLElement) {
                jokeDiv.innerHTML = joke;
            }
            else {
                console.error('Element with ID "joke" not found or is not a valid HTML element');
            }
        }
        catch (error) {
            console.error('Error:', error); // Manejas errores
        }
    });
}
function nextJokeChuck() {
    return __awaiter(this, void 0, void 0, function* () {
        resetRating();
        try {
            const response = yield fetch('https://api.chucknorris.io/jokes/random', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = yield response.json();
            const joke = data.value;
            actualJoke = joke;
            console.log(joke);
            const jokeDiv = document.getElementById('joke');
            if (jokeDiv instanceof HTMLElement) {
                jokeDiv.innerHTML = joke;
            }
            else {
                console.error('Element with ID "joke" not found or is not a valid HTML element');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
function nextJoke() {
    const random = Math.floor(Math.random() * 2 + 1);
    if (random === 1) {
        nextJokeRandom();
    }
    else {
        nextJokeChuck();
    }
}
nextJoke();
// Comportamiento estrellas valoracion:
stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        stars.forEach((s, i) => {
            if (i <= index) {
                s.innerHTML = '&#9733;';
                s.classList.add('filled');
            }
            else {
                s.innerHTML = '&#9734;';
                s.classList.remove('filled');
            }
        });
    });
});
function rateJoke(valor) {
    rating = valor;
    saveRating();
}
function saveRating() {
    let guardado = false;
    reportAcudits.forEach((acudit) => {
        if (acudit.joke === actualJoke) {
            acudit.score = rating;
            acudit.date = new Date().toISOString();
            guardado = true;
        }
    });
    if (!guardado) {
        reportAcudits.push({
            joke: actualJoke,
            score: rating,
            date: new Date().toISOString()
        });
    }
    console.log(reportAcudits);
}
function resetRating() {
    rating = 0;
    stars.forEach((star) => {
        star.innerHTML = '&#9734;';
        star.classList.remove('filled');
    });
}
//   Info meteorologica
function infoMeteo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona,es&appid=c886f446ea5439b937e65f2bfbd349c3&units=metric&lang=es', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = yield response.json();
            const info = document.querySelector('#infoMeteo');
            const iconMeteo = document.querySelector('#iconMeteo');
            if (iconMeteo instanceof HTMLElement) {
                iconMeteo.innerHTML = `<i class="wi wi-owm-${data.weather[0].id}"></i>`;
                // iconMeteo.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icono del clima">`;
            }
            else {
                console.error('Element with ID "iconMeteo" not found or is not a valid HTML element');
            }
            if (info instanceof HTMLElement) {
                info.innerHTML = `${data.name}: ${data.weather[0].description} <br>
        ${parseInt(data.main.temp)}°C`;
            }
            else {
                console.error('Element with ID "infoMeteo" not found or is not a valid HTML element');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
infoMeteo();
