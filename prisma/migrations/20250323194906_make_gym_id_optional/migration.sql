-- DropForeignKey
ALTER TABLE "Trainer" DROP CONSTRAINT "Trainer_gym_id_fkey";

-- AlterTable
ALTER TABLE "Trainer" ALTER COLUMN "gym_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Trainer" ADD CONSTRAINT "Trainer_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "Gym"("gym_id") ON DELETE SET NULL ON UPDATE CASCADE;
