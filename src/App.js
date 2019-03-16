import React, { useEffect, useState } from 'react';
import { View } from 'react-native-web'
import * as R from 'ramda'
import GitHubButton from 'react-github-btn'
import semver from 'semver'

import logo from './logo.svg';
import './App.css';

import { Text, Dropdown } from './components'


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
    setFromVersion(versions[0])
    setToVersion(versions[0])
  }

  useEffect(() => { fetchVersions() }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Text>RN diff PURGE</Text>
        <img src={logo} className="App-logo" alt="logo" />
        <GitHubButton href="https://github.com/pvinis/rn-diff-purge" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star pvinis/rn-diff-purge on GitHub">Star</GitHubButton>
        <Text>Get diff:</Text>
        <View style={{ flexDirection: 'row' }}>
          <Dropdown
            title='From'
            items={versions}
            onValueChange={setFromVersion}
          />
          <Dropdown
            title='To'
            items={versions}
            onValueChange={setToVersion}
          />
          <View style={{ flexDirection: 'column' }}>
            <a href={`https://github.com/pvinis/rn-diff-purge/compare/version/${fromVersion}..version/${toVersion}`}>
              <Text>Diff here</Text>
            </a>
            <a href={`https://raw.githubusercontent.com/pvinis/rn-diff-purge/master/diffs/${fromVersion}..${toVersion}.diff`}>
              <Text>Patch here</Text>
            </a>
            {(toVersion !== '' && semver.gt(fromVersion, toVersion)) && (
              <Text style={{ color: 'orange' }}>You are downgrading. Are you sure?</Text>
            )}
          </View>
        </View>
      </header>
    </div>
  )
}

export default App
