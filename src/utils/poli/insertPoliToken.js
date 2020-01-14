import serverRequest from '../serverRequest'

export default ({ token, poli, memid }, poliToken ) => {
  return (async () => {
    try {
      const body = {
        reqName: 'insertPoliToken', 
        token,
        poli,
        memid,
        poliToken
      }
      return await serverRequest(body)
    } catch(error) {
      return { error }
    }
  })()
}