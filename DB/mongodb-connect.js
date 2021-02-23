const mongoose = require('mongoose');
const dbUser = "IvanU";
const dbPass = "DASW";
const dbName = "DBAdopt";
const dbUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.rw09c.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(dbUrl, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=> console.log("Conectado a la base de datos"))
  .catch((err)=> console.log("No conectado, error", err))

module.exports = mongoose;