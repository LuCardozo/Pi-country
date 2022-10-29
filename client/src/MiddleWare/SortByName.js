


    export function sortByNamefunction(countries, payload){
        let allcountries = countries;
        if(payload === "-") return allcountries;
        if(payload === "asc"){
            allcountries.sort((a,b) =>{
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            })
        }
        if(payload === "desc"){
            allcountries.sort((a,b) =>{
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            })
        }
        
        return allcountries;
    }