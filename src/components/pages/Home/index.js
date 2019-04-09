import React, { useEffect, useState } from 'react'
import { View } from 'react-native-web'
import * as R from 'ramda'
import GitHubButton from 'react-github-btn'
import semver from 'semver'
import ReactGA from 'react-ga'

import logo from '../../../logo.svg'
import './styles.css'

import { Text, Dropdown, Link } from '../../common'

const Home = props => {
  const [releases, setReleases] = useState([])
  const [fromRelease, setFromRelease] = useState('')
  const [toRelease, setToRelease] = useState('')

  const fetchReleases = async () => {
    const response = await fetch(
      'https://raw.githubusercontent.com/react-native-community/rn-diff-purge/master/RELEASES'
    )
    const text = await response.text()
    const releases = R.split('\n')(text)
    setReleases(releases)
    setFromRelease(releases[1])
    setToRelease(releases[0])
  }

  useEffect(() => {
    fetchReleases()
  }, [])

  useEffect(() => {
    ReactGA.initialize('UA-136307971-1')
    ReactGA.pageview('/')
  }, [])

  return (
    <div className="Home">
      <header className="Home-header">
        <Text h1>Upgrade your React Native apps 🎉</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text>powered by </Text>
          <Text bold>rn-diff-purge</Text>
        </View>
        <img src={logo} className="Home-logo" alt="logo" />
        <GitHubButton
          href="https://github.com/react-native-community/rn-diff-purge"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star react-native-community/rn-diff-purge on GitHub"
        >
          Star
        </GitHubButton>
        <Text h2>Get diff</Text>
        <View style={{ flexDirection: 'row', marginVertical: '30px' }}>
          <Dropdown
            title="From:"
            items={releases}
            selectedValue={fromRelease}
            onValueChange={setFromRelease}
          />
          <Dropdown
            title="To:"
            items={releases}
            selectedValue={toRelease}
            onValueChange={setToRelease}
          />
        </View>
        <View style={{ flexDirection: 'column' }}>
          {toRelease !== '' && semver.gt(fromRelease, toRelease) && (
            <Text style={{ color: 'orange' }}>
              You are downgrading. Are you sure?
            </Text>
          )}
          <Link
            margins
            to={`https://github.com/react-native-community/rn-diff-purge/compare/release/${fromRelease}..release/${toRelease}`}
            eventLabel={`diff--${fromRelease}--${toRelease}`}
          >
            Diff here
          </Link>
          <Link
            margins
            to={`https://raw.githubusercontent.com/react-native-community/rn-diff-purge/diffs/diffs/${fromRelease}..${toRelease}.diff`}
            eventLabel={`patch--${fromRelease}--${toRelease}`}
          >
            Patch here
          </Link>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            flexDirection: 'row'
          }}
        >
          <Text>made with 💜 by </Text>
          <Text bold>pvinis</Text>
          <Text> (</Text>
          <Link to="https://github.com/pvinis" eventLabel="github--pvinis">
            github
          </Link>
          <Text>, </Text>
          <Link to="https://twitter.com/pvinis" eventLabel="twitter--pvinis">
            twitter
          </Link>
          <Text>)</Text>
        </View>
      </header>
    </div>
  )
}

export default Home
