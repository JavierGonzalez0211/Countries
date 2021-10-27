import axios from "axios";
import { GET_ALL_COUNTRIES } from "./index";

export default function getAllCountries ( ){
    return async function (dispatch){
        var data = await axios (`http://localhost:3001/countries/noPaginated`)
        return dispatch ({
            type: GET_ALL_COUNTRIES,
            payload: data.data
        })
    }
}