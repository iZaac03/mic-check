const http = require("http");
const db = require("./databis");

const server = http.createServer((req, res) => {
  // SIGNUP
  if (req.method === "POST" && req.url === "/signup") {
    let body = "";
    req.on("data", chunk => { body += chunk.toString(); });
    req.on("end", () => {
      const { name, email, password } = JSON.parse(body);

      // Insert new user
      db.query("INSERT INTO users (name, email_address, password_hash) VALUES (?, ?, ?)", 
        [name, email_address, password], 
        (err, result) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Server error or email already exists" }));
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "✅ Account created successfully!" }));
        });
    });
  }

  // LOGIN
  else if (req.method === "POST" && req.url === "/login") {
    let body = "";
    req.on("data", chunk => { body += chunk.toString(); });
    req.on("end", () => {
      const { email, password } = JSON.parse(body);

      db.query("SELECT * FROM users WHERE email_address = ? AND password_hash = ?", [email_address, password], (err, results) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ message: "Server error" }));
        }

        if (results.length > 0) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "✅ Login successful" }));
        } else {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "❌ Invalid email or password" }));
        }
      });
    });
  }

  // DEFAULT
  else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));
