import axios from "axios";
import { ORDER_BY } from "./index";


export function orderBy ( params){
    const { page,order_by,direction } = params
    return async function (dispatch){
        var data = await axios (`http://localhost:3001/countries/order?name=&page=${page}&orderby=${order_by}&direction=${direction}`)
        return dispatch ({
            type: ORDER_BY,
            lastAction: orderBy,
            params,
            payload: data.data,
            
        })
    }
}
