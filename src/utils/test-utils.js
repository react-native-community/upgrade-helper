import fs from 'fs'
import puppeteer from 'puppeteer'
import { configureToMatchImageSnapshot } from 'jest-image-snapshot'

let browser
let page

const URLs = {
  RELEASES:
    'https://raw.githubusercontent.com/react-native-community/rn-diff-purge/master/RELEASES',
  DIFF: 'https://raw.githubusercontent.com/react-native-community/rn-diff-purge/diffs/diffs/0.62.2..0.63.3.diff',
  REPOSITORY_INFO:
    'https://api.github.com/repos/react-native-community/upgrade-helper',
}

const MOCK_RESPONSES = {
  [URLs.RELEASES]: () =>
    '0.64.2\n0.64.1\n0.64.0\n0.64.0-rc.3\n0.64.0-rc.2\n0.64.0-rc.1\n0.64.0-rc.0\n0.63.4\n0.63.3\n0.63.2\n0.63.1\n0.63.0\n0.62.2\n0.62.1',
  [URLs.DIFF]: () =>
    fs.readFileSync('./src/mocks/0.63.2..0.64.2.diff', 'utf-8'),
  [URLs.REPOSITORY_INFO]: () =>
    fs.readFileSync('./src/mocks/repositoryInfo.json', 'utf-8'),
}

const mockResponses = (request) => {
  const requestedURL = request.url()
  const mockedURLs = Object.keys(MOCK_RESPONSES)

  if (mockedURLs.includes(requestedURL)) {
    request.respond({
      headers: {
        'access-control-allow-origin': '*',
      },
      body: MOCK_RESPONSES[requestedURL](),
    })
  } else {
    request.continue()
  }
}

export const launchBrowser = async () => {
  browser = await puppeteer.launch({
    args: [
      // Required for Docker version of Puppeteer
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // This will write shared memory files into /tmp instead of /dev/shm,
      // because Docker’s default for /dev/shm is 64MB
      '--disable-dev-shm-usage',
    ],
  })

  page = await browser.newPage()

  await page.setRequestInterception(true)
  page.on('request', mockResponses)

  await page.goto('http://localhost:3000/')
  await page.setViewport({
    width: 1280,
    height: 720,
  })

  return {
    browser,
    page,
  }
}

export const closeBrowser = async () => {
  await browser.close()
}

export const waitToRender = ({ waitingTime = 500 } = {}) =>
  page.waitForTimeout(waitingTime)

export const toMatchImageSnapshot = configureToMatchImageSnapshot({
  comparisonMethod: 'ssim',
  failureThreshold: 0.0005,
  failureThresholdType: 'percent',
  allowSizeMismatch: true,
})
