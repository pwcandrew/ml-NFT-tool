import { KEY_STORE } from 'common/constants'
import { saveDataLocal } from 'common/function'

export default class StorageActions {
  static setLocale(payload) {
    saveDataLocal(KEY_STORE.SET_LOCALE, payload)
    return {
      type: KEY_STORE.SET_LOCALE,
      payload,
    }
  }

  static setUserData(payload) {
    saveDataLocal(KEY_STORE.SET_USER, payload)
    return {
      type: KEY_STORE.SET_USER,
      payload,
    }
  }
}
