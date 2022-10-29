const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//********************* 
const {getCountries} = require("../MiddleWare/getCountries");
const {getCountryById} = require("../MiddleWare/getCountryById");
const {postActivity} = require("../MiddleWare/postActivity");
const {getActivities} = require("../MiddleWare/getActivities");
const { Countries, Activities } = require('../db');
//*********************
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", async (req, res) =>{
    let {name} = req.query;
    let countries = await getCountries();
    
    try {
        if(name){
            let country = countries.filter((c) => c.name.toLowerCase().includes(name.toLowerCase()));
            console.log(country)
            if(country.length){

                res.send(country);
            }
            else{res.status(404).send("Ese pais no existe");}
            // let country = await Countries.findOne({
            //     where: {
            //         name: name
            //     },
            //     include: Activities
            // })
            // res.send(country);
        }
        else{
            res.send(countries);
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/countries/:id", async (req, res) =>{
    let {id} = req.params;
    try {
        let country = await getCountryById(id);
        res.send(country)
    } catch (error) {
        res.status(400).send(error.message);
    }
    
});

router.get("/activities", async (req, res) =>{
    try {
        let activities = await getActivities();
        res.send(activities);
        
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.post("/activities", async (req, res) =>{
    let {name, difficulty, duration, season, countryId} = req.body;
    try {
        let post = await postActivity(name, difficulty, duration, season, countryId);
        res.send(post);
    } catch (error) {
        res.status(400).send(error.message);
    }
})
module.exports = router;
