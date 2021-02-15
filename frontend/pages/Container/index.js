import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Layout, Row, Col } from 'antd'
import Header from './Header'
import './style.scss'
const { Content } = Layout

class BaseContainer extends PureComponent {
  render = () => {
    return (
      <Layout>
        <Header />
        <Layout className="layout-container">
          <Content className="base-content">
            <Row type="flex" justify="center">
              <Col span={24}>
                <div className="base-container">{this.props.children}</div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
})

export default connect(mapStateToProps)(BaseContainer)
