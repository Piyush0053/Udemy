import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import { useState } from "react"

export default function WeatherApp(){
    const [weatherInfo, setWeatherInfo]=useState({
    city: "Deli",
    humidity: 19,
    temp: 21.1,
    tempMax: 21.1,
    tempMin: 21.1,
    weather: "Cloudy",
    });

    const updateInfo=(newInfo)=>{
        setWeatherInfo(newInfo);
    };
    return(
        <div style={{textAlign:"center"}}>
            <h3>Weather Widget</h3>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}