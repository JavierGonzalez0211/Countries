import axios from "axios";
import { GET_BY_NAME } from "./index";

export function getByName ( params){
    let name = params.name
    let page = params.page || 1
    return async function (dispatch){
        var data = await axios (`http://localhost:3001/countries?name=${name}&page=${page}`)
        return dispatch ({
            type: GET_BY_NAME,
            lastAction: getByName,
            params:{name, page},
            payload: data.data,
            name
        })
    }
}