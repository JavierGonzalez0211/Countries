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
                <p className= {sty.label}>Country:</p>
                <h3 className= {sty.content}>{data.name}</h3>             
            </li>
            <li>
            <p className= {sty.label}>Country Id:</p>
            <h4 className= {sty.content}>{data.countryId}</h4>
            </li>
            <li>
            <p className= {sty.label}>Capital:</p>
            <h4 className= {sty.content}>{data.capital}</h4>
            </li>
            
            <li>
                <p className= {sty.label}>Continent:</p>
               <h4 className= {sty.content}>{data.continent}</h4> 
            </li>
            <li>
            <p className= {sty.label}>Subregion:</p>
                <h4 className= {sty.content}>{data.subregion}</h4>
            </li>
            <li>
            <p className= {sty.label}>Area:</p>
            <h4 className= {sty.content}>{sep_area} Km2</h4>
            </li>
            <li>
            <p className= {sty.label}>Population:</p>
            <h4 className= {sty.content}>{sep_pop}</h4>
            </li>

            </ul>
            
            <ul className={sty.activities}>
                <h1>Activities:</h1>
            {data.activities?.map(e =>{
                return(
                    <ul className={sty.activity} key = {e.id}>
                    <li>
                    <p className= {sty.label}>Activity name:</p>
                    <h3 className= {sty.content}>{e.name}</h3>
                    </li>
                    <li>
                    <p className= {sty.label}>Difficulty:</p>
                    <h3 className= {sty.content}>{e.difficulty}</h3>
                    </li>
                    <li>
                    <p className= {sty.label}>Duration:</p>
                    <h3 className= {sty.content}>{e.duration}</h3>
                    </li>
                    <li>
                    <p className= {sty.label}>Season:</p>
                    <h3 className= {sty.content}>{e.season}</h3>
                    </li>
                    
                    </ul>
                    
            )})}
            </ul>
            </div>
        <div className={sty.btn}>
            <button  onClick={handleOnclick}>Close</button>
        </div>
    </div>
)}

