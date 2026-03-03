import express from "express"
import orderRoutes from "./interfaces/OrderController.js"

export const  app = express();
app.use(express.json());

app.use("/orders",orderRoutes);

app.listen(8000,()=>{console.log("Server started")})

