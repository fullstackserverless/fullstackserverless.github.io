---
id: notif-00
title: Push Notification with Amplify
sidebar_label: Push Notification
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Push notifications play an essential role in any Application. It can considerably increase the user engagement, and it might be an asked feature from the end-user.

![Push Notifications](/img/notification/00.png)

Setting up a push notification from scratch can be a bit challenging. Fortunately, the Amplify provides the push notification services and SDK for our apps. In this tutorial, we learn how to integrate our app with this service.

![Step01](/img/steps/01.png)

## Create a new project

Whether you are going to implement only for IOS or Android, the following steps are required. If you are not working on a project, then the first step is creating one by the following command:

```bash
npx react-native init amplifyPush
```

```bash
cd amplifyPush
```

Initialize our AWS Amplify project in the root directory.

```bash
amplify init
```

Here is how the answers can be:

![Initialize Amplify](/img/notification/notif_amplify_init.png)

- Add the required dependencies with:

```bash
npm install --save aws-amplify @aws-amplify/pushnotification
```

or

```bash
yarn add aws-amplify @aws-amplify/pushnotification
```

You need to link the push notification dependency with:

```bash
react-native link @aws-amplify/pushnotification
```

:::caution
To prevent an [error](https://github.com/aws-amplify/amplify-js/issues/5010) in the future add the `netinfo` library. You can add it to your project by the following command (in case your don't have it):

```bash
npm install --save @react-native-community/netinfo
```

```bash
yarn add @react-native-community/netinfo
```

:::

![Step02](/img/steps/02.png)

### Android - Setting up the Firebase

1. Open the [Firebase console](https://console.firebase.google.com/).
2. Open or create a project for further steps.
3. Select the `Cloud Messaging` in the dashboard.

![Cloud Messaging](/img/notification/notif_cloud_messaging.png)

4. Click on the Android and follow the following steps:

- Fill in the form and register the app. `Android package name` can be found in `android/app/build.gradle`. It is stored as `applicationId` like this:

```java
   gradle title="android/app/build.gradle"
      defaultConfig {
       applicationId "com.amplifypush"
      }
```

- Download the config file to `android/app` directory of the project.
- Add the Firebase SDK as the instructions. Consider the `<project>` the `android` and `<app-module>` the `app` directory in the react native project. Don't forget to add the latest version of `firebase-messaging` from [here](https://firebase.google.com/docs/android/setup#available-libraries) as well ad the `firebase-analytics` in `dependencies`.
- Run the project in Android and you will see that the verification of Firebase. (you can skip this step)
- Open the `android/app/src/main/AndroidManifest.xml` and add the following code in the `application` element:

```java
xml title="android/app/src/main/AndroidManifest.xml"
<!--[START Push notification config -->
        <!-- [START firebase_service] -->
        <service
            android:name="com.amazonaws.amplify.pushnotification.RNPushNotificationMessagingService">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT"/>
            </intent-filter>
        </service>
        <!-- [END firebase_service] -->
        <!-- [START firebase_iid_service] -->
        <service
            android:name="com.amazonaws.amplify.pushnotification.RNPushNotificationDeviceIDService">
            <intent-filter>
                <action android:name="com.google.firebase.INSTANCE_ID_EVENT"/>
            </intent-filter>
        </service>
        <receiver
            android:name="com.amazonaws.amplify.pushnotification.modules.RNPushNotificationBroadcastReceiver"
            android:exported="false" >
            <intent-filter>
                <action android:name="com.amazonaws.amplify.pushnotification.NOTIFICATION_OPENED"/>
            </intent-filter>
        </receiver>
    <!-- [END Push notification config -->
```

![Step03](/img/steps/03.png)

## Setting up the Amplify for FCM

1. Add the push notification service to amplify by the following command in the project directory:

```bash
 amplify add notifications
```

2. Choose `FCM` when promoted:

```bash
 ? Choose the push notification channel to enable.
 APNS
 ❯ FCM
 Email
 SMS
```

3. Fill the pinpoint resource name (or just press enter without filling anything).
4. You will be asked for `ApiKey`. For getting that, you should do the following steps:

- Open the [Firebase console](https://console.firebase.google.com/) and open the app you created in previous steps.
- Click on the gear icon in the `Project Overview` section of the dashboard and select the `Project settings`.

![Project settings](/img/notification/notif_project_settings.png)

- Select the `Cloud Messaging` tab and copy the value of the `Server key`.

![Project settings](/img/notification/notif_api_key.png)

5. Paste the value for requested `ApiKey`.
6. After the setup is completed, run the `amplify push` command.

![Step04](/img/steps/04.png)

## iOS - Setup

1. Add the `@react-native-community/push-notification-ios` by the following command:

<Tabs defaultValue="yarn" values={[ {label: 'yarn', value: 'yarn'}, {label: 'npm', value: 'npm'}, ]}>

  <TabItem value="yarn">

```bash
yarn add @react-native-community/push-notification-ios`
```

  </TabItem>

  <TabItem value="npm">

```bash
npm install --save @react-native-community/push-notification-ios
```

  </TabItem>

</Tabs>
 
 
2. Run the following commands:
    ```bash
    cd ios && pod install && cd ..
    ```
    
3. Add the notifications to the amply for iOS by `amplify add notifications` command:

    1. Choose `APNS` when promoted:
     ```bash
     ? Choose the push notification channel to enable.
        > APNS
        FCM
        Email
        SMS
     ```
    2. Then you will be prompted for the authentication method. It is recommended to choose the certificate.

     ```bash
    ? Choose authentication method used for APNs (Use arrow keys)
    > Certificate
    Key
     ```

    3. If you have chosen the certificate, then you will be prompted for the .p12 certificate path file. (You can use this [tutorial](https://mobincube.zendesk.com/hc/en-us/articles/200511933-How-to-get-the-p12-file-and-provisioning-profile-for-publishing-an-app-on-App-Store) to get that).

4. Run `amplify push`.

5. Open the `.xcworkspace` project with the XCode.

6. Select the project and select the project name in `TARGETS` section. Select the `Signing & Capabilities` and press the `+` before the `Capability`. Choose `Background Mode - Remote Notifications`.

![Step05](/img/steps/05.png)

### Configure App

As it was told before, The `Analytics` should be integrated along with the notifications. It will help to track the notifications. Though it is possible to use custom properties, It is advised to use the `aws-exports` file.
in `App.js` file add the configuration as follow:

```js
...
import Amplify from 'aws-amplify';
import PushNotification from '@aws-amplify/pushnotification';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

PushNotification.configure(awsconfig);
...
```

![Step06](/img/steps/06.png)

## Working with API

Usually, what we want is sending push notifications to specific users for various purposes. The API gives us various methods for handling our users & push notifications.

## onRegister

Each device can be recognized by the push token by which you can specify the device you want to get a push notification. When the user opens the app for the first time, the pushed token is fetched and stored in the device. You should be aware of the fact this method may get called again in the future, so you should be prepared for this situation to update your data according to it.

You can add the following code in `App.js`:

```js
PushNotification.onRegister(token => {
  console.log('in app registration', token)
  PushNotification.updateEndpoint(token)
})
```

:::caution Attention
There can be an issue in android that this method never be called! However a [workaround](https://github.com/aws-amplify/amplify-js/issues/2643#issuecomment-523610933) can be like this anywhere you might need the token:

```js
...
import {NativeModules} from 'react-native';
...
NativeModules.RNPushNotification.getToken((token) => {
  console.log(`PushToken: ${token}`);
});
...
```

:::

## onNotification

In case you want to do something when the notification is recieved the `onNotification` method is for acting based on the recieved notification. Don't forget to that the notification object structure is diffrent from Android and IOS. In IOS, You [Should](https://reactnative.dev/docs/pushnotificationios.html#finish) use the `finish` method. You can add the following code to `App.js`:

```js
...
import PushNotificationIOS from '@react-native-community/push-notification-ios';
...
PushNotification.onNotification((notification) => {
  console.log('in app notification', notification);
  if (Platform.OS === 'ios') {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  }
});
```

## onNotificationOpened

A common scenario is reacting to when user opens a push notification (eg: opening a message etc). Whenever the user opens a push notification, the `onNotificationOpened` is called. The code can be in `App.js` as follow:

```js
PushNotification.onNotificationOpened(notification => {
  console.log('the notification is opened', notification)
})
```

## requestIOSPermissions

Push notification works only on a real device and it won't recieve any notification unless the end user give the permission. The `requestIOSPermissions` is for getting this permission. It either can be called without any parameters, or you can customize by an object as follows:

```js
PushNotification.requestIOSPermissions()
// or
PushNotification.requestIOSPermissions({
  alert: true,
  badge: true,
  sound: false
})
```

![Step07](/img/steps/07.png)

## Testing

First of all, we want to take a look at the `App.js` file. Though you can work with the API anywhere in your code, It can be something like this:

```js
import React from 'react'
import { SafeAreaView, Platform, Text, NativeModules } from 'react-native'

import PushNotificationIOS from '@react-native-community/push-notification-ios'
import Analytics from '@aws-amplify/analytics'
import Amplify from 'aws-amplify'
import PushNotification from '@aws-amplify/pushnotification'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)
PushNotification.configure(awsconfig)

PushNotification.onRegister(async token => {
  console.log('in app registration', token)
  PushNotification.updateEndpoint(token)
})

// In case PushNotification.onRegister didn't work
NativeModules.RNPushNotification.getToken(token => {
  console.log(`PushToken: ${token}`)
})

PushNotification.onNotification(notification => {
  console.log('in app notification', notification)
  if (Platform.OS === 'ios') {
    notification.finish(PushNotificationIOS.FetchResult.NoData)
  }
})

PushNotification.onNotificationOpened(notification => {
  console.log('the notification is opened', notification)
})

const endpointId = Analytics.getPluggable('AWSPinpoint')._config.endpointId
console.log(`endpoint ID: ${endpointId}`)

if (Platform.OS === 'ios') {
  PushNotification.requestIOSPermissions()
}

const App: () => React$Node = () => {
  return (
    <SafeAreaView>
      <Text>Push Notification</Text>
    </SafeAreaView>
  )
}

export default App
```

Now we run our program:

```bash
react-native run-android
```

To go further, we need one of the `endpoint ID` or `Push Token`.
[Here]() is an explanation of `endpoint` in `aws` services:

> An endpoint represents a destination that you can send messages to, such as a mobile device, email address, or phone number.

`Push Token` is a unique id, Which is generated and assigned by `GCM`(Android) or `APNS`(IOS) to your application in a specific device.

The most apparent difference between these two is that the `endpoint` is generated from `aws`, and defines the app in a device regardless of the platform(IOS/Android). But the push token is generated either by the `Apple` or `Google`, depending on the platform.

We use `console.log` to copy and keep these keys for the next steps. Go into the dev mode and copy the following values in your console:

![Tokens](/img/notification/notif_console_tokens.png)

Although there are multiple ways to send a test push notification to a specific device, We're going to learn the easiest way possible.

1. Run the following command in the root of the project:

```bash
amplify notification console
```

2. The console of the app will be opened in the browser automatically.

3. Select the `Test messaging` in the left sidebar:

![Test messaging](/img/notification/notif_aws_notif_console.png)

4. In the `Channel` section, select the `Push notifications`.

5. The `Destinations` section is as follow:

![Destinations](/img/notification/notif_testing_message_dest.png) 1. `Destination type` defines whether you want to use `Endpoint IDs` or `Device Tokens`(or `Push token` in previous steps) in the next text input. 2. Paste the token you want to use, Based on the selected `Destination type`. 3. If you have chosen the `Endpoint IDs` and used endpoint, then the `Push notifications service` can automatically detect your device. Otherwise, if you have used `Device token`, for IOS, choose the `APNS` and for Android choose the `FCM`.

6. You can fill the `Message` section like below and press the `Send message` button.

![Destinations](/img/notification/notif_testing_message_message.png)

7. You will get a success message like below if everything is ok.

![Success](/img/notification/notif_testing_message_success.png)
After a couple of seconds, You will see the push notification in your device:

![Push notification result](/img/notification/notif_android_push_result.png)

## Done ✅

## References:

[Amplify Docs](https://docs.amplify.aws/lib/push-notifications/getting-started/q/platform/js)

[Setting up Android Push Notifications with AWS Amplify](https://medium.com/@dantasfiles/setting-up-android-push-notifications-with-aws-amplify-e6334c6356d8)

[Testing Push Notifications with AWS Amplify & CLI](https://medium.com/@dantasfiles/testing-push-notifications-with-aws-amplify-9126bd621d3a)

[![Become a Patron!](/img/logo/patreon.png)](https://www.patreon.com/bePatron?u=34467235)
