# CampusFind - Complete Setup Guide

This guide will help you set up the complete CampusFind application with backend database connectivity.

## What We've Built

✅ **Backend Features Implemented:**

- Express.js server with CORS enabled
- JWT-based authentication system
- PostgreSQL database with Prisma ORM
- Complete user registration and login APIs
- Password hashing with bcrypt
- Comprehensive input validation
- Error handling and security measures

✅ **Frontend Integration:**

- Updated authentication service to use backend APIs
- Axios HTTP client with interceptors
- Token-based authentication
- Environment configuration

✅ **Database Schema:**

- Users table with authentication fields
- Ready-to-extend schema for lost/found items
- Proper relationships and constraints

## Setup Instructions

### 1. Database Setup (PostgreSQL)

#### Option A: Install PostgreSQL Locally

1. Download and install PostgreSQL from https://www.postgresql.org/
2. Create a database:
   ```sql
   CREATE DATABASE campusfind_db;
   CREATE USER campusfind_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE campusfind_db TO campusfind_user;
   ```

#### Option B: Use Online PostgreSQL (Recommended for Quick Setup)

1. Sign up for a free PostgreSQL database at:

   - **Supabase** (https://supabase.com/) - Free tier available
   - **Neon** (https://neon.tech/) - Free tier available
   - **Railway** (https://railway.app/) - Free tier available

2. Get your connection URL (format: `postgresql://user:password@host:port/database`)

### 2. Backend Configuration

1. **Navigate to Backend directory:**

   ```bash
   cd CLF/Backend
   ```

2. **Update .env file with your database URL:**

   ```env
   DATABASE_URL="postgresql://your_user:your_password@localhost:5432/campusfind_db"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   ```

3. **Create database tables:**

   ```bash
   npx prisma db push
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   Server will run on http://localhost:5000

### 3. Frontend Configuration

1. **Navigate to Frontend directory:**

   ```bash
   cd CLF/CampusFind-main
   ```

2. **Verify .env file exists with:**

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start the frontend:**
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:5173

### 4. Test the Connection

1. **Test backend health:**

   - Open http://localhost:5000/api/health
   - Should show: `{"status":"OK","message":"CampusFind Backend is running!"}`

2. **Test full application:**
   - Open http://localhost:5173
   - Try signing up with a new account
   - Try logging in with the created account

## API Endpoints Available

### Authentication

- **POST** `/api/auth/signup` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/me` - Get current user (requires login)
- **PUT** `/api/auth/profile` - Update profile (requires login)
- **PUT** `/api/auth/change-password` - Change password (requires login)

### Test with curl:

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123"}'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Troubleshooting

### Backend Issues

- **Database connection error**: Check DATABASE_URL in .env
- **Port already in use**: Change PORT in .env or kill existing process
- **Prisma errors**: Run `npx prisma generate` then `npx prisma db push`

### Frontend Issues

- **API connection error**: Ensure backend is running on port 5000
- **CORS errors**: Check FRONTEND_URL in backend .env matches frontend URL
- **Build errors**: Delete node_modules and run `npm install`

### Common Database URLs

```bash
# Local PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/campusfind_db"

# Supabase
DATABASE_URL="postgresql://postgres:password@db.project.supabase.co:5432/postgres"

# Neon
DATABASE_URL="postgresql://user:password@ep-xxx.region.neon.tech/dbname"
```

## Next Steps for Development

1. **Add Lost/Found Item APIs** - Extend the backend with item management
2. **Add File Upload** - For item images using multer or cloud storage
3. **Add Email Notifications** - Using nodemailer or SendGrid
4. **Add Real-time Features** - Using Socket.io for instant notifications
5. **Add Search & Filtering** - Advanced search with PostgreSQL full-text search

## Security Notes

- Change JWT_SECRET before production
- Use HTTPS in production
- Add rate limiting for API endpoints
- Implement input sanitization
- Add request logging for monitoring

## Database Schema Ready for Extension

The current schema includes:

- **Users** (implemented)
- **LostItems** (schema ready)
- **FoundItems** (schema ready)
- **Messages** (schema ready)

You can extend functionality by implementing API routes for these models using the same pattern as the auth routes.

---

**Built by:** Khushi Padaliya & Apexa Patel  
**Tech Stack:** React + Vite, Express.js, PostgreSQL, Prisma, JWT
