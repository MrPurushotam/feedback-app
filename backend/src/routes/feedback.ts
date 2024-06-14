import { Router } from "express";
import rateLimit from "express-rate-limit"

const router = Router()


const limiter=rateLimit({
    windowMs:10*1000,
    max:1,
    message:{
        error:"Too many requests sent, Please try again later."
    },
    standardHeaders:true,
    legacyHeaders:false
})

interface memory {
    name: string,
    feedback: string,
    time: Date
}

const MemoryStorage: memory[] = []

router.post("/review",limiter, (req, res) => {
    try {
        const object = req.body
        if (!object.feedback || !object.name) {
            return res.json({ message: "Fields can't be empty.", success: false })
        }
        object["time"] = Date.now()
        MemoryStorage.push(object)
        res.json({ message: "Feedback Saved.", success: true })
    } catch (error: any) {
        console.log(error.message)
        res.json({ message: "Internal Error occured.", success: false })
    }
})

router.get("/review/:range/:start?/:end?", (req, res) => {
    try {
        const range: string = String(req.params.range)
        let data;
        if (range === "all") {
            data = MemoryStorage
            return res.json({ message: `Feedback list generated.`, feedbacks: data, success: true })
        } else if (range === "specific") {
            const start: number = Number(req.params.start) || 0
            const end: number = Number(req.params.end) || 10
            data = MemoryStorage.slice(start, end)
            return res.json({ message: `Feedback generated from ${start + "-" + end} `, feedbacks: data, success: true })
        } else {
            return res.json({ message: "Invalid request sent.", success: false })
        }
    } catch (error: any) {
        console.log("Error occured ", error.messsage)
        return res.json({ message: "Internal error occured.", success: false })
    }
})

export default router;