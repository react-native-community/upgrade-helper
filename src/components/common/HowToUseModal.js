import React from 'react'
import { Modal } from 'antd'

const HowToUseModal = ({ visible, onClose }) => (
  <Modal title="How to Use the Upgrade Helper" visible={visible}>
    <p>
      Rhoncus cras cursus sit elit non a auctor condimentum potenti, urna congue
      luctus at interdum nullam ornare sollicitudin, tortor ad praesent molestie
      curae ullamcorper vehicula ut.
    </p>
  </Modal>
)

export default HowToUseModal
