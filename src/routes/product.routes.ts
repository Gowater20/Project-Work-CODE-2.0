import { Router } from "express";

import { addProductController, deletedProductController, getProductByIdController, getProductsController, updateProductController, } from "../controllers/product.controllers";
import { isAdmin } from "../middlewares/admin.auth";
import { JWTMiddleware } from "../middlewares/user.auth";

export const router = Router();

router.get("/", getProductsController); // get all products
router.get("/:id", getProductByIdController); // get product by id
router.post("/", JWTMiddleware, isAdmin, addProductController); // add product
router.put("/:id", updateProductController); // update product
router.delete("/:id", deletedProductController); // delete product

