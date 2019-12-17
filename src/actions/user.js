export const updateUser = ({ id, email, first_name, last_name } = {}) => ({
  type: 'UPDATE_USER',
  id,
  email,
  firstName: first_name,
  lastName: last_name
})
