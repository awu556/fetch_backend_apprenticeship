const router = require('express').Router()
let data = [{ "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
{ "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
 { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
{ "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z"},
{ "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }]

let payerBalances = []

router.get('/', async (req, res, next) => {
    try{

    let sortedData = data.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp))
    res.json(sortedData)

    } catch(error){
        next(error)
    }
})

router.get('/payerBalances', async (req, res, next) => {
    try {
        data.forEach(obj => {
            if(!payerBalances.some(a => a.payer === obj['payer'])){
              payerBalances.push({"payer": obj.payer, "points": obj.points})
            } else {
              payerBalances.filter(a => a.payer === obj["payer"])[0]['points'] += obj["points"]
            }
        })
        res.json(payerBalances)
    } catch (error) {
        next(error)
    }
})

router.post('/add', async (req, res, next) => {
    try {

    let newTransaction = {
        payer: req.body.payer,
        points: req.body.points,
        timestamp: new Date()
    }
    console.log(newTransaction)
    data.push(newTransaction)
    res.json(data)

    } catch (error) {
        next(error)
    }
})

module.exports = router