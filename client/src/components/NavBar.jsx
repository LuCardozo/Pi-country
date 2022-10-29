import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { sortByName } from "../Redux/actions";

import s from "../styles/NavBar.module.css";


export default function NavBar({paginado}){
    const dispatch = useDispatch();
    const [Sort, setSort] = useState("");

    const handleSort = (e) =>{
        dispatch(sortByName(e.target.value));
        // paginado(1);
        // setSort(`Sort by ${e.target.value}`);
    }
    
    
    setSort();
    return(
        <div>
            <Link to="/">
                <button className={s.btn}>&lt;</button>
            </Link>
                <div className={s.titulo}>
                    <h4>Countries</h4>
                </div>

            <div className={s.order}>
                <div>
                    <input type="text" placeholder="Country" />
                    <button type="submit">Search</button>
                </div>
                <div>
                    <select>
                        <option>by continents</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                    <select>
                        <option>by activities</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
                <div>
                    <select onClick={handleSort} >
                        <option value="-" > - </option>
                        <option value= "asc" >A-Z</option>
                        <option value="desc" >Z-A</option>
                    </select>
                    <select>
                        <option>Major population</option>
                        <option>Minor population</option>
                    </select>
                </div>
            </div>
            <Link to="/create">
                <button className={s.create}>Create Activity for country</button>
            </Link>
        </div>
    )
}