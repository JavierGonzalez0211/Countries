const { Router } = require('express');
const axios = require ('axios')
const {Country, Activity, Op} = require ('../db')
const {findAllDB, order} = require ('../utils')

const router = Router();

router.get('/', async (req,res)=>{
    let {name, page} = req.query;
    
    try{
      
    let countriesAll = await findAllDB(name, page)
    
        countriesAll.rows.length?
        res.status(200).json(countriesAll):
        res.status(404).send('Country not found with those parameters')

        
    }catch(e){
        console.log ('ERROR ', e)
        res.json ({'error: ': error})
    }
    
})

router.get('/order', async (req,res)=>{
    let {name,page, orderby, direction} = req.query;
    try{
        let data = await order (name,page, orderby, direction);
        res.json (data)
    }catch (error){
        console.log ('ERROR ', error)
        res.json ({'error: ': error})
    }

})

router.get('/:idPais', async (req, res) =>{
    const {idPais}= req.params;
    
    try{
        let country = await Country.findByPk(idPais, {include: [{model:Activity, attributes: ['name', 'id' ], through:{attributes:[]}}]})
        // console.log(country);
        res.json(country)
    }catch(e){
        console.log('error', e)
        res.json({'error : ': e})
    }
})





//ATTENTION!! use this route only to copy all the countries to the DB
router.get ('/get/api', async (req, res)=>{
    try{
    let countries = await axios ('https://restcountries.eu/rest/v2/all')
   
    countries.data.forEach(async e => {
        try{
        await Country.findOrCreate({
            where:{
            name: e.name,
            countryId: e.alpha3Code,
            flag: e.flag,
            continent: e.region,
            capital: e.capital,
            subregion: e.subregion,
            area: e.area,
            population: e.population
            }
        })
    }catch(e){
        console.log(e)
        res.json({"error ocurred: ": e})
    }
        
    })
    
    res.send( 'ok')
}catch(e){
    console.log(e)
    res.json({"error ocurred: ": e})
}

})


module.exports = router;