import { Request, Response } from "express";
import { createProduct } from "services/admin/product.service";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

const getAdminCreateProductPage = async (req: Request, res: Response) => {
    const errors = [];
    const oldData = {
        name: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",
        factory: "",
        target: "",
    }
    return res.render("admin/product/create.ejs", {
        errors: errors,
        oldData: oldData,
    });
}


const postAdminCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc,
        shortDesc, quantity, factory, target
    } = req.body as TProductSchema;

    const validate = ProductSchema.safeParse(req.body);

    if (!validate.success) {
        // error
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.message} (${item.path[0]})`);
        const oldData = {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
        }
        return res.render("admin/product/create.ejs", {
            errors: errors,
            oldData: oldData
        });
    }
    // success, create a new product
    const image = req?.file?.fieldname ?? null;
    await createProduct(
        name, +price, detailDesc, shortDesc, +quantity, factory, target, image,
    );

    return res.redirect("/admin/product")
}
export { getAdminCreateProductPage, postAdminCreateProduct }