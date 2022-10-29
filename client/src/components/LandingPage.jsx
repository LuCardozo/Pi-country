//import de dependecias
import React from "react";
import { Link } from "react-router-dom";

//import de estilos
import s from "../styles/LandingPage.module.css"

export default function LandingPage(){
    return(
        <div className={s.orderl}>
            <h1 className={s.titulo}>Welcome to the countries wiki</h1>
            <div>
                <Link to="/home">
                    <button className={s.btn}>Join!</button>
                </Link>
            </div>
        </div>
    )
}
