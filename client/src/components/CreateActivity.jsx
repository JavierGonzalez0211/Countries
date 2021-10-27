import React, { useState } from 'react';
import {  useEffect } from "react";
import {useDispatch, useSelector, } from'react-redux';
import { useHistory} from 'react-router-dom';
import postActivity from '../actions/postActivity';
import getAllCountries from '../actions/getAllCountries';
import sty from '../Styles/CreateActivity.module.css'

// export default function ActivityCreate(){
export default function CreateActivity(){
// let style ={} // borrar esta linea cuando se creen los estilos
    const allCountries = useSelector((state) => state.allCountries) 
    allCountries.sort((a, b) => (a.name > b.name) ? 1 : -1);   
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(()=>{
        dispatch (getAllCountries())
        
        

    }, [dispatch])

    const [values,setValues] = useState({
        name:"",
        difficulty:"1",
        duration:"",
        season:"summer",
        countries:[]
    })

    const onSubmit = (e) =>{
        e.preventDefault()
        if(values.name) {
            dispatch(postActivity(values))
            setValues({
                name:"",
                difficulty:"1",
                duration:"",
                season:"summer",
                countries:[]
            })
        } else {
            alert("Name is require")
        }

    }

    const handleOnChange = (e)=>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleOnChangeSelect = (e)=>{
        if(values.countries.includes(e.target.value)){
            setValues({
                ...values,
                countries: values.countries.filter(c=> c !== e.target.value)
            })
        }else{
            setValues({
                ...values,
                countries: [...values.countries, e.target.value]
            })
        }

    }

    function handleOnclick(){
        history.goBack()
        }


    return (
        <div className={sty.Container}>
        <div className={sty.cont}>
            <div className={sty.title}><h1 >Create Activity</h1></div>
            <form className={sty.form} onSubmit={onSubmit}>

                <div className={sty.item}>
                <label htmlFor="">Name :</label>
                <input name="name" value={values.name} onChange={handleOnChange}/>
                </div>

                <div className={sty.item}>
                <label htmlFor="">Difficulty : </label>
                <select className={sty.select} name="difficulty" onChange={handleOnChange}>
                    <option value="1"> 1 </option> 
                    <option value="2"> 2 </option> 
                    <option value="3"> 3 </option> 
                    <option value="4"> 4 </option> 
                    <option value="5"> 5 </option> 
                </select>
                </div>

                <div className={sty.item}>
                <label htmlFor="">Duration : </label>
                <input name="duration" value={values.duration} onChange={handleOnChange}/>
                </div>

                <div className={sty.item}>
                <label htmlFor="">Season : </label>
                <select className={sty.select} name="season" onChange={handleOnChange}>
                    <option value="summer"> Summer </option> 
                    <option value="autumn"> Autumn </option> 
                    <option value="winter"> Winter </option> 
                    <option value="spring"> Spring </option> 
                </select>
                </div>

                <div className={sty.item}>
                <label htmlFor="">Countries : </label>
                <select className={sty.selectCountry} onChange={handleOnChangeSelect} name="countries" size='8' multiple="multiple">
                    <optgroup >
                    {
                        allCountries.length &&  allCountries.map((c)=> <option key={c.id} value={c.countryId}>{c.name}</option>)
                    }
                    </optgroup>
                </select>
                </div>

                <div className={sty.item} className={sty.btn}>
                <button  type="submit" >Submit</button>
                </div>
                        
            </form>
            <div className={sty.link}>
            <button className={sty.btnBack} onClick={handleOnclick}>Back</button>
            </div>
            
        </div>
        </div>
    )
};