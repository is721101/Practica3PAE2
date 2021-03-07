let express = require('express');
let router = express.Router();
const animalSchema = require('../DB/animals');
const usersSchema = require('../DB/User');

router.get('/:_id', async(req, res) => {
const {_id} = req.params;
  const owner =parseInt(req.query.ownerid);
  let name_owner=""

    usersSchema.findOne({ownerid:owner}).then(user =>{
    name_owner = user.name;
    })
    await animalSchema.findOne({_id:_id}).then(animal=>{
        animal.owner=name_owner==""?animal.owner:name_owner;
        animalSchema.actualizarAnimal(_id,animal);
        res.statusCode = 302;
        res.redirect('/animals') 
    }).catch(function(error){
        res.send(error);
         });
});

module.exports = router;