const prisma = require("./src/prisma");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./src/routes/auth");
const app = express();
const taskRoutes = require("./src/routes/tasks");

const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manager-pro-1-wvms.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman/curl
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Backend funcionando ✅" });
});

app.get("/db-check", async (req, res) => {
  try {
    const usersCount = await prisma.user.count();
    res.json({ ok: true, usersCount });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
