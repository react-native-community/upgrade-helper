import React, { Fragment, useState } from 'react'
import semver from 'semver'
import styled from 'styled-components'
import { Card } from 'antd'
import {
  INSTRUCTION_PLATFORMS,
  INSTRUCTION_CATEGORIES,
  RELEASED_VERSIONS,
  PACKAGE_MANAGERS
} from '../../utils'
import Instruction from './Instruction'

const Title = styled.h1`
  margin: 10px;
  margin-top: 20px;
`

const releasedVersions = RELEASED_VERSIONS.map(
  version => require(`../versions/${version}`).default
)

const renderPlatformInstructions = (instructions, props) =>
  instructions &&
  instructions.map(({ title, description }) => (
    <Instruction {...props} title={title} description={description} />
  ))

const renderAndroidInstructions = ({ version, category, ...props }) =>
  renderPlatformInstructions(
    version[category][INSTRUCTION_PLATFORMS.ANDROID],
    props
  )

const renderIOSInstructions = ({ version, category, ...props }) =>
  renderPlatformInstructions(
    version[category][INSTRUCTION_PLATFORMS.IOS],
    props
  )

const InstallationInstructions = ({ packageManager, release }) => {
  const installationCommand = PACKAGE_MANAGERS[packageManager].command

  return (
    <Fragment>
      <Instruction
        title={
          <Fragment>
            Install new React Native by running `
            {installationCommand(`react-native@${release.version}`)}`
          </Fragment>
        }
      />

      <Instruction
        title={
          <Fragment>
            Install new React version by running `
            {installationCommand(`react@${release.reactVersion}`)}`
          </Fragment>
        }
      />
    </Fragment>
  )
}

const Instructions = ({
  category,
  canBeChecked = true,
  versions,
  packageManager,
  filters
}) => filters.includes(category) && (
  <Fragment>
    <Title>{category}</Title>

    {versions.map((version, key) => {
      const isLatestVersion = key === 0

      return (
        <Fragment>
          {isLatestVersion && category === INSTRUCTION_CATEGORIES.CHANGES && (
            <InstallationInstructions
              release={version}
              packageManager={packageManager}
            />
          )}

          {renderAndroidInstructions({
            version,
            category,
            canBeChecked
          })}

          {renderIOSInstructions({
            version,
            category,
            canBeChecked
          })}
        </Fragment>
      )
    })}
  </Fragment>
)

const UpdateInstructions = ({
  showUpdateGuide,
  packageManager,
  fromVersion,
  toVersion,
  filters
}) => {
  if (!showUpdateGuide) {
    return null
  }

  const versions = releasedVersions.filter(({ version }) =>
    semver.satisfies(version, `>= ${fromVersion} <= ${toVersion}`)
  )

  return (
    <Fragment>
      <Instructions
        category={INSTRUCTION_CATEGORIES.ADDED}
        canBeChecked={false}
        versions={versions}
        packageManager={packageManager}
        filters={filters}
      />

      <Instructions
        category={INSTRUCTION_CATEGORIES.CHANGES}
        versions={versions}
        packageManager={packageManager}
        filters={filters}
      />
    </Fragment>
  )
}

export default UpdateInstructions
