import React, { useEffect, useState } from 'react';
import { View } from 'react-native-web'
import * as R from 'ramda'
import GitHubButton from 'react-github-btn'
import semver from 'semver'
import ReactGA from 'react-ga'

import logo from './logo.svg';
import './App.css';

import { Text, Dropdown, Link } from './components'


const App = (props) => {

  const [versions, setVersions] = useState([])
  const [fromVersion, setFromVersion] = useState('')
  const [toVersion, setToVersion] = useState('')

  const fetchVersions = async () => {
    const response = await fetch(
      'https://raw.githubusercontent.com/pvinis/rn-diff-purge/master/VERSIONS'
    )
    const text = await response.text()
    const versions = R.split('\n')(text)
    setVersions(versions)
    setFromVersion(versions[1])
    setToVersion(versions[0])
  }

  useEffect(() => { fetchVersions() }, [])

  useEffect(() => {
    ReactGA.initialize('UA-136307971-1')
    ReactGA.pageview('/')
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Text h1>Upgrade your React Native apps 🎉</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text>powered by </Text><Text bold>rn-diff-purge</Text>
        </View>
        <img src={logo} className="App-logo" alt="logo" />
        <GitHubButton href="https://github.com/pvinis/rn-diff-purge" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star pvinis/rn-diff-purge on GitHub">Star</GitHubButton>
        <Text h2>Get diff</Text>
        <View style={{ flexDirection: 'row', marginVertical: '30px', }}>
          <Dropdown
            title='From:'
            items={versions}
            selectedValue={fromVersion}
            onValueChange={setFromVersion}
          />
          <Dropdown
            title='To:'
            items={versions}
            selectedValue={toVersion}
            onValueChange={setToVersion}
          />
        </View>
        <View style={{ flexDirection: 'column' }}>
          {(toVersion !== '' && semver.gt(fromVersion, toVersion)) && (
            <Text style={{ color: 'orange' }}>You are downgrading. Are you sure?</Text>
          )}
          <Link margins
            to={`https://github.com/pvinis/rn-diff-purge/compare/version/${fromVersion}..version/${toVersion}`}
            eventLabel={`diff--${fromVersion}--${toVersion}`}
          >
            Diff here
          </Link>
          <Link margins
            to={`https://raw.githubusercontent.com/pvinis/rn-diff-purge/master/diffs/${fromVersion}..${toVersion}.diff`}
            eventLabel={`patch--${fromVersion}--${toVersion}`}
          >
            Patch here
          </Link>
        </View>
        <View style={{ position: 'absolute', bottom: '8px', right: '8px', flexDirection: 'row' }}>
          <Text>made with 💜 by </Text>
          <Text bold>pvinis</Text>
          <Text> (</Text>
          <Link
            to='https://github.com/pvinis'
            eventLabel='github--pvinis'
          >github</Link>
          <Text>, </Text>
          <Link
            to='https://twitter.com/pvinis'
            eventLabel='twitter--pvinis'
          >twitter</Link>
          <Text>)</Text>
        </View>
      </header>
    </div>
  )
}

export default App
