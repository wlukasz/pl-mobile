// operations requested before db ops
const preProcess = body => {
  switch (body.preProcess) {
    
    case 'testCase':
      return ({
        ...body,
        preProcessed: true
      })

    default:
      return body
  }
}

module.exports = preProcess