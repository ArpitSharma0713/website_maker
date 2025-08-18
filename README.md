# Website Maker - MongoDB Setup

This project now uses MongoDB as the database for storing user information and authentication data.

## Prerequisites

- .NET 8 SDK
- Node.js and npm
- Docker Desktop (recommended for MongoDB)
- MongoDB (if not using Docker)

## MongoDB Setup Options

### Option 1: Using Docker (Recommended)

1. **Start MongoDB with Docker Compose:**
   ```bash
   # For development (no authentication)
   docker-compose -f docker-compose.dev.yml up -d
   
   # Or for production with authentication and Mongo Express
   docker-compose up -d
   ```

2. **MongoDB will be available at:**
   - MongoDB: `mongodb://localhost:27017`
   - Mongo Express (web UI): `http://localhost:8081` (admin/admin)

### Option 2: Local MongoDB Installation

1. **Install MongoDB Community Edition:**
   - Download from: https://www.mongodb.com/try/download/community
   - Follow installation instructions for your OS

2. **Start MongoDB service:**
   - Windows: MongoDB should start automatically as a service
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

## Project Setup

### Backend (.NET API)

1. **Navigate to API directory:**
   ```bash
   cd WebsitemakerApi
   ```

2. **Restore packages:**
   ```bash
   dotnet restore
   ```

3. **Run the API:**
   ```bash
   dotnet run
   ```

   The API will be available at: `https://localhost:7223` or `http://localhost:5223`

### Frontend (Angular)

1. **Navigate to frontend directory:**
   ```bash
   cd website-maker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The Angular app will be available at: `http://localhost:4200`

## Database Configuration

The MongoDB settings are configured in `appsettings.json`:

```json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "WebsiteMakerDb",
    "UsersCollectionName": "Users"
  }
}
```

## Features

- **User Registration**: Create new user accounts with validation
- **User Authentication**: Login with username/password
- **Password Hashing**: Secure password storage using SHA256
- **MongoDB Integration**: Persistent data storage with indexing
- **Unique Constraints**: Automatic enforcement of unique usernames and emails
- **RESTful API**: Clean API endpoints for authentication

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/users/{username}` - Get user by username

## MongoDB Collections

### Users Collection
```javascript
{
  "_id": ObjectId,
  "fullName": String,
  "email": String (unique),
  "dateOfBirth": Date,
  "username": String (unique),
  "passwordHash": String,
  "createdAt": Date
}
```

## Development Tools

- **Swagger UI**: Available at `https://localhost:7223/swagger` when running in development
- **Mongo Express**: Web-based MongoDB admin interface at `http://localhost:8081`

## Testing

Use the provided `test-api.http` file to test the API endpoints:

1. Register a new user
2. Login with the registered user
3. Test invalid login attempts

## Production Considerations

- Use strong MongoDB authentication in production
- Implement JWT tokens instead of simple base64 tokens
- Add proper error logging and monitoring
- Use HTTPS in production
- Consider MongoDB Atlas for cloud hosting
- Implement proper backup strategies

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `docker ps` or check system services
- Check connection string in appsettings.json
- Verify MongoDB is accessible on port 27017

### Build Issues
- Run `dotnet restore` in the API directory
- Run `npm install` in the frontend directory
- Check that all required packages are installed

### CORS Issues
- Ensure the Angular app is running on port 4200
- Check CORS configuration in Program.cs
