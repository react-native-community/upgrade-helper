import { PACKAGE_NAMES } from '../constants'
import { parseDiff } from 'react-diff-view'
import '../releases/__mocks__/index'
import {
  getVersionsContentInDiff,
  replaceAppDetails,
  getChangelogURL,
  buildAiUpgradePrompt,
} from '../utils'

describe('getVersionsContentInDiff', () => {
  it('returns the versions in the provided range', () => {
    const versions = getVersionsContentInDiff({
      packageName: PACKAGE_NAMES.RN,
      fromVersion: '0.57.0',
      toVersion: '0.59.0',
    })

    expect(versions).toEqual([{ version: '0.59' }, { version: '0.58' }])
  })

  it('returns the versions in the provided range with release candidates', () => {
    const versions = getVersionsContentInDiff({
      packageName: PACKAGE_NAMES.RN,
      fromVersion: '0.56.0',
      toVersion: '0.59.0-rc.1',
    })

    expect(versions).toEqual([
      { version: '0.59' },
      { version: '0.58' },
      { version: '0.57' },
    ])
  })

  it('returns the versions in the provided range with patches specified', () => {
    const versions = getVersionsContentInDiff({
      packageName: PACKAGE_NAMES.RN,
      fromVersion: '0.57.2',
      toVersion: '0.59.9',
    })

    expect(versions).toEqual([{ version: '0.59' }, { version: '0.58' }])
  })
})

describe('getChangelogURL', () => {
  const { RN, RNM, RNW } = PACKAGE_NAMES
  test.each([
    [
      RN,
      '0.71.7',
      'https://github.com/facebook/react-native/blob/main/CHANGELOG.md#v0717',
    ],
    [
      RN,
      '0.71.6',
      'https://github.com/facebook/react-native/blob/main/CHANGELOG.md#v0716',
    ],
    [
      RNM,
      '0.71.5',
      'https://github.com/microsoft/react-native-macos/releases/tag/v0.71.5',
    ],
    [
      RNW,
      '0.71.4',
      'https://github.com/microsoft/react-native-windows/releases/tag/react-native-windows_v0.71.4',
    ],
  ])('getChangelogURL("%s", "%s") -> %s', (packageName, version, url) => {
    expect(getChangelogURL({ packageName, version })).toEqual(url)
  })
})

describe('replaceAppDetails ', () => {
  test.each([
    // Don't change anything if no app name or package is passed.
    [
      'RnDiffApp/ios/RnDiffApp/main.m',
      '',
      '',
      'RnDiffApp/ios/RnDiffApp/main.m',
    ],
    [
      'android/app/src/debug/java/com/rndiffapp/ReactNativeFlipper.java',
      '',
      '',
      'android/app/src/debug/java/com/rndiffapp/ReactNativeFlipper.java',
    ],
    [
      'location = "group:RnDiffApp.xcodeproj">',
      '',
      '',
      'location = "group:RnDiffApp.xcodeproj">',
    ],
    // Update Java file path with correct app name and package.
    [
      'android/app/src/debug/java/com/rndiffapp/ReactNativeFlipper.java',
      'SuperApp',
      'au.org.mycorp',
      'android/app/src/debug/java/au/org/mycorp/ReactNativeFlipper.java',
    ],
    // Update the app details in file contents.
    [
      'location = "group:RnDiffApp.xcodeproj">',
      'MyFancyApp',
      '',
      'location = "group:MyFancyApp.xcodeproj">',
    ],
    [
      'applicationId "com.rndiffapp"',
      'ACoolApp',
      'net.foobar',
      'applicationId "net.foobar"',
    ],
    // Don't accidentally pick up other instances of "com" such as in domain
    // names, or android or facebook packages.
    [
      'apply plugin: "com.android.application"',
      'ACoolApp',
      'net.foobar',
      'apply plugin: "com.android.application"',
    ],
    [
      '* https://github.com/facebook/react-native',
      'ACoolApp',
      'net.foobar',
      '* https://github.com/facebook/react-native',
    ],
  ])(
    'replaceAppDetails("%s", "%s", "%s") -> %s',
    (path, appName, appPackage, newPath) => {
      expect(replaceAppDetails(path, appName, appPackage)).toEqual(newPath)
    }
  )
})

describe('buildAiUpgradePrompt', () => {
  const createFiles = (rawDiffText: string) => parseDiff(rawDiffText)
  const createPrompt = (
    overrides: Partial<Parameters<typeof buildAiUpgradePrompt>[0]>
  ) =>
    buildAiUpgradePrompt({
      files: [],
      packageName: PACKAGE_NAMES.RN,
      language: 'cpp',
      fromVersion: '0.63.2',
      toVersion: '0.64.2',
      ...overrides,
    })

  it('includes overview, warnings, and structured file changes', () => {
    const prompt = createPrompt({
      files: createFiles(
        [
          'diff --git a/RnDiffApp/App.js b/RnDiffApp/App.js',
          '--- a/RnDiffApp/App.js',
          '+++ b/RnDiffApp/App.js',
          '@@ -1 +1 @@',
          '-package com.rndiffapp;',
          '+package com.rndiffapp;',
        ].join('\n')
      ),
      appName: 'MyApp',
      appPackage: 'com.example.myapp',
    })

    expect(prompt).toContain(
      'You are helping upgrade a React Native app using the provided template diff.'
    )
    expect(prompt).toContain('# React Native upgrade guidance request')
    expect(prompt).toContain('## Task overview')
    expect(prompt).toContain('- From version: 0.63.2')
    expect(prompt).toContain('- To version: 0.64.2')
    expect(prompt).toContain('- App name input or fallback: MyApp')
    expect(prompt).toContain(
      '- App package input or fallback: com.example.myapp'
    )
    expect(prompt).toContain(
      'The app name and app package values may be inaccurate because the user may have left them unchanged, blank, or approximate. Verify them against the real project before applying changes.'
    )
    expect(prompt).toContain(
      'This diff only represents the React Native bootstrap/template project between versions. First understand the current project structure and apply only the changes that are relevant to this codebase.'
    )
    expect(prompt).toContain('\n\n## Task overview')
    expect(prompt).toContain('## File changes')
    expect(prompt).toContain('\n\n### `App.js`')
    expect(prompt).toContain('### `App.js`')
    expect(prompt).toContain('- Change type: Modified')
    expect(prompt).toContain('```diff')
    expect(prompt).toContain('```')
    expect(prompt).toContain('-package com.example.myapp;')
  })

  it('omits binary patch contents and adds download guidance', () => {
    const prompt = createPrompt({
      files: createFiles(
        [
          'diff --git a/RnDiffApp/android/gradle/wrapper/gradle-wrapper.jar b/RnDiffApp/android/gradle/wrapper/gradle-wrapper.jar',
          'index abc..def 100644',
          'Binary files a/RnDiffApp/android/gradle/wrapper/gradle-wrapper.jar and b/RnDiffApp/android/gradle/wrapper/gradle-wrapper.jar differ',
          'diff --git a/RnDiffApp/App.js b/RnDiffApp/App.js',
          '--- a/RnDiffApp/App.js',
          '+++ b/RnDiffApp/App.js',
          '@@ -1 +1 @@',
          '-console.log("old")',
          '+console.log("new")',
        ].join('\n')
      ),
    })

    expect(prompt).toContain('## Binary file handling')
    expect(prompt).toContain(
      '\n\n### `android/gradle/wrapper/gradle-wrapper.jar`'
    )
    expect(prompt).toContain('### `android/gradle/wrapper/gradle-wrapper.jar`')
    expect(prompt).toContain('```bash')
    expect(prompt).toContain(
      'curl -L "https://raw.githubusercontent.com/react-native-community/rn-diff-purge/release/0.64.2/RnDiffApp/android/gradle/wrapper/gradle-wrapper.jar" -o "android/gradle/wrapper/gradle-wrapper.jar"'
    )
    expect(prompt).not.toContain(
      'Binary files a/RnDiffApp/android/gradle/wrapper/gradle-wrapper.jar'
    )
    expect(prompt).toContain('### `App.js`')
  })

  it('tells the agent to remove deleted binary files instead of downloading them', () => {
    const prompt = createPrompt({
      files: createFiles(
        [
          'diff --git a/RnDiffApp/android/app/src/main/res/mipmap-hdpi/ic_launcher.png b/RnDiffApp/android/app/src/main/res/mipmap-hdpi/ic_launcher.png',
          'deleted file mode 100644',
          'index abcdef..000000',
          'Binary files a/RnDiffApp/android/app/src/main/res/mipmap-hdpi/ic_launcher.png and /dev/null differ',
        ].join('\n')
      ),
    })

    expect(prompt).toContain(
      '\n\n### `android/app/src/main/res/mipmap-hdpi/ic_launcher.png`'
    )
    expect(prompt).toContain(
      '### `android/app/src/main/res/mipmap-hdpi/ic_launcher.png`'
    )
    expect(prompt).toContain(
      '- Remove this file from the target project if it still exists.'
    )
    expect(prompt).not.toContain('raw.githubusercontent.com')
  })
})
