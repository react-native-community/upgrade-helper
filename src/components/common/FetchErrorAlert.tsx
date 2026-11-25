import React from 'react'
import { Alert, Button, Typography } from 'antd'
import type { FetchErrorState } from '../../hooks/fetch-utils'

const { Text } = Typography

const buildDescription = (error: FetchErrorState) => (
  <div>
    <div>{error.description}</div>
    {error.url && (
      <Text type="secondary" copyable={{ text: error.url }}>
        {error.url}
      </Text>
    )}
  </div>
)

const FetchErrorAlert = ({
  error,
  onRetry,
}: {
  error: FetchErrorState
  onRetry: () => void
}) => (
  <Alert
    type="error"
    showIcon
    message={error.title}
    description={buildDescription(error)}
    action={<Button onClick={onRetry}>Retry</Button>}
  />
)

export default FetchErrorAlert
