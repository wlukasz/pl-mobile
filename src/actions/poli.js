export const tagToPay = (tag = {}) => ({
  type: 'UPDATE_TAG_TO_PAY',
  poli: tag
})

export const storePoliToken = (allPropsAndPoliToken = {}) => ({
  type: 'STORE_POLI_TOKEN',
  allPropsAndPoliToken
})
