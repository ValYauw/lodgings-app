# ENDPOINTS

Daftar semua end-point yang tersedia untuk CMS.

<table>
<thead>
<th>HTTP Method</th>
<th>Endpoint</th>
<th>Description</th>
</thead>
<tbody>
<tr><td colspan=3><center><b>READ MULTIPLE RECORDS</b></center></td></tr>
<tr>
<td>GET</td>
<td><code>/cms/dataSummary</code></td>
<td>Mendapatkan jumlah data lodging untuk setiap tipe yang berada dalam database</td>
</tr>
<tr>
<td>GET</td>
<td><code>/cms/users</code></td>
<td>Mendaftarkan semua user yang berada di dalam database</td>
</tr>
<tr>
<td>GET</td>
<td><code>/cms/lodgings</code></td>
<td>Mendaftarkan semua lodging yang terdaftar di dalam database</td>
</tr>
<tr>
<td>GET</td>
<td><code>/cms/types</code></td>
<td>Mendaftarkan semua tipe lodging yang terdaftar di dalam database</td>
</tr>
<tr>
<td>GET</td>
<td><code>/cms/history</code></td>
<td>Mendapatkan editing history pada database</td>
</tr>
<tr><td colspan=3><center><b>READ SINGLE RECORD</b></center></td></tr>
<tr>
<td>GET</td>
<td><code>/cms/users/:id</code></td>
<td>Mengambil detil user dengan id berikut di dalam database</td>
</tr>
<tr>
<td>GET</td>
<td><code>/cms/lodgings/:id</code></td>
<td>Mengambil detil lodging dengan id berikut di dalam database</td>
</tr>
<tr><td colspan=3><center><b>AUTHENTICATION</b></center></td></tr>
<tr>
<td>POST</td>
<td><code>/cms/login</code></td>
<td>Mengecek data kredensial user dari form yang diberikan dan memberikan kembali access token saat proses authentication berhasil</td>
</tr>
<td>POST</td>
<td><code>/cms/glogin</code></td>
<td>Entrypoint khusus untuk Google login</td>
</tr>
<tr>
<td>POST</td>
<td><code>/cms/register</code></td>
<td>Memberikan data user dari form untuk dimasukkan ke dalam database</td>
</tr>
<tr><td colspan=3><center><b>CREATE NEW ENTITIES</b></center></td></tr>
<tr>
<td>POST</td>
<td><code>/cms/lodgings</code></td>
<td>Menambahkan lodging ke database. Hanya terbatas untuk user "Admin" atau "Staff", tidak terbuka bagi "User".</td>
</tr>
<tr>
<td>POST</td>
<td><code>/cms/types</code></td>
<td>Menambahkan lodging type ke database. Hanya terbatas untuk user "Admin", tidak terbuka bagi "User" ataupun "Staff".</td>
</tr>
<tr><td colspan=3><center><b>DELETE ENTITIES</b></center></td></tr>
<tr>
<td>DELETE</td>
<td><code>/cms/lodgings/:id</code></td>
<td>Meng-delete lodging dengan id tertentu dalam database. Hanya terbatas untuk user "Admin" atau "Staff", tidak terbuka bagi "User". "Staff" hanya bisa meng-delete lodging yang dibuat oleh dia sendiri.</td>
</tr>
<tr>
<td>DELETE</td>
<td><code>/cms/types/:id</code></td>
<td>Meng-delete lodging type dengan id tertentu dalam database. Hanya terbatas untuk user "Admin", tidak terbuka bagi "User" ataupun "Staff".</td>
</tr>
<tr>
<td>DELETE</td>
<td><code>/cms/users/:id</code></td>
<td>Meng-delete user dengan id tertentu dalam database. Hanya terbatas untuk user "Admin" atau "Staff", tidak terbuka bagi "User". "Staff" hanya bisa meng-delete record user diri sendiri.</td>
</tr>
<tr><td colspan=3><center><b>UPDATE ENTITIES</b></center></td></tr>
<tr>
<td>PUT</td>
<td><code>/cms/lodgings/:id</code></td>
<td>Mengubah data lodging yang tersimpan dalam database. Hanya terbatas untuk user "Admin".</td>
</tr>
<tr>
<td>PUT</td>
<td><code>/cms/types/:id</code></td>
<td>Mengubah data lodging type yang tersimpan dalam database. Hanya terbatas untuk user "Admin".</td>
</tr>
<tr>
<td>PUT</td>
<td><code>/cms/users/:id</code></td>
<td>Mengubah data user yang tersimpan dalam database. Hanya terbatas untuk user "Admin".</td>
</tr>
<tr>
<td>PATCH</td>
<td><code>/cms/lodgings/:id</code></td>
<td>Mengubah status lodging yang tersimpan dalam database. Hanya terbatas untuk user "Admin".</td>
</tr>
</tbody>
</table>

# GET DATA SUMMARY

## Description
GET `/cms/dataSummary`

Mendapatkan jumlah data lodging untuk setiap tipe yang berada dalam database.

## Response
200 - OK
 - Body
```json
{
    "message": "Success to get data",
    "data": {
        "types": 6,
        "users": 12,
        "lodgings": {
            "Active": 8,
            "Archived": 1
        }
    }
}
```

# GET USERS

## Description
GET `/cms/users`

Mendaftarkan semua admin dan staff yang berada di dalam database.

Query Parameters:
  * `filter`: Parameter opsional.

## Response
200 - OK
 - Body
```json
{
    "message": "Success to get data",
    "data": [
        {
            "id": 5,
            "username": "Jubir Chiong",
            "email": "jubir.chiong@mail.com",
            "role": "User",
            "phoneNumber": "08267612334",
            "address": "Perumahan BSD",
            "createdAt": "2023-08-07T09:11:12.763Z",
            "updatedAt": "2023-08-07T09:11:12.763Z"
        }
    ]
}
```

# GET LODGINGS

## Description
GET `/cms/lodgings`

Mendaftarkan semua lodging yang berada di dalam database.

## Response
200 - OK
 - Body
```json
{
    "message": "Success to get data",
    "data": [
        {
            "id": 1,
            "name": "Perumahan Chicago",
            "facility": "Rumah kos yang tertempat di Pesanggrahan, Jakarta Selatan, dekat stasiun KRL. Unit sebesar 12 m2 dan terbuka bagi pria dan putri.",
            "roomCapacity": 16,
            "imgUrl": "https://cdn.britannica.com/59/94459-050-DBA42467/Skyline-Chicago.jpg",
            "location": "Pesanggrahan",
            "price": 400000,
            "status": "Archived",
            "Type": {
                "id": 1,
                "name": "Apt"
            },
            "User": {
                "id": 1,
                "username": "John Doe",
                "email": "john.doe@mail.com"
            }
        }
    ]
}
```

# GET LODGING TYPES

## Description
GET `/cms/types`

Mendaftarkan semua tipe lodging yang berada di dalam database.

## Response
200 - OK
 - Body
```json
{
    "message": "Success to get data",
    "data": [
        {
            "id": 1,
            "name": "Kos-kosan",
            "createdAt": "2023-08-07T09:11:12.877Z",
            "updatedAt": "2023-08-07T09:11:12.877Z"
        },
        {
            "id": 2,
            "name": "Rumah sewa",
            "createdAt": "2023-08-07T09:11:12.877Z",
            "updatedAt": "2023-08-07T09:11:12.877Z"
        },
        {
            "id": 3,
            "name": "Apartemen",
            "createdAt": "2023-08-07T09:11:12.877Z",
            "updatedAt": "2023-08-07T09:11:12.877Z"
        }
    ]
}
```

# GET HISTORY

## Description
GET `/cms/history`

Mendapatkan editing history pada database.

## Response
200 - OK
 - Body
```json
{
    "message": "Success to get history",
    "data": [
        {
            "id": 2,
            "name": "Types",
            "description": "POST: New type with id 19 created",
            "updatedBy": 1,
            "createdAt": "2023-08-15T04:45:52.326Z",
            "updatedAt": "2023-08-15T04:45:52.326Z",
            "User": {
                "id": 1,
                "username": "John Doe",
                "email": "john.doe@mail.com"
            }
        },
        {
            "id": 1,
            "name": "Users",
            "description": "POST: New user with id 48 created",
            "updatedBy": 48,
            "createdAt": "2023-08-15T04:39:19.926Z",
            "updatedAt": "2023-08-15T04:39:19.926Z",
            "User": {
                "id": 48,
                "username": "Basuki",
                "email": "basuki2@mail.com"
            }
        }
    ]
}
```

# GET USER BY ID

## Description
GET `/cms/users/:id`

Mendapatkan data user dengan id tertentu dalam database

Path Parameters:
  * `id`: User Id.

## Response
200 - OK
 - Body
```json
{
    "message": "Success to get data",
    "data": {
        "id": 1,
        "username": "johndoe1234",
        "email": "john.doe@mail.com",
        "role": "Admin",
        "phoneNumber": "082123456789",
        "address": "Perumahan New York",
        "createdAt": "2023-08-07T09:11:12.354Z",
        "updatedAt": "2023-08-07T09:11:12.354Z"
    }
}
```

404 - Not Found
 - Body
```json
{
    "message": "User with id 100 not found"
}
```

# GET LODGING BY ID

## Description
GET `/cms/lodgings/:id`

Mendapatkan data lodging dengan id tertentu dalam database

Path Parameters:
  * `id`: Lodging Id.

## Response
200 - OK
 - Body
```json
{
    "message": "Success to get data",
    "data": {
        "id": 1,
        "name": "Perumahan Chicago",
        "facility": "Rumah kos yang tertempat di Pesanggrahan, Jakarta Selatan, dekat stasiun KRL. Unit sebesar 12 m2 dan terbuka bagi pria dan putri.",
        "roomCapacity": 16,
        "imgUrl": "https://cdn.britannica.com/59/94459-050-DBA42467/Skyline-Chicago.jpg",
        "authorId": 1,
        "location": "Pesanggrahan",
        "price": 400000,
        "typeId": 1,
        "createdAt": "2023-08-07T09:11:12.883Z",
        "updatedAt": "2023-08-07T09:11:12.883Z",
        "Type": {
            "id": 1,
            "name": "Kos-kosan",
            "createdAt": "2023-08-07T09:11:12.877Z",
            "updatedAt": "2023-08-07T09:11:12.877Z"
        },
        "User": {
            "id": 1,
            "username": "johndoe1234",
            "email": "john.doe@mail.com",
            "role": "Admin",
            "phoneNumber": "082123456789",
            "address": "Perumahan New York",
            "createdAt": "2023-08-07T09:11:12.354Z",
            "updatedAt": "2023-08-07T09:11:12.354Z"
        }
    }
}
```

404 - Not Found
 - Body
```json
{
    "message": "Lodging with id 100 not found"
}
```

# LOGIN

## Description
POST `/cms/login`

Mengecek data kredensial user dari form yang diberikan dan memberikan kembali access token saat proses authentication berhasil.

## Request
 - Body
```json
{
    "email": "john.doe@mail.com",
    "password": "admin"
}
```

## Response
200 - OK
 - Body
```json
{
    "id": 1,
    "username": "johndoe1234",
    "role": "Admin",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lMTIzNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MTczMzgwMH0.F9BXW7npWFsnpS81lH2KRfgAx8Is5Ut2AxoNj9YNh8c"
}
```

401 - Unauthorized
```json
{
    "message": "Invalid user/password"
}
```

# GOOGLE LOGIN

## Description
POST `/cms/glogin`

Entrypoint khusus untuk Google Login.

## Request
 - Headers
```json
{
    "google_token": "..."
}
```

## Response
200 - OK
 - Body
```json
{
    "id": 1,
    "username": "johndoe1234",
    "role": "Admin",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lMTIzNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MTczMzgwMH0.F9BXW7npWFsnpS81lH2KRfgAx8Is5Ut2AxoNj9YNh8c"
}
```

# REGISTER USER DATA

## Description
POST `/cms/register`

Memberikan data user dari form untuk dimasukkan ke dalam database.

## Request
 - Body
```json
{
    "username": "Basuki",
    "email": "basuki1@mail.com",
    "password": "admin",
    "phoneNumber": "08113355556",
    "address": "Perumahan New Jersey"
}
```

## Response
201 - Created
 - Body
```json
{
    "message": "Success to add user",
    "data": {
        "id": 42,
        "username": "Basuki",
        "email": "basuki1@mail.com",
        "phoneNumber": "08113355556",
        "address": "Perumahan New Jersey",
        "role": "Admin",
        "updatedAt": "2023-08-11T05:19:42.819Z",
        "createdAt": "2023-08-11T05:19:42.819Z"
    }
}
```

400 - Bad Request
 - Body
```json
{
    "message": "Validation Error",
    "errors": [
        "Email is required",
        "Email is invalid",
        "Password is required",
        "Password must have min. length of 5 chars"
    ]
}
```

# ADD LODGING

## Description
POST `/cms/lodgings`

Menambahkan lodging ke database. 

Hanya terbatas untuk user "Admin" atau "Staff", tidak terbuka bagi "User".

## Request
 - Access Token
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lMTIzNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MTQ5MDMxOX0.gbx4IWcAe8hWcM_irHU09NtADKSeQLMiMjyeXCX-1oQ"
}
```
 - Body
```json
{
    "name": "Disneyland",
    "facility": "It's Disneyland",
    "roomCapacity": 5,
    "imgUrl": "https://www.travelandleisure.com/thmb/FPZTCdMtVVQrQKwgn4rGclzN4ts=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/disneyland-castle_HERO_BESTDISNEY0223-5de656c6bc4a497984927aa9b0dfb074.jpg",
    "location": "Bandung",
    "price": 5000000,
    "typeId": 3
}
```

## Response
201 - Created
 - Body
```json
{
    "message": "Success to add lodging",
    "data": {
        "id": 32,
        "name": "Disneyland",
        "facility": "It's Disneyland",
        "roomCapacity": 5,
        "imgUrl": "https://www.travelandleisure.com/thmb/FPZTCdMtVVQrQKwgn4rGclzN4ts=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/disneyland-castle_HERO_BESTDISNEY0223-5de656c6bc4a497984927aa9b0dfb074.jpg",
        "location": "Bandung",
        "price": 5000000,
        "typeId": 3,
        "authorId": 1,
        "updatedAt": "2023-08-11T05:32:49.195Z",
        "createdAt": "2023-08-11T05:32:49.195Z"
    }
}
```

400 - Bad Request
```json
{
    "message": "Validation Error",
    "errors": [
        "Name is required",
        "Facility description is required",
        "Room capacity is required",
        "Image URL is required",
        "Image URL is invalid",
        "Location is required",
        "Price is required",
        "Lodging type is required",
        "Image URL is invalid",
        "Price must be at least Rp100.000"
    ]
}
```

401 - Unauthorized
```json
{
    "message": "Invalid token",
    "errors": [
        "Unauthenticated error: No access token available"
    ]
}
```

403 - Forbidden
```json
{
    "message": "Forbidden access"
}
```

# ADD TYPE

## Description
POST `/cms/types`

Menambahkan lodging type ke database. 

Hanya terbatas untuk user "Admin" atau "Staff", tidak terbuka bagi "User".

## Request
 - Access Token
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lMTIzNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MTQ5MDMxOX0.gbx4IWcAe8hWcM_irHU09NtADKSeQLMiMjyeXCX-1oQ"
}
```
 - Body
```json
{
    "name": "Studio"
}
```

## Response
201 - Created
 - Body
```json
{
    "message": "Success to add type",
    "data": {
        "id": 4,
        "name": "Studio",
        "updatedAt": "2023-08-11T05:45:41.536Z",
        "createdAt": "2023-08-11T05:45:41.536Z"
    }
}
```

400 - Bad Request
```json
{
    "message": "Validation Error",
    "errors": [
        "Type name is required"
    ]
}
```

401 - Unauthorized
```json
{
    "message": "Invalid token",
    "errors": [
        "Unauthenticated error: No access token available"
    ]
}
```

403 - Forbidden
```json
{
    "message": "Forbidden access"
}
```

# DELETE LODGING

## Description
DELETE `/cms/lodgings/:id`

Meng-delete lodging dengan id tertentu dalam database. 

Hanya terbatas untuk user "Admin" atau "Staff", tidak terbuka bagi "User". "Staff" hanya bisa meng-delete lodging yang dibuat oleh dia sendiri.

Path Parameters:
  * `id`: Lodging Id.

## Request
 - Access Token
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lMTIzNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MTQ5MDMxOX0.gbx4IWcAe8hWcM_irHU09NtADKSeQLMiMjyeXCX-1oQ"
}
```

## Response
200 - OK
 - Body
```json
{
    "message": "Lodging success to delete"
}
```

401 - Unauthorized
```json
{
    "message": "Invalid token",
    "errors": [
        "Unauthenticated error: No access token available"
    ]
}
```

403 - Forbidden
```json
{
    "message": "Forbidden access"
}
```

404 - Not Found
 - Body
```json
{
    "message": "Lodging with id 100 not found"
}
```

# DELETE TYPES

## Description
DELETE `/cms/types/:id`

Meng-delete lodging type dengan id tertentu dalam database. 

Hanya terbatas untuk user "Admin", tidak terbuka bagi "User" ataupun "Staff".

Path Parameters:
  * `id`: Type Id.

## Request
 - Access Token
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lMTIzNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MTQ5MDMxOX0.gbx4IWcAe8hWcM_irHU09NtADKSeQLMiMjyeXCX-1oQ"
}
```

## Response
200 - OK
 - Body
```json
{
    "message": "Type success to delete"
}
```

401 - Unauthorized
```json
{
    "message": "Invalid token",
    "errors": [
        "Unauthenticated error: No access token available"
    ]
}
```

403 - Forbidden
```json
{
    "message": "Forbidden access"
}
```

404 - Not Found
 - Body
```json
{
    "message": "Lodging type with id 4 not found"
}
```

# DELETE USER

## Description
DELETE `/cms/users/:id`

Meng-delete user dengan id tertentu dalam database. 

Hanya terbatas untuk user "Admin" atau "Staff", tidak terbuka bagi "User". "Staff" hanya bisa meng-delete record user diri sendiri.

Path Parameters:
  * `id`: User Id.

## Request

 - Access Token
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lMTIzNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MTQ5MDMxOX0.gbx4IWcAe8hWcM_irHU09NtADKSeQLMiMjyeXCX-1oQ"
}
```

## Response
200 - OK
 - Body
```json
{
    "message": "User success to delete"
}
```

401 - Unauthorized
```json
{
    "message": "Invalid token",
    "errors": [
        "Unauthenticated error: No access token available"
    ]
}
```

403 - Forbidden
```json
{
    "message": "Forbidden access"
}
```

404 - Not Found
 - Body
```json
{
    "message": "User with id 100 not found"
}
```

# UPDATE LODGING

## Description
PUT `/cms/lodgings/:id`

Meng-update lodging dengan id tertentu dalam database. 

Hanya terbatas untuk user "Admin", tidak terbuka bagi "User" ataupun "Staff".

Path Parameters:
  * `id`: Lodging Id.

## Request
 - Access Token
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lMTIzNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MTQ5MDMxOX0.gbx4IWcAe8hWcM_irHU09NtADKSeQLMiMjyeXCX-1oQ"
}
```
 - Body
```json
{
    "name": "Disneyland",
    "facility": "It's Disneyland",
    "roomCapacity": 20,
    "imgUrl": "disneyland.png",
    "location": "Bandung",
    "price": 5000000,
    "typeId": 3
}
```

## Response
201 - OK
 - Body
```json
{
    "message": "Success to update lodging",
    "data": {
        "id": 36,
        "name": "Disneyland",
        "facility": "It's Disneyland",
        "roomCapacity": 20,
        "imgUrl": "disneyland.png",
        "authorId": 1,
        "location": "Bandung",
        "price": 5000000,
        "typeId": 3,
        "status": "Active",
        "createdAt": "2023-08-11T07:14:30.318Z",
        "updatedAt": "2023-08-14T06:33:59.856Z"
    }
}
```

401 - Unauthorized
```json
{
    "message": "Invalid token",
    "errors": [
        "Unauthenticated error: No access token available"
    ]
}
```

403 - Forbidden
```json
{
    "message": "Forbidden access"
}
```

404 - Not Found
 - Body
```json
{
    "message": "Lodging with id 100 not found"
}
```

# UPDATE TYPE

## Description
PUT `/cms/types/:id`

Meng-update lodging type dengan id tertentu dalam database. 

Hanya terbatas untuk user "Admin", tidak terbuka bagi "User" ataupun "Staff".

Path Parameters:
  * `id`: Type Id.

## Request
 - Access Token
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lMTIzNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MTQ5MDMxOX0.gbx4IWcAe8hWcM_irHU09NtADKSeQLMiMjyeXCX-1oQ"
}
```
 - Body
```json
{
    "name": "Apt"
}
```

## Response
201 - OK
 - Body
```json
{
    "message": "Success to update type",
    "data": {
        "id": 3,
        "name": "Apt",
        "createdAt": "2023-08-07T09:11:12.877Z",
        "updatedAt": "2023-08-14T06:37:03.963Z"
    }
}
```

401 - Unauthorized
```json
{
    "message": "Invalid token",
    "errors": [
        "Unauthenticated error: No access token available"
    ]
}
```

403 - Forbidden
```json
{
    "message": "Forbidden access"
}
```

404 - Not Found
 - Body
```json
{
    "message": "Type with id 100 not found"
}
```

# UPDATE USER

## Description
PUT `/cms/users/:id`

Meng-update data user dengan id tertentu dalam database. 

Hanya terbatas untuk user "Admin", tidak terbuka bagi "User" ataupun "Staff".

Path Parameters:
  * `id`: User Id.

## Request
 - Access Token
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lMTIzNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MTQ5MDMxOX0.gbx4IWcAe8hWcM_irHU09NtADKSeQLMiMjyeXCX-1oQ"
}
```
 - Body
```json
{
    "username": "John Doe",
    "email": "john.doe@mail.com",
    "phoneNumber": "082123456789",
    "address": "Perumahan New York"
}
```

## Response
201 - OK
 - Body
```json
{
    "message": "Success to update user",
    "data": {
        "id": 1,
        "username": "John Doe",
        "email": "john.doe@mail.com",
        "role": "Admin",
        "phoneNumber": "082123456789",
        "address": "Perumahan New York",
        "createdAt": "2023-08-07T09:11:12.354Z",
        "updatedAt": "2023-08-14T06:39:46.535Z"
    }
}
```

401 - Unauthorized
```json
{
    "message": "Invalid token",
    "errors": [
        "Unauthenticated error: No access token available"
    ]
}
```

403 - Forbidden
```json
{
    "message": "Forbidden access"
}
```

404 - Not Found
 - Body
```json
{
    "message": "User with id 100 not found"
}
```

# UPDATE LODGING STATUS

## Description
PATCH `/cms/lodgings/:id`

Meng-update status untuk lodging dengan id tertentu dalam database. 

Hanya terbatas untuk user "Admin", tidak terbuka bagi "User" ataupun "Staff".

Path Parameters:
  * `id`: Lodging Id.

## Request
 - Access Token
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lMTIzNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MTQ5MDMxOX0.gbx4IWcAe8hWcM_irHU09NtADKSeQLMiMjyeXCX-1oQ"
}
```
 - Body
```json
{
    "status": "Archived"
}
```

## Response
201 - OK
 - Body
```json
{
    "message": "Success to update lodging status",
    "data": {
        "id": 1,
        "name": "Perumahan Chicago",
        "facility": "Rumah kos yang tertempat di Pesanggrahan, Jakarta Selatan, dekat stasiun KRL. Unit sebesar 12 m2 dan terbuka bagi pria dan putri.",
        "roomCapacity": 16,
        "imgUrl": "https://cdn.britannica.com/59/94459-050-DBA42467/Skyline-Chicago.jpg",
        "authorId": 1,
        "location": "Pesanggrahan",
        "price": 400000,
        "typeId": 1,
        "status": "Archived",
        "createdAt": "2023-08-07T09:11:12.883Z",
        "updatedAt": "2023-08-15T05:01:32.551Z"
    }
}
```

401 - Unauthorized
```json
{
    "message": "Invalid token",
    "errors": [
        "Unauthenticated error: No access token available"
    ]
}
```

403 - Forbidden
```json
{
    "message": "Forbidden access"
}
```

404 - Not Found
 - Body
```json
{
    "message": "Lodging with id 100 not found"
}
```