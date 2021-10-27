import React from "react";
import {  useState } from "react";
import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import sty from '../Styles/NavBar.module.css';


import { getCountries } from "../actions/getCountries";
import { pagination } from "../actions/pagination";
import { getByName } from "../actions/getByName";
import {resetParams} from "../actions/resetParams"


export default function NavBar (){
    const [input, setInput] = useState("");
    const dispatch = useDispatch()
   
    // Reset Function
    function handleClick(e){  
        e.preventDefault();
        dispatch(resetParams())
        dispatch(getCountries());
    }

    function handleInput(e){         
        setInput(e.target.value);
    }
    
    function handleName() {
        dispatch(pagination(1));
        dispatch(getByName({name:input}));        
        setInput("");
    }
    

    return (
        <div className={ sty.NavBar}>
            <h1>AROUND THE WORLD</h1>
            
            {/* <Link to= '/activityCreate' className={sty.link}>
                Create Activity
            </Link> */}

            <Link to= '/activityCreate' >
                <button className={sty.link}>
                    Create Activity
                </button>
                
            </Link>

            <div className={sty.search}>
                <input className={sty.search} type="text" placeholder="search country by name" onChange={handleInput} value={input}/>
                <button  onClick={() => {handleName()}}> Search</button>
            </div>
            
            <button className={sty.reload} onClick ={(e)=>{handleClick(e)}}>
                Reload
            </button>
            

           
        </div>
    )

}
