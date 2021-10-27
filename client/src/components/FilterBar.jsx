import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'

import OrderBy from "./OrderBy";
import getContinent from "../actions/getContinent";
import { orderBy } from "../actions/orderBy";
import { getActivities } from "../actions/getActivities";
import setDirection from '../actions/setDirection'
import getByActivity from "../actions/getByActivity";
import sty from '../Styles/FilterBar.module.css';

export default function FilterBar(){

    const dispatch = useDispatch()
    const allActivities = useSelector(state => state.activities)
    const lastAction = useSelector (state => state.lastAction)
    const params = useSelector (state=> state.params)
    

   let nameActivities = allActivities.map(activity =>activity = activity.name)
   
    useEffect(()=>{
       dispatch(getActivities())

    }, [])


    function handleOnChange(e){
        e.preventDefault()
        let continent = e.target.value
        dispatch(getContinent({continent,page:1}))
    }

    function  handleChangeDirection(e){
        e.preventDefault()
        if (lastAction===orderBy){
            let direction = e.target.value
            let modified_params ={...params,page:1, direction}
        
        dispatch(lastAction(modified_params))
        dispatch(setDirection(direction))
        }    

    }

    function handleActivity(e){
        e.preventDefault()
        let countryActivity = allActivities.filter (activity =>activity.name === e.target.value ).map(activity => activity.countries )
        let activity_params= {activity:e.target.value, data:countryActivity[0]}
        dispatch(getByActivity(activity_params))

    }

    return (
        <div className= {sty.FilterBar}>
            <div className= {sty.OrderDir}> 
               <div className = {sty.OrderBy}>
                    <OrderBy />
               </div>
                <div >
                    <select className = {sty.Direction} onChange={handleChangeDirection}>
                        <option value="ASC">Ascendent</option>
                        <option value="DESC">Descendent</option>
                    </select>

                </div>
                
            </div>
            <div className= {sty.filter}>
                <label className={sty.label}>Filter by</label>
                <div className= {sty.options}>
                <select className= {sty.continent} onChange={handleOnChange}>
                <option value="" >Continent</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Polar">Polar</option>
                </select>
                <select className={sty.activity} onChange = {handleActivity}>
                <option value="" >Activity</option>
                {
                    nameActivities.map(activity=>{
                        return(
                            <option value={activity} key= {activity}>{activity}</option>
                        )
                    })
                }
                </select>
                </div>
            </div>
        </div>
    )
}