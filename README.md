# Users Blog API

This is a simple REST API for managing users and their blog posts. It allows you to create, retrieve, update, and soft-delete users and posts.

## Technologies Used

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

## Endpoints

### GET /users  
Returns a list of all users.

### GET /users/:id  
Returns a single user by ID along with their blog posts.

### POST /users  
Creates a new user.  
Request Body:  
{ "firstName": "John", "lastName": "Doe", "emailAddress": "john@gmail.com", "username": "johndoe" }

### GET /posts  
Returns a list of all posts with their authors.

### GET /posts/:id  
Returns a single post by ID along with its author.

### POST /posts  
Creates a new blog post.  
Request Body:  
{ "title": "My Post", "content": "Some content", "userId": "uuid" }

### PUT /posts/:id  
Updates a blog post (title and/or content).  
Request Body:  
{ "title": "Updated Title", "content": "Updated Content" }

### DELETE /posts/:id  
Soft-deletes a post (sets isDeleted: true).



