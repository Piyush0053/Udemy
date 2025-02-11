import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";
import { red } from "@mui/material/colors";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "46da06df608c641190f4fb12f5066861";

  // API CALL
  // To call or use the API key we use the asynchronous function (async)
  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();

      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
      };
      console.log(result);
      return result;
    } catch(err) {
      throw err;
    }
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };
  let onSubmitClick = async (event) => {
    try {
      event.preventDefault();
      let newInfo = await getWeatherInfo();
      setCity("");
      updateInfo(newInfo);
    } catch {
      setError(true);
    }
  };
  return (
    <div className="SearchBox">
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
        {error && <p style={{color:"red"}}>No such place exists!</p>}
      </form>
    </div>
  );
}
