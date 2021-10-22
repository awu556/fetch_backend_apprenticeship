const sortByDate = (data) => {
    return data.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp))
}

const getPayerBalance = (data, payerBalances) => {
    data.forEach(obj => {
        if(!payerBalances.some(a => a.payer === obj.payer)){
          payerBalances.push({"payer": obj.payer, "points": obj.points})
        } else {
          payerBalances.filter(a => a.payer === obj.payer)[0].points += obj.points
        }
    })
}

const spendingPoints = (data, userPoints, spentPayerBalance, payerBalances) => {
    for(let i = 0; i < data.length; i++){
        let historyData = data[i]
        let subtractedPoints = historyData.points * -1

        userPoints = userPoints + subtractedPoints

        if(userPoints < 0){
            spentPayerBalance.push({"payer": historyData.payer, "points": (historyData.points + userPoints) * -1})
            break
        }

        if(!spentPayerBalance.some(a => a.payer === historyData.payer)){
          spentPayerBalance.push({"payer": historyData.payer, "points": subtractedPoints})
        } else {
          spentPayerBalance.filter(a => a.payer === historyData.payer)[0].points += subtractedPoints
        }
    }

    payerBalances.forEach(obj => obj.points = spentPayerBalance.filter(a => a.payer === obj.payer)[0].points + obj.points)
}



module.exports = {
    sortByDate,
    getPayerBalance,
    spendingPoints
}