// src/index.ts
import express from "express";
import commentRouter from "./routes/comment.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk membaca JSON dari request body
app.use(express.json());

// Daftarkan rute komentar dengan prefix /api/comments
app.use("/api/comments", commentRouter);

// Route testing sederhana
app.get("/", (req, res) => {
  res.json({ success: true, message: "Modul 4 API is running!" });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});