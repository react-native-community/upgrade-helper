import React, { useEffect, useRef, useState } from 'react'
import { Button as AntdButton, Popover } from 'antd'
import styled from '@emotion/styled'
import createPersistedState from 'use-persisted-state'
import { differenceInDays } from 'date-fns'
import { TroubleshootingGuides } from './TroubleshootingGuides'

const useTooltip = createPersistedState('troubleshootingTooltip')

const Icon = styled.span`
  font-family: initial;
`

const Button = styled(AntdButton)`
  width: 32px;
  padding: 0;
  margin-right: 8px;
  color: initial;
`

const TroubleshootingGuidesButton = () => {
  const [showContent, setShowContent] = useState(false)
  const [
    shouldShowTroubleshootingGuide,
    setShouldShowTroubleshootingGuide
  ] = useState(false)
  const [tooltip, setTooltip] = useTooltip({
    hasSeen: false,
    hasSeenAt: undefined
  })
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const hasHandledClick = useRef(false)

  useEffect(() => {
    if (!tooltip.hasSeen) {
      setIsTooltipVisible(true)
      setShowContent(true)

      return
    }

    const diffInDays = differenceInDays(new Date(), new Date(tooltip.hasSeenAt))

    if (diffInDays >= 2) {
      setTooltip({ hasSeen: false, hasSeenAt: undefined })
    }
  }, [tooltip])

  const handlePopoverVisibilityChange = visibility => {
    if (hasHandledClick.current) {
      return
    }

    setShowContent(false)
  }

  const handleToggleShowContent = () => {
    hasHandledClick.current = true

    if (!showContent) {
      setShowContent(true)
    } else if (isTooltipVisible) {
      setIsTooltipVisible(false)
      setShouldShowTroubleshootingGuide(!shouldShowTroubleshootingGuide)
      setTooltip({ hasSeen: true, hasSeenAt: new Date().toISOString() })
    } else {
      setShowContent(!showContent)
    }

    setTimeout(() => {
      hasHandledClick.current = false
    }, 0)
  }

  return (
    <Popover
      placement="bottomRight"
      content={
        <TroubleshootingGuides
          isTooltipVisible={isTooltipVisible}
          hasSeenTooltip={tooltip.hasSeen}
        />
      }
      trigger="click"
      visible={showContent}
      onVisibleChange={handlePopoverVisibilityChange}
    >
      <Button onClick={handleToggleShowContent}>
        <Icon role="img">⚠️</Icon>
      </Button>
    </Popover>
  )
}

export { TroubleshootingGuidesButton }
