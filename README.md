# 🚀 Task Manager Pro

![Status](https://img.shields.io/badge/Status-Completed-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-PERN-blueviolet?style=flat-square)

Aplicación **Fullstack** moderna para la gestión eficiente de tareas. Desarrollada con una arquitectura robusta, incluye autenticación segura mediante JWT, persistencia de datos en PostgreSQL y una interfaz reactiva optimizada.

🔗 **Live Demo:** [https://task-manager-pro-1-wvms.onrender.com](https://task-manager-pro-1-wvms.onrender.com)

---

## ✨ Características Principales

Esta aplicación va más allá de un simple CRUD, implementando patrones de diseño y UX profesional:

* **🔐 Autenticación Segura:** Registro e inicio de sesión gestionado con JSON Web Tokens (JWT).
* **🛡️ Seguridad:** Protección de rutas (Private Routes) y manejo de sesiones expiradas.
* **🗄️ Persistencia:** Base de datos relacional PostgreSQL gestionada con Prisma ORM v7.
* **🧠 Gestión de Datos:** Filtros avanzados, búsqueda en tiempo real y ordenamiento.
* **🎨 UX/UI Moderna:** Interfaz limpia, feedback visual mediante *Toast Notifications* y modales personalizados para acciones destructivas.
* **🌍 Despliegue Cloud:** Infraestructura completa desplegada en Render (Frontend, Backend y BD).

---

## 🧱 Tech Stack

### Frontend
| Tecnología | Propósito |
| :--- | :--- |
| **React (Vite)** | Librería principal para la UI (SPA). |
| **React Router** | Enrutamiento del lado del cliente. |
| **CSS Modules** | Estilos modernos y animaciones fluidas. |
| **Fetch API** | Comunicación asíncrona con el backend. |

### Backend
| Tecnología | Propósito |
| :--- | :--- |
| **Node.js & Express** | Servidor RESTful API. |
| **Prisma ORM 7** | Capa de abstracción de base de datos y migraciones. |
| **PostgreSQL** | Base de datos relacional robusta. |
| **JWT** | Estándar de autenticación sin estado (Stateless). |

---

## 📦 Arquitectura del Sistema

El proyecto sigue una arquitectura de **Separación de Intereses (SoC)** clara:

```mermaid
graph LR
    A["Cliente (React)"] -- "JSON / HTTPS" --> B["API REST (Express)"]
    B -- "Prisma Client" --> C[("PostgreSQL DB")]
```
---

## ⚙️ Instalación y Configuración Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local.

### 1️⃣ Clonar el repositorio

```console
$git clone [https://github.com/josema01/task-manager-pro.git$](https://github.com/josema01/task-manager-pro.git$) cd task-manager-pro
```

### 2️⃣ Configuración del Backend

Navega al directorio del servidor e instala las dependencias:

```console
$ cd backend
$ npm install
```

Crea un archivo `.env` en la carpeta `backend` con las siguientes credenciales:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/task_manager"
JWT_SECRET="tu_clave_super_secreta_aqui"
```

Ejecuta las migraciones para crear las tablas en tu base de datos local:

```console
$ npx prisma migrate dev --name init
```

Inicia el servidor de desarrollo:

```console
$ npm run dev
```

### 3️⃣ Configuración del Frontend

En una nueva terminal, navega al directorio del cliente:

```console
$cd ../frontend$ npm install
```

Crea un archivo `.env` en la carpeta `frontend`:

```env
VITE_API_URL="http://localhost:3001"
```

Inicia la aplicación React:

```console
$ npm run dev
```

---

## 🌍 Variables de Entorno

Asegúrate de configurar las siguientes variables para el correcto funcionamiento.

### Backend (`/backend/.env`)

| Variable | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `DATABASE_URL` | Cadena de conexión a PostgreSQL | `postgresql://user:pass@host:port/db` |
| `JWT_SECRET` | String para firmar los tokens | `mySecretKey123` |

### Frontend (`/frontend/.env`)

| Variable | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `VITE_API_URL` | URL base de la API del Backend | `http://localhost:3001` |

---

## 🧠 Decisiones Técnicas y Retos

* **Prisma 7 & Adapter PG:** Se optó por la última versión de Prisma para aprovechar las mejoras en rendimiento y tipado estricto con TypeScript (si aplica) o JS.
* **Gestión de Errores Centralizada:** El backend implementa un middleware de manejo de errores para evitar *crashes* silenciosos y enviar respuestas HTTP coherentes.
* **Custom Hooks:** En el frontend, la lógica de petición de datos se extrajo a un helper `apiFetch` para mantener los componentes limpios y reutilizables.
* **UI Optimista:** Se priorizó la respuesta inmediata de la interfaz (modales, toasts) mientras se procesan las peticiones en segundo plano.

---

## 📈 Roadmap y Mejoras Futuras

* [ ] Implementación de Drag & Drop (Dnd-kit) para priorizar tareas.
* [ ] Panel de estadísticas (Dashboard) con gráficos.
* [ ] Modo Oscuro / Claro (Dark Mode).
* [ ] Testing unitario con Jest/Vitest.
* [ ] Integración de CI/CD con GitHub Actions.

---

## 👨‍💻 Autor

**José Manuel Moraga Lozano** Ingeniero Informático 

Proyecto desarrollado con fines educativos y profesionales.
