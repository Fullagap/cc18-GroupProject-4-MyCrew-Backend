/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_phone_number_key` ON `user`(`phone_number`);
