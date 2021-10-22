const router = require('express').Router()
const {sortByDate, getPayerBalance, spendingPoints, addTransaction} = require('../utils/helpers')

let transactionHistory = [{ "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
{ "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
 { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
{ "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z"},
{ "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }]

let payerBalances = []

getPayerBalance(transactionHistory, payerBalances)

router.get('/', async (req, res, next) => {
    try{

        let sortedHistory = sortByDate(transactionHistory)

        res.json(sortedHistory)

    } catch(error){
        next(error)
    }
})

router.get('/payerBalances', async (req, res, next) => {
    try {
        
        res.json(payerBalances)

    } catch (error) {
        next(error)
    }
})

router.post('/add', async (req, res, next) => {
    try {

        let updatedHistory = addTransaction(req.body, transactionHistory, payerBalances)

        res.json(updatedHistory)

    } catch (error) {
        next(error)
    }
})

router.post('/spendPoints', async (req, res, next) => {
    try {
        if(transactionHistory.length){
            let sortedHistory = sortByDate(transactionHistory)
            let spentPayerBalance = []
            let userPoints = req.body.points

            transactionHistory = spendingPoints(sortedHistory, userPoints, spentPayerBalance, payerBalances)

            res.json(spentPayerBalance)
        } else {
            res.status(502).send("No more transactions!")
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router