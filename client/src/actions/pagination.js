import { PAGINATION } from "./index";

export function pagination (page){
   
        return ({
            type: PAGINATION,
            payload: page
        })
    }


