const stars = document.querySelectorAll('.star');
let rating: number = 0;
let actualJoke: string = '';
const reportAcudits: { joke: string, score: number, date: string }[] = [];


async function nextJokeRandom(): Promise<void> {
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

  async function nextJokeChuck(): Promise<void> {
    resetRating();
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random', {
            method: 'GET',
            headers: {
                'Accept': 'application/json', 
            },
        });
  
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
  
        const data = await response.json(); 
        const joke = data.value;
        actualJoke = joke;
        console.log(joke);
  
        const jokeDiv = document.getElementById('joke');
        if (jokeDiv instanceof HTMLElement) {
            jokeDiv.innerHTML = joke;
        } else {
            console.error('Element with ID "joke" not found or is not a valid HTML element');
        }   
        } catch (error) {
        console.error('Error:', error); 
    }
  }
  
  function nextJoke() {
    aparicionBlobRandom();
    const random: number = Math.floor(Math.random() * 2 + 1);
    if (random === 1) {
        nextJokeRandom();
    } else {
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
        } else {    
            s.innerHTML = '&#9734;';
            s.classList.remove('filled');
        }
    });
  });
});

function rateJoke(valor: number) {
    if (valor === 1) {
        fondoEnfadado()
    } else if (valor === 3) {
        fondoContento()
    } else {
        fondoNeutro()
    }
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
    fondoNeutro()
  }

function fondoNeutro() {
    const fondo = document.querySelector('.background');
    fondo?.classList.remove('img-val-mala');
    fondo?.classList.remove('img-val-buena');
}

function fondoEnfadado() {
    const fondo = document.querySelector('.background');
    fondo?.classList.remove('img-val-buena');
    fondo?.classList.add('img-val-mala');
}

function fondoContento() {
    const fondo = document.querySelector('.background');
    fondo?.classList.remove('img-val-mala');
    fondo?.classList.add('img-val-buena');
}


function aparicionBlobRandom() {
    const random: number = Math.floor(Math.random() * 6 + 1);
    console.log(random);
    const blob = document.getElementById('blob');
    blob?.classList.remove('blob-1', 'blob-2', 'blob-3', 'blob-4', 'blob-5', 'blob-6', 'animacion-blob');
    void blob?.offsetWidth; 
    blob?.classList.add(`blob-${random}`, 'animacion-blob');
    blob?.classList.toggle('flip');
}


//   Info meteorologica

async function infoMeteo(): Promise<void> {
    try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona,es&appid=c886f446ea5439b937e65f2bfbd349c3&units=metric&lang=es', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });
  
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json(); 

    const info = document.querySelector('#infoMeteo');
    const iconMeteo = document.querySelector('#iconMeteo');

    if (iconMeteo instanceof HTMLElement) {
        iconMeteo.innerHTML = `<i class="wi wi-owm-${data.weather[0].id}"></i>`;
        // iconMeteo.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icono del clima">`;
    } else {
        console.error('Element with ID "iconMeteo" not found or is not a valid HTML element');
    } 

    if (info instanceof HTMLElement) {
        info.innerHTML = `${data.name}: ${data.weather[0].description} <br>
        ${parseInt(data.main.temp)}°C`;
    } else {
        console.error('Element with ID "infoMeteo" not found or is not a valid HTML element');
    }   
    } catch (error) {
    console.error('Error:', error); 
    }
  }

  infoMeteo();