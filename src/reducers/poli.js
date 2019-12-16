export default (state = {}, action) => {
  switch (action.type) {

    case 'UPDATE_TAG_TO_PAY':
      return {
        poli: action.poli
      }
  
    default:
      return state
  }
}
