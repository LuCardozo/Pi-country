// import middleware
import { sortByNamefunction } from "../MiddleWare/SortByName";
import { sortByPopulationfunction } from "../MiddleWare/SortByPopulation";
import { filterByContinentsfunction } from "../MiddleWare/FilterByContinents";
import { filterByActivityfunction } from "../MiddleWare/FitlerByActivity";

const initialState = {
    Countries: [],
    AllCountries: [],
    countriesfilter: [],
    CountryDetail: [],
    Activities: []
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        
        case "GET_ALL_COUNTRIES":
            return{
                ...state,
                Countries: action.payload,
                AllCountries: action.payload
            }
        case "GET_COUNTRY_DETAIL":
            return{
                ...state,
                CountryDetail: action.payload
            }
            case "GET_ALL_ACTIVITIES":
                return{
                    ...state,
                    Activities: action.payload
                }
        case "SORT_BY_NAME":
                const sortByName = sortByNamefunction(state.Countries, action.payload);
                console.log(sortByName)
                return{
                    ...state,
                    Countries: sortByName,
                    
                }
        case "SORT_BY_POPULATION": 
                const sortByPopulation = sortByPopulationfunction(state.Countries, action.payload);
                return{
                    ...state,
                    Countries: sortByPopulation
                }
        case "normal":
            return{
                ...state,
                Countries: state.AllCountries,
                CountryDetail: []
            }

        case "FILTER_BY_CONTINENTS":
            const filterCountries = filterByContinentsfunction(state.AllCountries, action.payload)
            return{
                ...state,
                Countries: filterCountries
            }

        case "FILTER_BY_ACTIVITY":
            const filterByActivity = filterByActivityfunction(state.AllCountries, action.payload)
            return{
                ...state,
                Countries: filterByActivity
            }
        case "SEARCH_COUNTRY":
            return{
                ...state,
                Countries: action.payload
            }
        
        default:
            return{
                ...state
            }
    }
}