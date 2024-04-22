import express from "express";
import { router as authApi } from "./routes/user.routes";
import { router as productApi } from "./routes/product.routes";
import { router as cartApi } from "./routes/cart.routes";
import { router as orderApi } from "./routes/order.routes";


export const app = express()

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Server is online" });
});

app.use("/api/auth/", authApi);
app.use("/api/products/", productApi);
app.use("/api/cart/", cartApi);
app.use("/api/orders/", orderApi);


