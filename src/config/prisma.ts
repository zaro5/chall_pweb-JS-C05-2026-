// src/config/prisma.ts
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";
// Perhatikan jalur impor di bawah ini disesuaikan dengan folder generated kamu
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool as any);

const prisma = new PrismaClient({ adapter });

export default prisma;