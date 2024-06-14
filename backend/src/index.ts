import express, { NextFunction, Request, Response } from "express"
import FeedBackRouter from "./routes/feedback"
import cors from "cors"

const app= express()

app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
}))

app.get("/",(req,res)=>{
    res.json({message:"Server is running."})
})

app.use("/api/v1/feedback", FeedBackRouter);

app.listen(4000,()=>{
    console.log("Express running on 4000")
})
