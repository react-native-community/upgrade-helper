import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { getChangelogURL } from '../../utils'
import { Link } from './Markdown'
import { PACKAGE_NAMES } from '../../constants'
import type { Theme } from '../../theme'

const Separator = styled.hr<{ theme?: Theme }>`
  margin: 15px 0;
  background-color: ${({ theme }) => theme.border};
  height: 0.25em;
  border: 0;
`

const List = styled.ol`
  padding-inline-start: 18px;
  margin: 10px 0 0;
`

interface UsefulLinksProps {
  versions: any[]
  packageName: string
  toVersion: string
}

const UsefulLinks = ({
  packageName,
  toVersion,
  versions,
}: UsefulLinksProps) => {
  const getChangelog = ({ version }: { version: string }) => {
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

  const doesAnyVersionHaveUsefulContent = React.useMemo(
    () => versions.some(({ usefulContent }) => !!usefulContent),
    [versions]
  )

  const hasMoreThanOneRelease = versions.length > 1

  if (!doesAnyVersionHaveUsefulContent) {
    return null
  }
  return (
    <>
      {versions.map(({ usefulContent, version }, key) => {
        if (!usefulContent) {
          return null
        }

        const changelog = getChangelog({ version })

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

export default UsefulLinks
