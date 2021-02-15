import * as storageReducers from './storageReducers'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  ...storageReducers,
})

export default rootReducer
