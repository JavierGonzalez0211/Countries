import { SET_DIRECTION } from "./index";

export default function setDirection (direction){
   
        return ({
            type: SET_DIRECTION,
            payload: direction
        })
    }
