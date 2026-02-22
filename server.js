const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/option-chain", async (req, res) => {
  try {
    const response = await fetch(
      "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json",
          "Referer": "https://www.nseindia.com/option-chain"
        }
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch NSE data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
