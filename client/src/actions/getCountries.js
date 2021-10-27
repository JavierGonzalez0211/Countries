import axios from "axios";
import { GET_COUNTRIES } from "./index";

export function getCountries ( params){
    let {page}= params || 1
    return async function (dispatch){
        var data = await axios (`http://localhost:3001/countries?page=${page}`)
        return dispatch ({
            type: GET_COUNTRIES,
            lastAction: getCountries,
            payload: data.data
        })
    }
}