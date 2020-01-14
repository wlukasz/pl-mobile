export default (state = {}, action) => {
  switch (action.type) {

    case 'UPDATE_TAG_TO_PAY':
      return {
        poli: action.poli
      }

    case 'STORE_POLI_TOKEN':
      return {
        poli: action.allPropsAndPoliToken
      }
  
    default:
      return state
  }
}
