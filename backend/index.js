const prisma = require("./src/prisma");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./src/routes/auth");
const app = express();
const taskRoutes = require("./src/routes/tasks");


app.use(cors());
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
