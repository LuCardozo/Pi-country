import React from "react";
import { Link } from "react-router-dom";

//import de estilos
import s from "../styles/Card.module.css";

export default function Card({name, id, flag, continents}){



    return(
        <Link to={`/home/${id}`}>
            <div className={s.fondo}>
                <img src={flag} alt="Not found flag" />
                <h1>{name}</h1>
                <h3>  {continents}</h3>
            </div>
        </Link>
    )
}