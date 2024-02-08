interface Window {}

interface Process {
  env: {
    PUBLIC_URL: string
    NODE_ENV: 'development' | 'production'
  }
}
