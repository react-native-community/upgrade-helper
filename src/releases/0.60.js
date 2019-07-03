import React, { Fragment } from 'react'

export default {
  usefulContent: {
    description:
      'React Native 0.60 includes Cocoapods integration by default, AndroidX support, auto-linking libraries, a brand new Start screen and more.',
    links: [
      {
        title:
          'Official blog post about the major changes on React Native 0.60',
        url:
          'https://facebook.github.io/react-native/blog/2019/07/03/version-60'
      },
    ],
  },
  comments: [
    {
      fileName: 'ios/Podfile',
      lineNumber: 4,
      lineChangeType: 'add',
      content: (
        <Fragment>
          All these libraries below have been removed from the Xcode project file and now live in the Podfile.
          Cocoapods handles the linking now.
          Here you can add more libraries with native modules.
        </Fragment>
        )
      },
    {
      fileName: 'ios/RnDiffApp.xcodeproj/project.pbxproj',
      lineNumber: 9,
      lineChangeType: 'neutral',
      content: (
        <Fragment>
            For an easy upgrade experience of this file, do the following.
            After all the other files have been upgraded, run `yarn install` and `cd ios; pod install; cd ..`.
            This will cause all the Pods to be connected. After that, open the workspace file in the `ios` directory, called something like `MyApp.xcworkspace`
            ![image](public/images/60-1.png)
            This workspace contains your original project, as well as the `Pods` project. Expand your project and find the `Libraries` directory.
            ![image](public/images/60-2.png)
            Inside that, there are a few libraries related to React Native, and possibly other native modules from other libraries you might have connected.
            ![image](public/images/60-3.png)
            You can go ahead and remove the React Native related libraries from there, by selecting them and hitting the delete button. In the popup you get, you can select `Remove references`. If you select to `Move it to Trash`, you might need to run `yarn install` again.
            ![image](public/images/60-4.png)
            These libraries are not needed there anymore, since now they are connected using CocoaPods. You can do the same for other libraries that might exist in that directory, if they support CocoaPods. If they don't, keep them there for now.
            After all this, your diff of that file should look roughly the same as the one right here. Don't worry too much if it doesn't match exactly, as your project might have more or fewer targets.
            Try to see if the rough outline is the same, and of course make sure your project can build and run.
        </Fragment>
        )
      },
    ],
  }
