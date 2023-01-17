const express =require("express")
const axios = require("axios")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const app = express()

dotenv.config()
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())



app.listen("3000",()=>{
    console.log("listeing to port 3000")
})


app.get("/", (req, res) => {
    res.status(200).send("link is working")
})

app.get("/test", (req, res) => {
    res.status(200).send("path is working")
})




app.get('/webhook', function(req, res) {
    if (
      req.query['hub.mode'] == 'subscribe' &&
      req.query['hub.verify_token'] == process.env.CALLBACK_VERIFY_TOKEN
    ) {
      res.send(req.query['hub.challenge']);
    } else {
      res.sendStatus(400);
    }
  });
  
  app.post("/webhook", function (request, response) {
    console.log('Incoming webhook: ' + JSON.stringify(request.body));
    const myData=JSON.stringify(request.body)
    response.status(200).send(myData)
  });








app.post("/send_message", (req, res) => {
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
        text: { body: `Hello, ${req.name}, ${req.message}` },
      },
    })
      .then(() => {
        res.send("message sent");
      })
      .catch(() => {
        res.send("not sent");
      });
  });