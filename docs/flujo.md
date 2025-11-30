

```
http POST :8081/auth/login \
  email="superadmin@example.com" \
  password="superadminpassword"
HTTP/1.1 200 OK
Connection: keep-alive
Date: Sun, 30 Nov 2025 22:21:39 GMT
Keep-Alive: timeout=72
content-length: 247
content-type: application/json; charset=utf-8
set-cookie: refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoic3VwZXJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJTVVBFUl9BRE1JTiIsImd5bUlkIjpudWxsLCJpYXQiOjE3NjQ1NDEyOTksImV4cCI6MTc2NTE0NjA5OX0.Yv4aprebxsBRUUURybLgYhdsF1c7OZKXIGvUn4TZ5uI; Path=/; HttpOnly; SameSite=Strict

{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoic3VwZXJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJTVVBFUl9BRE1JTiIsImd5bUlkIjpudWxsLCJpYXQiOjE3NjQ1NDEyOTksImV4cCI6MTc2NDU0MjE5OX0.6s86dPsYXl2xSIPNyyk3fEJqbT04emKylayR0AXKhL8"
}

```

```
http POST :8081/tenants \
  Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoic3VwZXJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJTVVBFUl9BRE1JTiIsImd5bUlkIjpudWxsLCJpYXQiOjE3NjQ1NDEyOTksImV4cCI6MTc2NDU0MjE5OX0.6s86dPsYXl2xSIPNyyk3fEJqbT04emKylayR0AXKhL8" \
  name="Iron Temple" \
  address="San José" \
  phone="8888-8888" \
  schedule="L-V 6am-10pm"

```

```
http POST :8081/tenants \
  Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoic3VwZXJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJTVVBFUl9BRE1JTiIsImd5bUlkIjpudWxsLCJpYXQiOjE3NjQ1NDEyOTksImV4cCI6MTc2NDU0MjE5OX0.6s86dPsYXl2xSIPNyyk3fEJqbT04emKylayR0AXKhL8" \
  name="Iron Temple" \
  address="San José" \
  phone="8888-8888" \
  schedule="L-V 6am-10pm"
HTTP/1.1 201 Created
Connection: keep-alive
Date: Sun, 30 Nov 2025 22:23:17 GMT
Keep-Alive: timeout=72
content-length: 233
content-type: application/json; charset=utf-8

{
    "gym": {
        "address": "San José",
        "code": "GYM279232",
        "createdAt": "2025-11-30T22:23:17.761Z",
        "id": 1,
        "name": "Iron Temple",
        "phone": "8888-8888",
        "schedule": "L-V 6am-10pm",
        "updatedAt": "2025-11-30T22:23:17.761Z"
    },
    "temporaryPassword": "jaqeorez"
}
```

```
http POST :8081/auth/login \
  email="admin@gym434379.com" \
  password="103a7d74"
HTTP/1.1 200 OK
Connection: keep-alive
Date: Sun, 30 Nov 2025 23:37:06 GMT
Keep-Alive: timeout=72
content-length: 236
content-type: application/json; charset=utf-8
set-cookie: refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiYWRtaW5AZ3ltNDM0Mzc5LmNvbSIsInJvbGUiOiJHWU1fQURNSU4iLCJneW1JZCI6MywiaWF0IjoxNzY0NTQ1ODI2LCJleHAiOjE3NjUxNTA2MjZ9.zVZEi_SoTRPTyJHOWO2bl8um7jGJDOPl30T9r4p7e0k; Path=/; HttpOnly; SameSite=Strict

{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiYWRtaW5AZ3ltNDM0Mzc5LmNvbSIsInJvbGUiOiJHWU1fQURNSU4iLCJneW1JZCI6MywiaWF0IjoxNzY0NTQ1ODI2LCJleHAiOjE3NjQ1NDY3MjZ9.OesIWTlyVULKuKHfIT3SzhgfVTJfhF5UeAjza5prxN8"
}
```

