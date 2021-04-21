const admin = require ('firebase-admin')
const serviceAccount = require ('../../credentials.json')

let db;

function connectToFirestore(){
  if (!db) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
  })
  db = admin.firestore()
 }
}

exports.getTasks = (req,res) => {
  connectToFirestore()
  // get all tasks from the db 
  db.collection('tasks').get()
  //then return them
  .then(collection => {
      let ourTasks = []
      collection.forEach(doc => {
        let thisTask = doc.data()
        thisTask.id = doc.id
        ourTasks.push(thisTask)
      })
      res.send(ourTasks)
  })
  .catch(err => res.status(500).send('Error getting tasks: ' + err.message))
}
exports.createTasks = (req,res) => {
  connectToFirestore()
  // new task comes in request body
  const newTask = req.body
  // add that to the database
  db.collection('tasks').add(newTask)
  // then ... v1 return message
  // .then( () => res.send('Task added successfully'))
  // then ... v2 return a list of all tasks
  .then( () => this.getTasks(req,res))
  .catch(err => res.status(500).send('Error creating task: ' + err.message))
}
