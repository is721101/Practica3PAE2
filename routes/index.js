let express = require('express');
const { remove } = require('../DB/animals');
let router = express.Router();
const Joi=require('joi');
const AnimalSchema = require('../DB/animals');
const axios = require('axios');
const userSchema=require('../DB/User');

const schema = Joi.object({
  animalname:Joi.string().min(5).required(),
  breedname:Joi.string(),
  speciesname:Joi.string(),
  animalage: Joi.string().required(),
  basecolour: Joi.string(),

  
});


router.get('/', async function(req, res) {
  AnimalSchema.find().then( animals=>{
    const animalsPromises = animals.map(() => {
      return new Promise((resolve, reject) => {
        axios.get('https://api.thecatapi.com/v1/images/search')
        .then(function({data}) {
          const [cat] = data;
          const {url} = cat;
          resolve(url);
        }).catch(function(error) {
          reject(error);
        });
      });
    });

    Promise.all(animalsPromises)
      .then(function(urls) {
        const animalsWithImage = animals.map((animal, index) => ({...animal, image: urls[index]}));     
        
        res.render('index', { animalsWithImage });
      })
      .catch(function(errors) {
        res.send(`${errors}`)
      });
      
  })
  });

router.get('/:id', (req, res) => {
 
  const {id} = req.params;
  const {url} = req.query;
 
  AnimalSchema.find({id:id}).then( animal=>{
    const properties = Object.keys(animal).map(property => animal[property])
    console.log(properties)
    res.render('info.hbs', {animalname: animal.animalname, properties, image: url})
  
  })
});

router.post('/',async (req,res)=>{
  const resp=req.body;
    const animal = new AnimalSchema({
        id:resp.id,
        animalsname:resp.animalsname,
        breedname:resp.breedname,
        speciesname:resp.speciesname,
        animalsage:resp.animalsage,
        basecolour:resp.basecolour
    });
    const r = schema.validate({animalname,breedname,basecolour,speciesname,animalage});
    if (r.error) return res.status(400).send(result.error.details[0].message);
    const savedAnimal = await animal.save();
    res.status(200).json(savedAnimal);
 
});

router.delete('/:id',async (req, res) => {
  const {id} = req.params;
  try{
    const removedAnimal = await AnimalSchema.remove({id:id});
    res.json(removedAnimal);
  }catch(err){
    res.json({message:err});
  }
});

router.put('/:id',async (req, res) => {
  const {id} = req.params;
  const resp=req.body;
    const animal = new AnimalSchema({
        id:resp.id,
        animalsname:resp.animalsname,
        breedname:resp.breedname,
        speciesname:resp.speciesname,
        animalsage:resp.animalsage,
        basecolour:resp.basecolour
    });
    if (result.error) return res.status(400).send(result.error.details[0].message);
    try{
      const removedAnimal = await AnimalSchema.updateOne({id:id});
      res.json(removedAnimal);
    }catch(err){
      res.json({message:err});
    }
});

router.get('/adopted/:id', (req, res) => {

  const {id} = req.params;
 
  AnimalSchema.find({id:id}).then( animal=>{
    const properties = Object.keys(animal).map(property => animal[property])
    console.log(properties)
   
    res.render('adopt', {animalname: animal.animalname, properties})
  
  })
});
router.get('/adoption/:id', async(req, res) => {
  const {id} = req.params;
  const ownerid = req.query.ownerid;
  userSchema.buscarID(ownerid).then(user=>
    {
      console.log(user);
  if(!user){
    res.status(401).send("Error");
    console.log("Error");
  }

  AnimalSchema.updateOne({id:id},{ $set:{owner:user.name}}).then( _ =>{
    console.log( req.query)
    res.status(200).send(user);
    res.end(); 

  }) 
    }
  );
  


});

module.exports = router;