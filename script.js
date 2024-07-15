document.addEventListener('DOMContentLoaded', () => {
    const countryCards = document.getElementById('countryCards');
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(countries => {
        countries.forEach(country => {
          const countryName = country.name.common;
          const capital = country.capital 
          const flag = country.flags.png 
          const countryCode = country.cca2;
          const population=country.population;
          const region=country.region;
          const latlng = country.latlng;
          
           
          const card = document.createElement('div');
          card.className = 'col-sm-6 col-md-4 col-lg-4 col-xl-4';
          card.innerHTML = `
            <div class="card h-100">
            <div class="card-header bg-transparent border-success"><h5>${countryName}</h5></div>
              <img src="${flag}" class="card-img-top" alt="${countryName} flag">
              <div class="card-body">
                
                
                 <div class="card-text" style="pd-10px">
                 <strong>Capital:</strong>${capital}
                 <strong>Region:</strong>${region} <br>
                 <strong>Population:</strong>${population} <br>
                 <strong>Country code:</strong>${countryCode}<br>
                 <strong>Latlng:</strong>${latlng}
                 
                 </div>
          
                
                <button class="btn btn-primary get-weather" data-capital="${capital}">Click for weather</button>
                <div class="weather-info mt-3"></div>
              </div>
            </div>
          `;
          countryCards.append(card);
        });
        document.querySelectorAll('.get-weather').forEach(button => {
          button.addEventListener('click', function() {
            const capital = this.getAttribute('data-capital');
            const weatherInfo = this.nextElementSibling;
  
            if (capital !== 'No capital') {
              fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=c3c038f2f8232fd4bcb4e4ed2ff79436&units=metric`)
                .then(response => response.json())
                .then(weather => {
                  weatherInfo.innerHTML = `
                    <strong>Weather:</strong> ${weather.weather[0].description}<br>
                    <strong>Temperature:</strong> ${weather.main.temp} °C
                  `;
                })
                .catch(error => {
                  weatherInfo.innerHTML = 'Error fetching weather data';
                  console.error('Error fetching weather data:', error);
                });
            } else {
              weatherInfo.innerHTML = 'No capital city available';
            }
          });
        });
      })
      .catch(error => console.error('Error fetching countries data:', error));
  });
  