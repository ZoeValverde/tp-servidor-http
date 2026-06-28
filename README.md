# API REST - Tasks (Node.js + Express + MongoDB)

## Descripción

Esta API REST permite gestionar tareas de usuarios mediante autenticación con JWT.

Está desarrollada con **Node.js**, **Express** y **MongoDB (Mongoose)** e incluye autenticación, autorización mediante roles y validación de datos con **Zod**.

### Funcionalidades

- Registro de usuarios.
- Inicio de sesión mediante JWT.
- CRUD completo de tareas.
- Rutas protegidas mediante autenticación.
- Roles de usuario (Administrador y Usuario).
- Validación de datos con Zod.
- Filtros, ordenamiento y paginación mediante Query Params.

---

# Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Zod
- Dotenv
- Postman

---

# Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_REPOSITORY>
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` utilizando como referencia el archivo `.env.example`.

```env
PORT=
JWT_SECRET=
URI_DB=
ADMIN_EMAIL=
```

| Variable | Descripción |
|----------|-------------|
| PORT | Puerto donde se ejecutará el servidor. |
| JWT_SECRET | Clave utilizada para generar los JWT. |
| URI_DB | URI de conexión a MongoDB. |
| ADMIN_EMAIL | Email del usuario que tendrá permisos de administrador. |

### 4. Iniciar el servidor

```bash
npm run dev
```

o

```bash
node src/app.js
```

---

# Autenticación

La API utiliza autenticación mediante **Bearer Token**.

Después de iniciar sesión se devolverá un JWT que deberá enviarse en todas las rutas privadas.

### Header requerido

| Key | Value |
|------|-------|
| Authorization | Bearer `<token>` |

Ejemplo:

```text
Authorization: Bearer eyJhbGc...
```

---

# Roles

La aplicación cuenta con dos tipos de usuarios.

| Rol | Permisos |
|------|-----------|
| Usuario | Gestionar únicamente sus propias tareas. |
| Administrador | Gestionar usuarios y visualizar todas las tareas del sistema. |

---


# Endpoints

## Públicos

### POST /api/auth/register

Registra un nuevo usuario.

#### Campos requeridos

| Campo | Validación |
|--------|------------|
| username | Solo letras. Entre 3 y 10 caracteres. |
| email | Debe ser un email válido. |
| password | Mínimo 8 caracteres, una mayúscula, un número y un carácter especial. |

#### Ejemplo

```json
{
  "username": "mickey",
  "email": "mickey@gmail.com",
  "password": "Hola123@"
}
```

---

### POST /api/auth/login

Inicia sesión y devuelve un JWT.

#### Ejemplo

```json
{
  "email": "mickey@gmail.com",
  "password": "Hola123@"
}
```

---

# Endpoints privados

Todos requieren autenticación mediante Bearer Token.

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | /api/tasks | Obtener todas las tareas del usuario autenticado. |
| GET | /api/tasks/:id | Obtener una tarea por ID. |
| POST | /api/tasks | Crear una nueva tarea. |
| PATCH | /api/tasks/:id | Actualizar una tarea. |
| DELETE | /api/tasks/:id | Eliminar una tarea. |

---

## GET /api/tasks

Obtiene todas las tareas del usuario autenticado.

### Respuesta

```json
{
  "success": true,
  "data": [],
  "message": "No hay ninguna tarea. ¡Añade tareas a la lista!"
}
```

Si existen tareas:

```json
{
  "success": true,
  "data": [
    {
      "id": "6a2b43029ef913e89346d807",
      "name": "Tirar la basura",
      "description": "Tirar la basura mañana a las 10",
      "complete": false,
      "createdAt": "2026-06-11T23:21:38.850Z",
      "updatedAt": "2026-06-11T23:21:38.850Z"
    }
  ]
}
```

---

## GET /api/tasks/:id

Obtiene una tarea específica mediante su ID.

---

## POST /api/tasks

Crea una nueva tarea.

### Campos

| Campo | Obligatorio |
|--------|-------------|
| name | Sí |
| description | Sí |
| complete | No |

#### Ejemplo

```json
{
  "name": "Comprar pan",
  "description": "Ir a la panadería antes de las 18:00"
}
```

---

## PATCH /api/tasks/:id

Actualiza una tarea existente.

Se puede modificar:

- name
- description
- complete

#### Ejemplo

```json
{
  "complete": true
}
```

---

## DELETE /api/tasks/:id

Elimina una tarea mediante su ID.

---

# Query Parameters

Todos los parámetros son opcionales.

## filter

Permite filtrar los resultados.

### Filtrar por estado

```http
GET /api/tasks?filter=complete:true
```

Administrador:

```http
GET /api/tasks/all?filter=complete:true
```

---

### Buscar por nombre o descripción

```http
GET /api/tasks?filter=task:comprar
```

Administrador:

```http
GET /api/tasks/all?filter=task:comprar
```

---

### Buscar usuarios por nombre (Administrador)

```http
GET /api/users/all?filter=username:juan
```

---

### Filtrar usuarios por rol (Administrador)

```http
GET /api/users/all?filter=role:admin
```

---

## SORT

Ordena los resultados por fecha de creación.

Ascendente:

```http
GET /api/tasks?sort=asc
```

Descendente:

```http
GET /api/tasks?sort=desc
```

Administrador:

```http
GET /api/users/all?sort=desc
```

---

## PAGE

Selecciona la página de resultados.

```http
GET /api/tasks?page=2
```

Administrador:

```http
GET /api/tasks/all?page=2
```

```http
GET /api/users/all?page=2
```

---

## LIMIT

Limita la cantidad de resultados.

```http
GET /api/tasks?limit=5
```

Administrador:

```http
GET /api/tasks/all?limit=5
```

```http
GET /api/users/all?limit=5
```

---

## Combinación de Query Parameters

Los parámetros pueden combinarse.

```http
GET /api/tasks?filter=complete:false&sort=desc&page=2&limit=5
```

---

# Colección de Postman

El proyecto incluye el archivo:

```text
postmanCollection.json
```

Para importarlo:

1. Abrir Postman.
2. Seleccionar **Import**.
3. Elegir el archivo `postmanCollection.json`.
4. Configurar la URL base de la API.
5. Iniciar sesión para obtener un JWT.
6. Agregar el token en el header `Authorization` de las rutas privadas.
