import { GET_BY_ACTIVITY } from "./index";

export default function getByActivity (params){
   const {activity, data}= params
        return ({
            type: GET_BY_ACTIVITY,
            payload: {activity,
                lastAction:getByActivity,
                countries:{rows:data},
                
            }
        })
    }