const { Router } = require('express');
const axios = require ('axios')
const {Country, Activity, Op} = require ('../db')
const {findAllDB, order, filterContinent} = require ('../utils')

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

router.get('/continent', async (req, res)=>{
    let {continent, page} = req.query
    try{
        let byCont = await filterContinent(continent, page)
        byCont.rows?.length?
        res.status(200).json(byCont):
        res.status(404).send('Country not found with those parameters')

    }catch(e){
        console.log ('ERROR ', e)
        res.json ({'error: ': error})
    }
})

router.get ('/noPaginated', async (req,res) =>{
    try{
        let countriesAll = await Country.findAll()
        res.json(countriesAll)
    }catch (error){
        console.log ('ERROR ', error)
        res.json ({'error: ': error})
    }


})

router.get('/order', async (req,res)=>{
    let {name,page, orderby, direction} = req.query;
    try{
        let data = await order (name,page, orderby, direction);
        data.rows.length?
        res.status(200).json(data):
        res.status(404).send('Country not found with those parameters')
    }catch (error){
        console.log ('ERROR ', error)
        res.json ({'error: ': error})
    }

})

router.get('/:idPais', async (req, res) =>{
    const {idPais}= req.params;
    
    try{
        let country = await Country.findByPk(idPais, {include: [{model:Activity, attributes: ['name', 'id', 'difficulty', 'duration', 'season' ], through:{attributes:[]}}]})
        res.json(country)
    }catch(e){
        console.log('error', e)
        res.json({'error : ': e})
    }
})





//ATTENTION!! use this route only to copy all the countries to the DB
router.get ('/get/api', async (req, res)=>{
    try{
    let countries = await axios ('https://restcountries.com/v2/all')
   
    countries.data.forEach(async e => {
       
        await Country.findOrCreate({
            where:{
            name: e.name,
            countryId: e.alpha3Code,
            flag: e.flags.png || e.flag,
            
            continent: e.region,
            capital: e.capital || 'nn' ,
            subregion: e.subregion,
            area: e.area || 'nn' ,
            population: e.population
            }
        })
    
    })
    
}catch(e){
    console.log(e)
    res.json({"error ocurred: ": e})
}finally{
    res.send( 'ok')

}

})


module.exports = router;