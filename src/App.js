import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const apiKey = "aa55f3e9261dc91810ca9bc38fffbdc4";
    const [inputCity, setInputCity] = useState("");
    const [data, setdata] = useState({});

    const getWeatherDetails = (cityName) => {
        if (!cityName) return;
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
        axios
            .get(apiURL)
            .then((res) => {
                setdata(res.data);
            })
            .catch((err) => {
                console.log("err", err);
            });
    };
    const handleChangeInput = (e) => {
        setInputCity(e.target.value);
    };
    const handleSearch = () => {
        getWeatherDetails(inputCity);
    };

    return (
        <div className="col-md-12">
            <div className="weatherBg">
                <h1 className="heading">Weather App</h1>
                <div className="d-grid gap-3 col-4 mt-4">
                    {/* <input type="text" className="form-control myInput" onChange={handleChangeInput} value={inputCity} autoFocus /> */}
                    <input
                        type="text"
                        className="form-control myInput"
                        onChange={handleChangeInput}
                        value={inputCity}
                        autoFocus
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              handleSearch()
                            }
                        }}
                        placeholder="Search"
                    />
                    <button className="btn btn-primary" onClick={handleSearch} type="button">
                        Search
                    </button>
                </div>
            </div>
            <script></script>
            {Object.keys(data).length > 0 && (
                <div className="col-md-12 text-center mt-5">
                    <div className="shadow rounded weatherResultBox">
                        <img className="weatherIcon" src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />
                        <h5 className="weatherCity">{data?.name}</h5>
                        <h6 className="weatherTemp">{(data?.main?.temp - 273.15).toFixed(1)}°C</h6>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
