import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import { getChangelogURL } from '../../utils'
import { Link } from './Markdown'
import { PACKAGE_NAMES } from '../../constants'

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

class UsefulLinks extends Component {
  getChangelog = ({ version }) => {
    const { packageName, toVersion } = this.props

    if (
      packageName === PACKAGE_NAMES.RNW ||
      packageName === PACKAGE_NAMES.RNM
    ) {
      return {
        title: `React Native ${
          packageName === PACKAGE_NAMES.RNW ? 'Windows' : 'macOS'
        } ${toVersion} changelog`,
        url: getChangelogURL({
          packageName,
          version: toVersion,
        }),
        version: toVersion,
      }
    }

    const versionWithoutEndingZero = version.slice(0, 4)

    return {
      title: `React Native ${versionWithoutEndingZero} changelog`,
      url: getChangelogURL({
        packageName,
        version: versionWithoutEndingZero,
      }),
      version: versionWithoutEndingZero,
    }
  }

  render() {
    const { versions } = this.props

    const doesAnyVersionHaveUsefulContent = versions.some(
      ({ usefulContent }) => !!usefulContent
    )

    if (!doesAnyVersionHaveUsefulContent) {
      return null
    }

    const hasMoreThanOneRelease = versions.length > 1

    return (
      <>
        {versions.map(({ usefulContent, version }, key) => {
          const changelog = this.getChangelog({ version })

          const links = [...usefulContent.links, changelog]

          return (
            <Fragment key={key}>
              {key > 0 && <Separator />}

              {hasMoreThanOneRelease && <h3>Release {changelog.version}</h3>}

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
        <Separator />
      </>
    )
  }
}

export default UsefulLinks
