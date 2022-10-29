import axios from "axios";
// action types
const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
const SORT_BY_NAME = "SORT_BY_NAME";
const SORT_BY_POPULATION = "SORT_BY_POPULATION";
const FILTER_BY_CONTINENTS = "FILTER_BY_CONTINENTS";
const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
const SEARCH_COUNTRY ="SEARCH_COUNTRY";
//**************** actions */
// get countries
export function getCountries(){
    return async (dispatch) =>{
        let countries = await axios.get("http://localhost:3001/countries");
        return dispatch({
            type: GET_ALL_COUNTRIES,
            payload: countries.data
        })
    }
}
// get detail
export function getCountryDetail(id){
    return async (dispatch) =>{
        try {
            let country = await axios.get(`http://localhost:3001/countries/${id}`);
            return dispatch({
                type: GET_COUNTRY_DETAIL,
                payload: country.data
            })
            
        } catch (error) {
            console.log(error.response.data);
        }
    }
}
// get activity
export function getActivity(){
    return async(dispatch) =>{
        try {
            let activities = await axios.get("http://localhost:3001/activities")
            return dispatch({
                type: GET_ALL_ACTIVITIES,
                payload: activities.data
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }
}
// buscar por name
export function searchCountry(name){
    return async (dispatch) =>{
        try {
            let country = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: SEARCH_COUNTRY,
                payload: country.data
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }
}
//post activity
export function postActivity(data){
    return async (dispatch) =>{
        try {
            let response = await axios.post("http://localhost:3001/activities", data);
            return response
        } catch (error) {
            console.log(error.response.data)
        }
    }
}
// ordenamiento
export function sortByName (payload){
    
        try {
            return {
                type: SORT_BY_NAME,
                payload
            }
        } catch (error) {
            console.log(error)
        }
    
}
export function sortByPopulation (payload){
    try {
        return{
            type: SORT_BY_POPULATION,
            payload
        }

    } catch (error) {
        console.log(error)
    }
}
export function normal(){
    return {
        type: "normal"
    }
}
// filtros
export function filterByContinents(payload){
    try {
        return{
            type: FILTER_BY_CONTINENTS,
            payload
        }
    } catch (error) {
        console.log(error)
    }
}
export function filterByActivity(payload){
    try {
        return{
            type: FILTER_BY_ACTIVITY,
            payload
        }
    } catch (error) {
        console.log(error)
    }
}

