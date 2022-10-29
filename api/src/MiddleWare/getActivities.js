const { Activities } = require("../db")


const getActivities = async () =>{
    let activities = await Activities.findAll();
    if(!activities.length) throw Error("No hay actividades");
    return activities;
}

module.exports = {getActivities}