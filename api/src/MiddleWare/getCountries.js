const axios = require("axios")

const {Countries, Activities} = require("../db")

const getCountries = async () =>{

    var countriesDB = await Countries.findAll({
        include: {
            model: Activities
        }
    });

    if(countriesDB.length){
        console.log("de la base");
        return countriesDB;
    }
    else{
        console.log("de la api");
        var countriesAPI = await axios.get("https://restcountries.com/v3/all");
        countriesAPI = countriesAPI.data;
        countriesAPI = countriesAPI.map((c) =>{
             return{
                name: c.name.official,
                id : c.cca3,
                flag: c.flags[1],
                continents: c.continents[0],
                capital: (!c.capital) ? "Has no capital" : c.capital[0],
                subregion: c.subregion,
                area: c.area,
                population: c.population
            }
        })

        for(let i = 0; i < countriesAPI.length; i++){
            Countries.create({
                name: countriesAPI[i].name,
                id: countriesAPI[i].id,
                flag: countriesAPI[i].flag,
                continents: countriesAPI[i].continents,
                capital: countriesAPI[i].capital,
                subregion: countriesAPI[i].subregion,
                area: countriesAPI[i].area,
                population: countriesAPI[i].population
            })
        }
        
        return countriesAPI
    }

}



module.exports = {getCountries}