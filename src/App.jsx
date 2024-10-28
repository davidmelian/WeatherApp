// console.log(import.meta.env.VITE_API_KEY);

import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);

  const apiWeather =
    "https://api.weatherapi.com/v1/current.json?key=184509bf6e1a4301ae4123031242610&lang=en&q=";

  const submit = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please write a city");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiWeather + city);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ mt: 2 }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        gutterBottom
      >
        WEATHER APP
      </Typography>
      <Box
        sx={{ display: "grid", gap: 2, mt: 5 }}
        component="form"
        onSubmit={submit}
      >
        <TextField
          variant="outlined"
          label="City"
          required
          size="small"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          error={!!error}
          helperText={error ? error : ""}
        />
        <LoadingButton
          variant="contained"
          type="submit"
          loading={loading}
          loadingIndicator="loading..."
        >
          Search
        </LoadingButton>
      </Box>

      {weather && (
        <Box
          display="grid"
          gap="2"
          textAlign="center"
          sx={{ mt: 4 }}
        >
          <Typography variant="h4">
            {weather.location.name}, {weather.location.country}
          </Typography>
          <Box
            component="img"
            sx={{ margin: "0 auto" }}
            alt={weather.current.condition.text}
            src={weather.current.condition.icon}
          />
          <Typography variant="h4">{weather.current.temp_c}°C</Typography>
          <Typography variant="h4">{weather.current.condition.text}</Typography>
        </Box>
      )}
      <Typography
        textAlign="center"
        sx={{ mt: 2, fontSize: "10px" }}
      >
        Powered by:{" "}
        <a
          href="https://www.weatherapi.com/"
          title="Weather API"
        >
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  );
};

export default App;
