# cordova-camera-plugin-testing-app

Setup

````
npm i
npm run cordova-prepare
npm run build-for-android
npm run emulate-for-android
````

The app should open inside the emulator.

When you take a picture and confirm the picture, the image should be visible on the webview.

You can click the buttons to test with and without saveToPhotoAlbum

Installing another plugin from a feature branche in a fork.

````
npx cordova plugin remove cordova-plugin-camera
npx cordova plugin add https://github.com/PieterVanPoyer/cordova-plugin-camera/#bugfix/issue-665-save-instance-restore-bug
````

![Reproduction UI](ReproductionUI.JPG)
