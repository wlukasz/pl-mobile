// operations requested before db ops
const nonDbProcess = body => {
  switch (body.nonDbProcess) {
    
    case 'testCase':
      return ({
        ...body,
        nonDbProcessed: true
      })

    default:
      return body
  }
}

module.exports = nonDbProcess