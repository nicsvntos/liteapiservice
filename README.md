# Simple API Service

A simple full-stack web application featuring user authentication built with React, FastAPI, and PostgreSQL.


## API Endpoints

| Endpoint | Method | Request Body | Description | Response |
|----------|--------|--------------|-------------|-----------|
| `/register` | POST | ```json { "username": "string", "email": "string", "password": "string" }``` | Register a new user | ```json { "message": "Registration successful", "validation_code": "string" }``` |
| `/validate` | POST | ```json { "username": "string", "code": "string" }``` | Validate user account | ```json { "message": "Account validated successfully" }``` |
| `/signin` | POST | ```json { "username": "string", "password": "string" }``` | Sign in to account | ```json { "message": "Signed in successfully", "username": "string" }``` |
| `/signout` | POST | ```json { "username": "string" }``` | Sign out of account | ```json { "message": "Signed out successfully" }``` |
| `/home` | GET | - | Get home content | ```json { "message": "Welcome {username}!" }``` |
| `/users` | GET | - | List all users | ```json [{ "username": "string", "email": "string", "is_validated": boolean, "created_at": "datetime" }]``` |

## To run using Docker:

1. Build and start services:
   ```docker-compose up --build```
2. Stop and remove all data:
   ```docker-compose down -v```
3. Access the database:
   ```docker-compose exec db psql -U postgres -d auth_db```
4. If connection to the database server fails:
   - Stop the container:
      ```docker-compose down```
   - Rebuild:
      ```docker-compose up --build```

## Used Code

Majority of the code in the backend follows the project structure and implementation of [Using FastAPI with SQLAlchemy](https://jnikenoueba.medium.com/using-fastapi-with-sqlalchemy-5cd370473fe5) and [How to Build a CRUD application](https://github.com/wpcodevo/fastapi_sqlalchemy?tab=readme-ov-file).
