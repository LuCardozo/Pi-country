//import de dependecias
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import de depencencias
import { getCountries } from "../Redux/actions";
import { sortByName } from "../Redux/actions";
import { sortByPopulation } from "../Redux/actions";
import { filterByContinents } from "../Redux/actions";
import { filterByActivity } from "../Redux/actions";
import { getActivity } from "../Redux/actions";
import { searchCountry } from "../Redux/actions";

//import de componentes
import Card from "./Card";
import Paginado from "./Paginado";

//import de estilos
import st from "../styles/NavBar.module.css";
import s from "../styles/Cards.module.css";

export default function Home(){

const dispatch = useDispatch();

//nos traemos los estados
const allcountries = useSelector((state) => state.Countries);
const activities = useSelector((state) => state.Activities);
const control = useSelector((state) => state.AllCountries);

useEffect(() =>{
    dispatch(getCountries())
    dispatch(getActivity())
},[dispatch]);
//intento de paginado****
const [currentPage, setCurrentPage] = useState(1); // determinamos la pag en la q estamos
const [countriesForPage, setCountriesForPage] = useState(10); // determinamos los country por pagina
const indexOfLastCountry = currentPage * countriesForPage;
// const indexOfFirstCountry = indexOfLastCountry - countriesForPage;
// const currentCountry = allcountries.slice(indexOfFirstCountry, indexOfLastCountry)

const paginado = (pageNumber) =>{
    setCurrentPage(pageNumber);
}

if(indexOfLastCountry === 10){
    var indexOfFirstCountry = 1;
}
else{
    indexOfFirstCountry = indexOfLastCountry - countriesForPage
}

const currentCountry = allcountries.slice(indexOfFirstCountry -1, indexOfLastCountry -1)

// para los ordenamientos
const [Sort, setSort] = useState("");


const handleSortByName = (e) =>{
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setSort(`Sort by ${e.target.value}`);
}

const handleSortByPopulation = (e) =>{
    dispatch(sortByPopulation(e.target.value));
    setCurrentPage(1);
    setSort(`Sort by ${e.target.value}`)
}

// para los filtros

const handleFilterByContinents = (e) =>{
    dispatch(filterByContinents(e.target.value))
    setCurrentPage(1);
    setSort(`Filter by ${e.target.value}`)
}
const handleFilterByActivity = (e) =>{
    dispatch(filterByActivity(e.target.value))
    setCurrentPage(1);
    setSort(`Filter by ${e.target.value}`)
}

//searchbar
const [countryName, setCountryName] = useState("");

const handleInputSearch = (e) =>{
    e.preventDefault();
    setCountryName(e.target.value);

}
const handleSubmit = () =>{
    if(countryName === "") return alert("Write a country name");

    let country = control.filter((c) => c.name.toLowerCase().includes(countryName.toLowerCase()));
    if(!country.length) return alert("Country not Found");

    dispatch(searchCountry(countryName));
    setCurrentPage(1);
}

console.log(allcountries)

    return(
        
        <div>
            <div>
            <Link to="/">
                <button className={st.btn}>&lt;</button>
            </Link>
            <div className={st.titulo}>
                <h4>Countries</h4>
            </div>
            <div className={st.order}>
                <div className={st.searchbar}>
                    <input type="text" placeholder="Country"  onChange={handleInputSearch} />
                    <button type="submit" onClick={handleSubmit} className={st.filter} >Search</button>
                </div>
                <div>
                <select className={st.filter} defaultValue={"-"} onChange={handleFilterByContinents}>
                        <option value="-" disabled hidden>by continents</option>
                        <option value="-">All</option>
                        <option value="Asia">Asia</option>
                        <option value= "Europe">Europe</option>
                        <option value="Africa">Africa</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Antarctica">Antarctica</option>
                    </select>
                    <select className={st.filter} defaultValue={"-"} onChange={handleFilterByActivity}>
                        <option disabled hidden value="-">by activities</option>
                        <option value="-">All</option>
                        {
                            activities.length && activities.map((a, index) =>{
                                return(
                                        <option key={index} value={a.name} >{a.name}</option>
                                )
                            })
                        }

                    </select>
                </div>
                <div>
                    <select className={st.filter} defaultValue={"-"} onChange={handleSortByName} >
                        <option value="-" disabled hidden > Sort by name </option>
                        <option value= "asc" >A-Z</option>
                        <option value="desc" >Z-A</option>
                    </select>
                    <select className={st.filter} defaultValue={"-"} onChange={handleSortByPopulation} >
                        <option value="-" disabled hidden > Sort by population </option>
                        <option value="major" >Major population</option>
                        <option value="minus" >Minor population</option>
                    </select>
                </div>
            </div>
            <div className={st.centrao}>
                    <Link to="/create">
                        <button className={st.create}>Create Activity for country</button>
                    </Link>
                </div>
            </div>        
            <div className={s.orderc}>
                {
                    currentCountry && currentCountry.map((c) =>{
                        return(
                            <div key={c.id}>
                                <Card name={c.name} id={c.id} flag={c.flag} continents={c.continents} />
                            </div>
                        )
                    })
                }
            </div>
            <div>
                {
                    currentCountry.length >= 9 && (<Paginado countriesForPage={countriesForPage} 
                        allcountries={allcountries.length}  
                        paginado={paginado}    />)
                }
            </div>
        </div>
    )
} 