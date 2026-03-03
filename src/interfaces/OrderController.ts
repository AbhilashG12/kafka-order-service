import { Router } from "express";
import { createOrderUseCase } from "../infrastructure/di/container.js";

const router = Router();

router.post("/",async(req,res)=>{
    const {id,userId,amount} = req.body;

    const result = await createOrderUseCase.execute({id,userId,amount});

    return res.status(201).json({
            id: result.order.id, 
            status: result.status
        });

})

export default router;