import React, { Component } from 'react';
import { View } from 'react-native-web'
import * as R from 'ramda'
import GitHubButton from 'react-github-btn'
import semver from 'semver'

import logo from './logo.svg';
import './App.css';

import { Text, Dropdown } from './components'
import { version } from 'punycode';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      versions: [],
      fromVersion: '',
      toVersion: '',
    }
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/pvinis/rn-diff-purge/master/VERSIONS')
      .then(r => r.text())
      .then(versionsText => {
        const versions = R.split('\n')(versionsText)
        this.setState({
          versions,
          fromVersion: versions[0],
          toVersion: versions[0],
        })
      })
  }

  render() {
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
              items={this.state.versions}
              onValueChange={fromVersion => this.setState({ fromVersion })}
            />
            <Dropdown
              title='To'
              items={this.state.versions}
              onValueChange={toVersion => this.setState({ toVersion })}
            />
            <View style={{ flexDirection: 'column' }}>
              <a href={`https://github.com/pvinis/rn-diff-purge/compare/version/${this.state.fromVersion}..version/${this.state.toVersion}`}>
                <Text>Diff here</Text>
              </a>
              <a href={`https://raw.githubusercontent.com/pvinis/rn-diff-purge/master/diffs/${this.state.fromVersion}..${this.state.toVersion}.diff`}>
                <Text>Patch here</Text>
              </a>
              {(this.state.fromVersion !== '' && semver.gt(this.state.fromVersion, this.state.toVersion)) && (
                <Text style={{ color: 'orange' }}>You are downgrading. Are you sure?</Text>
              )}
            </View>
          </View>
        </header>
      </div>
    );
  }
}

export default App;
