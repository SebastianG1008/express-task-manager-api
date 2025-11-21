# Express Task Manager API

API REST para gestión de tareas (to-do list) construida con Node.js, Express y TypeScript.

## Características

- **API REST completa** con operaciones CRUD para tareas
- **Almacenamiento en memoria** con estructura de datos eficiente
- **TypeScript** para type-safety y mejor experiencia de desarrollo
- **Tests exhaustivos** con Jest y Supertest (cobertura > 80%)
- **CI/CD automatizado** con GitHub Actions
- **Linting estricto** con ESLint y reglas de TypeScript

## Requisitos

- Node.js 18.x o 20.x
- npm 9.x o superior

## Instalación

\`\`\`bash
# Clonar el repositorio
git clone <repository-url>
cd express-task-manager-api

# Instalar dependencias
npm install
\`\`\`

## Scripts disponibles

\`\`\`bash
# Desarrollo con hot-reload
npm run dev

# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Linting
npm run lint

# Corregir problemas de linting automáticamente
npm run lint:fix

# Compilar TypeScript a JavaScript
npm run build

# Ejecutar versión compilada
npm start
\`\`\`

## Endpoints de la API

### GET /status
Obtiene el estado del servidor y el conteo de tareas.

**Respuesta:**
\`\`\`json
{
  "status": "ok",
  "message": "Task Manager API is running",
  "tasksCount": 0
}
\`\`\`

### GET /tasks
Obtiene todas las tareas.

**Respuesta:**
\`\`\`json
[
  {
    "id": 1,
    "title": "Completar proyecto",
    "completed": false
  }
]
\`\`\`

### POST /tasks
Crea una nueva tarea.

**Body:**
\`\`\`json
{
  "title": "Nueva tarea"
}
\`\`\`

**Respuesta (201):**
\`\`\`json
{
  "id": 1,
  "title": "Nueva tarea",
  "completed": false
}
\`\`\`

### PATCH /tasks/:id/toggle
Alterna el estado de completado de una tarea.

**Respuesta:**
\`\`\`json
{
  "id": 1,
  "title": "Nueva tarea",
  "completed": true
}
\`\`\`

### DELETE /tasks/:id
Elimina una tarea por ID.

**Respuesta:** 204 No Content

## Estructura del proyecto

\`\`\`
express-task-manager-api/
├── src/
│   ├── models/
│   │   └── Task.ts          # Modelo y lógica de negocio
│   ├── storage/
│   │   └── TaskStorage.ts   # Almacenamiento en memoria
│   ├── controllers/
│   │   └── taskController.ts # Controladores de endpoints
│   ├── routes/
│   │   └── tasks.ts         # Definición de rutas
│   ├── app.ts               # Configuración de Express
│   └── server.ts            # Punto de entrada
├── tests/
│   ├── app.test.ts          # Tests de integración
│   ├── TaskStorage.test.ts  # Tests de almacenamiento
│   └── TaskModel.test.ts    # Tests de modelo
├── .github/
│   └── workflows/
│       └── ci.yml           # Pipeline de CI/CD
├── package.json
├── tsconfig.json
├── jest.config.js
├── .eslintrc.js
└── README.md
\`\`\`

## Testing

El proyecto incluye tests unitarios y de integración con cobertura superior al 80%.

\`\`\`bash
# Ejecutar todos los tests con reporte de cobertura
npm test

# Ver reporte de cobertura en el navegador
open coverage/lcov-report/index.html
\`\`\`

## CI/CD

El proyecto utiliza GitHub Actions para ejecutar automáticamente:
- ESLint para validación de código
- Tests con Jest en Node.js 18.x y 20.x
- Generación de reportes de cobertura

El workflow se ejecuta en:
- Cada push a las ramas \`main\` o \`develop\`
- Cada pull request hacia estas ramas

## Validación local de CI/CD

Puedes validar el workflow localmente usando \`nektos/act\`:

\`\`\`bash
# Instalar act (macOS)
brew install act

# Ejecutar el workflow localmente
act push
\`\`\`

## Linting

El proyecto usa ESLint con reglas estrictas de TypeScript:

\`\`\`bash
# Verificar errores de linting
npm run lint

# Corregir automáticamente problemas
npm run lint:fix
\`\`\`

## Tecnologías utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web minimalista
- **TypeScript** - Superset tipado de JavaScript
- **Jest** - Framework de testing
- **Supertest** - Testing de APIs HTTP
- **ESLint** - Linter y formateador de código
- **GitHub Actions** - CI/CD automatizado

## Licencia

ISC
\`\`\`
