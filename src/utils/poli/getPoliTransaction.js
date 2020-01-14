import serverRequest from '../serverRequest'

export default (token) => {
  return (async () => {
    try {
      const { merchant_code, merchant_pass, poli_api_url } = JSON.parse(localStorage.getItem('poliAllProps'))
      const poliToken = localStorage.getItem('poliToken')
      const body = {
        reqName: 'getPoliTransaction', 
        poliRequest: 'getPoliTransaction',
        token,
        merchant_code,
        merchant_pass,
        poli_api_url,
        poliToken
      }
      return await serverRequest(body)
    } catch(error) {
      return { error }
    }
  })()
}