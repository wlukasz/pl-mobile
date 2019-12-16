export default (state = {}, action) => {
  switch (action.type) {

    case 'UPDATE_TAGS':
      return {
        tags: action.tags
      }

    default:
      return state
  }
}
