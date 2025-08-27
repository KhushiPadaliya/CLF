# CampusFind Backend

REST API backend for CampusFind - A lost & found platform for campus communities.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Environment**: dotenv

## Prerequisites

Before running the backend, make sure you have:

1. **Node.js** (v16 or higher)
2. **PostgreSQL** (v12 or higher)
3. **npm** or **yarn**

## Installation & Setup

### 1. Install Dependencies

```bash
cd Backend
npm install
```

### 2. Environment Configuration

Copy the `.env` file and update the database connection:

```bash
# Update these values in .env
DATABASE_URL="postgresql://username:password@localhost:5432/campusfind_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

### 3. Database Setup

```bash
# Create database (using PostgreSQL CLI)
createdb campusfind_db

# Generate Prisma client
npx prisma generate

# Create/update database schema
npx prisma db push

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check

- **GET** `/api/health` - Check if server is running

### Authentication

- **POST** `/api/auth/signup` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/me` - Get current user profile (requires auth)
- **PUT** `/api/auth/profile` - Update user profile (requires auth)
- **PUT** `/api/auth/change-password` - Change password (requires auth)

## API Usage Examples

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@university.edu",
    "password": "password123",
    "studentId": "STU001",
    "phone": "+1234567890"
  }'
```

### Login User

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@university.edu",
    "password": "password123"
  }'
```

### Get User Profile (with token)

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Database Schema

### Users Table

- `id` - Unique identifier (CUID)
- `email` - Email address (unique)
- `fullName` - Full name
- `studentId` - Student ID (optional, unique)
- `phone` - Phone number (optional)
- `password` - Hashed password
- `isActive` - Account status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Future Tables (Ready for Implementation)

- **LostItem** - Items reported as lost
- **FoundItem** - Items reported as found
- **Message** - Communications between users

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Comprehensive validation for all inputs
- **CORS Protection**: Configured for frontend domain
- **Error Handling**: Proper error responses without exposing internals

## Development Scripts

```bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
npm run db:generate # Generate Prisma client
npm run db:push     # Push schema changes to database
npm run db:studio   # Open Prisma Studio
```

## Environment Variables

```env
DATABASE_URL=postgresql://username:password@localhost:5432/campusfind_db?schema=public
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Error Codes

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE" // Optional error code for frontend handling
}
```

Common error codes:

- `TOKEN_REQUIRED` - No authentication token provided
- `INVALID_TOKEN` - Token is invalid or malformed
- `TOKEN_EXPIRED` - Token has expired
- `USER_NOT_FOUND` - User doesn't exist
- `ACCOUNT_DEACTIVATED` - User account is disabled

## Production Deployment

### Environment Setup

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure production database URL
4. Set appropriate CORS origins

### Database Migration

```bash
npx prisma db push --force-reset  # Only for clean deployments
npx prisma generate
```

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation for API changes
4. Use meaningful commit messages

## Authors

- **Khushi Padaliya** - Founder & CEO
- **Apexa Patel** - Co-Founder & CTO

## License

This project is part of CampusFind platform - Built by students, for students.
