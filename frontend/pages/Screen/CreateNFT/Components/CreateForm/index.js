import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Button, Form, Input, Tooltip, Spin, Alert, Select, notification } from 'antd'
const { Option } = Select
import { Erc721Contract } from 'contract-api'
import Web3Service from 'controller/Web3'
import './style.scss'

const explorerLink = {
  1: 'https://etherscan.io',
  3: 'https://ropsten.etherscan.io',
  4: 'https://rinkeby.etherscan.io',
  5: 'https://goerli.etherscan.io',
  42: 'https://kovan.etherscan.io',
  80001: 'https://mumbai-explorer.matic.today',
  137: 'https://explorer.matic.network'
}

const networkName = {
  1: 'Ethereum Mainnet',
  3: 'Ethereum Testnet Ropsten',
  4: 'Ethereum Testnet Rinkeby',
  5: 'Ethereum Testnet Goerli',
  42: 'Ethereum Testnet Kovan',
  80001: 'Matic Mumbai Testnet',
  137: 'Matic Mainnet'
}

class CreateForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      createdDataNFT: null,
      networkID: null,
      address: null,
    }
    this.formRef = React.createRef()
    // this.erc721Contract = new Erc721Contract()
  }
  componentDidMount() {
    if (window.ethereum) {
      window.ethereum
        .enable()
        .then((accounts) => {
          const defaultAddress = accounts[0]
          this.erc721Contract = new Erc721Contract(defaultAddress)
          Web3Service.getNetWorkId().then((networkID) => {
            console.log(`networkID:${networkID}`)
            this.setState({ networkID, address: defaultAddress })
          })
        })
        .catch((error) => {
          console.error('window.ethereum.enable - Error:', error)
        })
    }
  }

  onChangeSwitch = (value) => {
    this.setState(
      {
        enableSend: value,
      },
      () => {
        this.onChangeKeyAndValue('enableSend', value)
      },
    )
  }
  onChangeOwnerMessage = (value) => {
    this.setState({
      ownerMessage: value,
    })
    this.onChangeKeyAndValue('ownerMessage', value)
  }
  onFinish = async (values) => {
    const callbackOnFinish = async () => {
      this.setState({
        loading: true,
      })
      const { nftName, nftSymbol, nftID, nftOwner, nftLink } = values
      const result = await this.erc721Contract.create({
        name: nftName,
        symbol: nftSymbol,
        to: nftOwner,
        tokenID: nftID,
        tokenURI: nftLink,
      })
      this.setState({
        loading: false,
        createdDataNFT: result
          ? {
              address: result.address,
              tx: result.transactionHash,
            }
          : null,
      })
    }
    const isSigned = this.state.address !== null //checkIsSigned(this.props.userData, this.props.metamaskRedux)
    if (!isSigned) {
      notification.open({
        message: 'Metamask is locked',
        description: 'Please click the Metamask to unlock it',
        onClick: () => {
          console.log('Notification Clicked!')
        },
      })
    } else {
      callbackOnFinish()
    }
  }
  generateNumber = (min = 1, max = 10000) => {
    const rand = Math.floor(Math.random() * (max - min + 1) + min)
    return rand
  }
  onNftStandardChange = () => {}
  render() {
    const { loading, createdDataNFT, networkID } = this.state
    const layout = {
      labelCol: { span: 13 },
      wrapperCol: { span: 11 },
    }
    const defaultAttributeFields = [{ key: 0, name: '', value: '' }]

    return (
      <div className="create-form-container">
        <div className="wrapper">
          <div
            className="page-title"
            style={{ textAlign: 'center', color: '#ffffff', padding: '40px' }}
          >
            {`Launch NFT to ${networkName[networkID] || '...'}`}
          </div>
          <Form
            ref={this.formRef}
            {...layout}
            name="create-nft"
            labelAlign="left"
            initialValues={{
              numberOfIssuing: 1,
              remember: true,
              nftDetail: defaultAttributeFields,
              enableSend: true,
              ownerMessage: '',
              nftID: this.generateNumber(),
              nftOwner: this.props.userData ? this.props.userData.address : '',
              nftStandard: 'ERC721',
            }}
            onFinish={this.onFinish}
            onValuesChange={(changedValues, allValues) => {
              this.setState({
                formData: allValues,
              })
            }}
          >
            <Tooltip title="ERC1155 Standard is to be supported soon">
              <Form.Item
                label={<div className="text text-bold text-color-4 text-size-3x">Standard</div>}
                name="nftStandard"
                rules={[
                  {
                    required: true,
                    message: 'NFT standard is required',
                  },
                ]}
              >
                <Select defaultValue="ERC721" onChange={this.onNftStandardChange}>
                  <Option value="ERC721">ERC721</Option>
                  <Option value="ERC1155" disabled>
                    ERC1155
                  </Option>
                </Select>
              </Form.Item>
            </Tooltip>

            <Tooltip title="This is your NFT name">
              <Form.Item
                label={<div className="text text-bold text-color-4 text-size-3x">Name</div>}
                name="nftName"
                rules={[
                  {
                    required: true,
                    message: 'NFT Name is required',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Tooltip>

            <Tooltip title="This is your NFT symbol">
              <Form.Item
                label={<div className="text text-bold text-color-4 text-size-3x">Symbol</div>}
                name="nftSymbol"
                rules={[
                  {
                    required: true,
                    message: 'NFT Symbol is required',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Tooltip>

            <Tooltip title="This is your NFT ID (auto generated)">
              <Form.Item
                label={<div className="text text-bold text-color-4 text-size-3x">ID</div>}
                name="nftID"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Tooltip>

            <Tooltip title="This is Ethereum address as the NFT owner">
              <Form.Item
                label={
                  <div className="text text-bold text-color-4 text-size-3x">Owner Address</div>
                }
                name="nftOwner"
                rules={[
                  {
                    required: true,
                    message: 'Please specify Ethereum address as the NFT owner',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Tooltip>

            <Tooltip title="This is your NFT link that can be to some website or some image">
              <Form.Item
                label={<div className="text text-bold text-color-4 text-size-3x">Link</div>}
                name="nftLink"
                rules={[
                  {
                    required: true,
                    message: 'NFT link is required',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Tooltip>

            <Form.Item xs={24} md={24}>
              <Button type="primary" htmlType="submit" className="ant-big-btn" disabled={loading}>
                {loading ? <Spin /> : 'Submit'}
              </Button>
              <br />
              {loading && (
                <Alert
                  message="NFT Token is being launched"
                  description="Please wait!"
                  type="info"
                />
              )}
            </Form.Item>
          </Form>
          {!loading && createdDataNFT !== null && (
            <Alert
              message={`NFT Token Address: ${explorerLink[networkID]}/token/${createdDataNFT.address}`}
              description={`Transaction Link: ${explorerLink[networkID]}/tx/${createdDataNFT.tx}`}
              type="success"
              closable
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData,
  metamaskRedux: state.metamaskRedux,
})

export default withRouter(connect(mapStateToProps, null)(CreateForm))
