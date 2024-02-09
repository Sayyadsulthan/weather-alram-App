import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
    const [greet, setGreet] = useState('goodmorning');
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    // for weater
    const [weatherData, setWeatherData] = useState(null);
    const [image, setImage] = useState('');
    const [location, setLocation] = useState('');
    useEffect(() => {
        setInterval(() => {
            let date = new Date();
            let greetSet =
                date.getHours() < 12
                    ? 'Good Morning'
                    : date.getHours() >= 12 && date.getHours() < 16
                    ? 'Good AfterNoon'
                    : date.getHours >= 16 && date.getHours() < 20
                    ? 'Good Evening'
                    : 'Good Night';
            setTime(new Date().toLocaleTimeString());
            setGreet(greetSet);
        });
    }, []);

    const getWeatherInfo = async (e) => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f47439f47c28317f8d78c53ebc75575a`
            );

            const data = await res.json();
            console.log(data);
            const MT = Math.round(data.main.temp);
            const FL = Math.round(data.main.feels_like);

            const weather = {
                location: `Weather in  ${data.name}`,
                temp: `Tempratures : ${MT} C`,
                feels_like: `Feels Like : ${FL} C`,
                humidity: `Humidity : ${data.main.humidity}%`,
                wind: `wind : ${data.wind.speed} km/h`,
                condition: `weather Condition: ${data.weather[0].description}`,
            };
            setWeatherData(weather);
            setImage(data.weather[0].icon);
            setLocation('');
        } catch (err) {
            alert('PLease Enter the Valid place');
        }
    };

    return (
        <>
            <div className="wrapper">
                <div className="time-wrapper">
                    <h1>Hey Sayyad!</h1>
                    <h1>{greet}</h1>
                    <p>
                        {' '}
                        <span style={{ marginRight: '10px' }}>The current Time is :</span>
                        <span>{time}</span>
                    </p>
                </div>

                <div className="weather-wrapper">
                    <div className="input-location">
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            placeholder="location.."
                        />
                        <button onClick={getWeatherInfo} type="submit">
                            Check Weater
                        </button>
                    </div>

                    <div className="display-weather">
                        {weatherData &&
                            Object.keys(weatherData).map((val, index) => (
                                <p key={index}>{weatherData[val]}</p>
                            ))}

                        {weatherData && (
                            <>
                                <img
                                    src={`http://openweathermap.org/img/wn/${image}.png`}
                                    height={60}
                                    style={{ background: '#918888' }}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
