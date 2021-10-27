import React from "react";
import {  useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import Cards from "./Cards";
import NavBar from "./NavBar";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import sty from '../Styles/Home.module.css';

export default function Home (){

    const dispatch = useDispatch()
    let lastAction = useSelector((state => state.lastAction))
    const params = useSelector (state=> state.params)

    useEffect(()=>{
        dispatch(lastAction(params));
    }, [])

   
    return (
        <div className={sty.home}>
            <div className={sty.NavBar}>
                <NavBar/>
            </div>
            <div className={sty.FilterBar}>
                <FilterBar />
            </div>
            <div className = {sty.Cards}>
                <Cards/>
            </div>    
            <div  className={sty.Pagination}>
                
                <Pagination/>

            </div>       
                        
        </div>
    )

}
