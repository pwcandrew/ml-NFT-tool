import Erc721ContractAbi from '../erc721/contracts/CustomERC721.json'
import contract from 'truffle-contract'
import Web3Service from '../controller/Web3'

let instance = null

export default class Erc721Contract {
  constructor(defaultAddress) {
    if (!instance) {
      instance = this
      this.web3 = Web3Service.getWeb3()
      this.contract = contract(Erc721ContractAbi)
      this.contract.setProvider(this.web3.currentProvider)
      this.contract.defaults({ from: defaultAddress })
    }

    return instance
  }

  async create(data) {
    const { name, symbol, to, tokenID, tokenURI } = data
    try {
      const contractInstance = await this.contract.new(
        name,
        symbol,
        Web3Service.toChecksumAddress(to),
        Number(tokenID),
        tokenURI,
      )
      return contractInstance
    } catch (err) {
      console.log(err)
      return null
    }
  }
}
