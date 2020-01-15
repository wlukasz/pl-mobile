import serverRequest from '../serverRequest'

export default (payload) => {
  return (async () => {
    try {
      const body = {
        reqName: 'insertPoliRentRecord', 
        ...payload
      }
      return await serverRequest(body)
    } catch(error) {
      return { error }
    }
  })()
}