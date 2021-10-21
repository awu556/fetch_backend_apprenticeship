const router = require('express').Router()
let data = [{ "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
{ "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
 { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
{ "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z"}]

router.get('/', async (req, res, next) => {
    try{
    let sortedData = data.sort((a,b) => b.timestamp - a.timestamp)
    res.json(sortedData) 
    } catch(error){
        next(error)
    }
})


module.exports = router