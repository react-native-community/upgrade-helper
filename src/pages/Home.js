import React, { useState  } from 'react'
import styled from 'styled-components'
import { Card } from 'antd'
import GitHubButton from 'react-github-btn'

import VersionSelector from '../components/common/VersionSelector'
import DiffViewer from '../components/common/DiffViewer'
import { Settings } from '../components/Settings'
import { homepage } from '../../package.json'
import logo from '../assets/logo.svg'
import { SHOW_LATEST_RCS } from '../utils'


const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 30px;
`

const Container = styled(Card)`
  width: 90%;
  border-radius: 3px;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`

const Subtitle = styled.div({
	display: 'flex',
	alignItems: 'center',
	marginTop: 50,
})

const LogoImg = styled.img`
  width: 100px;
  margin-bottom: 15px;
`

const TitleHeader = styled.h1`
  margin: 0;
  margin-left: 15px;
`

const StarButton = styled(({ className, ...props }) => (
	<div className={className}>
		<GitHubButton {...props} />
	</div>
))`
  margin-top: 10px;
  margin-left: 15px;
  margin-right: auto;
`

export const Home = () => {
	const [fromVersion, setFromVersion] = useState(null)
	const [toVersion, setToVersion] = useState(null)
	const [showDiff, setShowDiff] = useState(false)
	const [settings, setSettings] = useState({
		[`${SHOW_LATEST_RCS}`]: false,
	})

	const handleShowDiff = ({ fromVersion, toVersion }) => {
		if (fromVersion === toVersion) {
			return
		}

		setFromVersion(fromVersion)
		setToVersion(toVersion)
		setShowDiff(true)
	}

	const handleSettingsChange = settingsValues => {
		const normalizedIncomingSettings = settingsValues.reduce((acc, val) => {
			acc[val] = true
			return acc
		}, {})

		setSettings(normalizedIncomingSettings)
	}

	return (
		<Page>
			<Container>
				<TitleContainer>
					<LogoImg
						alt="React Native upgrade helper logo"
						title="React Native upgrade helper logo"
						src={logo}
					/>

					<a href={homepage}>
						<TitleHeader>React Native upgrade helper</TitleHeader>
					</a>

					<StarButton
						href="https://github.com/react-native-community/upgrade-helper"
						data-icon="octicon-star"
						data-show-count="true"
						aria-label="Star react-native-community/upgrade-helper on GitHub"
					>
						Star
					</StarButton>

					<Settings handleSettingsChange={handleSettingsChange} />
				</TitleContainer>

				<VersionSelector
					showDiff={handleShowDiff}
					showReleaseCandidates={settings[SHOW_LATEST_RCS]}
				/>

				<Subtitle>Don't forget: `RnDiffApp` is a placeholder. When upgrading, all instances of `RnDiffApp` should be `YourProjectName`, all `rndiffapp` should be `yourprojectname` etc.</Subtitle></Container>

			{/* <DiffViewer
				showDiff={showDiff}
				fromVersion={fromVersion}
				toVersion={toVersion}
			/> */}
		</Page>
	)
}
