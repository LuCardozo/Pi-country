

export function filterByContinentsfunction(countries, payload){
    let countriesfilter = countries
    if(payload === "-") return countriesfilter;
    countriesfilter = countriesfilter.filter((c) =>{
        return c.continents === payload
    })
    return countriesfilter
}