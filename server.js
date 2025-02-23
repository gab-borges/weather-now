require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const path = require("path");

// Settings
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// API Route
app.get("/api/weather", async (req, res) => {
    try {
        const city = encodeURIComponent(req.query.city); // Special Characters
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${process.env.API_KEY}`
        );

        if (response.data.cod === "404") {
            return res.status(404).json({ message: "City not found" });
        }

        res.json(response.data);
    } catch (error) {
        // Trata especificamente o erro 404 da API
        if (error.response?.data?.cod === "404") {
            return res.status(404).json({ message: "City not found" });
        }
        res.status(500).json({ error: "Error on server" });
    }
});

// Servir frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
