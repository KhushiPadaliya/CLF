#!/usr/bin/env node

/**
 * Database Setup Script for CampusFind
 * This script helps set up the database for development
 */

const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

async function setupDatabase() {
  try {
    console.log("🔄 Setting up CampusFind database...");

    // Test connection
    await prisma.$connect();
    console.log("✅ Database connection successful");

    // Check if we can query users table
    try {
      const userCount = await prisma.user.count();
      console.log(`📊 Current users in database: ${userCount}`);
    } catch (error) {
      console.log(
        "⚠️  Users table not found. You may need to run database migrations."
      );
      console.log("   Run: npx prisma db push");
    }

    console.log("\n🎉 Database setup complete!");
    console.log("\nNext steps:");
    console.log("1. Make sure PostgreSQL is running");
    console.log(
      "2. Update DATABASE_URL in .env with your database credentials"
    );
    console.log(
      "3. Run: npx prisma db push (to create/update database schema)"
    );
    console.log("4. Run: npm run dev (to start the backend server)");
  } catch (error) {
    console.error("❌ Database setup failed:");
    console.error(error.message);

    if (error.code === "P1001") {
      console.log("\n💡 Common solutions:");
      console.log("1. Make sure PostgreSQL is installed and running");
      console.log("2. Check your DATABASE_URL in .env file");
      console.log("3. Create the database if it doesn't exist");
      console.log("   Example: createdb campusfind_db");
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Run setup if called directly
if (require.main === module) {
  setupDatabase().catch(console.error);
}

module.exports = { setupDatabase };
