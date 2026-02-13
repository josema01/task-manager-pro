# 🚀 Task Manager Pro

Aplicación fullstack moderna para la gestión de tareas con autenticación JWT, base de datos PostgreSQL y despliegue completo en la nube.

🔗 **Live Demo:**  
https://task-manager-pro-1-wvms.onrender.com

---

## ✨ Features

- 🔐 Registro e inicio de sesión con JWT  
- 🛡 Protección de rutas autenticadas  
- 🗄 Base de datos PostgreSQL  
- ⚡ Prisma ORM v7  
- 🧠 Filtros y búsqueda de tareas  
- ✅ Marcar tareas como completadas  
- 🗑 Modal personalizado para eliminación  
- 🔔 Toast notifications  
- 🎨 UI moderna con animaciones suaves  
- 🌍 Deploy en Render (backend + frontend + database)  

---

## 🧱 Tech Stack

### Frontend
- React (Vite)  
- React Router  
- Fetch API  
- CSS moderno con animaciones  

### Backend
- Node.js  
- Express  
- Prisma ORM 7  
- PostgreSQL  
- JWT Authentication  

### Deployment
- Render (Web Service + Static Site + PostgreSQL)

---

## 📦 Arquitectura

\`\`\`
React (Frontend)
        ↓
Express API (Backend)
        ↓
PostgreSQL (Database)
\`\`\`

Separación clara entre frontend y backend.

---

## ⚙️ Instalación en local

### 1️⃣ Clonar repositorio

\`\`\`bash
git clone https://github.com/josema01/task-manager-pro.git
cd task-manager-pro
\`\`\`

---

### 2️⃣ Backend

\`\`\`bash
cd backend
npm install
\`\`\`

Crear archivo `.env`:

\`\`\`
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/task_manager
JWT_SECRET=clave_super_secreta
\`\`\`

Migraciones:

\`\`\`bash
npx prisma migrate dev
\`\`\`

Iniciar servidor:

\`\`\`bash
npm run dev
\`\`\`

---

### 3️⃣ Frontend

\`\`\`bash
cd ../frontend
npm install
\`\`\`

Crear archivo `.env`:

\`\`\`
VITE_API_URL=http://localhost:3001
\`\`\`

Iniciar:

\`\`\`bash
npm run dev
\`\`\`

---

## 🌍 Variables de entorno

### Backend

\`\`\`
DATABASE_URL=
JWT_SECRET=
\`\`\`

### Frontend

\`\`\`
VITE_API_URL=
\`\`\`

---

## 🔐 Autenticación

- JWT firmado con `jsonwebtoken`
- Middleware personalizado
- Protección de rutas
- Manejo de token inválido o expirado

---

## 🧠 Decisiones técnicas

- Uso de Prisma 7 con `@prisma/adapter-pg`
- Migraciones gestionadas con `prisma migrate deploy`
- Separación por capas (routes, middleware, prisma)
- Manejo elegante de errores
- Modal personalizado en lugar de `window.confirm`
- Helper centralizado `apiFetch`

---

## 📈 Mejoras futuras

- Drag & drop para reordenar tareas
- Dashboard con estadísticas
- Modo oscuro / claro
- Optimistic UI updates
- Tests unitarios
- CI/CD pipeline

---

## 👨‍💻 Autor

**José Manuel**  
Ingeniero Informático  
Proyecto fullstack desarrollado como portfolio profesional.
