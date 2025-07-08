
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsYWtzaGF5YS5scEBnbWFpbC5jb20iLCJleHAiOjE3NTE5NTI5OTksImlhdCI6MTc1MTk1MjA5OSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImM5OWYxMTlkLWJmYzItNGNjZi1iMDg0LWQzOTYyOWUyYTcyOSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Imxha3NoYXlhIHBhcG5haSIsInN1YiI6IjgzOGJmZWRmLTVkNDItNDJhYS05Y2NhLTJiM2FkYzQyZGJiMiJ9LCJlbWFpbCI6Imxha3NoYXlhLmxwQGdtYWlsLmNvbSIsIm5hbWUiOiJsYWtzaGF5YSBwYXBuYWkiLCJyb2xsTm8iOiIwMTMxMzIwMzEyMiIsImFjY2Vzc0NvZGUiOiJWUHBzbVQiLCJjbGllbnRJRCI6IjgzOGJmZWRmLTVkNDItNDJhYS05Y2NhLTJiM2FkYzQyZGJiMiIsImNsaWVudFNlY3JldCI6ImpHRkRlcHBkZ1dXS3hVSFEifQ.fzt8NeFAI3k14ZDv-D3vdHoBBVCQzxqI9J5caaYHenk";

//  MIDDLEWARE 
app.use(async (req, res, next) => {
  try {
    await axios.post("http://20.244.56.144/evaluation-service/logs", {
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    });

    console.log(`[LOGGED] ${req.method} ${req.url}`);
  } catch (err) {
    console.error(" Log failed:", err.message);
  }

  next();
});


const urlMap = {};


function generateSlug() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let slug;
  do {
    slug = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  } while (urlMap[slug]);
  return slug;
}

//  POST /shorten → Create a new short URL
app.post('/shorten', (req, res) => {
  const { url } = req.body;

  if (!url || !/^https?:\/\/.+$/.test(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const slug = generateSlug();
  urlMap[slug] = url;

  const shortUrl = `http://localhost:${PORT}/${slug}`;
  res.json({ original: url, short: shortUrl });
});

// Get → Redirect to original URL
app.get('/:slug', (req, res) => {
  const longUrl = urlMap[req.params.slug];
  if (longUrl) {
    return res.redirect(longUrl);
  } else {
    return res.status(404).send("Short link not found");
  }
});

//  Sample home route
app.get('/', (req, res) => {
  res.send(' Middleware Logging + URL Shortener Active!');
});

//  Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
