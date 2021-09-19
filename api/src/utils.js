const {Country, Activity, Op} = require ("./db")


async function findAllDB(name, page, orderby, direction){
    page = isNum(page, 1);
    orderby = orderby || 'name';
    direction = direction || 'ASC';
    let limit;
    let min = 9;
    let max = 10;
    let skip;

    if (page ===1){
        limit = min
        skip = 0
    }else{
        limit = max
        skip = ((page-1) * limit)-1
    }
        
    let conditions = {attributes:["countryId", "name", "flag", "continent", "population"], 
    include:[{model: Activity, attributes: ['name', 'id' ], through:{attributes:[]}}], offset:skip, limit,
    order: [[orderby, direction]]
    };
    if (name){
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

/**
 * This function returns the value recived in first param,
 *  if is a positive number or a default value.
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
    order
}