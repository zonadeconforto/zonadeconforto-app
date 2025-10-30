import { PrismaClient, Role } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@zonadeconforto.com.br";
  const adminPassword = "admin@";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("✅ Admin already exists:", adminEmail);
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      email: adminEmail,
      name: "Administrator",
      passwordHash: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log("🎉 Admin user created:", adminEmail);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
