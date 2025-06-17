import { Prisma } from "@prisma/client";
import { prisma } from "config/client";
import { TOTAL_ITEMS_PER_PAGE } from "config/constant";

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

const getProductList = async (page: number) => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const skip = (page - 1) * pageSize;

    return await prisma.product.findMany({
        skip: skip,
        take: pageSize
    });
}

const countTotalProductPages = async () => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const totalItems = await prisma.product.count();
    const totalPages = Math.ceil(totalItems / pageSize);
    return totalPages;
}


const handleDeleteProduct = async (id: number) => {
    await prisma.product.delete({
        where: { id }
    })
}

const getProductById = async (id: number) => {
    return await prisma.product.findUnique({
        where: { id }
    })
}

const upDateProductById = async (
    id: number,
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    imageUpload: string
) => {
    await prisma.product.update({
        where: { id },
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

export {
    createProduct, getProductList, handleDeleteProduct,
    getProductById, upDateProductById, countTotalProductPages
}