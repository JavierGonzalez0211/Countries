import axios from "axios";
import { GET_ACTIVITIES } from "./index";

export function getActivities (){
    return async function (dispatch){
        var data = await axios ('http://localhost:3001/activity')
        return dispatch ({
            type: GET_ACTIVITIES,
            payload: data.data
        })
    }
}
