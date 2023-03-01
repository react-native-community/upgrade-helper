import { launchBrowser, waitToRender, closeBrowser } from '../utils/test-utils'
import { testIDs as versionSelectorTestIDs } from '../components/common/VersionSelector'
import { testIDs as upgradeButtonTestIDs } from '../components/common/UpgradeButton'
import { testIDs as diffSectionTestIDs } from '../components/common/Diff/DiffSection'
import { testIDs as diffHeaderTestIDs } from '../components/common/Diff/DiffHeader'
import { testIDs as troubleshootingGuidesButtonTestIDs } from '../components/common/TroubleshootingGuidesButton'

describe('Home', () => {
  let page

  beforeAll(async () => {
    const browser = await launchBrowser()

    page = browser.page
  })

  afterAll(closeBrowser)

  const selectVersion = async (targetVersion) => {
    await page.evaluate((pageTargetVersion) => {
      const element = [
        ...document.querySelectorAll(
          '.ant-select-dropdown.ant-select-dropdown-placement-bottomLeft:not(.ant-select-dropdown-hidden) .ant-select-item-option-content'
        ),
      ].find(({ innerText: version }) => version === pageTargetVersion)

      element.click()
    }, targetVersion)
  }

  it('1. should load the top component with logo, versions and troubleshooting guides alert', async () => {
    await waitToRender()

    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })

  it('2. should hide the troubleshooting guides alert and show the troubleshooting guides', async () => {
    await page.click(
      `button[data-testid="${troubleshootingGuidesButtonTestIDs.troubleshootingGuidesButton}"]`
    )

    await waitToRender()

    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })

  it('3. should hide the troubleshooting guides and show the normal header', async () => {
    await page.click(
      `button[data-testid="${troubleshootingGuidesButtonTestIDs.troubleshootingGuidesButton}"]`
    )

    await waitToRender()

    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })

  it('4. should load the current versions', async () => {
    await page.click(
      `div[data-testid="${versionSelectorTestIDs.fromVersionSelector}"] input`
    )

    await waitToRender()

    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })

  it('5. should select a current version', async () => {
    await selectVersion('0.63.2')

    await waitToRender()

    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })

  it('6. should load the upgrading versions', async () => {
    await page.click(
      `div[data-testid="${versionSelectorTestIDs.toVersionSelector}"] input`
    )

    await waitToRender()

    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })

  it('7. should select an upgrading version', async () => {
    await selectVersion('0.64.2')
    await waitToRender()

    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })

  it('8. should load the upgrading content', async () => {
    await page.click(`[data-testid="${upgradeButtonTestIDs.upgradeButton}"]`)
    await waitToRender()

    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })

  it('9. should scroll to the first file in diff', async () => {
    await page.evaluate((testID) => {
      document
        .querySelector(`[data-testid="${testID}"]`)
        .querySelector('div')
        .scrollIntoView()
    }, diffSectionTestIDs.diffSection)

    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })

  it('10. should collapse first file in diff', async () => {
    await page.click(
      `[data-testid="${diffHeaderTestIDs.collapseClickableArea}"]`
    )

    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })
})
