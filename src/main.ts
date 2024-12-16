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
    console.log(data);

    const info = document.querySelector('#infoMeteo');
    const iconMeteo = document.querySelector('#iconMeteo');

    if (iconMeteo instanceof HTMLElement) {
        iconMeteo.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icono del clima">`;
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