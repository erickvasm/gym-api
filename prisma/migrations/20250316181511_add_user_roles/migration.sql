-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'TRAINER', 'STUDENT');

-- Actualizar los registros existentes con role NULL a un valor por defecto
UPDATE "User" SET "role" = 'STUDENT' WHERE "role" IS NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole";

-- Volver a establecer la restricción NOT NULL
ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL;

