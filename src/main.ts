const stars = document.querySelectorAll('.star');
let rating: number = 0;
let actualJoke: string = '';
const reportAcudits: { joke: string, score: number, date: string }[] = [];

async function nextJoke(): Promise<void> {
    resetRating();
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json', // Indicas que esperas una respuesta JSON
            },
        });
  
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
  
        const data = await response.json(); // Parseas la respuesta como JSON
        const joke = data.joke;
        actualJoke = joke;
        console.log(joke);
  
        const jokeDiv = document.getElementById('joke');
        if (jokeDiv instanceof HTMLElement) {
            jokeDiv.innerHTML = joke;
        } else {
            console.error('Element with ID "joke" not found or is not a valid HTML element');
        }   
        } catch (error) {
        console.error('Error:', error); // Manejas errores
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
        } else {    
            s.innerHTML = '&#9734;';
            s.classList.remove('filled');
        }
    });
  });
});

function rateJoke(valor: number) {
  rating = valor;
  saveRating()
}

function saveRating()   {
    let guardado = false;
    reportAcudits.forEach((acudit) => {
            if (acudit.joke === actualJoke) {
                acudit.score = rating;
                acudit.date = new Date().toISOString();
                guardado = true;
            }
        })
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