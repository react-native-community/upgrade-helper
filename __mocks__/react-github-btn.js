// This mock is here because `react-github-btn` is not compiled in npm and CRA
// doesn't support `transformIgnorePatterns` (to compile it) out-of-the-box for Jest
import React from 'react'

export default ({ children }) => <div>ReactGitHubBtn - {children}</div>
