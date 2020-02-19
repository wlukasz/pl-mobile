import serverRequest from '../serverRequest'

export default (payload) => {
  return (async () => {
    try {
      const body = {
        reqName: 'refreshUserTags', 
        apiId: 'api4_mobile_app',
        ...payload
      }
      return await serverRequest(body)
    } catch(error) {
      return { error }
    }
  })()
}