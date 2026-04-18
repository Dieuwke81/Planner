import { PrismaClient } from '@prisma/client';

// Voorkom meerdere instanties van PrismaClient in ontwikkeling
// Zie: https://pris.ly/d/help/integration/platforms/nextjs#troubleshooting
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
