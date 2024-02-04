import React, { Fragment } from 'react'
import { ReleaseT } from '../types'

const newArchitectureFiles = [
  'android/app/src/main/java/com/rndiffapp/newarchitecture/MainApplicationReactNativeHost.java',
  'android/app/src/main/java/com/rndiffapp/newarchitecture/components/MainComponentsRegistry.java',
  'android/app/src/main/java/com/rndiffapp/newarchitecture/modules/MainApplicationTurboModuleManagerDelegate.java',
  'android/app/src/main/jni/MainApplicationModuleProvider.h',
  'android/app/src/main/jni/MainComponentsRegistry.cpp',
  'android/app/src/main/jni/Android.mk',
  'android/app/src/main/jni/MainApplicationModuleProvider.cpp',
  'android/app/src/main/jni/MainApplicationTurboModuleManagerDelegate.cpp',
  'android/app/src/main/jni/MainApplicationTurboModuleManagerDelegate.h',
  'android/app/src/main/jni/MainComponentsRegistry.h',
  'android/app/src/main/jni/OnLoad.cpp',
]

const release: ReleaseT = {
  usefulContent: {
    description:
      'React Native 0.68 includes preview of the New Architecture opt-in.',
    links: [
      {
        title:
          'See here to learn more about new architecture and how to enable it in your project',
        url: 'https://reactnative.dev/docs/next/new-architecture-intro',
      },
    ],
  },
  comments: [
    {
      fileName: 'android/app/build.gradle',
      lineNumber: 142,
      lineChangeType: 'add',
      content: (
        <Fragment>
          `isNewArchitectureEnabled()` and related logic is optional if you are
          not planning to upgrade to the new architecture.
        </Fragment>
      ),
    },
    {
      fileName: 'android/app/build.gradle',
      lineNumber: 283,
      lineChangeType: 'add',
      content: (
        <Fragment>
          `isNewArchitectureEnabled()` and related logic is optional if you are
          not planning to upgrade to the new architecture.
        </Fragment>
      ),
    },
    {
      fileName: 'android/app/src/main/java/com/rndiffapp/MainActivity.java',
      lineNumber: 36,
      lineChangeType: 'add',
      content: (
        <Fragment>
          New delegate and enabling Fabric in `ReactRootView` is only required
          for the new architecture builds.
        </Fragment>
      ),
    },
    {
      fileName: 'ios/RnDiffApp/AppDelegate.mm',
      lineNumber: 9,
      lineChangeType: 'add',
      content: (
        <Fragment>
          Parts under `RCT_NEW_ARCH_ENABLED` are only required for the new
          architecture builds.
        </Fragment>
      ),
    },
    ...newArchitectureFiles.map((file) => ({
      fileName: file,

      lineNumber: 1,
      lineChangeType: 'add',
      content: (
        <Fragment>
          This file is only required for the New Architecture setup.
        </Fragment>
      ),
    })),
  ],
}

export default release
