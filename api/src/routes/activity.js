const { Router } = require('express');
// const {Country, Activity} = require('../db.js');
const {Country, Activity, Op} = require ('../db')


const router = Router();

router.post('/', async (req,res)=>{
    const {name, difficulty, duration, season, countries} = req.body
    try{
        
    let activity = await Activity.create({
        name,
        difficulty,
        duration,
        season
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


module.exports = router;


