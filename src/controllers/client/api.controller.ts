import { Response, Request } from "express";
import { addProductToCart } from "services/client/item.service";


const postAddProductToCartAPI = async (req: Request, res: Response) => {
    try {
        const { quantity, productId } = req.body;
        const user = req.user;

        const currentSum = req?.user?.sumCart ?? 0;
        const newSum = currentSum + (+quantity);

        await addProductToCart(+quantity, +productId, user);

        res.status(200).json({
            data: newSum
        });
    } catch (error) {
        console.error("Error in postAddProductToCartAPI:", error);
        res.status(500).json({ message: "Lỗi server khi thêm sản phẩm vào giỏ hàng." });
    }
}


export { postAddProductToCartAPI }