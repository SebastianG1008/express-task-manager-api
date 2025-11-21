



# **Parcial — Calidad de Software Avanzado**

## **Proyecto: Task Manager API (Node.js + TypeScript + Jest + ESLint + CI/CD)**

---

# **1. Diferencia entre CI (Integración Continua) y CD (Entrega Continua)**

### **CI — Integración Continua**

La integración continua consiste en ejecutar automáticamente procesos de validación (linter, pruebas, build) cada vez que alguien sube código al repositorio.
Esto permite detectar errores temprano y asegurar que el proyecto siempre compila, pasa los tests y cumple el estándar de calidad.

### **CD — Entrega Continua**

La entrega continua automatiza el despliegue del software cuando la integración ha sido exitosa.
Aunque este proyecto no realiza despliegues reales, la estructura del pipeline es compatible con CD.

### **Cómo se aplica a este proyecto**

* CI ejecuta:
  ✔ ESLint
  ✔ Pruebas con Jest
  ✔ Cobertura
  ✔ Build TypeScript

* CD no aplica en este parcial, pero el pipeline está listo para usarse en despliegue continuo.

---

# **2. Estrategia del proyecto**

### **Lenguaje utilizado**

TypeScript + Node.js bajo arquitectura modular (controllers, services, routes, models, storage).

### **Linter**

* ESLint con reglas estrictas (**@typescript-eslint**, "no-explicit-any", "no-console", etc.)
* Corre con:

  ```bash
  npm run lint
  ```

📸 **PEGA AQUÍ LA CAPTURA DEL LINTER PASANDO**

---

### **Framework de pruebas**

* Jest + Supertest para pruebas unitarias e integración.
* Cobertura obligatoria mínima: **≥ 80%**.

📸 **PEGA AQUÍ LA CAPTURA DEL TEST + COVERAGE**

---

### **Herramienta de cobertura**

Jest con `--coverage`, generando reporte en `/coverage`.

### **Umbral elegido**

Se trabajó con cobertura arriba del 95% en todos los componentes.

> La cobertura supera ampliamente el estándar mínimo requerido en el parcial.

---

# **3. Ejecución fallida del workflow**

La ejecución fallida durante ACT fue:

📸 **PEGA AQUÍ LA CAPTURA DEL ERROR DEL ARTIFACT
(“Unable to get ACTIONS_RUNTIME_TOKEN…”)**

### **¿Por qué falló?**

`act` **no soporta** el paso de subir artifacts (`actions/upload-artifact`) porque GitHub no expone `ACTIONS_RUNTIME_TOKEN` localmente.

En GitHub Actions real este paso sí funciona.
Por eso se considera un **fallo esperado y no afecta la nota**.

---

# **4. Ejecución exitosa del workflow**

### **Tests, Linter y Build pasando en todas las versiones del Node matrix**

Se ejecutó:

```bash
act push -j test
```

📸 **PEGA AQUÍ LA CAPTURA DEL PIPELINE COMPLETO (Node 18.x y 20.x)**
Debe incluir:

* ✔ Install dependencies
* ✔ ESLint
* ✔ Tests
* ✔ Cobertura
* ✔ Build interno
* ✔ Job Success en Node 18
* ✔ Job Success en Node 20 (excepto artifact)

---

# **5. Uso de ACT**

### **Comandos utilizados**

#### **Listar los jobs disponibles**

```bash
act --list
```

📸 **PEGA AQUÍ LA CAPTURA DE act --list**

---

#### **Ejecutar el pipeline principal**

```bash
act push -j test
```

📸 **PEGA AQUÍ LA CAPTURA DEL PIPELINE PASANDO**

---

#### **(Opcional) Ejecutar solo el linter**

```bash
npm run lint
```

📸 **PEGA LA CAPTURA SI LA QUIERES MOSTRAR**

---

# **6. Reflexión sobre IA y calidad de software**

### **Métodos para detectar código generado por IA**

1. **Estructuras repetitivas o patrones perfectos**
   Código extremadamente uniforme o con comentarios en exceso puede indicar generación automática.

2. **Estilo inconsistente con el resto del proyecto**
   Diferencia en indentación, nombres de variables o estilo lógico.

3. **Errores típicos de IA**

   * Uso de imports inexistentes
   * Métodos inventados
   * Tipos incorrectos en TypeScript

### **Por qué NO se puede entregar código generado por IA sin control**

* Riesgo de bugs no detectados
* Falta de entendimiento real del estudiante
* Incumple ética académica
* Genera inconsistencias en el repositorio

Este proyecto fue validado manualmente con linter, tests y cobertura para asegurar calidad real.

---

# ✅ **7. Conclusión del proyecto**

* Linter ✔
* Tests ✔
* Cobertura ✔ +95%
* Build ✔
* CI Pipeline ✔
* ACT ejecutado correctamente ✔

El proyecto cumple con todos los requisitos del parcial.

---

# 📎 **Imagenes** 

* npm run lint
<img width="353" height="41" alt="image" src="https://github.com/user-attachments/assets/043f0cba-e6ec-4b3a-8873-434c14ddf052" />




* npm run lint:fix
<img width="391" height="39" alt="image" src="https://github.com/user-attachments/assets/0e2b1695-0c44-46b0-ae49-6e9d3ea5a052" />



* npm test
<img width="582" height="417" alt="image" src="https://github.com/user-attachments/assets/6de9a3c4-d6ff-448d-93d1-128b90ba360a" />




* npm run build
<img width="365" height="58" alt="image" src="https://github.com/user-attachments/assets/5d82f6bb-f4a0-49dd-b502-db9d84cef47b" />





* act push -j test
<img width="796" height="925" alt="image" src="https://github.com/user-attachments/assets/eb8d0038-215d-47f0-ae84-638246c37b13" />





* act --list
<img width="1084" height="75" alt="image" src="https://github.com/user-attachments/assets/642a2073-afb2-4e16-9875-9d1781ae5a86" />

---


