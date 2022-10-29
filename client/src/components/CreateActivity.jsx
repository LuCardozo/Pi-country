//import de dependencias necesarias
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import de actions
import { getActivity, postActivity } from "../Redux/actions";
import {getCountries} from "../Redux/actions"

//import de estilos
import s from "../styles/CreateActivity.module.css";

function validate(input){
    let error = {};
    if(!input.name) error.name = "Name is Required";
    if (/[^A-Za-z0-9 ]+/g.test(input.name)) error.name = "Activity cannot have special characters";
    if(input.difficulty < 1 || input.difficulty > 5) error.difficulty = "Only values ​​between 1 and 5";
    if(!input.season) error.season = "Season is Required";
    if(!input.duration) error.duration = "Duration is required";
    if(!input.countryId.length) error.countryId = "You must select at least one country";
    return error;
}


export default function CreateActivity(){
    const dispatch = useDispatch();

    let countries = useSelector((state) => state.Countries);
    

    const [error, setError] = useState({});


    const season = ["spring", "autumn", "summer", "winter"];
    useEffect(() =>{
        dispatch(getCountries())
        dispatch(getActivity())
    },[dispatch]);

    const [input, setInput] = useState({
        name: "",
        difficulty: 0,
        duration: "",
        season: "",
        countryId: [],
    });

    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelectSeason = (e) =>{
        setInput({
            ...input,
            season: e.target.value
        })
        setError(validate({
            ...input,
            season: e.target.value
        }))
    }
    const handleSelectCountry = (e) =>{
        e.preventDefault();
        setInput({
            ...input,
            countryId: [...new Set([...input.countryId, e.target.value])]
        })
        
        setError(validate({
            ...input,
            countryId: [...input.countryId, e.target.value]
        }))
    }

    const handleCountryDelete = (e) =>{
        setInput({
            ...input,
            countryId: input.countryId.filter((c) =>{
                return c !== e.target.value
            })
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countryId) {
            return alert ('Complete the form correctly before sending it')
        }
        if(!input.countryId.length) return alert("Select a country")
        dispatch(postActivity(input));
        alert("activity created");
        setInput({
            name: "",
            difficulty: 0,
            duration: "",
            season: "",
            countryId: []
        })

    }
    const handleReset = (e) =>{
        e.preventDefault();
        setInput({
            name: "",
            difficulty: 0,
            duration: "",
            season: "",
            countryId: [],
            countryName: []
        })
    }

    console.log(input)


    return(
        <div className={s.todo}>
            <Link to="/home">
                <button className={s.btn}>&lt;</button>
            </Link>
            <h1 className={s.titulo}>Create your activity for yours holidays</h1>
            <br/>
            <div className={s.nose}>
            <form onSubmit={handleSubmit}>
                <label>Name of activity</label>
                <input type="text" name="name" value={input.name} onChange={handleChange} />
                {
                    error.name && (<p>{error.name}</p>)
                }
                <label>Difficulty</label>
                <input type="number" name="difficulty" min="0" max="5" value={input.difficulty} onChange={handleChange} />
                {
                    error.difficulty && (<p>{error.difficulty}</p>)
                }
                <label>Duration</label>
                <input type="text" name="duration" value={input.duration} onChange={handleChange} />
                {
                    error.duration && (<p>{error.duration}</p>)
                }
                <div className={s.selecter}>
                    <label>Season</label>
                    <select className={s.selectores} defaultValue={"-"} onChange={handleSelectSeason} >
                        <option disabled hidden value="-">Select</option>
                        {
                            season.map((s, index) =>{
                                return(
                                    <option key={index} value={s}>{s}</option>
                                )
                            })
                        }
                    </select>
                        {
                            error.season && (<p>{error.season}</p>)
                        }
                    <label>Countries</label>
                    <select className={s.selectores} defaultValue={"-"} onChange={handleSelectCountry} >
                    <option disabled hidden value="-">Select</option>
                        {
                            countries.map((c) =>{
                                return(
                                    <option key={c.id}  value={c.id} > {c.name}
                                    </option>
                                )
                            })
                        }
                        
                    </select>
                    {
                        error.countryId && (<p>{error.countryId}</p>)
                    }
                </div>
                <div>
                    <button className={s.submiter} type="submit"  >Create!</button>
                    <button className={s.submiter} type="reset" onClick={handleReset} >Reset </button>
                </div>
            </form>
            <div className={s.pre}>
                <div className={s.margen} >
                    <h2>Name: {input.name}</h2><br/>
                    <h2>Difficulty: {input.difficulty}</h2><br/>
                    <h2>Duration: {input.duration}</h2><br/>
                    <h2>Season: {input.season}</h2><br/>
                    <div>
                        <h3>Countries:</h3>
                            <div className={s.country} >
                                {
                                    input.countryId && input.countryId.map((c, index) =>{
                                        return(
                                            <div className={s.countrySelected}>
                                                <div className={s.boton} >
                                                    <button key={index} className={s.btndel} onClick={handleCountryDelete} value={c} >X</button>
                                                </div>
                                                {c}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}