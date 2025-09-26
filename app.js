const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (css, js, images) from project folder
app.use(express.static(path.join(__dirname)));

// Serve login.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// Serve signup.html at /signup
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
