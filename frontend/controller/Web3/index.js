import Web3 from 'web3'
const window = require('global/window')
const injectedWeb3 = new Web3(window.ethereum)
let currentWeb3Inst = null

export default class Web3Service {
  static getWeb3() {
    currentWeb3Inst = !currentWeb3Inst ? new Web3(injectedWeb3.currentProvider) : currentWeb3Inst
    return currentWeb3Inst
  }

  static async getNetWorkId() {
    return new Promise(async (resolve) => {
      currentWeb3Inst = !currentWeb3Inst ? new Web3(injectedWeb3.currentProvider) : currentWeb3Inst
      currentWeb3Inst.eth.net.getId().then((netId) => {
        console.log('getNetWorkId:', netId)
        return resolve(netId)
      })
    })
  }
  static toChecksumAddress(address) {
    try {
      currentWeb3Inst = !currentWeb3Inst ? new Web3(injectedWeb3.currentProvider) : currentWeb3Inst
      return currentWeb3Inst.utils.toChecksumAddress(address)
    } catch (e) {
      return null
    }
  }
}
