import React from "react";
import { useSelector} from 'react-redux'
import Card from './Card';
import Pagination from "./Pagination";
import sty from '../Styles/Cards.module.css'


export default function Cards (){

    const allCountries = useSelector(state =>  state.countries)
        
    const data = allCountries.rows
   
    return (
        <div className= {sty.cardsContainer}>
            <div className={sty.cards}>
            {data?.map(data=>{
                return (<Card key = {data.countryId} id={data.countryId} flag = { data.flag} name = {data.name} continent = {data.continent} population = {data.population}/>)
            })}
            </div>
            {/* <div >
                
                <Pagination/>

            </div> */}

            
        </div>
    )

}
