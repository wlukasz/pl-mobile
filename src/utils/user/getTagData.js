import serverRequest from '../serverRequest'

export default (id, token) => {
  return (async () => {
    try {
      const body = {
        reqName: 'getTagData', // returns array of objects
        postProcess: 'parseTagData',
        id,
        token
      }
      return await serverRequest(body)
    } catch(error) {
      return { error }
    }
  })()
}