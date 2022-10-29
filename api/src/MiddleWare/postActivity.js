const { Activities, Countries } = require("../db")



const postActivity = async (name, difficulty, duration, season, countryId) =>{
    if(!(name && difficulty && duration && season && countryId)) throw Error("Missing data")

    const activityCreated = await Activities.create({
        name,
        difficulty,
        duration,
        season
    });

    for(let i = 0; i < countryId.length; i++){
        let prueba = await Countries.findAll({
            where: {
                id: countryId[i]
            },
            attributes:["name", "id", "flag", "continents", "capital", "subregion", "area","population"]
        });
        activityCreated.addCountries(prueba);
    }
    return activityCreated;
}

module.exports = {postActivity}