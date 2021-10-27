import React from "react";
import {useDispatch, useSelector} from 'react-redux'

import { orderBy } from "../actions/orderBy";
import { pagination } from "../actions/pagination";
import sty from '../Styles/FilterBar.module.css';

export default function OrderBy(){
    const actual = useSelector(state=>state.actualPage)
    const dispatch = useDispatch();



    function handleOnChange(e){
        dispatch (pagination(1))
        let params = {
            name:'',
            page: actual,
            order_by: e.target.value,
            direction: 'ASC'
        }
        dispatch (orderBy(params))
    }



    return(
        <div>
                <select className = {sty.OrderBy} onChange={handleOnChange}>
                    <option value="" >Order_by</option>
                    <option value="name">Name</option>
                    <option value="population">Population</option>
                </select>
        </div>
    )
}