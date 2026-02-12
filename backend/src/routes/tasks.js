const express = require("express");
const prisma = require("../prisma");
const auth = require("../middleware/auth");

const router = express.Router();

// Crear tarea
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, tags } = req.body;

    if (!title) {
      return res.status(400).json({ error: "title es requerido" });
    }

    const task = await prisma.task.create({
      data: {
        userId: req.user.userId,
        title,
        description: description ?? null,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority: priority ?? "MEDIUM",
        status: status ?? "TODO",
        tags: Array.isArray(tags) ? tags : [],
      },
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar tareas (con filtros básicos)
router.get("/", auth, async (req, res) => {
  try {
    const { status, priority, q } = req.query;

    const where = {
      userId: req.user.userId,
      ...(status ? { status } : {}),
      ...(priority ? { priority } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Editar tarea (solo si es tuya)
router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, status, tags } = req.body;

    // aseguramos que la tarea es del usuario
    const existing = await prisma.task.findFirst({
      where: { id, userId: req.user.userId },
    });

    if (!existing) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    const updated = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(dueDate !== undefined
          ? { dueDate: dueDate ? new Date(dueDate) : null }
          : {}),
        ...(priority !== undefined ? { priority } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(tags !== undefined ? { tags: Array.isArray(tags) ? tags : [] } : {}),
      },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Borrar tarea (solo si es tuya)
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.task.findFirst({
      where: { id, userId: req.user.userId },
    });

    if (!existing) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    await prisma.task.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
