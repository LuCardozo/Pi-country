

export function filterByActivityfunction(countries, payload){
    let countriesfilter = countries;
    let filtrados = [];
    if(payload === "-") return countriesfilter;
    for(let i = 0; i < countriesfilter.length; i++){
        for(let j = 0; j < countriesfilter[i].activities.length; j++){
            if(countriesfilter[i].activities[j].name === payload){
                filtrados.push(countriesfilter[i]);
            }
        }
    }
    return filtrados;
}