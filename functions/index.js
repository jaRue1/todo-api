const functions = require("firebase-functions")
const express = require("express")
const cors = require("cors")
const { getTasks, createTasks } = require("./src/tasks")
const app = express()
app.use(cors())
app.get('/tasks',getTasks)
app.post('/tasks',createTasks)
exports.app = functions.https.onRequest(app)
















// app.get("/test", (req, res)=>{
//   res.send('Test Worked')
// })
// exports.app = functions.https.onRequest((req,res) => app (req,res))
