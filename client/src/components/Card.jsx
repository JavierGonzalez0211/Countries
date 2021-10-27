import React from "react";
import {Link} from "react-router-dom"
import sty from '../Styles/Card.module.css'

export default function Card (p){
    const {population} = p;
    const sep_pop = population.toLocaleString().replace(/,/g," ",);
   
    return (
        <div className={sty.card}>
          
               <div >
                   <img className={sty.img} src={p.flag} alt="flag" />
               </div>
               <div className= {sty.detail}>
                   <p> <span className= {sty.country}>Country: </span> </p>
                    <Link to={`/detail/${p.id}`} className = {sty.name}>
                    <h3 className = {sty.name}>{p.name}</h3>
                    </Link>
                   
                    
               </div>
               <div className= {sty.detail}>
                   <p>Continent: </p>
                   {p.continent}

               </div>
               <div className= {sty.detail}>
                   <p>Population: </p>
                   {sep_pop}
               </div>
        </div>
    )

}