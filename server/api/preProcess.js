// operations requested before db ops
const preProcess = body => {
  switch (body.preProcess) {
    
    case 'setFinancialYear':
      const isoDate = body.date_paid.substring(0, 10)
      let finYear = body.date_paid.substring(0, 4)
      const month = body.date_paid.substring(5, 7)
      if (month > '06') {
        finYear = parseInt(finYear)++
      } else {
        parseInt(finYear)
      }
      
      return {
        ...body,
        isoDate,
        finYear
      }

    default:
      return body
  }
}

module.exports = preProcess