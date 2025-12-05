# Interactive Digital MoodBoard API

A production-ready backend API for creating and managing digital mood boards with user authentication, image uploads, and collaborative features.

## 🚀 Features

- **User Authentication**: JWT-based signup, login, logout, and token refresh
- **Board Management**: Create, read, update, delete mood boards
- **Tile Management**: Add, position, and manage images on boards
- **Public Sharing**: Share boards publicly with unique links
- **Activity Logging**: Track all board and tile activities
- **Image Upload**: Secure Cloudinary integration for image storage
- **Real-time Collaboration**: Activity logs for collaborative workflows

## 🛠 Technology Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **Database**: PostgreSQL (Supabase hosted)
- **ORM**: Prisma
- **Authentication**: JWT (Access + Refresh tokens)
- **File Storage**: Cloudinary
- **Validation**: Zod
- **Security**: bcrypt, CORS, input sanitization
- **Deployment**: Render / Railway / Vercel ready

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account with PostgreSQL database
- Cloudinary account for image storage

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interactive-digital-moodboard-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your credentials:
   ```env
   # Database (from Supabase)
   DATABASE_URL="your-supabase-connection-string"

   # JWT Secrets (generate strong random strings)
   JWT_ACCESS_SECRET="your-access-secret"
   JWT_REFRESH_SECRET="your-refresh-secret"
   JWT_ACCESS_EXPIRES_IN="15m"
   JWT_REFRESH_EXPIRES_IN="7d"

   # Cloudinary Credentials
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"

   # Server Config
   PORT=3000
   FRONTEND_URL="http://localhost:3000"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run build

   # Run database migrations
   npm run migrate
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### POST /auth/signup
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "accessToken": "jwt-token",
  "refreshToken": "refresh-jwt-token"
}
```

#### POST /auth/login
Authenticate user and get tokens.

#### POST /auth/logout
Logout user (client-side token removal).

#### POST /auth/refresh-token
Refresh access token using refresh token.

### Board Endpoints

#### POST /boards
Create a new mood board.

**Headers:** `Authorization: Bearer <access-token>`

**Request Body:**
```json
{
  "title": "My Mood Board",
  "description": "Collection of inspiring images",
  "isPublic": false
}
```

#### GET /boards
Get all boards for authenticated user.

#### GET /boards/:boardId
Get specific board details (owner only, or public boards).

#### PUT /boards/:boardId
Update board information.

#### DELETE /boards/:boardId
Delete a board and all its tiles.

### Tile Endpoints

#### POST /boards/:boardId/tiles
Add image tile to board.

**Request Body:**
```json
{
  "imageUrl": "https://cloudinary.com/image.jpg",
  "caption": "Beautiful sunset",
  "tags": ["nature", "sunset"],
  "positionX": 100,
  "positionY": 200
}
```

#### PUT /boards/:boardId/tiles/:tileId
Update tile properties.

#### DELETE /boards/:boardId/tiles/:tileId
Remove tile from board.

### Activity Log Endpoints

#### GET /boards/:boardId/logs?page=1&limit=10
Get paginated activity logs for a board.

#### POST /boards/:boardId/logs
Manually add activity log entry.

### Image Upload Endpoints

#### POST /upload/image
Upload image to Cloudinary.

**Content-Type:** `multipart/form-data`
**Field:** `image` (file)

**Response:**
```json
{
  "url": "https://cloudinary.com/secure-image.jpg",
  "public_id": "unique-public-id"
}
```

#### DELETE /upload/image/:public_id
Delete image from Cloudinary.

## 🧪 Testing

### Manual Testing with cURL

1. **Signup**
   ```bash
   curl -X POST http://localhost:3000/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

2. **Login** (get access token)
   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Create Board**
   ```bash
   curl -X POST http://localhost:3000/boards \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"title":"Test Board","description":"Testing board"}'
   ```

### API Testing Tools

- **Postman**: Import the API collection
- **Insomnia**: Create requests for each endpoint
- **Thunder Client** (VS Code extension)

## 🏗 Project Structure

```
src/
├── config/
│   ├── prisma.js          # Database connection
│   ├── cloudinary.js      # Cloudinary configuration
│   └── jwt.js            # JWT utilities
├── middleware/
│   ├── authMiddleware.js  # JWT authentication
│   ├── errorHandler.js    # Global error handling
│   └── validate.js       # Request validation
├── routes/
│   ├── auth.routes.js     # Authentication routes
│   ├── board.routes.js    # Board CRUD routes
│   ├── tile.routes.js     # Tile management routes
│   ├── log.routes.js      # Activity log routes
│   └── upload.routes.js   # Image upload routes
├── controllers/
│   ├── auth.controller.js
│   ├── board.controller.js
│   ├── tile.controller.js
│   ├── log.controller.js
│   └── upload.controller.js
├── services/
│   ├── auth.service.js    # Business logic for auth
│   ├── board.service.js   # Board operations
│   ├── tile.service.js    # Tile operations
│   ├── log.service.js     # Activity logging
│   └── upload.service.js  # Image upload/delete
├── utils/
│   └── generateShareId.js # Unique share ID generator
└── server.js              # Application entry point

prisma/
└── schema.prisma          # Database schema

.env.example               # Environment variables template
package.json              # Dependencies and scripts
```

## 🚀 Deployment

### Environment Variables for Production

Ensure these are set in your deployment platform:

- `DATABASE_URL`: Supabase connection string
- `JWT_ACCESS_SECRET`: Strong random string for access tokens
- `JWT_REFRESH_SECRET`: Strong random string for refresh tokens
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `FRONTEND_URL`: Your frontend application URL

### Deployment Platforms

- **Railway**: Connect GitHub repo, auto-deploys on push
- **Render**: Web service with persistent disk
- **Vercel**: Serverless functions (requires adapter)

### Build Commands

```json
{
  "scripts": {
    "build": "prisma generate",
    "migrate": "prisma migrate deploy",
    "start": "node src/server.js"
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:
- Open GitHub issue
- Check existing documentation
- Review API response error messages

---

**Happy Mood Boarding! 🎨**
