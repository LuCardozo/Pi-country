const { Countries, Activities } = require("../db")



const getCountryById = async (id) =>{
    let country = await Countries.findAll({
        where: {
            id: id
        },
        attributes: ["name", "id", "flag", "continents", "capital", "subregion", "area","population"],
        include: {
            model: Activities
        }
    })
    if(!country.length) throw Error("ID no valido");
    return country;
}

module.exports = {getCountryById}