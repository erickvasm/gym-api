# API Endpoints - ERP Gym

## Antes que todo

1. Tener definido el '.env'.
2. npx prisma migrate dev
3. npm run dev
4. Crear un usuario directamente en la BD

## Autenticación (Auth)

### 1. Obtener Token

**POST /auth/login**  
_Devuelve un token JWT para autenticación_

**HTTPie:**

```sh
http POST http://localhost:3000/auth/login \
    Content-Type:application/json \
    email="user@example.com" \
    password="123456"
```

**cURL:**

```sh
curl -X POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email": "user@example.com", "password": "123456"}'
```

### 2. Obtener el token refresh

```sh
http GET http://localhost:3000/auth/refresh \
    Content-Type:application/json

```

---

## Gimnasios (Gyms)

### 1. Crear un gimnasio

**POST /gyms**  
_Crea un nuevo gimnasio_

**HTTPie:**

```sh
http POST http://localhost:3000/gyms \
    Authorization:"Bearer YOUR_TOKEN" \
    Content-Type:application/json \
    name="Gym ABC" \
    location="Downtown"
```

**cURL:**

```sh
curl -X POST http://localhost:3000/gyms \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"name": "Gym ABC", "location": "Downtown"}'
```

### 2. Obtener todos los gimnasios

**GET /gyms**  
_Lista todos los gimnasios_

```sh
http GET http://localhost:3000/gyms Authorization:"Bearer YOUR_TOKEN"
```

```sh
curl -X GET http://localhost:3000/gyms \
    -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Obtener un gimnasio por ID

**GET /gyms/:id**

```sh
http GET http://localhost:3000/gyms/1 Authorization:"Bearer YOUR_TOKEN"
```

```sh
curl -X GET http://localhost:3000/gyms/1 \
    -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Actualizar un gimnasio

**PATCH /gyms/:id**

```sh
http PATCH http://localhost:3000/gyms/1 \
    Authorization:"Bearer YOUR_TOKEN" \
    name="Nuevo Nombre"
```

```sh
curl -X PATCH http://localhost:3000/gyms/1 \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"name": "Nuevo Nombre"}'
```

### 5. Eliminar un gimnasio

**DELETE /gyms/:id**

```sh
http DELETE http://localhost:3000/gyms/1 Authorization:"Bearer YOUR_TOKEN"
```

```sh
curl -X DELETE http://localhost:3000/gyms/1 \
    -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Usuarios (Users)

### 1. Crear un usuario

**POST /users**

```sh
http POST http://localhost:3000/users \
    Authorization:"Bearer YOUR_TOKEN" \
    Content-Type:application/json \
    name="John Doe" \
    email="johndoe@example.com"
```

```sh
curl -X POST http://localhost:3000/users \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"name": "John Doe", "email": "johndoe@example.com"}'
```

### 2. Obtener todos los usuarios

**GET /users**

```sh
http GET http://localhost:3000/users Authorization:"Bearer YOUR_TOKEN"
```

```sh
curl -X GET http://localhost:3000/users \
    -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Obtener un usuario por ID

**GET /users/:id**

```sh
http GET http://localhost:3000/users/1 Authorization:"Bearer YOUR_TOKEN"
```

```sh
curl -X GET http://localhost:3000/users/1 \
    -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Actualizar un usuario

**PATCH /users/:id**

```sh
http PATCH http://localhost:3000/users/1 \
    Authorization:"Bearer YOUR_TOKEN" \
    name="Jane Doe"
```

```sh
curl -X PATCH http://localhost:3000/users/1 \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"name": "Jane Doe"}'
```

### 5. Eliminar un usuario

**DELETE /users/:id**

```sh
http DELETE http://localhost:3000/users/1 Authorization:"Bearer YOUR_TOKEN"
```

```sh
curl -X DELETE http://localhost:3000/users/1 \
    -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Ejercicios (Exercises)

_(Similar a los módulos anteriores, pero adaptado para ejercicios)_

---

## Clases (Classes)

_(Similar a los módulos anteriores, pero adaptado para clases)_

---

## Entrenadores (Trainers)

_(Similar a los módulos anteriores, pero adaptado para entrenadores)_

---

## Pagos (Payments)

_(Similar a los módulos anteriores, pero adaptado para pagos)_

---
