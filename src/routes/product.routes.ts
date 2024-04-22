import { Router } from "express";

import { addProductController, deletedProductController, getProductByIdController, getProductsController, updateProductController, } from "../controllers/product.controllers";

export const router = Router();

router.get("/", getProductsController); // get all products
router.get("/:id", getProductByIdController); // get product by id
router.post("/", addProductController); // add product
router.put("/:id", updateProductController); // update product
router.delete("/:id", deletedProductController); // delete product

