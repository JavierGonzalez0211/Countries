import React from "react";
import { Link } from "react-router-dom";
import sty from '../Styles/LandingPage.module.css';

export default function LandingPage(){
  
    return(
        <div className = {sty.bkg}>
            <div className = {sty.title}>

            <h1 >around the world</h1>
            </div>
            <Link to = '/home'>
                <button className={sty.btn}>E n t e r</button>
            </Link>
            <div>
                <p className={sty.p}>All the tourist information in one place!</p>
            </div>
        </div>
    )
}

