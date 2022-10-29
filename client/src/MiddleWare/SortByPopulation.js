

export function sortByPopulationfunction(countries, payload){
    let allcountries = countries;
    if(payload === "-") return allcountries;

    if(payload === "major"){
        allcountries.sort((a,b) =>
        b.population - a.population
        )
    }
    if(payload === "minus"){
        allcountries.sort((a,b) =>
        a.population - b.population
        )
    }
    return allcountries;
}