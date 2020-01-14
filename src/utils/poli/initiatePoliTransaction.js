import serverRequest from '../serverRequest'

export default ({ token, poli, memid, amountToPay }) => {
  return (async () => {
    try {
      const backFromPoliUrl = window.location.origin + window.location.pathname
      console.log('backFromPoliUrl:', backFromPoliUrl)
      const body = {
        reqName: 'initiatePoliTransaction', 
        poliRequest: 'initiatePoliTransaction',
        token,
        poli,
        memid,
        amountToPay,
        backFromPoliUrl
      }
      return await serverRequest(body)
    } catch(error) {
      return { error }
    }
  })()
}