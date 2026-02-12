import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // Redirigir al login
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page">
      <div className="card">
        <h1 className="title">Crear cuenta</h1>
        <p className="subtitle">
          Regístrate para empezar a gestionar tus tareas
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="label">Email</div>
            <input
              className="input"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="field">
            <div className="label">Contraseña</div>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="field">
            <div className="label">Confirmar contraseña</div>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear cuenta"}
          </button>

          {error && <div className="error">{error}</div>}

          <div className="row">
            <Link className="link" to="/">
              Ya tengo cuenta
            </Link>
            <span className="subtitle" style={{ margin: 0 }}>
              PostgreSQL + JWT
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
