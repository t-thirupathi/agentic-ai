import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const API_KEY = process.env.OWM_API_KEY;

// MCP "capabilities" endpoint
app.get("/", (req, res) => {
  res.json({
    name: "WeatherMCP",
    version: "1.0.0",
    tools: [
      {
        name: "fetch_weather",
        description: "Get current weather for a given city",
        inputSchema: {
          type: "object",
          properties: {
            city: { type: "string", description: "City name" }
          },
          required: ["city"]
        }
      }
    ]
  });
});

// MCP tool execution endpoint
app.post("/tools/fetch_weather", async (req, res) => {
  const { city } = req.body;
  if (!city) {
    return res.status(400).json({ error: "Missing 'city' parameter" });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod !== 200) {
      return res.status(500).json({ error: data.message });
    }

    res.json({
      city: data.name,
      temperature_celsius: data.main.temp,
      condition: data.weather[0].description,
      humidity_percent: data.main.humidity
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`WeatherMCP running on port ${PORT}`);
});
