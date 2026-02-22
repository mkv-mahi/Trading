const express = require("express");
const fetch = require("node-fetch");
const tough = require("tough-cookie");
const fetchCookie = require("fetch-cookie");

const app = express();
const PORT = process.env.PORT || 10000;

// Create cookie jar
const cookieJar = new tough.CookieJar();
const fetchWithCookies = fetchCookie(fetch, cookieJar);

app.get("/option-chain", async (req, res) => {
  try {

    // Step 1: Visit NSE homepage to get cookies
    await fetchWithCookies("https://www.nseindia.com", {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    // Step 2: Call Option Chain API
    const response = await fetchWithCookies(
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
    console.error(error);
    res.status(500).json({ error: "Failed to fetch NSE data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
