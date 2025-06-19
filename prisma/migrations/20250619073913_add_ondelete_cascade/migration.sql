-- DropForeignKey
ALTER TABLE `cart_detail` DROP FOREIGN KEY `cart_detail_productId_fkey`;

-- DropForeignKey
ALTER TABLE `order_detail` DROP FOREIGN KEY `order_detail_productId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_userId_fkey`;

-- DropIndex
DROP INDEX `cart_detail_productId_fkey` ON `cart_detail`;

-- DropIndex
DROP INDEX `order_detail_productId_fkey` ON `order_detail`;

-- DropIndex
DROP INDEX `orders_userId_key` ON `orders`;

-- AddForeignKey
ALTER TABLE `cart_detail` ADD CONSTRAINT `cart_detail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_detail` ADD CONSTRAINT `order_detail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_detail` ADD CONSTRAINT `order_detail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
