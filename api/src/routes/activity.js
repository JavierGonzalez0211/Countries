const { Router } = require('express');
const {Country, Activity, Op} = require ('../db')
const {allActivities} = require ('../utils')


const router = Router();

router.post('/', async (req,res)=>{
    const {name, difficulty, duration, season, countries} = req.body
    try{
        
let [activity, created] = await Activity.findOrCreate({
        where:{
            name,
            difficulty,
            duration,
            season
        }
        
    })
    await activity.setCountries(countries)

    let newActivity = await Activity.findByPk
    (activity.id, {include:[{model: Country, attributes: ['name', 'countryId' ], through:{attributes:[]}}]})
    res.json(newActivity)
}catch(e){
    console.log(e)
    res.json({'error: ': e})
}
})

router.get('/', async (req,res)=>{
    try{
      
    let getAllActivities = await allActivities()
    
    getAllActivities?.length?
        res.status(200).json(getAllActivities):
        res.status(404).send('there is no activities created')

        
    }catch(e){
        console.log ('ERROR ', e)
        res.json ({'error: ': error})
    }
    
})


module.exports = router;


