const { Router } = require('express');
const axios = require ('axios')
const {Country, Activity, Op} = require ('../db')

const router = Router();

router.get('/', async (req,res)=>{
    let {name} = req.query;
    
    try{

        let countriesAll = await Country.findAll();
        name?
        result = countriesAll.filter(e => e.name.toLowerCase().includes(name.toLowerCase())):
        result = countriesAll
        result.length?
        res.json(result):
        res.send('Country not found')
    }catch(e){
        // console.log ('ERROR ', e)
        res.send ('error: ', e)
    }
    
})

router.get('/:idPais', async (req, res) =>{
    const {idPais}= req.params;
    
    try{
        let country = await Country.findByPk(idPais, {include: Activity})
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