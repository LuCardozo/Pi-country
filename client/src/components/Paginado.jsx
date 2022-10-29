import React from "react";


import s from "../styles/Paginado.module.css";

export default function Paginado({countriesForPage, allcountries, paginado}){
    const pageNumber = [];
    for(let i = 1; i <= Math.ceil(allcountries/countriesForPage); i++){
        pageNumber.push(i)
    }
    return(
        <div className={s.paginado}>
            {
                pageNumber && pageNumber.map((c, index) =>{
                    return(
                        <div key={index}  >
                            <h5 className={s.item} onClick={() =>{paginado(c)}} >{c}</h5>
                        </div>
                    )
                }) 
            }
        </div>
    )
}