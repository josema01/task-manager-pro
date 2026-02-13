const dotenv = require("dotenv");
dotenv.config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const isProd = process.env.NODE_ENV === "production";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ...(isProd
    ? {
        ssl: { rejectUnauthorized: false },
      }
    : {}),
});

const prisma = new PrismaClient({ adapter });

module.exports = prisma;
