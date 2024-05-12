PLEASE NOTE: 
For routes that require token, you login and extract the token without quote x-auth-toke ass KEY and the token without quote as VALUE.
example below:

x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYzOTI5MzU1Mn0.Dv8PyBptmUCb4vPW5oMfZ-20Ek4kzREt7jo6ZKGmACU

Authentication Endpoints:
************************************************AUTH ROUTE

*************************************Signup

URL: /api/auth/signup
Method: POST
Request Body:
json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response:
Status Code: 201 (Created)
Body:

{
  "msg": "User created successfully"
}

*************************************************LOGIN
Login:

URL: /api/auth/login
Method: POST
Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}
Response:
Status Code: 200 (OK)
Body:
{
  "token": "JWT-Token"
}

*********************************BLOG**************************
Create Blog:

URL: /api/blogs
Method: POST
Headers:
x-auth-token: JWT-Token
Request Body:
{
  "title": "Test Blog",
  "description": "This is a test blog",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "tags": ["test", "blog"]
}
Response:
Status Code: 201 (Created)
Body:
{
  "msg": "Blog created successfully",
  "blog": {
    "_id": "blogId",
    "title": "Test Blog",
    "description": "This is a test blog",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "tags": ["test", "blog"],
    "author": "userId",
    "state": "draft",
    "readCount": 0,
    "timestamp": "timestamp"
  }
}

******************************************************GET BLOG

Get Blogs:

URL: /api/blogs
Method: GET
Headers:
x-auth-token: JWT-Token
Query Parameters:
page: Page number (optional, default: 1)
limit: Number of blogs per page (optional, default: 20)
Response:
Status Code: 200 (OK)
Body:

{
  "docs": [
    {
      "_id": "blogId",
      "title": "Test Blog",
      "description": "This is a test blog",
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "tags": ["test", "blog"],
      "author": {
        "_id": "userId",
        "firstName": "John",
        "lastName": "Doe"
      },
      "state": "draft",
      "readCount": 0,
      "timestamp": "timestamp"
    }
  ],
  "totalDocs": 1,
  "limit": 20,
  "page": 1,
  "totalPages": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevPage": null,
  "nextPage": null
}

*********************************BY ID

Get Blog by ID:

URL: /api/blogs/:id
Method: GET
Headers:
x-auth-token: JWT-Token
Response:
Status Code: 200 (OK)
Body:
{
  "blog": {
    "_id": "blogId",
    "title": "Test Blog",
    "description": "This is a test blog",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "tags": ["test", "blog"],
    "author": {
      "_id": "userId",
      "firstName": "John",
      "lastName": "Doe"
    },
    "state": "draft",
    "readCount": 1,
    "timestamp": "timestamp"
  }
}

********************************UPDATE

Update Blog:

URL: /api/blogs/:id
Method: PUT
Headers:
x-auth-token: JWT-Token
Request Body:
{
  "title": "Updated Test Blog"
}
Response:
Status Code: 200 (OK)
Body:
{
  "msg": "Blog updated successfully",
  "blog": {
    "_id": "blogId",
    "title": "Updated Test Blog",
    "description": "This is a test blog",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "tags": ["test", "blog"],
    "author": "userId",
    "state": "draft",
    "readCount": 1,
    "timestamp": "timestamp"
  }
}

****************************************DELETE

Delete Blog:

URL: /api/blogs/:id
Method: DELETE
Headers:
x-auth-token: JWT-Token
Response:
Status Code: 200 (OK)
Body:
{
  "msg": "Blog deleted successfully"
}
