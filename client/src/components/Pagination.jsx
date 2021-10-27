import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { pagination } from "../actions/pagination";
import getByActivity from "../actions/getByActivity"
import sty from '../Styles/Pagination.module.css'




export default function Pagination (){
    const actual = Number.parseInt(useSelector(state=> state.params.page ))
    const lastAction = useSelector(state => state.lastAction)
    const params = useSelector(state=> state.params)
    const countries = useSelector(state=> state.countries )
    const dispatch = useDispatch();
    let previous = actual -1;
    let next = actual +1;


        function handleClick(e){
            e.preventDefault()
            dispatch(pagination(e.target.value))
            let modified_params = {...params, page:e.target.value}
            dispatch (lastAction(modified_params))
        }
   
        return (
        
                <div className= {sty.pagination}>

                        <button name = 'previous' value= {previous} onClick={handleClick} disabled = {actual === 1} >previous</button>
                        <h3 className={sty.numPage}>{actual}</h3>
                        <button value= {next} onClick={handleClick} disabled = {actual === countries.pages|| lastAction === getByActivity} >next</button>
                        
                
                </div>

    ) 
  }
