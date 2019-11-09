export default async (body) => {
  try {
    let postData = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    console.log('postData: ', postData)

    const res = await fetch('api', postData)
    if (!res.ok) {
      throw Error(res.statusText)
    }
    const result = await res.json()
    console.log('Generic FETCH', body.reqName, result)
    return result
  } catch(error) {
    console.log('Generic FETCH Error', body.reqName, error)
  } 
}