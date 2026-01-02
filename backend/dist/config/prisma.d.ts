import { PrismaClient } from "../../dist/generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config.js';
declare const prisma: PrismaClient<{
    adapter: PrismaPg;
}, never, import("../../dist/generated/prisma/runtime/client.js").DefaultArgs>;
export default prisma;
//# sourceMappingURL=prisma.d.ts.map