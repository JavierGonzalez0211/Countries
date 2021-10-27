import axios from "axios";
import { GET_CONTINENT } from "./index";

export default function getContinent (params ){
    let {continent} = params
    let {page}= params || 1
    return async function (dispatch){
        var data = await axios (`http://localhost:3001/countries/continent?continent=${continent}&page=${page}`)
   
        return dispatch ({
            type: GET_CONTINENT,
            lastAction: getContinent,
            payload: {
                params:{page,continent},                
                countries:data.data
        },
    })
}
}
