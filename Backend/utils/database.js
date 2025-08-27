const { PrismaClient } = require("@prisma/client");

// Create a single instance of Prisma Client
const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});

// Test database connection
const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  }
};

// Graceful shutdown function
const disconnectDB = async () => {
  await prisma.$disconnect();
  console.log("📊 Database disconnected");
};

module.exports = {
  prisma,
  testConnection,
  disconnectDB,
};
