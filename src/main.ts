
async function nextJoke() {
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
        console.log(joke);
  
        const jokeDiv = document.getElementById('joke');
        if (jokeDiv) {
            jokeDiv.innerHTML = joke;
          } else {
            console.error('Element with ID "joke" not found');
          }    
        } catch (error) {
        console.error('Error:', error); // Manejas errores
    }
  }
  
  nextJoke();
  