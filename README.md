# 📘 **Task Manager API — Parcial de Calidad de Software Avanzado**

API desarrollada en **Node.js + TypeScript**, enfocada en aplicar principios de **calidad de software**, incluyendo:

* ✔ TypeScript estricto
* ✔ ESLint con reglas avanzadas
* ✔ Pruebas unitarias y de integración con Jest + Supertest
* ✔ Cobertura mínima requerida
* ✔ CI/CD con GitHub Actions
* ✔ Ejecución local del pipeline con ACT
* ✔ Arquitectura modular y mantenible

---

# 🚀 **Tecnologías utilizadas**

| Componente     | Tecnología                  |
| -------------- | --------------------------- |
| Lenguaje       | TypeScript                  |
| Runtime        | Node.js                     |
| Linter         | ESLint + @typescript-eslint |
| Pruebas        | Jest + Supertest            |
| Build          | TypeScript Compiler (tsc)   |
| CI/CD          | GitHub Actions              |
| Pipeline local | ACT CLI                     |

---

# 📂 **Estructura del proyecto**

```
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── storage/
 ├── app.ts
 └── server.ts
tests/
 ├── TaskModel.test.ts
 ├── TaskStorage.test.ts
 └── app.test.ts
```

Arquitectura modular y orientada a responsabilidad única.

---

# 🧪 **Scripts disponibles**

### 🔧 **Instalar dependencias**

```bash
npm install
```

### ▶️ **Ejecutar la API**

```bash
npm run dev
```

### 🧹 **Linter**

```bash
npm run lint
```

### 🧹 Auto-fix

```bash
npm run lint:fix
```

### 🧪 **Pruebas**

```bash
npm test
```

### 📊 **Pruebas con cobertura**

Automático en el CI, pero localmente:

```bash
npm test -- --coverage
```

### 🔨 **Build**

```bash
npm run build
```

---

# 📊 **Cobertura**

El proyecto supera ampliamente el mínimo requerido (80%) con valores superiores al **95%** en líneas, ramas, funciones y statements.

El reporte se genera en:

```
coverage/
```

---

# 🛠️ **CI/CD — GitHub Actions**

El pipeline incluye:

* Instalación de dependencias
* ESLint
* Pruebas unitarias
* Cobertura
* Matriz de Node.js (18.x y 20.x)
* Subida de artifacts (solo en GitHub, no en ACT)

Workflow principal:

```
.github/workflows/ci.yml
```

---

# 🐧 **Ejecución del pipeline con ACT (local)**

### 📌 Listar jobs

```bash
act --list
```

### ▶️ Ejecutar el pipeline principal

```bash
act push -j test
```

> Nota: ACT no soporta `actions/upload-artifact`, por lo que este paso **falla de forma esperada**.
> El resto de pasos deben pasar correctamente.

---

# ✔️ **Calidad aplicada**

### ✔ ESLint estricto

* no-explicit-any
* no-unused-vars
* no-floating-promises
* no-console (solo warn/error permitidos)

### ✔ Tipado estricto

Interfaces y modelos bien definidos.

### ✔ Pruebas unitarias y de integración

* Modelos
* Storage
* Endpoints API

### ✔ Cobertura >95%

Validada en local, CI y ACT.

---

# 📌 **Endpoints principales**

### **POST /tasks**

Crear una tarea.

### **GET /tasks**

Listar todas las tareas.

### **GET /tasks/:id**

Obtener una tarea por ID.

### **PUT /tasks/:id**

Actualizar una tarea.

### **DELETE /tasks/:id**

Eliminar una tarea.

---

# 📎 **Capturas usadas en el parcial**

Debes subirlas en el archivo **RESPUESTAS.md**, no aquí.

---

# 👨‍💻 **Autor**

Proyecto desarrollado para el **Parcial de Calidad de Software Avanzado**.

---

# 📜 **Licencia**

MIT License.
