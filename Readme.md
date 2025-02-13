# User Management API

This is a backend application built with **Express.js**, **MongoDB**, and **JWT authentication** for user registration, login, and searching users.

## Features
- User Registration
- User Login with JWT authentication
- Search User by username (Protected Route with Authentication)
- Data Validation

## Tech Stack
- **Node.js** with **Express.js** for backend
- **MongoDB** with Mongoose for database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Postman** for API testing

## Repository Link
[User Management API](https://github.com/Pradyumn-Chaudhary/User-Management-API.git)

## Installation & Setup

### Prerequisites
- Node.js installed on your system
- MongoDB installed and running

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Pradyumn-Chaudhary/User-Management-API.git
   cd User-Management-API
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a **.env** file and configure your database connection:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

The API will run on **http://localhost:5000**.

## API Endpoints

### To test User Registration
**POST** `/api/users/register`
#### Request Body:
```json
{
  "username": "anu123",
  "email": "anu@example.com",
  "password": "password123",
  "fullName": "Anu Kumar",
  "gender": "Male",
  "dob": "2002-05-15",
  "country": "India"
}
```
#### Response:
```json
{
  "message": "User registered successfully",
  "userId": "67ae163bbaa32bb6eff99af3"
}
```

### To test User Login
**POST** `/api/users/login`
#### Request Body:
```json
{
  "email": "anu@example.com",
  "password": "password123"
}
```
#### Response:
```json
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
```

### To test Search User by Username (Protected Route)
**GET** `/api/users/search?query=anu123`
#### Headers (Required for Authentication):
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```
#### Response:
```json
{
  "_id": "67ae163bbaa32bb6eff99af3",
  "username": "anu123",
  "fullName": "Anu Kumar",
  "gender": "Male",
  "dob": "2002-05-15",
  "country": "India"
}
```

## Testing with Postman
- Use Postman to send API requests.
- Set Authorization **Bearer Token** in the request header for protected routes to prevent token leakage.

## Author
Developed by **Pradyumn Chaudhary** 🚀

