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
function nextJoke() {
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
