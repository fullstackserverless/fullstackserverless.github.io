# Push Notification with Amplify
Push notifications play an essential role in any Application. It can considerably increase the user engagement, and it might be an asked feature from the end-user.
Setting up a push notification from scratch can be a bit challenging. Fortunately, the Amplify provides the push notification services and SDK for our apps. In this tutorial, we learn how to integrate our app with this service.
##Setup
Whether you are going to implement only for IOS or Android, the following steps are required. If you are not working on a project, then the first step is creating one by the following command:
- `npx react-native init amplifyPush`
- `cd amplifyPush`
- `amplify init`
- As the docs suggest, `Analytics` should be set by adding it with:
`amplify add analytics`
- Add the required dependencies with:
`npm install aws-amplify && npm install @aws-amplify/pushnotification` or ` yarn add aws-amplify @aws-amplify/pushnotification`
- you need to link the push notification dependency with:
`react-native link @aws-amplify/pushnotification`
###Android
####Setting up the Firebase
1. Open the [Firebase console](https://console.firebase.google.com/).
2. Open or create a project for further steps.
3. Select the `Cloud Messaging` in the dashboard.
4. Click on the Android and follow the following steps:
    1. Fill in the form and register the app. (`Android package name` can be found in `android/app/build.gradle`. It is stored as `applicationId`)
    2. Download the config file to `android/app` directory of the project.
    3. Add the Firebase SDK as the instructions. Consider the `<project>` the `android` and `<app-module>` the `app` directory in the react native project. Don't forget to add the latest version of `firebase-messaging` from [here](https://firebase.google.com/docs/android/setup#available-libraries) as well ad the `firebase-analytics` in `dependencies`.
    4. run the project in Android and you will see that the verification of Firebase. (you can skip this step)
5. Open the `android/app/src/main/AndroidManifest.xml` and add the following code in the `application` element:
```xml
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
#### Setting up the Amplify for FCM
1. Add the push notification service by `amplify add notifications` in the terminal in the project directory.
2. Choose `FCM` when promoted:
```
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
- Select the `Cloud Messaging` tab and copy the value of the `Server key`.
5. Paste the value for requested `ApiKey`.
6. After the setup is completed, run the `amplify push` command.

###IOS
#### Setup
1. Add the `@react-native-community/push-notification-ios` by the following command:
`npm install @react-native-community/push-notification-ios` or `yarn add @react-native-community/push-notification-ios`
2. `cd ios && pod install && cd ..`
3. Add the notifications to the amply for ios by `amplify add notifications` command:
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
###Configure App
As it was told before, The `Analytics` should be integrated along with the notifications. It will help to track the notifications. Though it is possible to use custom properties, It is advised to use the `aws-exports` file.
we can configure the app as follow:

```js
import { PushNotificationIOS } from '@react-native-community/push-notification-ios';
import Analytics from '@aws-amplify/analytics';
import PushNotification from '@aws-amplify/pushnotification';
import awsconfig from './aws-exports';

Analytics.configure(awsconfig);

PushNotification.configure(awsconfig);
```
###Working with API
Usually, what we want is sending push notifications to specific users for various purposes. The API gives us various methods for handling our users & push notifications.
####onRegister
Each device can be recognized by the push token by which you can specify the device you want to get a push notification. When the user opens the app for the first time, the pushed token is fetched and stored in the device. You should be aware of the fact this method may get called again in the future, so you should be prepared for this situation to update your data according to it.
 It is done by `onRegister` method as follows:
```js
PushNotification.onRegister((token) => {
  console.log('in app registration', token);
  PushNotification.updateEndpoint(token);
});
```
####onNotification
In case you want to do something when the notification is recieved the `onNotification` method is for acting based on the recieved notification. Don't forget to that the notification object structure is diffrent from Android and IOS. In IOS, It is [adviced](https://facebook.github.io/react-native/docs/pushnotificationios.html) to use the `finish` method. here is an example:
```js
PushNotification.onNotification((notification) => {
  console.log('in app notification', notification);
  notification.finish(PushNotificationIOS.FetchResult.NoData);
});
```
####onNotificationOpened
A common scenario is reacting to when user opens a push notification (eg: opening a message etc). Whenever the user opens a push notification, the `onNotificationOpened` is called like the code below:
```js
PushNotification.onNotificationOpened((notification) => {
    console.log('the notification is opened', notification);
});
```
####requestIOSPermissions
Push notification works only on a real device and it won't recieve any notification unless the end user give the permission. The `requestIOSPermissions` is for getting this permission. It either can be called without any parameters, or you can customize by an object as follows:
```js

PushNotification.requestIOSPermissions();
// or
PushNotification.requestIOSPermissions({
  alert: true,
  badge: true,
  sound: false,
});
```
