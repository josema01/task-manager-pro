import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";

export default function Tasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(""); // YYYY-MM-DD
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // -----------------------------
  // Utilidades fecha (días restantes)
  // -----------------------------
  function startOfDay(d) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  function daysLeftLabel(dueDateValue) {
    if (!dueDateValue) return null;

    const today = startOfDay(new Date());
    const due = startOfDay(new Date(dueDateValue));

    const diffMs = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `Vencida hace ${Math.abs(diffDays)}d`;
    if (diffDays === 0) return "Vence hoy";
    return `Quedan ${diffDays}d`;
  }

  // -----------------------------
  // Cargar tareas
  // -----------------------------
  async function loadTasks() {
    setError("");
    setLoading(true);

    try {
      const data = await apiFetch("/tasks");
      setTasks(data || []);
    } catch (err) {
      setError(err.message);

      if (String(err.message).toLowerCase().includes("token")) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  }

  // -----------------------------
  // Crear tarea
  // -----------------------------
  async function createTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await apiFetch("/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          dueDate: dueDate ? new Date(`${dueDate}T00:00:00`).toISOString() : null,
        }),
      });

      setTitle("");
      setDueDate("");
      await loadTasks();

      setToast({ message: "Tarea creada correctamente", type: "success" });
      setTimeout(() => setToast(null), 2000);
    } catch (err) {
      setError(err.message);
      setToast({ message: err.message, type: "error" });
      setTimeout(() => setToast(null), 2000);
    }
  }

  // -----------------------------
  // Toggle tarea
  // -----------------------------
  async function toggleTask(task) {
    try {
      await apiFetch(`/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: task.status === "DONE" ? "TODO" : "DONE",
        }),
      });

      await loadTasks();
    } catch (err) {
      setError(err.message);
      setToast({ message: err.message, type: "error" });
      setTimeout(() => setToast(null), 2000);
    }
  }

  // -----------------------------
  // Borrar tarea (abre modal)
  // -----------------------------
  function deleteTask(task) {
    setDeleteTarget(task);
  }

  // -----------------------------
  // Confirmar borrado (borra de verdad)
  // -----------------------------
  async function confirmDelete() {
    const task = deleteTarget;
    if (!task) return;

    try {
      await apiFetch(`/tasks/${task.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      await loadTasks();

      setToast({ message: "Tarea eliminada", type: "success" });
      setTimeout(() => setToast(null), 2000);
    } catch (err) {
      setError(err.message);
      setToast({ message: err.message, type: "error" });
      setTimeout(() => setToast(null), 2000);
    }
  }

  // -----------------------------
  // Estadísticas
  // -----------------------------
  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "DONE").length;
    const todo = total - done;
    return { total, done, todo };
  }, [tasks]);

  // -----------------------------
  // Filtros
  // -----------------------------
  const shown = useMemo(() => {
    return tasks
      .filter((t) => {
        if (filter === "DONE") return t.status === "DONE";
        if (filter === "TODO") return t.status !== "DONE";
        return true;
      })
      .filter((t) => {
        const text = `${t.title} ${t.description ?? ""}`.toLowerCase();
        return text.includes(q.toLowerCase());
      });
  }, [tasks, filter, q]);

  // -----------------------------
  // Logout
  // -----------------------------
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // -----------------------------
  // Inicialización
  // -----------------------------
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="shell page">
      <div className="topbar">
        <h2>Mis tareas</h2>
        <button className="ghost" onClick={logout} type="button">
          Cerrar sesión
        </button>
      </div>

      <div className="grid">
        {/* PANEL IZQUIERDO */}
        <div className="panel">
          <h3 className="title" style={{ fontSize: 18 }}>
            Crear tarea
          </h3>
          <p className="subtitle">
            Total: {stats.total} · Pendientes: {stats.todo} · Hechas: {stats.done}
          </p>

          <form onSubmit={createTask}>
            <div className="field">
              <div className="label">Título</div>
              <input
                className="input"
                placeholder="Escribe tu tarea..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="field">
              <div className="label">Fecha límite (opcional)</div>
              <input
                className="input"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <button className="btn" type="submit">
              Añadir
            </button>
          </form>

          {error && <div className="error">{error}</div>}

          <div style={{ marginTop: 14 }}>
            <div className="field">
              <div className="label">Buscar</div>
              <input
                className="input"
                placeholder="Buscar tarea..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                className="ghost"
                onClick={() => setFilter("ALL")}
                style={{ flex: 1, opacity: filter === "ALL" ? 1 : 0.7 }}
              >
                Todas
              </button>
              <button
                type="button"
                className="ghost"
                onClick={() => setFilter("TODO")}
                style={{ flex: 1, opacity: filter === "TODO" ? 1 : 0.7 }}
              >
                Pendientes
              </button>
              <button
                type="button"
                className="ghost"
                onClick={() => setFilter("DONE")}
                style={{ flex: 1, opacity: filter === "DONE" ? 1 : 0.7 }}
              >
                Hechas
              </button>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div className="panel">
          <h3 className="title" style={{ fontSize: 18 }}>
            Lista
          </h3>
          <p className="subtitle">Click en el check para completar o usar borrar.</p>

          {loading ? (
            <p className="subtitle">Cargando...</p>
          ) : shown.length === 0 ? (
            <p className="subtitle">No hay tareas con esos filtros.</p>
          ) : (
            <ul className="taskList">
              {shown.map((t) => {
                const dl = daysLeftLabel(t.dueDate);
                return (
                  <li className="taskItem fadeIn" key={t.id}>
                    <div
                      className={`checkbox ${t.status === "DONE" ? "done" : ""}`}
                      onClick={() => toggleTask(t)}
                      role="button"
                      tabIndex={0}
                      title="Cambiar estado"
                    >
                      {t.status === "DONE" ? "✓" : ""}
                    </div>

                    <div style={{ flex: 1 }}>
                      <p className={`taskTitle ${t.status === "DONE" ? "done" : ""}`}>
                        {t.title}
                      </p>
                      <p className="taskMeta">
                        {t.status === "DONE" ? "Hecha" : "Pendiente"}
                        {dl ? ` · ${dl}` : ""}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="smallBtn"
                      onClick={() => deleteTask(t)}
                    >
                      Borrar
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Eliminar tarea"
        message={deleteTarget ? `¿Seguro que quieres borrar "${deleteTarget.title}"?` : ""}
        confirmText="Borrar"
        cancelText="Cancelar"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
