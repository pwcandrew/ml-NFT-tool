import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import CreateForm from './Components/CreateForm'
import './style.scss'

class CreateNFT extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <CreateForm />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData,
  metamaskRedux: state.metamaskRedux,
})

export default withRouter(connect(mapStateToProps, null)(CreateNFT))
