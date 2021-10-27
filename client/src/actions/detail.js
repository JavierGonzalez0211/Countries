import { DETAIL } from "./index";
import axios from "axios";

export function detail ( id){
    return async function (dispatch){
        var data = await axios (`http://localhost:3001/countries/${id}`)
        return dispatch ({
            type: DETAIL,
            payload: data.data
        })
    }
}


