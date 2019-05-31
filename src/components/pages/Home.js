import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, Button } from 'antd'
import { PackageManagerSelector } from '../common'
import { PACKAGE_MANAGERS } from '../../utils'
import VersionSelector from '../common/VersionSelector'
import UpdateInstructions from '../common/UpdateInstructions'

const packageManagers = Object.keys(PACKAGE_MANAGERS)

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 30px;
`

const Container = styled(Card)`
  width: 70%;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  max-height: ${props => (props.showUpdateGuide ? 0 : '600px')};
  height: auto;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
`

const UpdateInstructionsContainer = styled(({ showUpdateGuide, ...props }) => (
  <Container {...props} />
))`
  margin-top: 30px;
  opacity: ${props => (props.showUpdateGuide ? 1 : 0)}
  transition: opacity 1s ease-in-out;
`

const Home = () => {
  const [fromVersion, setFromVersion] = useState('')
  const [toVersion, setToVersion] = useState('')
  const [packageManager, setPackageManager] = useState(packageManagers[0])
  const [showUpdateGuide, setShowUpdateGuide] = useState(false)

  return (
    <Page>
      <Container>
        <VersionSelector
          fromVersion={fromVersion}
          toVersion={toVersion}
          setFromVersion={setFromVersion}
          setToVersion={setToVersion}
        />

        <PackageManagerSelector
          value={packageManager}
          onChange={setPackageManager}
        />

        <ButtonContainer showUpdateGuide={showUpdateGuide}>
          <Button
            type="primary"
            size="large"
            onClick={() => setShowUpdateGuide(true)}
          >
            Show me how to update!
          </Button>
        </ButtonContainer>
      </Container>

      <UpdateInstructionsContainer showUpdateGuide={showUpdateGuide}>
        <UpdateInstructions
          fromVersion={fromVersion}
          toVersion={toVersion}
          packageManager={packageManager}
          showUpdateGuide={showUpdateGuide}
        />
      </UpdateInstructionsContainer>
    </Page>
  )
}

export default Home
