const express =require("express")
const axios = require("axios")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(express.json())

app.listen("3000",()=>{
    console.log("listeing to port 3000")
})


app.get("/", (req, res) => {
    res.status(200).send("link is working")
})

app.get("/test", (req, res) => {
    res.status(200).send("path is working")
})


app.post("/test", (req, res) => {
    axios({
      method: "POST",
      url: `https://graph.facebook.com/v15.0/${process.env.PHONE_NUMBER_ID}/messages`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VERIFY_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        to: "919399319620",
        type: "text",
        text: { body: "this is a custom test message v2.0.0" },
      },
    })
      .then(() => {
        res.send("message sent");
      })
      .catch(() => {
        res.send("not sent");
      });
  });