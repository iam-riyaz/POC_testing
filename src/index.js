const express =require("express")

const app = express()

app.use(express.json())

app.listen("3000",()=>{
    console.log("listeing to port 3000")
})


app.get("/", (req, res) => {
    res.status(200).send("link is working")
})