const admin = require("firebase-admin")
const serviceAccount = require("../../credentials.json")

let db

function connectToFirestore() {
  if (!db) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    db = admin.firestore()
  }
}
exports.returnTasks = (callback) => {
  connectToFirestore()
  db.collection("tasks")
    .get()
    //then return them
    .then((collection) => {
      let ourTasks = []
      collection.forEach((doc) => {
        let thisTask = doc.data()
        thisTask.id = doc.id
        ourTasks.push(thisTask)
      })
      callback(ourTasks)
    })
    .catch((err) => {
      callback ("Error getting tasks: " + err.message)
    })
}

exports.getTasks = (req, res) => {
  connectToFirestore()
   this.returnTasks(ourTasks => {
     res.set("Cache-Control", "public, max-age=30, s-maxage=120")
     res.send(ourTasks)
   })
}
exports.createTasks = (req, res) => {
  connectToFirestore()
  // new task comes in request body
  const newTask = req.body
  // add that to the database
  db.collection("tasks").add(newTask)
  .then(() => {
    this.returnTasks(ourTasks => {
      res.send(ourTasks)
    })
  })
    .catch((err) => res.status(500).send("Error creating task: " + err.message))
}
