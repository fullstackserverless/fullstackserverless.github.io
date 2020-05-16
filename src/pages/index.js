/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import React from 'react'
import classnames from 'classnames'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import YouTube from 'react-youtube'
import styles from './styles.module.css'

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      cc_load_policy: 0,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
      showinfo: 0
    }
  }
  const { videoContainer, player, heroBanner, buttons, getStarted } = styles
  return (
    <Layout title={`${siteConfig.title}`} description="React Native + AWS Amplify = Fullstackserverless">
      <div className={videoContainer}>
        <YouTube videoId="9CNmJda6gAk" opts={opts} className={player} />
      </div>
      <img alt="Fullstackserverless" src={useBaseUrl('img/fullstackserverless.png')} />
      <header className={classnames('hero hero--primary', heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={buttons}>
            <Link
              className={classnames('button button--outline button--secondary button--lg', getStarted)}
              to={useBaseUrl('docs/startup00')}
            >
              Start
            </Link>
          </div>
        </div>
      </header>
    </Layout>
  )
}

export default Home
