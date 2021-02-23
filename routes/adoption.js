let express = require('express');
let router = express.Router();
const animalSchema = require('../DB/animals');
const usersSchema = require('../DB/User');

router.get('/:_id', async(req, res) => {
const {_id} = req.params;
  const owner =parseInt(req.query.ownerid);
  let name_owner=""
  
  if (req.query){

    usersSchema.findOne({ownerid:owner}).then(user =>{
    name_owner = user.name;
    })
    await animalSchema.updateOne({_id:_id},{$set:{owner:name_owner}}).then(_=>{
        console.log("Lito")
      res.statusCode = 302;
      res.setHeader("Location", "http://localhost:3000/animals"); 
    }).catch(function(error) {
      res.send(error);
    });
  }
});

module.exports = router;