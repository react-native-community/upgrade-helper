import React, { Fragment, useState } from 'react'
import semver from 'semver'
import styled from 'styled-components'
import { Card } from 'antd'
import {
  INSTRUCTION_PLATFORMS,
  INSTRUCTION_CATEGORIES,
  RELEASED_VERSIONS
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
  instructions.map(({ title, description }) => (
    <Instruction {...props} title={title} description={description} />
  ))

const renderAndroidInstructions = ({ version, category, ...props }) =>
  renderPlatformInstructions(
    version[category][INSTRUCTION_PLATFORMS.ANDROID],
    props
  )

const renderIOSInstructions = ({ version, category }) =>
  renderPlatformInstructions(version[category][INSTRUCTION_PLATFORMS.IOS])

const Instructions = ({ category, canBeChecked = true, versions }) => (
  <Fragment>
    <Title>{category}</Title>

    {versions.map(version => {
      return renderAndroidInstructions({
        version,
        category,
        canBeChecked
      })
    })}
  </Fragment>
)

const UpdateInstructions = ({ showUpdateGuide, fromVersion, toVersion }) => {
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
      />

      <Instructions
        category={INSTRUCTION_CATEGORIES.CHANGES}
        versions={versions}
      />
    </Fragment>
  )
}

export default UpdateInstructions
