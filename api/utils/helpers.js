const sortByDate = (data) => {
    return data.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp))
}

const getPayerBalance = (data, payerBalances) => {
  if(data.length){
    data.forEach(obj => {
        if(!payerBalances.some(a => a.payer === obj.payer)){
          payerBalances.push({"payer": obj.payer, "points": obj.points})
        } else {
          payerBalances.filter(a => a.payer === obj.payer)[0].points += obj.points
        }
    })
  } else {
    payerBalances.filter(a => a.payer === data.payer)[0].points += data.points
  }
}

const spendingPoints = (data, userPoints, spentPayerBalance, payerBalances) => {
  let updatedHistoryData;
    for(let i = 0; i < data.length; i++){
        let historyData = data[i]
        updatedHistoryData = [...data].slice(i, data.length)
        let subtractedPoints = historyData.points * -1

        userPoints = userPoints + subtractedPoints
        if(userPoints < 0){
          spentPayerBalance.push({"payer": historyData.payer, "points": (historyData.points + userPoints) * -1})
          historyData.points = userPoints * -1
          break
        }
        if(!spentPayerBalance.some(a => a.payer === historyData.payer)){
          spentPayerBalance.push({"payer": historyData.payer, "points": subtractedPoints})
          if(updatedHistoryData.length === 1 && updatedHistoryData[0].points + subtractedPoints === 0) updatedHistoryData = []
        } else {
          spentPayerBalance.filter(a => a.payer === historyData.payer)[0].points += subtractedPoints
        }
    }
        payerBalances.forEach(obj => {
          let match = spentPayerBalance.filter(a => a.payer === obj.payer)
          match = match.length ? match[0]['points'] : 0
          if(match){
            obj.points = match + obj.points
          } else if (obj.points < 0) {
            obj.points = 0
          }
    })
    return updatedHistoryData
}

const addTransaction = (data, history, payerBalances) => {
    if(data.length){
      for(let i = 0; i < data.length; i++){

        let newTransaction = {
          payer: data[i].payer,
          points: data[i].points,
          timestamp: new Date()
        }
        history.push(newTransaction)
        
      }
      getPayerBalance(data, payerBalances)
    } else {
      
        let newTransaction = {
          payer: data.payer,
          points: data.points,
          timestamp: new Date()
        }
        history.push(newTransaction)
        getPayerBalance(data, payerBalances)
    }
    return sortByDate(history)
}

module.exports = {
    sortByDate,
    getPayerBalance,
    spendingPoints,
    addTransaction
}