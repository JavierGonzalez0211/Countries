import { GET_COUNTRIES, GET_ACTIVITIES, PAGINATION, DETAIL, GET_BY_NAME,
    GET_CONTINENT,GET_ALL_COUNTRIES, ORDER_BY, RESET_PARAMS, SET_DIRECTION, GET_BY_ACTIVITY } from "../actions";
import { getCountries } from "../actions/getCountries";

const initialState = {
    countries : [], //paginated
    allCountries:[],// none paginated
    activities: [],
    actualPage: 1,
    name:"",
    lastAction: getCountries,
    params:{page:1},
    countryById:{}
}


function rootReducer (state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                lastAction: action.lastAction
                
            }
        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload
            }
        case GET_BY_ACTIVITY:
            let newParams={...state.params,activity: action.payload.activity,data:action.payload.countries.rows }
            return{
                ...state,
                lastAction: action.payload.lastAction,
                countries:action.payload.countries,
                params: newParams
            }
        case PAGINATION:
            let newParams3={...state.params,page: action.payload }
            return{
                ...state,
                params:newParams3
            }
        case DETAIL:
            return{
                ...state,
                countryById: action.payload
                
            }
        case GET_BY_NAME:
            return{
                ...state,
                countries: action.payload,
                params: action.params,
                lastAction: action.lastAction,
            }
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
            }
            case GET_CONTINENT:
                return{
                    ...state,
                    countries: action.payload.countries,
                    lastAction: action.lastAction,
                    params: action.payload.params
                    
                }
            case ORDER_BY:
                return{
                    ...state,
                    countries: action.payload,
                    params: action.params,
                    lastAction: action.lastAction
                }
            case RESET_PARAMS:
                return{
                    ...state,
                    params: {page:1}
                }
            case SET_DIRECTION:
                let newParams2={...state.params,direction: action.payload }
                return{
                    ...state,
                    params:newParams2
                }
        default:
            return state
    }

}

export default rootReducer;
