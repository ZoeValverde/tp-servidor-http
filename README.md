#  API REST - Tasks (Node.js + Express + MongoDB)

##  Descripción del proyecto

Este proyecto es una API REST desarrollada con **Node.js, Express y MongoDB (Mongoose)** que permite gestionar tareas de usuarios con autenticación mediante **JWT (JSON Web Token)**.

Incluye funcionalidades como:
- Registro e inicio de sesión de usuarios
- Autenticación con token JWT
- Creación, lectura, actualización y eliminación de tareas
- Rutas protegidas para usuarios autenticados
- Validaciones básicas de datos

---

##  Tecnologías utilizadas

- Node.js
- Express
- Base de datos MongoDB + Mongoose
- JWT (jsonwebtoken)
- Dotenv
- Postman (pruebas de endpoints)

---

##  Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone <URL_REPOSITORY>
```

#### Instala las dependencias necesarias:
```bash
npm install
```

## Conexión MongoDb
Su conexión puede crearse en MongoDB Compass o MongoDB Atlas.

Para su conexión se necesita un archivo .env con los datos que se muestran en el archivo .env.example.
```bash
PORT= 
JWT_SECRET= 
URI_DB=
```

Se necesita un puerto, el Secret_Key para obtener los tokens y la URI_DB para conectar a MongoDb.

Ya cuando están esos datos solo queda levantar el server desde la consola.

```bash
npm run dev
```

o 
```bash
node src/app.js
```

## Endpoints

### Públicos
Los endpoints publicos van a ser register y login.

 ### Register
Para obtener el register en el servidor http deberia ser como el siguiente ejemplo de url http://localhost:40000/api/auth/register


###### CREAR UN USUARIO
Para poder crear un usuario se necesita un nombre de usuario, email y contraseña 
en el body que recibe JSON

**Name**
El name necesita tener solo letras, con un mínimo de 3 y máximo de 10 caracteres.


**Email**
El email debe ser un email válido.
 

**Password**
Debe contener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial

####  -- Ejemplo de creación de usuario ---

```bash
Usuario Valido ✅

{
  "username": "mickey",
  "email": "mickey@gmail.com",
  "password": "Hola123@"
}
```

### Login
Para obtener el Login en el servidor http deberia ser como el siguiente ejemplo de url http://localhost:40000/api/auth/login


Para iniciar sesión se necesita el email y la contraseña del usuario. En el body enviar los datos.

####  -- Ejemplo para iniciar sesión ---

```bash
Login Valido ✅

{
  "email": "mickey@gmail.com",
  "password": "Hola123@"
}
```

Al loguearte correctamente se creara un Token, ese Token se utilizará para interactuar con los endpoints privados.


### Privados
Los privados van a los de la url http://localhost:40000/api/tasks con sus distintos métodos.

Para ello, antes de interactuar con la api necesitariamos validar que estamos logueados en los **Headers** 

## Headers

| Key | Value |
|-----|-------|
| Authorization | Bearer token |

Se pondria en **Key** "Authorization" y en **Value** Bearer + el token de acceso creado al loguearse.

##### -- GET TASKS --

Para obtener las tareas creadas en el servidor http deberia ser como el siguiente ejemplo de url http://localhost:40000/api/tasks

Al validar el usuario en **Headers** debería mostrarse de esta manera:

```bash
{
    "success": true,
    "data": [],
    "message": "No hay ninguna tarea! añade tareas a la lista"
}
```

En caso de tener tener alguna tarea creada:

```bash
{
    "success": true,
    "data": {
        "id": "6a2b43029ef913e89346d807",
        "name": "tirar la basura",
        "description": "Tirar la basura mañana a las 10 de la mañana",
        "complete": false,
        "createAt": "2026-06-11T23:21:38.850Z",
        "updateAt": "2026-06-11T23:21:38.850Z"
    },
    "message": "Tarea creada con éxito"
}
```



##### -- GET TASK --

Para obtener una tarea creada mediante su Id en el servidor http deberia ser como el siguiente ejemplo de url http://localhost:40000/api/tasks/:id

luego de "/task/" iria el id de la tarea a encontrar 

http://localhost:40000/api/tasks/< Id de la tarea  >

Al validar el usuario en **Headers** debería mostrarse de esta manera:

```bash
{
    "success": true,
    "data": {
        "id": "6a2b43029ef913e89346d807",
        "name": "tirar la basura",
        "description": "Tirar la basura mañana a las 10 de la mañana",
        "complete": false,
        "createAt": "2026-06-11T23:21:38.850Z",
        "updateAt": "2026-06-11T23:21:38.850Z"
    },
    "message": "Tarea creada con éxito"
}
```


##### -- UPDATE TASK --

Para actualizar una tarea creada mediante su Id en el servidor http deberia ser como el siguiente ejemplo de url http://localhost:40000/api/tasks/:id

luego de "/task/" iria el id de la tarea a actualizar

http://localhost:40000/api/tasks/< Id de la tarea  >

Dentro del body se debe de ingresar un name, una descrption o cambiar el complete:

**Name**

El name necesita tener solo letras, con un mínimo de 3 y máximo de 10 caracteres.


**Email**

El email debe ser un email válido.
 

**Complete**

Debe contener ser true o false

No puede haber un dato vacio.

Un ejemplo de como actualizar seria el siguiente:


```bash
Formato Valido ✅

{
  "complete": true
}
```

Al validar el usuario en **Headers** debería mostrarse de esta manera:

```bash
{
    "success": true,
    "data": {
        "id": "6a2b43029ef913e89346d807",
        "name": "tirar la basura",
        "description": "Tirar la basura mañana a las 10 de la mañana",
        "complete": true,
        "createAt": "2026-06-11T23:21:38.850Z",
        "updateAt": "2026-06-11T23:21:38.850Z"
    },
    "message": "Tarea actualizada con éxito"
}
```


##### -- DELETE TASK --

Para eliminar una tarea creada mediante su Id en el servidor http deberia ser como el siguiente ejemplo de url http://localhost:40000/api/tasks/:id

luego de "/task/" iria el id de la tarea a encontrar 

http://localhost:40000/api/tasks/< Id de la tarea  >

Al validar el usuario en **Headers** debería mostrarse de esta manera:

```bash
{
    "success": true,
    "data": {
        "id": "6a2b43029ef913e89346d807",
        "name": "tirar la basura",
        "description": "Tirar la basura mañana a las 10 de la mañana",
        "complete": false,
        "createAt": "2026-06-11T23:21:38.850Z",
        "updateAt": "2026-06-11T23:21:38.850Z"
    },
    "message": "Tarea eliminada con éxito"
}
```

---

### Colección de Pruebas de Postman

En este proyecto se encuentra un archivo llamado **postmanCollection.json** 
dentro esta la colección creada para poder interactuar con la api.

Para tener la colección dentro de Postman realizar los siguientes pasos:

1. Copiar el contenido del archivo < postmanCollection.json > 

2. En Postman a la derecha de donde está el buscador clickear los 3 puntos.

3. Clickear donde dice importar y copiar el contenido del archivo **postmanCollection.json**

Si se creó correctamente tendremos requests con todos los endpoints que interactuan con la Api.

Lo único que falta es agregar la URI que conecta con la base de datos.

