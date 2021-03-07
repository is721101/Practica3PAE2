let express = require('express');
const { remove } = require('../DB/animals');
let router = express.Router();
const Joi=require('joi');
const animalSchema = require('../DB/animals');
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
  animalSchema.find().then( animals=>{
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
        
        res.render('index', { animalsWithImage,isLoggedIn:Boolean(req.user) });
      })
      .catch(function(errors) {
        res.send(`${errors}`)
      });
      
  })
  });

router.get('/:id', (req, res) => {
 
  const {id} = req.params;
  const {url} = req.query;
 
  animalSchema.find({id:id}).then( animal=>{
    const properties = Object.keys(animal).map(property => animal[property])
    console.log(properties)
    res.render('info.hbs', {animalname: animal.animalname, properties, image: url,isLoggedIn:Boolean(req.user)})
  
  })
});

router.post('/',async (req,res)=>{
  const resp=req.body;
    const animal = new animalSchema({
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
    const removedAnimal = await animalSchema.remove({id:id});
    res.json(removedAnimal);
  }catch(err){
    res.json({message:err});
  }
});

router.put('/:id',async (req, res) => {
  const {id} = req.params;
  const resp=req.body;
    const animal = new animalSchema({
        id:resp.id,
        animalsname:resp.animalsname,
        breedname:resp.breedname,
        speciesname:resp.speciesname,
        animalsage:resp.animalsage,
        basecolour:resp.basecolour
    });
    const result = schema.validate(animal)
    if (result.error) return res.status(400).send(result.error.details[0].message);
    try{
      AnimalSchema.findOne({id:id}).then(animal =>{
        const removedAnimal = AnimalSchema.actualizarAnimal(animal._id,animal);
        res.json(removedAnimal);
      }).catch(function(error){
        res.send(error);
         });
      
    }catch(err){
      res.json({message:err});
    }
});

router.get('/adopted/:id', (req, res) => {

  const {id} = req.params;
 
  animalSchema.find({id:id}).then( animal=>{
    const properties = Object.keys(animal).map(property => animal[property])
    console.log(properties)
   
    res.render('adopt', {animalname: animal.animalname, properties,isLoggedIn:Boolean(req.user)})
  
  })
});


module.exports = router;