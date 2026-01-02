import { PrismaClient } from "../../dist/generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config.js';
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
export default prisma;
//# sourceMappingURL=prisma.js.map