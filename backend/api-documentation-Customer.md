# ENDPOINTS

Daftar semua end-point yang tersedia untuk Customer.

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
<td><code>/pub/lodgings</code></td>
<td>Mendaftarkan lodging</td>
</tr>
<tr>
<td>GET</td>
<td><code>/pub/bookmarks</code></td>
<td>Mendaftarkan lodging yang telah di-bookmark oleh customer</td>
</tr>
<tr><td colspan=3><center><b>READ SINGLE RECORD</b></center></td></tr>
<tr>
<td>GET</td>
<td><code>/pub/lodgings/:id</code></td>
<td>Mengambil detil lodging dengan id berikut di dalam database</td>
</tr>
<tr><td colspan=3><center><b>AUTHENTICATION</b></center></td></tr>
<tr>
<td>POST</td>
<td><code>/pub/login</code></td>
<td>Mengecek data kredensial user dari form yang diberikan dan memberikan kembali access token saat proses authentication berhasil</td>
</tr>
<td>POST</td>
<td><code>/pub/glogin</code></td>
<td>Entrypoint khusus untuk Google login</td>
</tr>
<tr>
<td>POST</td>
<td><code>/pub/register</code></td>
<td>Memberikan data user dari form untuk dimasukkan ke dalam database</td>
</tr>
<tr><td colspan=3><center><b>BOOKMARKING</b></center></td></tr>
<tr>
<td>POST</td>
<td><code>/pub/lodgings/:id/bookmark</code></td>
<td>Menambahkan bookmark untuk lodging dengan id tersebut, yang terhubung dengan user id.</td>
</tr>
<tr>
<td>DELETE</td>
<td><code>/pub/lodgings/:id/bookmark</code></td>
<td>Meng-delete bookmark untuk lodging dengan id tersebut, yang terhubung dengan user id.</td>
</tr>
</tbody>
</table>

# GET LODGINGS

## Description
GET `/pub/lodgings`

Mendaftarkan lodging yang berada di dalam database.

## Request
 - Headers
```json
{
  "access_token": ...
}
```

Jika access token diberikan maka server juga akan mengambil suatu nilai boolean dengan key 'isBookmarked' untuk setiap lodging, yang menunjukkan jika lodging telah di-bookmark oleh user.

API akan tetap bisa dipanggil apabila access token tidak dikirim (tidak memerlukan authentication).

 - Query
<table>
<tr>
<td>search</td>
<td>Carilah lodging dengan search term yang diberikan pada query ini. Lodging dengan nama/fasilitas/lokasi yang mengandung search term tersebut akan dicari.</td>
</tr>
<tr>
<td>minRoomCapacity</td>
<td>Carilah lodging dengan room capacity yang lebih besar atau sama dengan dari angka yang diberikan.</td>
</tr>
<tr>
<td>roomType</td>
<td>Carilah lodging dengan room type tersebut.</td>
</tr>
<tr>
<td>maxPrice</td>
<td>Carilah lodging dengan harga yang lebih kecil atau sama dengan dari angka yang diberikan.</td>
</tr>
<tr>
<td>status</td>
<td>Status lodging yang tersedia ('Active', 'Inactive', 'Archived'). Default hanya lodging 'Active' yang diambil.</td>
</tr>
<tr>
<td>limit</td>
<td>Batas jumlah data yang akan diambil. Default 20. Maksimum 100.</td>
</tr>
<tr>
<td>offset</td>
<td>Offset jumlah data yang akan diambil.</td>
</tr>
</table>

## Response
200 - OK
 - Body
```json
{
    "message": "Success to get data",
    "count": 50,
    "offset": 20,
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
        },
        ...
    ]
}
```

# GET LODGING BY ID

## Description
GET `/pub/lodgings/:id`

Mendapatkan data lodging dengan id tertentu dalam database

Path Parameters:
  * `id`: Lodging Id.

## Request
 - Headers
```json
{
  "access_token": ...
}
```

Jika access token diberikan maka server juga akan mengambil suatu nilai boolean dengan key 'isBookmarked' untuk setiap lodging, yang menunjukkan jika lodging telah di-bookmark oleh user.

API akan tetap bisa dipanggil apabila access token tidak dikirim (tidak memerlukan authentication).

## Response
200 - OK
 - Body
```json
{
    "message": "Success to get data",
    "data": {
        "id": 2,
        "name": "Perumahan New York",
        "facility": "Rumah kos yang tertempat di Senayan, Jakarta Selatan, dekat stasiun MRT. Unit sebesar 16 m2 dan khusus putri.",
        "roomCapacity": 5,
        "imgUrl": "https://media.cntraveler.com/photos/63483e15ef943eff59de603a/16:9/w_1920%2Cc_limit/New%2520York%2520City_GettyImages-1347979016.jpg",
        "authorId": 50,
        "location": "Senayan",
        "price": 800000,
        "typeId": 2,
        "status": "Active",
        "createdAt": "2023-08-07T09:11:12.883Z",
        "updatedAt": "2023-08-19T14:32:55.015Z",
        "Type": {
            "id": 2,
            "name": "Rumah sewa",
            "createdAt": "2023-08-07T09:11:12.877Z",
            "updatedAt": "2023-08-07T09:11:12.877Z"
        },
        "User": {
            "id": 50,
            "username": "Basuki",
            "email": "basuki3@mail.com",
            "role": "Admin",
            "phoneNumber": null,
            "address": null,
            "createdAt": "2023-08-19T12:34:43.664Z",
            "updatedAt": "2023-08-19T12:34:43.664Z"
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
POST `/pub/login`

Mengecek data kredensial user dari form yang diberikan dan memberikan kembali access token saat proses authentication berhasil.

## Request
 - Body
```json
{
    "email": "janda.marina@mail.com",
    "password": "admin"
}
```

## Response
200 - OK
 - Body
```json
{
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
POST `/pub/glogin`

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
POST `/pub/register`

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

# ADD BOOKMARK

## Description
POST `/pub/lodgings/:id/bookmark`

Menambahkan bookmark untuk lodging dengan id tertentu ke database, bagi user yang telah login. 

## Request
 - Access Token
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lMTIzNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MTQ5MDMxOX0.gbx4IWcAe8hWcM_irHU09NtADKSeQLMiMjyeXCX-1oQ"
}
```

## Response
201 - Created
 - Body
```json
{
  "message": "Added bookmark"
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

# DELETE BOOKMARK

## Description
DELETE `/pub/lodgings/:id/bookmark`

Meng-delete bookmark untuk lodging dengan id tertentu dalam database, bagi user yang telah login.

Path Parameters:
  * `id`: Lodging Id.

## Request
 - Access Token
```json
{
    "access_token": ...
}
```

## Response
200 - OK
 - Body
```json
{
    "message": "Removed bookmark"
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
