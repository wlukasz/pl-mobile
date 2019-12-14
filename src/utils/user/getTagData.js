import serverRequest from '../serverRequest'

export default (id, token) => {
  console.log('getTagData:', id, token)
  return (async () => {
    try {
      const body = {
        reqName: 'getTagData', // returns array of objects
        postProcess: 'parseTagData',
        id,
        token
      }
      console.log('getTagData, body:', body)
      const tagDataDb = await serverRequest(body)
      console.log('getTagData, tagDataDb-result:', tagDataDb)
      return tagDataDb
    } catch(error) {
      console.log('Error getting Tag Data:', error)
      return { error }
    }
  })()
}