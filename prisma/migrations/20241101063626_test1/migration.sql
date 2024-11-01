/*
  Warnings:

  - You are about to drop the column `status` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `create_user` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `targetdate` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `WOPayAmount` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `identityCardNumber` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[indentical_number]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `checkInTime` on table `attendance` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `create_user_id` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetDate` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indentical_number` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attendance` DROP COLUMN `status`,
    MODIFY `date` DATE NOT NULL,
    MODIFY `checkInTime` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `leaverecord` MODIFY `request_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `start_date` DATE NOT NULL,
    MODIFY `end_date` DATE NOT NULL;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `create_user`,
    DROP COLUMN `targetdate`,
    ADD COLUMN `create_user_id` INTEGER NOT NULL,
    ADD COLUMN `targetDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `WOPayAmount`,
    DROP COLUMN `identityCardNumber`,
    ADD COLUMN `indentical_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `wo-pay-amount` INTEGER NULL DEFAULT 365,
    MODIFY `dateStart` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `dateEnd` DATE NULL,
    MODIFY `sickLeaveAmount` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_indentical_number_key` ON `user`(`indentical_number`);

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_create_user_id_fkey` FOREIGN KEY (`create_user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
