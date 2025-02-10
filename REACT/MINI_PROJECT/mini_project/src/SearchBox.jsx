import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox() {
  let [city, setCity] = useState("");

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY="46da06df608c641190f4fb12f5066861";

  // To call or use the API key we use the asynchronous function (async)
  let getWeatherInfo= async () =>{
    let response= await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    let jsonResponse=   await response.json();
    let result={
      temp:jsonResponse.main.temp,
      tempMin: jsonResponse.main.temp_min,
      tempMax: jsonResponse.main.temp_max,
      humidity:jsonResponse.main.humidity,
    };
    console.log(result);
  };

  let handleChange=(event)=>{
    setCity(event.target.value);
  }
  let onSubmitClick= (event)=>{
    event.preventDefault();
    setCity("");
    getWeatherInfo();
  }
  return (

    <div className="SearchBox">
      <h3>Search For the weather</h3>
      <form onSubmit={onSubmitClick}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}

        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
}
