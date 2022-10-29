//dependencias necesarias
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import de actions
import { getCountryDetail, normal } from "../Redux/actions";

//import de estilos
import s from "../styles/CountryDetail.module.css";

export default function CountryDetail(){
    let {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getCountryDetail(id))
    },[dispatch])

    const country = useSelector((state) => state.CountryDetail);
    console.log(country);
    // resetea el state
    const handleReturn = () =>{
        dispatch(normal())
    }

    return(
        <div>
            <Link to="/home">
                <button onClick={handleReturn} className={s.btn}>&lt;</button>
            </Link>
            <div>
                {
                    country && country.map((c) =>{
                        return(
                            <div>

                                <div key={c.id} className={s.contenedor} >
                                    <div>
                                        <img src={c.flag} className={s.flag} alt="Flag not found" />
                                    </div>
                                    <div> 
                                        <h1>{c.name} ({c.id}) </h1>
                                        <div>Information: <br/>
                                            has an area of {c.area} km<sup>2</sup>,<br/>
                                            It is located on the continent of {c.continents},<br/>
                                            Capital: {c.capital}, <br/>
                                            it has a population of {c.population} people,<br/>
                                            Subregion: {c.subregion}.
                                            {
                                                !c.activities.length && 
                                                <div className={s.activinot} >
                                                    <br/>
                                                    There are no activities available
                                                </div>
                                            }                                        
                                        </div>
                                    </div>
                                </div>
                                <div className={s.activicard}> 
                                    {
                                        c.activities && c.activities.map((a, index) =>{
                                            return(
                                                <div key={index} >
                                                    <h2> Activity of tourism:</h2>
                                                    <h3> name:    {a.name}, </h3>
                                                    <h3> duration: {a.duration}, </h3> 
                                                    <h3>level of difficulty: {a.difficulty},</h3>  
                                                    <h3>season: {a.season}</h3>
                                                </div>
                                            )
                                        })   
                                    }

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}