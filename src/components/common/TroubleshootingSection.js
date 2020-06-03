import React, { useState } from 'react'
import semver from 'semver'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import Section from './Sections/Section'
import { Button } from 'antd'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'

// URL: https://api.github.com/repos/react-native-community/upgrade-support/issues?labels=%F0%9F%92%AA%20Solution

const issuesMock = [
  {
    url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/55',
    repository_url:
      'https://api.github.com/repos/react-native-community/upgrade-support',
    labels_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/55/labels{/name}',
    comments_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/55/comments',
    events_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/55/events',
    html_url:
      'https://github.com/react-native-community/upgrade-support/issues/55',
    id: 600137925,
    node_id: 'MDU6SXNzdWU2MDAxMzc5MjU=',
    number: 55,
    title: 'PodFile Multiple targets break Flipper support  ',
    user: {
      login: 'TheSolly',
      id: 31882844,
      node_id: 'MDQ6VXNlcjMxODgyODQ0',
      avatar_url: 'https://avatars0.githubusercontent.com/u/31882844?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/TheSolly',
      html_url: 'https://github.com/TheSolly',
      followers_url: 'https://api.github.com/users/TheSolly/followers',
      following_url:
        'https://api.github.com/users/TheSolly/following{/other_user}',
      gists_url: 'https://api.github.com/users/TheSolly/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/TheSolly/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/TheSolly/subscriptions',
      organizations_url: 'https://api.github.com/users/TheSolly/orgs',
      repos_url: 'https://api.github.com/users/TheSolly/repos',
      events_url: 'https://api.github.com/users/TheSolly/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/TheSolly/received_events',
      type: 'User',
      site_admin: false
    },
    labels: [
      {
        id: 1972076202,
        node_id: 'MDU6TGFiZWwxOTcyMDc2MjAy',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/0.62.2',
        name: '0.62.2',
        color: 'cfd3d7',
        default: false,
        description: null
      },
      {
        id: 1586214659,
        node_id: 'MDU6TGFiZWwxNTg2MjE0NjU5',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/%F0%9F%92%AA%20Solution',
        name: '💪 Solution',
        color: 'acf2bd',
        default: false,
        description: ''
      }
    ],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 16,
    created_at: '2020-04-14T17:35:27Z',
    updated_at: '2020-04-21T12:20:12Z',
    closed_at: null,
    author_association: 'NONE',
    body:
      "## Environment\r\n\r\n<!-- Run `react-native info` in your terminal and paste its contents here. -->\r\n\r\n```\r\nSystem:\r\n    OS: macOS 10.15.4\r\n    CPU: (12) x64 Intel(R) Core(TM) i7-8850H CPU @ 2.60GHz\r\n    Memory: 24.69 MB / 16.00 GB\r\n    Shell: 5.7.1 - /bin/zsh\r\n  Binaries:\r\n    Node: 10.13.0 - ~/.nvm/versions/node/v10.13.0/bin/node\r\n    Yarn: 1.22.4 - /usr/local/bin/yarn\r\n    npm: 6.4.1 - ~/.nvm/versions/node/v10.13.0/bin/npm\r\n    Watchman: 4.9.0 - /usr/local/bin/watchman\r\n  Managers:\r\n    CocoaPods: 1.9.1 - /usr/local/bin/pod\r\n  SDKs:\r\n    iOS SDK:\r\n      Platforms: iOS 13.4, DriverKit 19.0, macOS 10.15, tvOS 13.4, watchOS 6.2\r\n    Android SDK: Not Found\r\n  IDEs:\r\n    Android Studio: Not Found\r\n    Xcode: 11.4/11E146 - /usr/bin/xcodebuild\r\n  Languages:\r\n    Java: 10.0.2 - /usr/bin/javac\r\n    Python: 2.7.17 - /usr/local/bin/python\r\n  npmPackages:\r\n    @react-native-community/cli: Not Found\r\n    react: 16.11.0 => 16.11.0\r\n    react-native: 0.62.2 => 0.62.2\r\n  npmGlobalPackages:\r\n    *react-native*: Not Found\r\n```\r\n\r\n## Upgrading version\r\n\r\n<!-- Specify to which version you are upgrading to. -->\r\n\r\nfrom=0.61.5 --> to=0.62.2\r\n\r\n## Description\r\n\r\n<!--\r\n  Please describe your issue in detail, include screenshots if needed.\r\n-->\r\n\r\nI am Having multiple target in the PodFile, and according to the upgrade helper process i should put this code inside the my target for Flipper.\r\n\r\n```\r\ntarget 'RnDiffApp' do\r\n...\r\nadd_flipper_pods!\r\npost_install do |installer|\r\n  flipper_post_install(installer)\r\nend\r\n...\r\nend\r\n```\r\n\r\nTrying to add the same piece of code into my other target **Prod** like this:\r\n\r\n```\r\ntarget 'RnDiffAppProd' do\r\n...\r\nadd_flipper_pods!\r\npost_install do |installer|\r\n  flipper_post_install(installer)\r\nend\r\n...\r\nend\r\n```\r\n\r\nWhen running `pod install` i got the following error:\r\n\r\n```\r\n[!] Invalid `Podfile` file: [!] Specifying multiple `post_install` hooks is unsupported\r\n```\r\n\r\nAccording to this issue [6172](https://github.com/CocoaPods/CocoaPods/issues/6172) CocoaPods doesn't support multiple `post_install` hooks.\r\n\r\nTo solve this issue, i had to rewrite the code as below:\r\n\r\n```\r\ntarget 'RnDiffApp' do\r\n....\r\nend\r\ntarget 'RnDiffAppProd' do\r\n....\r\nend\r\nadd_flipper_pods!\r\npost_install do |installer|\r\n  flipper_post_install(installer)\r\nend\r\n```\r\n\r\nSo far both my target build successfully in debug mode with flipper support.\r\n\r\nIMO, this should be the default way to insert the `post-install` hook for Flipper in the upgrade helper.\r\n\r\n"
  },
  {
    url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/39',
    repository_url:
      'https://api.github.com/repos/react-native-community/upgrade-support',
    labels_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/39/labels{/name}',
    comments_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/39/comments',
    events_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/39/events',
    html_url:
      'https://github.com/react-native-community/upgrade-support/issues/39',
    id: 594746571,
    node_id: 'MDU6SXNzdWU1OTQ3NDY1NzE=',
    number: 39,
    title: 'LogBox Error at the beginning of the application',
    user: {
      login: 'mateusmirandaalmeida',
      id: 13368319,
      node_id: 'MDQ6VXNlcjEzMzY4MzE5',
      avatar_url: 'https://avatars3.githubusercontent.com/u/13368319?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/mateusmirandaalmeida',
      html_url: 'https://github.com/mateusmirandaalmeida',
      followers_url:
        'https://api.github.com/users/mateusmirandaalmeida/followers',
      following_url:
        'https://api.github.com/users/mateusmirandaalmeida/following{/other_user}',
      gists_url:
        'https://api.github.com/users/mateusmirandaalmeida/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/mateusmirandaalmeida/starred{/owner}{/repo}',
      subscriptions_url:
        'https://api.github.com/users/mateusmirandaalmeida/subscriptions',
      organizations_url:
        'https://api.github.com/users/mateusmirandaalmeida/orgs',
      repos_url: 'https://api.github.com/users/mateusmirandaalmeida/repos',
      events_url:
        'https://api.github.com/users/mateusmirandaalmeida/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/mateusmirandaalmeida/received_events',
      type: 'User',
      site_admin: false
    },
    labels: [
      {
        id: 1959162476,
        node_id: 'MDU6TGFiZWwxOTU5MTYyNDc2',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/0.62.1',
        name: '0.62.1',
        color: 'cfd3d7',
        default: false,
        description: null
      },
      {
        id: 1586214659,
        node_id: 'MDU6TGFiZWwxNTg2MjE0NjU5',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/%F0%9F%92%AA%20Solution',
        name: '💪 Solution',
        color: 'acf2bd',
        default: false,
        description: ''
      }
    ],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 0,
    created_at: '2020-04-06T01:30:14Z',
    updated_at: '2020-04-06T01:30:38Z',
    closed_at: null,
    author_association: 'NONE',
    body:
      "## Environment\r\n\r\n```\r\nSystem:\r\n    OS: macOS Mojave 10.14.6\r\n    CPU: (4) x64 Intel(R) Core(TM) i5-6267U CPU @ 2.90GHz\r\n    Memory: 41.38 MB / 8.00 GB\r\n    Shell: 5.3 - /bin/zsh\r\n  Binaries:\r\n    Node: 10.16.0 - ~/.nvm/versions/node/v10.16.0/bin/node\r\n    Yarn: 1.3.2 - /usr/local/bin/yarn\r\n    npm: 6.9.0 - ~/.nvm/versions/node/v10.16.0/bin/npm\r\n  SDKs:\r\n    iOS SDK:\r\n      Platforms: iOS 13.2, DriverKit 19.0, macOS 10.15, tvOS 13.2, watchOS 6.1\r\n    Android SDK:\r\n      API Levels: 21, 22, 23, 24, 25, 26, 27, 28\r\n      Build Tools: 19.1.0, 23.0.1, 27.0.2, 27.0.3, 28.0.3, 29.0.0\r\n      Android NDK: 20.0.5594570\r\n  IDEs:\r\n    Android Studio: 3.1 AI-173.4697961\r\n    Xcode: 11.2.1/11B53 - /usr/bin/xcodebuild\r\n  npmPackages:\r\n    react: 16.11.0 => 16.11.0 \r\n    react-native: 0.62.1 => 0.62.1 \r\n  npmGlobalPackages:\r\n    react-native: 0.61.5\r\n```\r\n## Upgrading version\r\n\r\n0.62.1\r\n\r\n## Problem\r\n\r\nLogBox must be enabled before AppContainer is required so that it can properly wrap the console methods.\r\n\r\n## Solution\r\n\r\nAs usual we separate the code inside the \"src\" folder.\r\nIn the index.js file at the root of the project, we call it as follows:\r\n```javascript\r\nrequire('react-native').unstable_enableLogBox()\r\n...\r\nimport { App } from './src'\r\n```\r\nFor me this generated the above error.\r\nTo resolve, change the \"import\" to \"require\"\r\nExample:\r\n```javascript\r\nrequire('react-native').unstable_enableLogBox()\r\n...\r\nconst { App } = require('./src')\r\n```\r\n"
  },
  {
    url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/37',
    repository_url:
      'https://api.github.com/repos/react-native-community/upgrade-support',
    labels_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/37/labels{/name}',
    comments_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/37/comments',
    events_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/37/events',
    html_url:
      'https://github.com/react-native-community/upgrade-support/issues/37',
    id: 593588702,
    node_id: 'MDU6SXNzdWU1OTM1ODg3MDI=',
    number: 37,
    title: 'Fixing issue with Open-SSL bitcode',
    user: {
      login: 'EricWiener',
      id: 18071029,
      node_id: 'MDQ6VXNlcjE4MDcxMDI5',
      avatar_url: 'https://avatars3.githubusercontent.com/u/18071029?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/EricWiener',
      html_url: 'https://github.com/EricWiener',
      followers_url: 'https://api.github.com/users/EricWiener/followers',
      following_url:
        'https://api.github.com/users/EricWiener/following{/other_user}',
      gists_url: 'https://api.github.com/users/EricWiener/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/EricWiener/starred{/owner}{/repo}',
      subscriptions_url:
        'https://api.github.com/users/EricWiener/subscriptions',
      organizations_url: 'https://api.github.com/users/EricWiener/orgs',
      repos_url: 'https://api.github.com/users/EricWiener/repos',
      events_url: 'https://api.github.com/users/EricWiener/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/EricWiener/received_events',
      type: 'User',
      site_admin: false
    },
    labels: [
      {
        id: 1936950233,
        node_id: 'MDU6TGFiZWwxOTM2OTUwMjMz',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/0.62.0',
        name: '0.62.0',
        color: 'cfd3d7',
        default: false,
        description: null
      },
      {
        id: 1586214659,
        node_id: 'MDU6TGFiZWwxNTg2MjE0NjU5',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/%F0%9F%92%AA%20Solution',
        name: '💪 Solution',
        color: 'acf2bd',
        default: false,
        description: ''
      }
    ],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 0,
    created_at: '2020-04-03T19:19:11Z',
    updated_at: '2020-04-06T07:25:50Z',
    closed_at: null,
    author_association: 'NONE',
    body:
      '## Environment\r\n```\r\nSystem:\r\n    OS: macOS 10.15.4\r\n    CPU: (16) x64 Intel(R) Core(TM) i9-9980HK CPU @ 2.40GHz\r\n    Memory: 986.72 MB / 32.00 GB\r\n    Shell: 5.7.1 - /bin/zsh\r\n  Binaries:\r\n    Node: 10.16.0 - /usr/local/bin/node\r\n    Yarn: 1.22.0 - /usr/local/bin/yarn\r\n    npm: 6.13.7 - /usr/local/bin/npm\r\n    Watchman: 4.9.0 - /usr/local/bin/watchman\r\n  Managers:\r\n    CocoaPods: 1.9.1 - /usr/local/bin/pod\r\n  SDKs:\r\n    iOS SDK:\r\n      Platforms: iOS 13.4, DriverKit 19.0, macOS 10.15, tvOS 13.4, watchOS 6.2\r\n    Android SDK:\r\n      API Levels: 26, 28, 29\r\n      Build Tools: 28.0.3, 29.0.3\r\n      System Images: android-28 | Intel x86 Atom, android-28 | Intel x86 Atom_64, android-28 | Google APIs Intel x86 Atom, android-28 | Google Play Intel x86 Atom, android-29 | Google APIs Intel x86 Atom\r\n      Android NDK: Not Found\r\n  IDEs:\r\n    Android Studio: 3.5 AI-191.8026.42.35.6010548\r\n    Xcode: 11.4/11E146 - /usr/bin/xcodebuild\r\n  Languages:\r\n    Python: 3.7.3 - /Users/ericwiener/anaconda3/bin/python\r\n  npmPackages:\r\n    @react-native-community/cli: Not Found\r\n    react: Not Found\r\n    react-native: Not Found\r\n  npmGlobalPackages:\r\n    *react-native*: Not Found\r\n```\r\n## Upgrading version\r\nUpgrading from 0.61.5 to 0.62.0\r\n\r\n## Problem\r\nRecieved the error: \r\n```\r\n\'.../ios/Pods/OpenSSL-Universal/ios/lib/libcrypto.a(bio_lib.o)\' does not contain bitcode. \r\nYou must rebuild it with bitcode enabled (Xcode setting ENABLE_BITCODE), \r\nobtain an updated library from the vendor, or disable bitcode for this target. for architecture arm64\r\n```\r\n## Solution\r\nFor all your targets you need to go to Build Settings -> Enable Bitcode. Set Debug to NO and Release to Yes.\r\n\r\n<img width="585" alt="Screen Shot 2020-04-03 at 3 12 14 PM" src="https://user-images.githubusercontent.com/18071029/78396988-5c3da000-75be-11ea-8c28-f6940cbb82d1.png">\r\n'
  },
  {
    url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/33',
    repository_url:
      'https://api.github.com/repos/react-native-community/upgrade-support',
    labels_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/33/labels{/name}',
    comments_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/33/comments',
    events_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/33/events',
    html_url:
      'https://github.com/react-native-community/upgrade-support/issues/33',
    id: 593093596,
    node_id: 'MDU6SXNzdWU1OTMwOTM1OTY=',
    number: 33,
    title:
      "0.62 Build error: 'ld: library not found for -lPods-[AppName]-AppNameTests'",
    user: {
      login: 'ccfz',
      id: 6050682,
      node_id: 'MDQ6VXNlcjYwNTA2ODI=',
      avatar_url: 'https://avatars0.githubusercontent.com/u/6050682?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/ccfz',
      html_url: 'https://github.com/ccfz',
      followers_url: 'https://api.github.com/users/ccfz/followers',
      following_url: 'https://api.github.com/users/ccfz/following{/other_user}',
      gists_url: 'https://api.github.com/users/ccfz/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/ccfz/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/ccfz/subscriptions',
      organizations_url: 'https://api.github.com/users/ccfz/orgs',
      repos_url: 'https://api.github.com/users/ccfz/repos',
      events_url: 'https://api.github.com/users/ccfz/events{/privacy}',
      received_events_url: 'https://api.github.com/users/ccfz/received_events',
      type: 'User',
      site_admin: false
    },
    labels: [
      {
        id: 1936950233,
        node_id: 'MDU6TGFiZWwxOTM2OTUwMjMz',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/0.62.0',
        name: '0.62.0',
        color: 'cfd3d7',
        default: false,
        description: null
      },
      {
        id: 1586214659,
        node_id: 'MDU6TGFiZWwxNTg2MjE0NjU5',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/%F0%9F%92%AA%20Solution',
        name: '💪 Solution',
        color: 'acf2bd',
        default: false,
        description: ''
      }
    ],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 0,
    created_at: '2020-04-03T05:44:28Z',
    updated_at: '2020-04-03T05:46:34Z',
    closed_at: null,
    author_association: 'NONE',
    body:
      '## Environment\r\n\r\n```\r\n    OS: macOS 10.15.4\r\n    CPU: (8) x64 Intel(R) Core(TM) i5-8259U CPU @ 2.30GHz\r\n    Memory: 355.68 MB / 16.00 GB\r\n    Shell: 5.7.1 - /bin/zsh\r\n  Binaries:\r\n    Node: 13.11.0 - /var/folders/vs/2mgym3v938b0tdl4jj7dkw900000gn/T/yarn--1585892597011-0.5218117306373009/node\r\n    Yarn: 1.22.4 - /var/folders/vs/2mgym3v938b0tdl4jj7dkw900000gn/T/yarn--1585892597011-0.5218117306373009/yarn\r\n    npm: 6.13.7 - /usr/local/bin/npm\r\n    Watchman: 4.9.0 - /usr/local/bin/watchman\r\n  Managers:\r\n    CocoaPods: 1.6.1 - /Users/caspar/.rvm/gems/ruby-2.6.6/bin/pod\r\n  SDKs:\r\n    iOS SDK:\r\n      Platforms: iOS 13.4, DriverKit 19.0, macOS 10.15, tvOS 13.4, watchOS 6.2\r\n    Android SDK:\r\n      API Levels: 28, 29\r\n      Build Tools: 28.0.3, 29.0.0, 29.0.1\r\n      System Images: android-28 | Google Play Intel x86 Atom, android-29 | Intel x86 Atom_64\r\n      Android NDK: Not Found\r\n  IDEs:\r\n    Android Studio: 3.6 AI-192.7142.36.36.6241897\r\n    Xcode: 11.4/11E146 - /usr/bin/xcodebuild\r\n  Languages:\r\n    Python: 2.7.16 - /usr/bin/python\r\n  npmPackages:\r\n    @react-native-community/cli: Not Found\r\n    react: 16.13.0 => 16.13.0 \r\n    react-native: 0.62.0 => 0.62.0 \r\n```\r\n## Upgrading version\r\n\r\n0.62\r\n\r\n## Problem\r\n\r\nBuild error: \'ld: library not found for -lPods-[AppName]-AppNameTests\'\r\n\r\n## Solution\r\nNot entirely sure what the root cause for this error is but this bug is a result of an obsolete framework file. My guess, this is related to switching the `target: [App]Test` in the Podfile from `inherit! :search_paths`to `inherit! :complete`.\r\n\r\nTo solve this error:\r\n1. Open your project in XCode\r\n2. Open the Framework directory\r\n3. Delete the obsolete framework file that causes the error, should be equal to the file name referenced in the error message. \r\n4. Clean build.\r\n\r\n<img width="374" alt="Screenshot 2020-04-03 at 07 15 55" src="https://user-images.githubusercontent.com/6050682/78327843-1234ca00-757e-11ea-975e-d77de21fcccc.png">\r\n\r\n'
  },
  {
    url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/31',
    repository_url:
      'https://api.github.com/repos/react-native-community/upgrade-support',
    labels_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/31/labels{/name}',
    comments_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/31/comments',
    events_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/31/events',
    html_url:
      'https://github.com/react-native-community/upgrade-support/issues/31',
    id: 592654441,
    node_id: 'MDU6SXNzdWU1OTI2NTQ0NDE=',
    number: 31,
    title:
      'ClassNotFoundException: Didn\'t find class "com.facebook.jni.NativeRunnable"',
    user: {
      login: 'd4vidi',
      id: 9818880,
      node_id: 'MDQ6VXNlcjk4MTg4ODA=',
      avatar_url: 'https://avatars2.githubusercontent.com/u/9818880?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/d4vidi',
      html_url: 'https://github.com/d4vidi',
      followers_url: 'https://api.github.com/users/d4vidi/followers',
      following_url:
        'https://api.github.com/users/d4vidi/following{/other_user}',
      gists_url: 'https://api.github.com/users/d4vidi/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/d4vidi/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/d4vidi/subscriptions',
      organizations_url: 'https://api.github.com/users/d4vidi/orgs',
      repos_url: 'https://api.github.com/users/d4vidi/repos',
      events_url: 'https://api.github.com/users/d4vidi/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/d4vidi/received_events',
      type: 'User',
      site_admin: false
    },
    labels: [
      {
        id: 1936950233,
        node_id: 'MDU6TGFiZWwxOTM2OTUwMjMz',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/0.62.0',
        name: '0.62.0',
        color: 'cfd3d7',
        default: false,
        description: null
      },
      {
        id: 1586214659,
        node_id: 'MDU6TGFiZWwxNTg2MjE0NjU5',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/%F0%9F%92%AA%20Solution',
        name: '💪 Solution',
        color: 'acf2bd',
        default: false,
        description: ''
      }
    ],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 1,
    created_at: '2020-04-02T13:58:24Z',
    updated_at: '2020-04-17T18:30:36Z',
    closed_at: null,
    author_association: 'NONE',
    body:
      '## Environment\r\n\r\n```\r\nSystem:\r\n    OS: macOS Mojave 10.14.6\r\n    CPU: (16) x64 Intel(R) Core(TM) i9-9880H CPU @ 2.30GHz\r\n    Memory: 19.86 MB / 16.00 GB\r\n    Shell: 3.2.57 - /bin/bash\r\n  Binaries:\r\n    Node: 10.15.3 - ~/.nvm/versions/node/v10.15.3/bin/node\r\n    Yarn: 1.3.2 - /usr/local/bin/yarn\r\n    npm: 6.14.2 - ~/.nvm/versions/node/v10.15.3/bin/npm\r\n    Watchman: 4.9.0 - /usr/local/bin/watchman\r\n  Managers:\r\n    CocoaPods: 1.8.4 - /usr/local/bin/pod\r\n  SDKs:\r\n    iOS SDK:\r\n      Platforms: iOS 13.2, DriverKit 19.0, macOS 10.15, tvOS 13.2, watchOS 6.1\r\n    Android SDK:\r\n      API Levels: 19, 21, 22, 23, 24, 25, 26, 27, 28, 29\r\n      Build Tools: 19.1.0, 20.0.0, 21.1.2, 22.0.1, 23.0.1, 23.0.2, 23.0.3, 24.0.1, 25.0.0, 25.0.1, 25.0.2, 25.0.3, 26.0.0, 26.0.1, 26.0.2, 26.0.3, 27.0.1, 27.0.3, 28.0.0, 28.0.2, 28.0.3, 29.0.0\r\n      System Images: android-25 | Google APIs Intel x86 Atom_64, android-26 | Google APIs Intel x86 Atom, android-26 | Google Play Intel x86 Atom, android-28 | Intel x86 Atom_64, android-28 | Google Play Intel x86 Atom, android-29 | Google APIs Intel x86 Atom\r\n      Android NDK: 19.2.5345600\r\n  IDEs:\r\n    Android Studio: 3.5 AI-191.8026.42.35.6010548\r\n    Xcode: 11.3/11C29 - /usr/bin/xcodebuild\r\n  Languages:\r\n    Python: 2.7.15 - /usr/local/bin/python\r\n  npmPackages:\r\n    @react-native-community/cli: Not Found\r\n    react: 16.11.0 => 16.11.0\r\n    react-native: 0.62.x => 0.62.0\r\n  npmGlobalPackages:\r\n    *react-native*: Not Found\r\n```\r\n\r\n## Upgrading version\r\n\r\n`0.61.x` -> `0.62.0`\r\n\r\n## Problem\r\n\r\nException after most Android-native related upgrade changes are in-effect:\r\n```\r\n04-02 16:45:09.984   5599     5629                    log  E  error java.lang.ClassNotFoundException: Didn\'t find class "com.facebook.jni.NativeRunnable" on path: DexPathList[[zip file "/syste\r\n                                                            m/framework/android.test.runner.jar", zip file "/system/framework/android.test.mock.jar", zip file "/data/app/<package-id> \r\n                                                            -4_Awll2XOObiNOIzAi-1mg==/base.apk", zip file "/data/app/<package>-MKSEeZ2AT76gKeeTnKiTPQ==/base.apk"],nativeLibraryDi\r\n                                                            rectories=[/data/app/<package-id>-4_Awll2XOObiNOIzAi-1mg==/lib/x86_64, /data/app/<package>-MKSEeZ2AT76gKeeTnKi\r\n                                                            TPQ==/lib/x86_64, /data/app/<package-id>-4_Awll2XOObiNOIzAi-1mg==/base.apk!/lib/x86_64, /data/app/<package>-MK\r\n                                                            SEeZ2AT76gKeeTnKiTPQ==/base.apk!/lib/x86_64, /system/lib64]]\r\n```\r\n(Ignored lots of consequent errors here)\r\n\r\n## Solution\r\n\r\nThis happens only when minification is enabled -- `com.facebook.jni.NativeRunnable` gets stripped out, and even though `NativeRunnable` has the `@DoNotStrip` annotation.\r\n\r\nThe problem is that RN\'s self proguard settings are incomplete. This section allegedly should do the trick here:\r\n```proguard\r\n# Do not strip any method/class that is annotated with @DoNotStrip\r\n-keep @com.facebook.proguard.annotations.DoNotStrip class *\r\n-keep @com.facebook.common.internal.DoNotStrip class *\r\n-keepclassmembers class * {\r\n    @com.facebook.proguard.annotations.DoNotStrip *;\r\n    @com.facebook.common.internal.DoNotStrip *;\r\n}\r\n```\r\n\r\nBut it doesn\'t. Adding this to your app\'s proguard rules should solve both that and potentially similar problems:\r\n\r\n```proguard\r\n-keep @com.facebook.jni.annotations.DoNotStrip class *\r\n-keep class * {\r\n    @com.facebook.proguard.annotations.DoNotStrip *;\r\n    @com.facebook.common.internal.DoNotStrip *;\r\n    @com.facebook.jni.annotations.DoNotStrip *;\r\n}\r\n-keepclassmembers class * {\r\n    @com.facebook.jni.annotations.DoNotStrip *;\r\n}\r\n```\r\nExplanation: there are several `DoNotStrip` annotations going around in RN\'s and its deps. In particular, this adds the missing `com.facebook.jni.annotations.DoNotStrip` annotation for keeping class members, and, more importantly, applies all known `DoNotStrip` over **classes** (that includes the `NativeRunnable` class).\r\n\r\nI\'ll consider PR-ing this.\r\n'
  },
  {
    url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/25',
    repository_url:
      'https://api.github.com/repos/react-native-community/upgrade-support',
    labels_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/25/labels{/name}',
    comments_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/25/comments',
    events_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/25/events',
    html_url:
      'https://github.com/react-native-community/upgrade-support/issues/25',
    id: 591311756,
    node_id: 'MDU6SXNzdWU1OTEzMTE3NTY=',
    number: 25,
    title:
      'Solution: Upgrading from 0.61.5 to 0.62.0 "Undefined symbol: _swift_getFunctionReplacement"',
    user: {
      login: 'chestercharles',
      id: 8016126,
      node_id: 'MDQ6VXNlcjgwMTYxMjY=',
      avatar_url: 'https://avatars1.githubusercontent.com/u/8016126?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/chestercharles',
      html_url: 'https://github.com/chestercharles',
      followers_url: 'https://api.github.com/users/chestercharles/followers',
      following_url:
        'https://api.github.com/users/chestercharles/following{/other_user}',
      gists_url: 'https://api.github.com/users/chestercharles/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/chestercharles/starred{/owner}{/repo}',
      subscriptions_url:
        'https://api.github.com/users/chestercharles/subscriptions',
      organizations_url: 'https://api.github.com/users/chestercharles/orgs',
      repos_url: 'https://api.github.com/users/chestercharles/repos',
      events_url:
        'https://api.github.com/users/chestercharles/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/chestercharles/received_events',
      type: 'User',
      site_admin: false
    },
    labels: [
      {
        id: 1936950233,
        node_id: 'MDU6TGFiZWwxOTM2OTUwMjMz',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/0.62.0',
        name: '0.62.0',
        color: 'cfd3d7',
        default: false,
        description: null
      },
      {
        id: 1586214659,
        node_id: 'MDU6TGFiZWwxNTg2MjE0NjU5',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/%F0%9F%92%AA%20Solution',
        name: '💪 Solution',
        color: 'acf2bd',
        default: false,
        description: ''
      }
    ],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 6,
    created_at: '2020-03-31T18:07:47Z',
    updated_at: '2020-04-13T13:45:34Z',
    closed_at: null,
    author_association: 'NONE',
    body:
      '## Environment\r\n```\r\nSystem:\r\n    OS: macOS 10.15.3\r\n    CPU: (12) x64 Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz\r\n    Memory: 123.51 MB / 16.00 GB\r\n    Shell: 3.2.57 - /bin/bash\r\n  Binaries:\r\n    Node: 12.14.0 - /usr/local/bin/node\r\n    Yarn: 1.22.4 - /usr/local/bin/yarn\r\n    npm: 6.13.4 - /usr/local/bin/npm\r\n    Watchman: 4.9.0 - /usr/local/bin/watchman\r\n  SDKs:\r\n    iOS SDK:\r\n      Platforms: iOS 13.4, DriverKit 19.0, macOS 10.15, tvOS 13.4, watchOS 6.2\r\n    Android SDK:\r\n      API Levels: 23, 25, 26, 27, 28, 29\r\n      Build Tools: 23.0.1, 25.0.3, 26.0.1, 27.0.3, 28.0.3, 29.0.0\r\n      System Images: android-19 | ARM EABI v7a, android-19 | Google APIs ARM EABI v7a, android-27 | Google APIs Intel x86 Atom, android-27 | Google Play Intel x86 Atom, android-28 | Google Play Intel x86 Atom, android-29 | Google APIs Intel x86 Atom\r\n  IDEs:\r\n    Android Studio: 3.4 AI-183.6156.11.34.5522156\r\n    Xcode: 11.4/11E146 - /usr/bin/xcodebuild\r\n  npmPackages:\r\n    react: 16.11.0 => 16.11.0 \r\n    react-native: 0.62.0 => 0.62.0 \r\n  npmGlobalPackages:\r\n    react-native-clean-project: 3.2.4\r\n    react-native-cli: 2.0.1\r\n    react-native-create-library: 3.1.2\r\n    react-native-template-typescript: 5.2.0\r\n    react-native: 0.60.4\r\n```\r\n## Upgrading version\r\n\r\nUpgrading from 0.61.5 to 0.62.0\r\n\r\n## Problem\r\n\r\n#### Initial upgrade steps\r\n1) I started by following the [0.61.5 to 0.62.0 RN upgrade helper](https://react-native-community.github.io/upgrade-helper/?from=0.61.5&to=0.62.0). I performed all the changes shown in the diffs from the upgrade helper tool.\r\n\r\n2) For the `project.pbxproj` changes, I proceeded to follow all four steps in the [React Native 0.62 upgrade explanation](https://github.com/react-native-community/upgrade-support/issues/13) in this repo.\r\n\r\nI encountered the following errors when attempting to build iOS\r\n\r\n```\r\nShowing All Errors Only\r\nUndefined symbol: _swift_getFunctionReplacement\r\nUndefined symbol: _swift_getOrigOfReplaceable\r\n```\r\n\r\nMore detailed error\r\n```\r\nUndefined symbols for architecture x86_64:\r\n  "_swift_getFunctionReplacement", referenced from:\r\n      _swift_getFunctionReplacement50 in libswiftCompatibilityDynamicReplacements.a(DynamicReplaceable.cpp.o)\r\n     (maybe you meant: _swift_getFunctionReplacement50)\r\n  "_swift_getOrigOfReplaceable", referenced from:\r\n      _swift_getOrigOfReplaceable50 in libswiftCompatibilityDynamicReplacements.a(DynamicReplaceable.cpp.o)\r\n     (maybe you meant: _swift_getOrigOfReplaceable50)\r\nld: symbol(s) not found for architecture x86_64\r\nclang: error: linker command failed with exit code 1 (use -v to see invocation)\r\n```\r\n\r\nI found that some folks with the same error details [in this issue thread from TelegramMessenger](https://github.com/TelegramMessenger/Telegram-iOS/issues/219#issuecomment-571456382) (completely unrelated to my app) but they seemed to find a solution by enabling dead code stripping.\r\n\r\n**I enabled Dead Code Stripping in Build Settings for DEBUG in EACH target of my project** (we have 4). Dead code stripping was already enabled in the release configuration for all the targets _and_ in the project build settings/\r\n![image](https://user-images.githubusercontent.com/8016126/77980463-32356680-72bc-11ea-9737-2f98f47f86ba.png)\r\n\r\nAfter enabling dead code stripping, I was able to build but the app would crash immediately with the following error\r\n```\r\nThis copy of libswiftCore.dylib requires an OS version prior to 12.2.0\r\n```\r\n\r\nIn order to fix this, I followed the steps [in this SO answer](https://stackoverflow.com/questions/52536380/why-linker-link-static-libraries-with-errors-ios/56176956#56176956), namely:\r\n - Added a `Dummy.swift` file to the project (I already had bridging header files from following the steps in issue #13 of this repo.\r\n - Set `Always Embed Swift Standard Libraries` to `YES` in the build settings for my project and all my targets.\r\n\r\n## Solution\r\n\r\nSo in summary, my complete upgrade steps were\r\n\r\n1) Follow the [0.61.5 to 0.62.0 RN upgrade helper](https://react-native-community.github.io/upgrade-helper/?from=0.61.5&to=0.62.0). \r\n\r\n2) For the `project.pbxproj` changes, follow all four steps in the [React Native 0.62 upgrade explanation](https://github.com/react-native-community/upgrade-support/issues/13) in this repo.\r\n\r\n3) Enable Dead Code Stripping in Build Settings for both debug and release in each project target\r\n\r\n4) Set `Always Embed Swift Standard Libraries` to `YES` in the build settings for my project and all my targets.\r\n\r\n5) Either add a `Dummy.swift` file to the project, or don\'t delete the dummy swift file that you created in step 2 (the issue #13 in this repo).\r\n'
  },
  {
    url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/68',
    repository_url:
      'https://api.github.com/repos/react-native-community/upgrade-support',
    labels_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/68/labels{/name}',
    comments_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/68/comments',
    events_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/68/events',
    html_url:
      'https://github.com/react-native-community/upgrade-support/issues/68',
    id: 609258664,
    node_id: 'MDU6SXNzdWU2MDkyNTg2NjQ=',
    number: 68,
    title: 'React native version mismatch',
    user: {
      login: 'irohitb',
      id: 32276134,
      node_id: 'MDQ6VXNlcjMyMjc2MTM0',
      avatar_url: 'https://avatars0.githubusercontent.com/u/32276134?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/irohitb',
      html_url: 'https://github.com/irohitb',
      followers_url: 'https://api.github.com/users/irohitb/followers',
      following_url:
        'https://api.github.com/users/irohitb/following{/other_user}',
      gists_url: 'https://api.github.com/users/irohitb/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/irohitb/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/irohitb/subscriptions',
      organizations_url: 'https://api.github.com/users/irohitb/orgs',
      repos_url: 'https://api.github.com/users/irohitb/repos',
      events_url: 'https://api.github.com/users/irohitb/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/irohitb/received_events',
      type: 'User',
      site_admin: false
    },
    labels: [
      {
        id: 1586213585,
        node_id: 'MDU6TGFiZWwxNTg2MjEzNTg1',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/%E2%9D%94Question',
        name: '❓Question',
        color: '91d5ff',
        default: false,
        description: ''
      }
    ],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 2,
    created_at: '2020-04-29T18:16:27Z',
    updated_at: '2020-04-30T14:28:57Z',
    closed_at: null,
    author_association: 'NONE',
    body:
      "## Environment\r\n```\r\nSystem:\r\n    OS: macOS 10.15.3\r\n    CPU: (4) x64 Intel(R) Core(TM) i5-7360U CPU @ 2.30GHz\r\n    Memory: 42.32 MB / 8.00 GB\r\n    Shell: 5.7.1 - /bin/zsh\r\n  Binaries:\r\n    Node: 12.14.1 - /var/folders/kn/j2qg_0p13z59wpt8864y_ccw0000gn/T/yarn--1588012727643-0.9768546303230927/node\r\n    Yarn: 1.21.1 - /var/folders/kn/j2qg_0p13z59wpt8864y_ccw0000gn/T/yarn--1588012727643-0.9768546303230927/yarn\r\n    npm: 6.13.6 - /usr/local/bin/npm\r\n    Watchman: 4.9.0 - /usr/local/bin/watchman\r\n  Managers:\r\n    CocoaPods: 1.8.4 - /usr/local/bin/pod\r\n  SDKs:\r\n    iOS SDK:\r\n      Platforms: iOS 13.2, DriverKit 19.0, macOS 10.15, tvOS 13.2, watchOS 6.1\r\n    Android SDK: Not Found\r\n  IDEs:\r\n    Android Studio: 3.5 AI-191.8026.42.35.6010548\r\n    Xcode: 11.3.1/11C504 - /usr/bin/xcodebuild\r\n  Languages:\r\n    Java: 12.0.2 - /usr/bin/javac\r\n    Python: 2.7.16 - /usr/bin/python\r\n  npmPackages:\r\n    @react-native-community/cli: Not Found\r\n    react: 16.13.1 => 16.13.1 \r\n    react-native: 0.62.2 => 0.62.2 \r\n  npmGlobalPackages:\r\n    *react-native*: Not Found\r\n```\r\n## Upgrading version\r\n\r\n<!-- Specify to which version you are upgrading to. -->\r\n\r\n## Description\r\n\r\n1. I had a normal project which I updated to latest version of React Native\r\n2. I installed one of my npm libraries https://github.com/irohitb/rn-formly\r\n3. Everything works fine in app until It reaches screen which renders my formly component (on earlier version of RN in a different project\r\n\r\n## Reproducible demo\r\n\r\n1. Create a new react-native repo\r\n2. Install the repo based on instructions from here: https://github.com/irohitb/rn-formly\r\n3. Copy and paste something as simple as this \r\n\r\n```\r\nimport React, {Component} from 'react'\r\nimport SignupFormComponent from 'rn-formly'\r\n\r\n\r\n// Compoany Name, College/University name, \r\nconst inputFields = [\r\n  {\r\n    key: 'image',\r\n    type:'image', \r\n    required: true,\r\n    label: \"Upload your images\", \r\n    helper: 'You can change your profile pic anytime from settings', \r\n  }, \r\n  {\r\n    key: 'gender', \r\n    type: 'checkboxes', // CheckBoxes should have Maximum 4 elements, for others we should use dropdown\r\n    label: 'Gender',\r\n    required: true,\r\n    templateOptions: {\r\n      multipleSelect: true,\r\n      options: [{\r\n        key: 'male',\r\n        label: 'Male',\r\n        value: false \r\n      },\r\n      {\r\n        key: 'female', \r\n        label: 'Female',\r\n        value: false\r\n      },\r\n      {\r\n        key: 'others', \r\n        label: 'Others',\r\n        value: false\r\n      }]\r\n    },\r\n    helper: `Select Custom to chose another gender, or if you'd rather not specify`\r\n  }, \r\n]\r\n\r\nclass Signup extends Component {\r\n\r\n  state = {\r\n    currentIndex: 0, \r\n    data: null\r\n  }\r\n\r\n  justLogDataFromForms = (index, key, currentValue,  payload) => {\r\n    console.log('Logging from Parent log')\r\n    console.log(index, key, currentValue, payload)\r\n  }\r\n\r\n\r\n  async componentDidMount () {\r\n    // Call Redux Action here\r\n  }\r\n\r\n  render () {\r\n    return (\r\n      <>\r\n        <SignupFormComponent \r\n          inputFields={inputFields}\r\n          globalButtonText={'Next'}\r\n          onButtonClick={this.justLogDataFromForms}\r\n          defaultColor={\"#3F51B5\"}\r\n          progressBarProps={{\r\n            blink: false\r\n          }}\r\n        /> \r\n      </>\r\n    )\r\n  }\r\n}\r\n\r\n\r\nexport default Signup\r\n```\r\n\r\nMy RN version in the project is: \"react-native\": \"0.62.2\" & \"react\": \"16.13.1\"\r\n\r\nHow can I fix the error and make my npm module backward compatible?\r\n\r\nScreenshot \r\n\r\n<img width=\"492\" alt=\"Screenshot 2020-04-29 at 11 47 15 PM\" src=\"https://user-images.githubusercontent.com/32276134/80631717-cc332f00-8a73-11ea-9bda-bee5ffc610b7.png\">\r\n"
  },
  {
    url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/67',
    repository_url:
      'https://api.github.com/repos/react-native-community/upgrade-support',
    labels_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/67/labels{/name}',
    comments_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/67/comments',
    events_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/67/events',
    html_url:
      'https://github.com/react-native-community/upgrade-support/issues/67',
    id: 608121427,
    node_id: 'MDU6SXNzdWU2MDgxMjE0Mjc=',
    number: 67,
    title: 'Slow startup after upgrading',
    user: {
      login: 'sm2017',
      id: 19644997,
      node_id: 'MDQ6VXNlcjE5NjQ0OTk3',
      avatar_url: 'https://avatars0.githubusercontent.com/u/19644997?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/sm2017',
      html_url: 'https://github.com/sm2017',
      followers_url: 'https://api.github.com/users/sm2017/followers',
      following_url:
        'https://api.github.com/users/sm2017/following{/other_user}',
      gists_url: 'https://api.github.com/users/sm2017/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/sm2017/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/sm2017/subscriptions',
      organizations_url: 'https://api.github.com/users/sm2017/orgs',
      repos_url: 'https://api.github.com/users/sm2017/repos',
      events_url: 'https://api.github.com/users/sm2017/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/sm2017/received_events',
      type: 'User',
      site_admin: false
    },
    labels: [
      {
        id: 1972076202,
        node_id: 'MDU6TGFiZWwxOTcyMDc2MjAy',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/0.62.2',
        name: '0.62.2',
        color: 'cfd3d7',
        default: false,
        description: null
      },
      {
        id: 1586213585,
        node_id: 'MDU6TGFiZWwxNTg2MjEzNTg1',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/%E2%9D%94Question',
        name: '❓Question',
        color: '91d5ff',
        default: false,
        description: ''
      }
    ],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 0,
    created_at: '2020-04-28T08:22:22Z',
    updated_at: '2020-04-28T08:22:37Z',
    closed_at: null,
    author_association: 'NONE',
    body:
      '## Environment\r\n\r\n<!-- Run `react-native info` in your terminal and paste its contents here. -->\r\n```\r\nSystem:\r\n    OS: Windows 10 10.0.18362\r\n    CPU: (4) x64 Intel(R) Core(TM) i3-8100 CPU @ 3.60GHz\r\n    Memory: 2.69 GB / 11.85 GB\r\n  Binaries:\r\n    Node: 10.15.3 - C:\\Program Files\\nodejs\\node.EXE\r\n    Yarn: 1.22.4 - C:\\Program Files (x86)\\Yarn\\bin\\yarn.CMD\r\n    npm: 6.13.4 - C:\\Program Files\\nodejs\\npm.CMD\r\n    Watchman: Not Found\r\n  SDKs:\r\n    Android SDK:\r\n      API Levels: 23, 26, 27, 28, 29\r\n      Build Tools: 23.0.1, 27.0.3, 28.0.3, 29.0.2\r\n      System Images: android-22 | Google APIs Intel x86 Atom, android-28 | Intel x86 Atom_64, android-28 | Google Play Intel x86 Atom, android-29 | Google APIs Intel x86 Atom\r\n      Android NDK: Not Found\r\n  IDEs:\r\n    Android Studio: Version  3.5.0.0 AI-191.8026.42.35.6010548\r\n  Languages:\r\n    Java: 1.8.0_221\r\n    Python: 2.7.16\r\n  npmPackages:\r\n    @react-native-community/cli: Not Found\r\n    react: Not Found\r\n    react-native: Not Found\r\n  npmGlobalPackages:\r\n    *react-native*: Not Found\r\n\r\n```\r\n## Upgrading version\r\n\r\nI upgrade 0.61.5 to 0.62.2\r\n\r\n## Description\r\n\r\nAfter upgrading cold startup time in android increased . before upgrading startup time is less than 4 seconds , currently is about 12 seconds\r\n\r\n## Reproducible demo\r\n\r\n<!--\r\n  Let other people know how to reproduce the issue. Include a code sample or share a project that reproduces the issue.\r\n  Please follow the guidelines for providing a minimal example: https://stackoverflow.com/help/mcve.\r\n-->\r\n'
  },
  {
    url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/66',
    repository_url:
      'https://api.github.com/repos/react-native-community/upgrade-support',
    labels_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/66/labels{/name}',
    comments_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/66/comments',
    events_url:
      'https://api.github.com/repos/react-native-community/upgrade-support/issues/66/events',
    html_url:
      'https://github.com/react-native-community/upgrade-support/issues/66',
    id: 607069669,
    node_id: 'MDU6SXNzdWU2MDcwNjk2Njk=',
    number: 66,
    title: '[0.59.10 to 0.62.2] Library not found for -lCocoaAsyncSocket',
    user: {
      login: 'vmarquet',
      id: 6226610,
      node_id: 'MDQ6VXNlcjYyMjY2MTA=',
      avatar_url: 'https://avatars3.githubusercontent.com/u/6226610?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/vmarquet',
      html_url: 'https://github.com/vmarquet',
      followers_url: 'https://api.github.com/users/vmarquet/followers',
      following_url:
        'https://api.github.com/users/vmarquet/following{/other_user}',
      gists_url: 'https://api.github.com/users/vmarquet/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/vmarquet/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/vmarquet/subscriptions',
      organizations_url: 'https://api.github.com/users/vmarquet/orgs',
      repos_url: 'https://api.github.com/users/vmarquet/repos',
      events_url: 'https://api.github.com/users/vmarquet/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/vmarquet/received_events',
      type: 'User',
      site_admin: false
    },
    labels: [
      {
        id: 1586213585,
        node_id: 'MDU6TGFiZWwxNTg2MjEzNTg1',
        url:
          'https://api.github.com/repos/react-native-community/upgrade-support/labels/%E2%9D%94Question',
        name: '❓Question',
        color: '91d5ff',
        default: false,
        description: ''
      }
    ],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 0,
    created_at: '2020-04-26T17:41:28Z',
    updated_at: '2020-04-26T17:42:39Z',
    closed_at: null,
    author_association: 'NONE',
    body:
      '## Environment\r\n\r\n```\r\n$ ./node_modules/.bin/react-native info\r\ninfo Fetching system and libraries information...\r\nSystem:\r\n    OS: macOS Mojave 10.14.6\r\n    CPU: (8) x64 Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz\r\n    Memory: 54.12 MB / 16.00 GB\r\n    Shell: 5.3 - /bin/zsh\r\n  Binaries:\r\n    Node: 12.11.1 - ~/.nvm/versions/node/v12.11.1/bin/node\r\n    Yarn: 1.17.3 - /usr/local/bin/yarn\r\n    npm: 6.11.3 - ~/.nvm/versions/node/v12.11.1/bin/npm\r\n    Watchman: Not Found\r\n  Managers:\r\n    CocoaPods: 1.8.4 - /Users/vincent/.rvm/gems/ruby-2.5.1/bin/pod\r\n  SDKs:\r\n    iOS SDK:\r\n      Platforms: iOS 13.2, DriverKit 19.0, macOS 10.15, tvOS 13.2, watchOS 6.1\r\n    Android SDK:\r\n      API Levels: 23, 24, 26, 27, 28\r\n      Build Tools: 23.0.1, 25.0.2, 26.0.2, 26.0.3, 27.0.0, 27.0.3, 28.0.3\r\n      System Images: android-23 | Intel x86 Atom_64, android-23 | Google APIs Intel x86 Atom_64, android-24 | Google APIs Intel x86 Atom_64, android-24 | Google Play Intel x86 Atom\r\n      Android NDK: Not Found\r\n  IDEs:\r\n    Android Studio: 3.4 AI-183.6156.11.34.5692245\r\n    Xcode: 11.3/11C29 - /usr/bin/xcodebuild\r\n  Languages:\r\n    Java: 1.8.0_60 - /usr/bin/javac\r\n    Python: 2.7.16 - /usr/local/bin/python\r\n  npmPackages:\r\n    @react-native-community/cli: Not Found\r\n    react: 16.11.0 => 16.11.0\r\n    react-native: 0.62.2 => 0.62.2\r\n  npmGlobalPackages:\r\n    *react-native*: Not Found\r\n```\r\n\r\n## Upgrading version\r\n\r\n0.62.2\r\n\r\n## Description\r\n\r\nI followed all instructions in https://github.com/react-native-community/upgrade-support/issues/14 and https://github.com/react-native-community/upgrade-support/issues/13 (thanks for these guides btw), and I get a build error:\r\n\r\n```\r\nLd /Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/myproject.app/myproject normal x86_64\r\n    cd /Users/vincent/Projets/myproject-mobile/ios\r\n    export PATH="/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/usr/bin:/Applications/Xcode.app/Contents/Developer/usr/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"\r\n    /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang -target x86_64-apple-ios9.0-simulator -isysroot /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator13.2.sdk -L/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator -L\\"\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/CocoaAsyncSocket\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/DoubleConversion\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/FBReactNativeSpec\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Flipper\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Flipper-DoubleConversion\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Flipper-Folly\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Flipper-Glog\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Flipper-PeerTalk\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Flipper-RSocket\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/FlipperKit\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Folly\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RCTTypeSafety\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNBackgroundFetch\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNDeviceInfo\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNFS\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNGestureHandler\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNI18n\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNLocalize\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNSentry\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNSound\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-Core\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-CoreModules\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTAnimation\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTBlob\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTImage\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTLinking\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTNetwork\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTSettings\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTText\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTVibration\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-cxxreact\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-jsi\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-jsiexecutor\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-jsinspector\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/ReactCommon\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Sentry\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Yoga\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/YogaKit\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/glog\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/react-native-cameraroll\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/react-native-netinfo\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/react-native-slider\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/react-native-sqlite-storage\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/react-native-static-server\\"\\ \\"/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/react-native-webview\\"\\ \\"/Users/vincent/Projets/myproject-mobile/ios/Pods/CocoaLibEvent/lib\\"\\ \\"/Users/vincent/Projets/myproject-mobile/ios/Pods/OpenSSL-Universal/ios/lib\\" -L/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/lib/swift-5.0/iphonesimulator -L/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/lib/swift/iphonesimulator -F/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator -F../node_modules/react-native-background-fetch/ios -F../node_modules/react-native-background-fetch/ios/RNBackgroundFetch -filelist /Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Intermediates.noindex/myproject.build/Debug-iphonesimulator/myproject.build/Objects-normal/x86_64/myproject.LinkFileList -Xlinker -rpath -Xlinker @executable_path/Frameworks -Xlinker -object_path_lto -Xlinker /Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Intermediates.noindex/myproject.build/Debug-iphonesimulator/myproject.build/Objects-normal/x86_64/myproject_lto.o -Xlinker -export_dynamic -Xlinker -no_deduplicate -Xlinker -objc_abi_version -Xlinker 2 -fobjc-arc -fobjc-link-runtime -ObjC -lCocoaAsyncSocket -lDoubleConversion -lFBReactNativeSpec -lFlipper -lFlipper-DoubleConversion -lFlipper-Folly -lFlipper-Glog -lFlipper-PeerTalk -lFlipper-RSocket -lFlipperKit -lFolly -lRCTTypeSafety -lRNBackgroundFetch -lRNDeviceInfo -lRNFS -lRNGestureHandler -lRNI18n -lRNLocalize -lRNSentry -lRNSound -lReact-Core -lReact-CoreModules -lReact-RCTAnimation -lReact-RCTBlob -lReact-RCTImage -lReact-RCTLinking -lReact-RCTNetwork -lReact-RCTSettings -lReact-RCTText -lReact-RCTVibration -lReact-cxxreact -lReact-jsi -lReact-jsiexecutor -lReact-jsinspector -lReactCommon -lSentry -lYoga -lYogaKit -lc++ -lcrypto -levent -levent_core -levent_extra -levent_pthreads -lglog -lreact-native-cameraroll -lreact-native-netinfo -lreact-native-slider -lreact-native-sqlite-storage -lreact-native-static-server -lreact-native-webview -lsqlite3 -lssl -lstdc++ -lz -framework AudioToolbox -framework CFNetwork -framework Foundation -framework JavaScriptCore -framework MobileCoreServices -framework Security -framework TSBackgroundFetch -framework UIKit -ObjC -lc++ -Xlinker -sectcreate -Xlinker __TEXT -Xlinker __entitlements -Xlinker /Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Intermediates.noindex/myproject.build/Debug-iphonesimulator/myproject.build/myproject.app-Simulated.xcent -framework JavaScriptCore -lRCTPushNotification -lRNDeviceInfo -lRNI18n -framework TSBackgroundFetch -lPods-myproject -lz -Xlinker -dependency_info -Xlinker /Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Intermediates.noindex/myproject.build/Debug-iphonesimulator/myproject.build/Objects-normal/x86_64/myproject_dependency_info.dat -o /Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/myproject.app/myproject\r\n\r\nld: warning: directory not found for option \'-L"" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/CocoaAsyncSocket" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/DoubleConversion" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/FBReactNativeSpec" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Flipper" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Flipper-DoubleConversion" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Flipper-Folly" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Flipper-Glog" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Flipper-PeerTalk" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Flipper-RSocket" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/FlipperKit" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Folly" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RCTTypeSafety" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNBackgroundFetch" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNDeviceInfo" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNFS" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNGestureHandler" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNI18n" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNLocalize" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNSentry" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/RNSound" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-Core" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-CoreModules" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTAnimation" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTBlob" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTImage" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTLinking" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTNetwork" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTSettings" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTText" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-RCTVibration" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-cxxreact" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-jsi" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-jsiexecutor" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/React-jsinspector" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/ReactCommon" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Sentry" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/Yoga" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/YogaKit" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/glog" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/react-native-cameraroll" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/react-native-netinfo" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/react-native-slider" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/react-native-sqlite-storage" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/react-native-static-server" "/Users/vincent/Library/Developer/Xcode/DerivedData/myproject-chcyphcsxklmejbgcaennhctwkux/Build/Products/Debug-iphonesimulator/react-native-webview" "/Users/vincent/Projets/myproject-mobile/ios/Pods/CocoaLibEvent/lib" "/Users/vincent/Projets/myproject-mobile/ios/Pods/OpenSSL-Universal/ios/lib"\'\r\nld: library not found for -lCocoaAsyncSocket\r\nclang: error: linker command failed with exit code 1 (use -v to see invocation)\r\n```\r\n\r\n'
  }
]

const MAX_ISSUES_PER_PAGE = 5

const TitleIcon = styled(props => (
  <span {...props} role="img" aria-label="Troubleshooting icon">
    🕵️
  </span>
))`
  margin: 0px 10px;
`

const IssueList = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 3px;
`

const Label = styled(({ name, backgroundColor, ...props }) => (
  <span {...props}>{name}</span>
))`
  background: ${({ backgroundColor }) => `#${backgroundColor}4D`};
  padding: 3px 8px;
  border-radius: 3px;
  margin: 0px 2px;
  font-size: 12px;
  font-weight: 600;
`

const Issue = styled(({ issue, ...props }) => (
  <div {...props} onClick={() => window.open(issue.html_url)}>
    <a
      className="title"
      href={issue.html_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {issue.title}
    </a>

    {issue.labels.map(
      label =>
        !semver.valid(semver.coerce(label.name)) && (
          <Label
            key={label.id}
            backgroundColor={label.color}
            name={label.name}
          />
        )
    )}
  </div>
))`
  display: flex;
  padding: 5px 8px;
  background: ${({ type }) => (type === 'even' ? 'initial' : '#f6f6f6')};

  & > .title {
    margin-right: 3px;
    color: rgba(0, 0, 0, 0.65);
  }

  &:hover {
    background: #f5faff;
    cursor: pointer;

    & > .title {
      color: #40a9ff;
    }
  }
`

const ButtonsContainer = styled(
  ({ issues, ...props }) =>
    issues.length > MAX_ISSUES_PER_PAGE && <div {...props} />
)`
  display: flex;
  justify-content: flex-end;
`

const PrevButton = styled(({ issuesKeySince, setIssuesKeySince, ...props }) => (
  <Button
    {...props}
    type="link"
    disabled={issuesKeySince === 0}
    onClick={() => setIssuesKeySince(issuesKeySince - MAX_ISSUES_PER_PAGE)}
  >
    <LeftOutlined />
  </Button>
))`
  padding: 0px 5px 0px 0px;
`

const NextButton = styled(
  ({ issues, issuesKeySince, setIssuesKeySince, ...props }) => {
    const nextIssuesKeySince = issuesKeySince + MAX_ISSUES_PER_PAGE

    return (
      <Button
        {...props}
        type="link"
        disabled={issues.length < nextIssuesKeySince}
        onClick={() => setIssuesKeySince(issuesKeySince + MAX_ISSUES_PER_PAGE)}
      >
        <RightOutlined />
      </Button>
    )
  }
)`
  padding: 0px 0px 0px 5px;
`

const TroubleshootingSection = ({ isLoading }) => {
  const [issuesKeySince, setIssuesKeySince] = useState(0)

  const renderTitle = () => (
    <React.Fragment>
      <TitleIcon /> Troubleshooting
    </React.Fragment>
  )

  return (
    <Section
      isLoading={isLoading}
      // initialContentVisible={false}
      backgroundColor="#fefefe"
      accentColor="#e8e8e8"
      renderTitle={renderTitle}
    >
      <IssueList>
        {issuesMock.map(
          (issue, key) =>
            key > issuesKeySince &&
            key <= issuesKeySince + MAX_ISSUES_PER_PAGE && (
              <Issue
                key={issue.id}
                issue={issue}
                type={key % 2 === 0 ? 'even' : 'odd'}
              />
            )
        )}
      </IssueList>

      <ButtonsContainer issues={issuesMock}>
        <PrevButton
          issuesKeySince={issuesKeySince}
          setIssuesKeySince={setIssuesKeySince}
        />

        <NextButton
          issues={issuesMock}
          issuesKeySince={issuesKeySince}
          setIssuesKeySince={setIssuesKeySince}
        />
      </ButtonsContainer>
    </Section>
  )
}

export default TroubleshootingSection
