import { useState, useEffect } from 'react';

import WeatherWidget from './WeatherWidget/WeatherWidget';
import Search from './Search/Search';

const App = () => {
    const [weather, setWeather] = useState([]);
    const [city, setCity] = useState('');

    useEffect(() => {
        //const fetchWeather = async () => {
        //  try {
        //    const response = await axios.get(
        //      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        //    );
        //    setWeather(response.data.list.slice(0, 10));
        //  } catch (error) {
        //    console.error('Error fetching weather data:', error);
        //  }
        //};

        //if (city) {
        //  fetchWeather();
        //}
    }, [city]);

    const handleSearch = (event) => {
        event.preventDefault();
        const searchCity = event.target.elements.city.value;
        setCity(searchCity);
    };

    const handleCoor = (event) => {
        event.preventDefault();
        const searchCity = event.target.elements.city.value;
        setCity(searchCity);
    };
    
    return (
        <div style={{margin: '10px auto', width: "800px"}}>
            {   <div style={{ float: 'right', margin: "10px" }}>
                    <h2>Выберите населенный пункт</h2>
                    <div>

                    </div>
                </div>
            }

            <h1>Weather Forecast</h1>
            <h2>City</h2>
            <form onSubmit={handleSearch}>
                <input type="text" name="city" placeholder="Enter city" />
                <button type="submit">Search</button>
            </form>
            <form onSubmit={handleCoor}>
                <input type="text" name="lat" placeholder="Enter latitude" />
                <input type="text" name="lon" placeholder="Enter longitude" />
                <button type="submit">Search</button>
            </form>
            {weather.length > 0 ? (
                <ul>
                    {weather.map((item) => (
                        <li key={item.dt}>
                            <strong>{new Date(item.dt * 1000).toLocaleDateString()}</strong>
                            <p>Temperature: {item.main.temp}°C</p>
                            <p>Description: {item.weather[0].description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No weather data available.</p>
            )}
        </div>
    );
};

export default App;

function get_base_path() {
    const url = new URL(window.location.href)
    const BasePath = (url.port !== '80') ? `${url.protocol}//${url.hostname}:${url.port}` : `${url.protocol}//${url.hostname}`;
    return BasePath;
}

async function get_moscow(setCity, setWeather) {
    const url = get_base_path();
    setCity('Москва');

    fetch(`${url}/wether/moscow`).then(
        res => {
            if (res.status === 200)
                res.json().then(data => {
                    return data;
                })
            else return get_moscow(setCity, setWeather);
        }
    );
}