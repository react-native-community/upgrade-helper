import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { getVersionsInDiff, getChangelogURL } from '../../utils'
import { Link } from './Markdown'
import UpgradeSupportAlert from './UpgradeSupportAlert'
import AppNameWarning from './AppNameWarning'
import Section from './Sections/Section'

const TitleIcon = styled(props => (
  <span {...props} role="img" aria-label="Useful content section icon">
    📣
  </span>
))`
  margin: 0px 10px;
`

const Separator = styled.hr`
  margin: 15px 0;
  background-color: #e1e4e8;
  height: 0.25em;
  border: 0;
`

const List = styled.ol`
  padding-inline-start: 18px;
  margin: 10px 0 0;
`

const UsefulContentSection = ({ isLoading, fromVersion, toVersion }) => {
  const renderTitle = () => (
    <React.Fragment>
      <TitleIcon /> Useful content for upgrading
    </React.Fragment>
  )

  const versions = getVersionsInDiff({ fromVersion, toVersion })
  const doesAnyVersionHaveUsefulContent = versions.some(
    ({ usefulContent }) => !!usefulContent
  )

  if (!doesAnyVersionHaveUsefulContent) {
    return null
  }

  const hasMoreThanOneRelease = versions.length > 1

  return (
    <Section
      isLoading={isLoading}
      backgroundColor="#fffbe6"
      accentColor="#ffe58f"
      renderTitle={renderTitle}
    >
      {versions.map(({ usefulContent, version }, key) => {
        const versionWithoutEndingZero = version.slice(0, 4)

        const links = [
          ...usefulContent.links,
          {
            title: `React Native ${versionWithoutEndingZero} changelog`,
            url: getChangelogURL({ version: versionWithoutEndingZero })
          }
        ]

        return (
          <Fragment key={key}>
            {key > 0 && <Separator />}

            {hasMoreThanOneRelease && (
              <h3>Release {versionWithoutEndingZero}</h3>
            )}

            <span>{usefulContent.description}</span>

            <List>
              {links.map(({ url, title }, key) => (
                <li key={`${url}${key}`}>
                  <Link href={url}>{title}</Link>
                </li>
              ))}
            </List>
          </Fragment>
        )
      })}

      <UpgradeSupportAlert />

      <Separator />

      <AppNameWarning />
    </Section>
  )
}

export default UsefulContentSection
