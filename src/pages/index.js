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

const features = [
  {
    title: <>We teach and solve problems of developers</>,
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Developers can describe their challenges in developing mobile applications on react-native and get qualified
        help from mentors.
      </>
    )
  },
  {
    title: <>We motivate developers to solve problems</>,
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        For successful technical support, the developer is given a unicorn, from the number of which the rating of
        programmers is formed, which in turn increases their chance to get more attractive offer from employers, as well
        as pay for each task solved.
      </>
    )
  },
  {
    title: <>We give practice and employ the best</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        In the application, you can create a resume, respond to a vacancy and receive an offer from your employer, and
        participate in the creation of a mobile application.
      </>
    )
  }
]

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

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
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map(({ title, imageUrl, description }) => (
                  <Feature key={title} title={title} imageUrl={imageUrl} description={description} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
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
