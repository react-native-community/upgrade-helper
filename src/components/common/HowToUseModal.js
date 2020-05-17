import React from 'react'
import styled from '@emotion/styled'
import { Modal } from 'antd'

const List = styled.ol`
  padding-left: 1em;
`

const Code = styled.code`
  font-size: 0.8em;
  background-color: hsla(0, 0%, 58.8%, 0.3);
  color: #000;
  border-radius: 6px;
  padding: 2px 5px;
  text-align: left;
  white-space: pre-wrap;
  word-spacing: normal;
  word-break: normal;
`

const HowToUseModal = ({ visible, onClose }) => (
  <Modal
    title="How to Use the Upgrade Helper"
    visible={visible}
    centered
    footer={null}
    onCancel={onClose}
  >
    <p>
      The Upgrade Helper is a tool to help you out when upgrading your apps by
      providing the full set of changes happening between any two versions.
    </p>
    <List>
      <li>
        <strong>Select the versions</strong>
        <p>
          Select from and to which version you wish to upgrade. After selecting
          you can click the "Show me how to upgrade" button.
        </p>
      </li>
      <li>
        <strong>Upgrade dependencies</strong>
        <p>
          The first file that is shown is the <Code>package.json</Code>, it's
          good to update the dependencies that are showing in there.
        </p>
      </li>
      <li>
        <strong>Upgrade your project files</strong>
        <p>
          The new release may contain updates to other files that are generated
          when you run <Code>npx react-native init</Code>, those files are
          listed after the <Code>package.json</Code>.
        </p>
        <p>
          If there aren't other changes then you only need to rebuild the
          project to continue developing.
        </p>
        <p>
          In case there are changes then you can either update them manually by
          copying and pasting from the changes in the page or you can do it with
          the React Native CLI upgrade command by running:
          <br />
          <Code>npx react-native upgrade</Code>
        </p>
      </li>
    </List>
    <a
      href="https://reactnative.dev/docs/upgrading#upgrade-helper"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn More about Upgrade Helper
    </a>
  </Modal>
)

export default HowToUseModal
