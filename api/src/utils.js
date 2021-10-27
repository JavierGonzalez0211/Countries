const {Country, Activity, Op} = require ("./db")

let limit;
let min = 9;
let max = 10;
let skip;

function paginationParams (page){
    page = isNum(page, 1);

    if (page ===1){
        
            limit = min
            skip = 0
    }else{
        
        limit = max
        skip = ((page-1) * limit)-1
        
    }

}



async function findAllDB(name, page, orderby, direction){
    paginationParams(page)

    direction = direction || 'ASC';
   

    let conditions = {attributes:["countryId", "name", "flag", "continent", "population"], 
    include:[{model: Activity, attributes: ['name', 'id' ], through:{attributes:[]}}], offset:skip, limit,
    
    };

    if (orderby){
        conditions = {...conditions, order: [[orderby, direction]]}
    }


    if (name && name!== "undefined"){
        conditions = {where:{name:{[Op.iLike]:`%${name}%`}},...conditions}
    }
    let result = await Country.findAndCountAll(conditions)
    let pages = Number.parseInt(result.count/max)+1
    result = {pages, ...result}

    return result
}

async function order (name,page, orderby, direction){
    
    orderby = Country.rawAttributes.hasOwnProperty(orderby) ? orderby : 'name';
    if (direction !== 'ASC' && direction !== 'DESC'){
        direction = 'ASC'
    }
    result = await findAllDB (name, page, orderby, direction)
    return result

}

async function filterContinent(continent, page){
    paginationParams(page)
   

    let conditions = {where:{continent:{[Op.iLike]:`%${continent}%`}}, attributes:["countryId", "name", "flag", "continent", "population"], 
    include:[{model: Activity, attributes: ['name', 'id' ], through:{attributes:[]}}],order: [["name", "ASC"]], offset:skip, limit,
    
    };

    let result = await Country.findAndCountAll(conditions)
    let pages = Number.parseInt(result.count/max)+1
    result = {pages, ...result}
    return result

}



async function allActivities(){
 
let conditions = {include:[{model: Country}]}
    let result = await Activity.findAll(conditions)
    
    return result

}
/**
 * This function returns the value recived in first param,
 *  if it is a positive number, or a default value.
 * negative number turns to psitive.
 * @param {the value to evaluate} number 
 * @param {default value if number is not a number} default_value 
 * @returns returns the number or default value
 */
 function isNum (number, default_value){
    let integ = Number.parseInt(number)
   
    return Math.abs(integ)|| default_value
    

}

module.exports={
    findAllDB,
    isNum,
    order,
    filterContinent,
    allActivities
}