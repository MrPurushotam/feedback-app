import express, { NextFunction, Request, Response } from "express"
import FeedBackRouter from "./routes/feedback"
import cors from "cors"
import rateLimit from "express-rate-limit"

const app= express()

const limiter=rateLimit({
    windowMs:10*1000,
    max:1,
    message:{
        error:"Too many requests sent, Please try again later."
    },
    standardHeaders:true,
    legacyHeaders:false
})

app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
}))

app.get("/",(req,res)=>{
    res.json({message:"Server is running."})
})

app.use("/api/v1/feedback", limiter, FeedBackRouter);

app.listen(4000,()=>{
    console.log("Express running on 4000")
})
