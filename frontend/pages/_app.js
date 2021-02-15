import React from 'react'
import App from 'next/app'
import { Provider } from 'react-redux'
import Head from 'next/head'

import store from 'controller/Redux/store/configureStore'
import BaseContainer from 'pages/Container'
import { images } from 'config/images'
import './Style/override.less'
import './Style/global.scss'

class MyApp extends App {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
    this.currentInterval = null
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Head>
          <title>NFT</title>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href={images.favicon} />
        </Head>

        <BaseContainer>
          <Component {...pageProps} />
        </BaseContainer>
      </Provider>
    )
  }
}

export default MyApp
