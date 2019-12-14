export default (state = {}, action) => {
  switch (action.type) {

    case 'UPDATE_TAGS':
      console.log('UPDATE_TAGS reducer, action:', action)
      return {
        tags: action.tags
      }

    default:
      return state
  }
}
