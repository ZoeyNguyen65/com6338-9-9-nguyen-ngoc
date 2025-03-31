//Select the form, input, and weather section elements//
const form = document.querySelector('form');
const weatherSection = document.querySelector('#weather');
const inputField = document.querySelector('input[name="search"]');


form.addEventListener('submit', (event) => {//3RD BULLET: Converting a function declaration into an arrow function//
    event.preventDefault();
    
    const location = inputField.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=be6ccdb952d3f470cf48e6994f68c6e7`; //4TH BULLET: Use template literals and string interpolation//
    
    inputField.value = ''; 
    weatherSection.innerHTML = ''; 
    weatherSection.style.display = 'none';

  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    
    //5TH BULLET: Convert some object-related code to use ES6 destructuring - STARTS//
    const { cod } = data;
    if (cod === "404") {
    const weatherHTML = `<h2>Location Not Found</h2>`;
    weatherSection.innerHTML = weatherHTML;
    weatherSection.style.display = 'block';

  } else {
    const { coord, name, sys, weather, main } = data;
    const { lat, lon } = coord;
    const { icon, description } = weather[0];
    const { temp, feels_like } = main;
    //5TH BULLET - ENDS//
    
    const date = new Date(); //1ST BULLET: Convert a 'var' declaration to 'const'//
    const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank">Click to view map</a>
      <img style="display: block; margin: 0 auto;" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
      <p style="text-transform: capitalize;">${data.weather[0].description}</p>
      <br>
      <p>Current: ${data.main.temp}°F</p>
      <p>Feels like: ${data.main.feels_like}°F</p>
      <br>
      <p>Last updated: ${new Date(data.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p> 
      
    `; //4TH BULLET: Use template literals and string interpolation//

    weatherSection.innerHTML = weatherHTML;
    weatherSection.style.display = 'block'; 
    }})

  .catch(error => console.error('Error:', error));
});