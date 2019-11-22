export default async (body) => {
  try {
    // this is a TEMPORARY measure - must get token from redux store!
    // const token = await localStorage.getItem('token')

    const { token, ...rest } = body
    console.log('serverRequest.js, token:', token)
    body = { ...rest }

    const postData = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }
    console.log('serverRequest.js, postData: ', postData)

    const res = await fetch('api', postData)
    console.log('serverRequest.js, res.status:', res.status)
    if (!res.ok) { 
      throw Error(`${res.statusText}`)
    }
    const result = await res.json()
    console.log(`Generic FETCH in serverRequest.js; Request:${body.reqName} result:`, result)
    return result
  } catch(error) {
    console.log(`Generic FETCH Error in serverRequest.js; Request:${body.reqName}; ${error}`)
    return { error }
  } 
}