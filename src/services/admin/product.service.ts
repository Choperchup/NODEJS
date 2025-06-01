import { Prisma } from "@prisma/client";
import { prisma } from "config/client";

const createProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    imageUpload: string
) => {
    await prisma.product.create({
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
            ...(imageUpload && { image: imageUpload })
        }
    })
}

const getProductList = async () => {
    return await prisma.product.findMany();
}

export { createProduct, getProductList }