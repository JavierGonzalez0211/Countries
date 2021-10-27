import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { detail } from "../actions/detail";
import sty from '../Styles/Detail.module.css';

export default function Detail (id){
    const dispatch = useDispatch();
    let history = useHistory();
    

    useEffect(()=>{
        dispatch (detail(id.id));
        
    }, [dispatch,id.id])
    const data = useSelector(state => state.countryById)
    const {area,population} =  data;
    const sep_area = area?.toLocaleString().replace(/,/g," ",);
    const sep_pop = population?.toLocaleString().replace(/,/g," ",);

    function handleOnclick(){
        history.goBack()

    }

    return(
        <div className= {sty.detail}>
        <div className={sty.contents}>
        <ul className={sty.country} key={data.countryId}>
    
            <li className= {sty.img}>
                <img src={data.flag} alt="flag" />
            </li>
            <li>
                <p>Country:</p>
                <h3>{data.name}</h3>             
            </li>
            <li>
            <p>Country Id:</p>
            <h4>{data.countryId}</h4>
            </li>
            <li>
            <p>Capital:</p>
            <h4>{data.capital}</h4>
            </li>
            
            <li>
                <p>Continent:</p>
               <h4>{data.continent}</h4> 
            </li>
            <li>
            <p>Subregion:</p>
                <h4>{data.subregion}</h4>
            </li>
            <li>
            <p>Area:</p>
            <h4>{sep_area} Km2</h4>
            </li>
            <li>
            <p>Population:</p>
            <h4>{sep_pop}</h4>
            </li>

            </ul>
            
            <ul className={sty.activities}>
                <h1>Activities:</h1>
            {data.activities?.map(e =>{
                return(
                    <ul className={sty.activity} key = {e.id}>
                    <li>
                    <p>Activity name:</p>
                    <h3>{e.name}</h3>
                    </li>
                    <li>
                    <p>Difficulty:</p>
                    <h3>{e.difficulty}</h3>
                    </li>
                    <li>
                    <p>Duration:</p>
                    <h3>{e.duration}</h3>
                    </li>
                    <li>
                    <p>Season:</p>
                    <h3>{e.season}</h3>
                    </li>
                    
                    </ul>
                    
            )})}
            </ul>
            </div>
        {/* </ul> */}
        <div className={sty.btn}>
            <button onClick={handleOnclick}>Close</button>
        </div>
    </div>
)}

