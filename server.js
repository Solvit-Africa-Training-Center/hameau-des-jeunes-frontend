// /var/www/hameau-frontend/server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3050;

// 1️⃣ Serve static files from the Vite build folder
app.use(express.static(path.join(__dirname, "dist")));

// 2️⃣ SPA fallback: all unmatched GET requests return index.html
//    Notice: this must be AFTER express.static
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "dist", "index.html");
  res.sendFile(indexPath, err => {
    if (err) {
      console.error("Error sending index.html:", err);
      res.status(500).send("Server error");
    }
  });
});

// 3️⃣ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
