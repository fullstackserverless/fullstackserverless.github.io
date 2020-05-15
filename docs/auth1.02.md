---
id: auth1-02
title: Authentication
sidebar_label: Part II
---
Firstly, the standard UI from Amplify does not always meet customer UX requirements

Secondly, in the  [official documentation] of Amplify (https://aws-amplify.github.io/docs/js/react#note-on-jwt-storage) it is stated that:

> Data is stored unencrypted when using standard storage adapters (localStorage in the browser and AsyncStorage on React Native). Amplify gives you the option to use your own storage object to persist data. With this, you could write a thin wrapper around libraries like:
react-native-keychain
react-native-secure-storage
Expo’s secure store

This means that the authentication data is stored in an unencrypted form, and this is a risk 
🕷 of information security with possible negative consequences 🕸. 

Source code for this part is available on [GitHub](https://github.com/react-native-village/aws-amplify-react-hooks/tree/master/examples/reactNativeCRUDv2).

![cognito](/img/auth/01.png)

![Step01](/img/steps/01.png)
## UI Kit
We will use our UI Kit, but you're free to use your own or others.

We connect the component library according to [this](https://react-native-village.github.io/docs/unicorn00) article.


![Step02](/img/steps/02.png)
## Add navigation
install react-navigation v5, based on this instruction [here](https://reactnavigation.org/docs/getting-started/) 
(at the time of  writing this article this is latest version of navigation) 


```bash
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view @react-navigation/stack
```

Add pods for iOS

```bash
cd ios && pod install && cd ..
```


<div class="alert alert--info" role="alert">
📌 I recommend to launch the application for iOS and Android, after each installation, 
  in order to avoid searching for the library because of which the application crashes.
</div>


![Step03](/img/steps/03.png)
## react-native-keychain

Add react-native-keychain - this is a secure keystore library for React Native.

```bash
yarn add react-native-keychain
```

Add pods for iOS

```bash
cd ios && pod install && cd ..
```
According to [official documentation:](https://aws-amplify.github.io/docs/js/authentication#managing-security-tokens)
> When using authentication with AWS Amplify, you don’t have to update Amazon Cognito tokens manually. Tokens are automatically updated by the library when necessary. Security tokens, such as IdToken or AccessToken, are stored in localStorage for the browser and in AsyncStorage for React Native. If you want to store these tokens in a more secure place or use Amplify on the server side, you can provide your own storage object for storing these tokens.

configure src / index.js

```jsx
import React from 'react'
import Amplify from '@aws-amplify/core'
import * as Keychain from 'react-native-keychain'
import { ThemeProvider, DarkTheme, LightTheme } from 'react-native-unicorn-uikit'
import { useColorScheme } from 'react-native-appearance'
import AppNavigator from './AppNavigator'
import awsconfig from '../aws-exports'

const MEMORY_KEY_PREFIX = '@MyStorage:'
let dataMemory = {}

class MyStorage {
  static syncPromise = null

  static setItem(key, value) {
    Keychain.setGenericPassword(MEMORY_KEY_PREFIX + key, value)
    dataMemory[key] = value
    return dataMemory[key]
  }

  static getItem(key) {
    return Object.prototype.hasOwnProperty.call(dataMemory, key) ? dataMemory[key] : undefined
  }

  static removeItem(key) {
    Keychain.resetGenericPassword()
    return delete dataMemory[key]
  }

  static clear() {
    dataMemory = {}
    return dataMemory
  }
}

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: false
  },
  storage: MyStorage
})

const App = () => {
  const scheme = useColorScheme()
  return (
    <>
      <ThemeProvider theme={scheme === 'dark' ? DarkTheme : LightTheme}>
        <AppNavigator />
      </ThemeProvider>
    </>
  )
}

export default App
```

![Step04](/img/steps/04.png)
## Constants

Create a file with constants for general use in 
src / constants.js components. This is helps us to avoid copy pasting the same values multiple times

```jsx
import { Dimensions } from 'react-native'

export const BG = '#0B0B0B'
export const PINK = '#F20AF5'
export const PURPLE = '#7A1374'
export const BLUE = '#00FFFF'
export const GREEN = '#2E7767'
export const RED = '#FC2847'
export const LABEL_COLOR = BLUE
export const INPUT_COLOR = PINK
export const ERROR_COLOR = RED
export const HELP_COLOR = '#999999'
export const BORDER_COLOR = BLUE
export const DISABLED_COLOR = '#777777'
export const DISABLED_BACKGROUND_COLOR = '#eeeeee'

export const win = Dimensions.get('window')
export const W = win.width
export const H = win.height

export const Device = {
  // eslint-disable-next-line
  select(variants) {
    if (W >= 300 && W <= 314) return variants.mobile300 || {}
    if (W >= 315 && W <= 341) return variants.iphone5 || {}
    if (W >= 342 && W <= 359) return variants.mobile342 || {}
    if (W >= 360 && W <= 374) return variants.mi5 || {}
    if (W >= 375 && W <= 399) return variants.iphone678 || {}
    if (W >= 400 && W <= 409) return variants.mobile400 || {}
    if (W >= 410 && W <= 414) return variants.googlePixel || {}
    if (W >= 415 && W <= 434) return variants.mobile415 || {}
    if (W >= 435 && W <= 480) return variants.redmiNote5 || {}
  }
}

export const goBack = navigation => () => navigation.goBack()

export const onScreen = (screen, navigation, obj) => () => {
  navigation.navigate(screen, obj)
}

export const goHome = navigation => () => navigation.popToTop()()
```

![Step05](/img/steps/05.png)
## AppNavigator
Create a navigation configuration file for our custom authentication src / AppNavigator.js

```jsx
import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Hello } from './screens/Authenticator'

const Stack = createStackNavigator()

const AppNavigator = () => {   
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="HELLO"
    >
      <Stack.Screen name="HELLO" component={Hello} />
    </Stack.Navigator>
  )
}

export default AppNavigator
```

![Step06](/img/steps/06.png)
## Hello screen
Create an entry point for our authentication screens src/screens/Authenticator/index.js 

![Hello screen](/img/auth/auth1-04.png)

To begin with, let's connect welcome screen


```jsx
export * from './Hello'
```
After we create it src/screens/Authenticator/Hello/index.js

In the useEffect hook, we check for a user token, where in the case of true we go to the User screen, and in the case of false, we remain on this screen.

```jsx
import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import * as Keychain from 'react-native-keychain'
import { AppContainer, Button, Space, H6 } from 'react-native-unicorn-uikit'
import { onScreen } from '../../../constants'

const Hello = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const key = async () => {
      try {
        const credentials = await Keychain.getInternetCredentials('auth')

        if (credentials) {
          const { username, password } = credentials
          const user = await Auth.signIn(username, password)
          setLoading(false)
          user && onScreen('USER', navigation)()
        } else {
          setLoading(false)
        }
      } catch (err) {
        console.log('error', err) // eslint-disable-line
        setLoading(false)
      }
    }
    key()
  }, []) // eslint-disable-line
  return (
    <AppContainer loading={loading}>
      <Space height={200} />
      <Button title="Sign In" onPress={onScreen('SIGN_IN', navigation)} />
      <Space height={10} />
      <H6 title="or" textStyle={{ alignSelf: 'center' }} />
      <Space height={15} />
      <Button title="Sign Up" onPress={onScreen('SIGN_UP', navigation)} />
    </AppContainer>
  )
}

export { Hello }
```

Put together all changes and meet the welcome screen.


![Step07](/img/steps/07.png)
## SignUp screen
We create the registration screen SIGN_UP src/screens/Authenticator/SignUp/index.js, where for authentication we use the [Auth.signUp](https://aws-amplify.github.io/docs/js/authentication#sign-up) method.

![SignUp](/img/auth/auth1-05.png)

```jsx
import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import * as Keychain from 'react-native-keychain'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { AppContainer, Space, Button, Input, TextError } from 'react-native-unicorn-uikit'
import { onScreen, goBack } from '../../../constants'

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const _onPress = async (values) => {
    const { email, password, passwordConfirmation } = values
    if (password !== passwordConfirmation) {
      setError('Passwords do not match!')
    } else {
      setLoading(true)
      setError('')
      try {
        const user = await Auth.signUp(email, password)
        await Keychain.setInternetCredentials('auth', email, password)
        user && onScreen('CONFIRM_SIGN_UP', navigation, { email, password })()
        setLoading(false)
      } catch (err) {
        setLoading(false)
        if (err.code === 'UserNotConfirmedException') {
          setError('Account not verified yet')
        } else if (err.code === 'PasswordResetRequiredException') {
          setError('Existing user found. Please reset your password')
        } else if (err.code === 'NotAuthorizedException') {
          setError('Forgot Password?')
        } else if (err.code === 'UserNotFoundException') {
          setError('User does not exist!')
        } else {
          setError(err.code)
        }
      }
    }
  }

  return (
    <>
      <AppContainer onPress={goBack(navigation)} title="Sign Up" loading={loading}>
        <Space height={80} />
        <Formik
          initialValues={{ email: '', password: '', passwordConfirmation: '' }}
          onSubmit={(values) => _onPress(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            passwordConfirmation: Yup.string().min(6).required()
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <>
              <Input
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                placeholder="E-mail"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
              />
              <Input
                name="password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                placeholder="Password"
                touched={touched}
                errors={errors}
                secureTextEntry
              />
              <Input
                name="passwordConfirmation"
                value={values.passwordConfirmation}
                onChangeText={handleChange('passwordConfirmation')}
                onBlur={() => setFieldTouched('passwordConfirmation')}
                placeholder="Password confirm"
                touched={touched}
                errors={errors}
                secureTextEntry
              />
              <Space height={30} />
              {error !== '' && <TextError title={error} textStyle={{ alignSelf: 'center' }} />}
              <Button title="Sign Up" disabled={!isValid} onPress={handleSubmit} formik />
            </>
          )}
        </Formik>
      </AppContainer>
    </>
  )
}

export { SignUp }
```



![Step08](/img/steps/08.png)
## ConfirmSignUp screen

After a successful response from the server, we go to the confirmation screen and enter the code that came to our mail. To do this, create the screen CONFIRM_SIGN_UP src/screens/Authenticator/ConfirmSignUp/index.js

![ConfirmSignUp](/img/auth/auth1-06.png)

```jsx
import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { AppContainer, Button, Space, ButtonLink, TextError, Input } from 'react-native-unicorn-uikit'
import { onScreen, goBack } from '../../../constants'

const ConfirmSignUp = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const _onPress = async (values) => {
    setLoading(true)
    setError('')
    try {
      const { code } = values
      const { email, password } = route.params
      await Auth.confirmSignUp(email, code, { forceAliasCreation: true })
      const user = await Auth.signIn(email, password)
      user && onScreen('USER', navigation)()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(err.message)
      if (err.code === 'UserNotConfirmedException') {
        setError('Account not verified yet')
      } else if (err.code === 'PasswordResetRequiredException') {
        setError('Existing user found. Please reset your password')
      } else if (err.code === 'NotAuthorizedException') {
        setError('Forgot Password?')
      } else if (err.code === 'UserNotFoundException') {
        setError('User does not exist!')
      }
    }
  }

  const _onResend = async () => {
    try {
      const { email } = route.params
      await Auth.resendSignUp(email)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <AppContainer title="Confirmation" onPress={goBack(navigation)} loading={loading}>
        <Formik
          initialValues={{ code: '' }}
          onSubmit={(values) => _onPress(values)}
          validationSchema={Yup.object().shape({
            code: Yup.string().min(6).required()
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <>
              <Space height={180} />
              <Input
                name="code"
                value={values.code}
                onChangeText={handleChange('code')}
                onBlur={() => setFieldTouched('code')}
                placeholder="Insert code"
                touched={touched}
                errors={errors}
              />
              <ButtonLink title="Resend code?" onPress={_onResend} textStyle={{ alignSelf: 'center' }} />
              {error !== 'Forgot Password?' && <TextError title={error} />}
              <Button title="Confirm" disabled={!isValid} onPress={handleSubmit} formik />
              <Space height={50} />
            </>
          )}
        </Formik>
      </AppContainer>
    </>
  )
}

export { ConfirmSignUp }
```
## ResendSignUp
If the code has not arrived, then we must provide the user with the opportunity to resend the code. 
To do this, we put Auth.resendSignUp(userInfo.email)  on button  Resend code. 
In case of a successful method call

```jsx
Auth.confirmSignUp(email, code, { forceAliasCreation: true })
```

we must call the method
```jsx
Auth.signIn(email, password)
```


![Step09](/img/steps/09.png)
## User screen
Once it successfully done, go to the USER screen, which we create with the exit button for the application and clearing the src/screens/Authenticator/User/index.js tokens

![User screen](/img/auth/auth1-07.png)


```jsx
import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import * as Keychain from 'react-native-keychain'
import { AppContainer, Button } from 'react-native-unicorn-uikit'
import { goHome } from '../../../constants'

const User = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkUser = async () => {
      await Auth.currentAuthenticatedUser()
    }
    checkUser()
  })

  const _onPress = async () => {
    setLoading(true)
    try {
      await Auth.signOut()
      await Keychain.resetInternetCredentials('auth')
      goHome(navigation)()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AppContainer message={error} loading={loading}>
      <Button title="Sign Out" onPress={_onPress} />
    </AppContainer>
  )
}

export { User }
```


![Step10](/img/steps/10.png)
## SignIn screen

After the user is registered, we must provide the user with the opportunity to enter the application through login and password. To do this, we create the SIGN_IN src/screens/Authenticator/SignIn/index.js screen

![SignIn screen](/img/auth/auth1-08.png)

```jsx
import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import * as Keychain from 'react-native-keychain'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { AppContainer, Button, Space, ButtonLink, TextError, Input } from 'react-native-unicorn-uikit'
import { onScreen, goBack } from '../../../constants'

const SignIn = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const _onPress = async (values) => {
    setLoading(true)
    setError('')
    try {
      const { email, password } = values
      const user = await Auth.signIn(email, password)
      await Keychain.setInternetCredentials('auth', email, password)
      user && onScreen('USER', navigation)()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      if (err.code === 'UserNotConfirmedException') {
        setError('Account not verified yet')
      } else if (err.code === 'PasswordResetRequiredException') {
        setError('Existing user found. Please reset your password')
      } else if (err.code === 'NotAuthorizedException') {
        setError('Forgot Password?')
      } else if (err.code === 'UserNotFoundException') {
        setError('User does not exist!')
      } else {
        setError(err.code)
      }
    }
  }

  return (
    <>
      <AppContainer onPress={goBack(navigation)} title="Sign In" loading={loading}>
        <Space height={140} />
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => _onPress(values) && setUserInfo(values.email)}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required()
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <>
              <Input
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                placeholder="E-mail"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
              />
              <Input
                name="password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                placeholder="Password"
                touched={touched}
                errors={errors}
                secureTextEntry
              />
              {error !== 'Forgot Password?' && <TextError title={error} textStyle={{ alignSelf: 'center' }} />}
              {error === 'Forgot Password?' && (
                <ButtonLink
                  title={error}
                  onPress={onScreen('FORGOT', navigation, userInfo)}
                  textStyle={{ alignSelf: 'center' }}
                />
              )}
              <Space height={30} />
              <Button title="Sign In" disabled={!isValid} onPress={handleSubmit} formik />
            </>
          )}
        </Formik>
      </AppContainer>
    </>
  )
}

export { SignIn }
```

![Step11](/img/steps/11.png)
## Forgot password screen
If successful, we send the user to the USER screen, which we have already done, and if the user has forgotten or entered the password incorrectly, then we show the Forgot Password error and suggest resetting the password.

![Forgot password](/img/auth/auth1-09.png)

To do this, we create the FORGOT src/screens/Authenticator/Forgot/index.js screen

![Forgot password](/img/auth/auth1-10.png)

```jsx
import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { AppContainer, Button, Input } from 'react-native-unicorn-uikit'
import { onScreen, goBack } from '../../../constants'

const Forgot = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const _onPress = async (values) => {
    setLoading(true)
    try {
      const { email } = values
      const user = await Auth.forgotPassword(email)
      user && onScreen('FORGOT_PASSWORD_SUBMIT', navigation, email)()
      setLoading(false)
    } catch (err) {
      setError(error)
    }
  }

  return (
    <>
      <AppContainer title="Forgot" onPress={goBack(navigation)} loading={loading}>
        <Formik
          initialValues={{ email: route.params }}
          onSubmit={(values) => _onPress(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required()
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <>
              <Input
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                placeholder="E-mail"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
              />
              <Button title="Confirm" disabled={!isValid} onPress={handleSubmit} formik />
            </>
          )}
        </Formik>
      </AppContainer>
    </>
  )
}

export { Forgot }
```


![Step12](/img/steps/12.png)
## Forgot Password Submit

After confirming the e-mail, we call the Auth.forgotPassword (email) method and if there is such a user, we send the user to the FORGOT_PASSWORD_SUBMIT src/screens/Authenticator/ForgotPassSubmit/index.js screen

![ForgotPassSubmit](/img/auth/auth1-11.png)

```jsx
import React, { useState } from 'react'
import { Platform } from 'react-native'
import { Auth } from 'aws-amplify'
import * as Keychain from 'react-native-keychain'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { AppContainer, Button, Space, Input, TextError } from 'react-native-unicorn-uikit'
import { onScreen, goBack } from '../../../constants'

const ForgotPassSubmit = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const _onPress = async (values) => {
    setLoading(true)
    try {
      const { email, code, password } = values
      await Auth.forgotPasswordSubmit(email, code, password)
      await Keychain.setInternetCredentials('auth', email, password)
      onScreen('USER', navigation)()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(err.message)
    }
  }

  return (
    <>
      <AppContainer title="Confirmation" onPress={goBack(navigation)} loading={loading}>
        <Space height={Platform.OS === 'ios' ? 20 : 150} />
        <Formik
          initialValues={{ email: route.params, code: '', password: '', passwordConfirmation: '' }}
          onSubmit={(values) => _onPress(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
            code: Yup.string().min(6).required(),
            password: Yup.string().min(6).required(),
            passwordConfirmation: Yup.string().min(6).required()
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <>
              <Input
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                placeholder="E-mail"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
              />
              <Input
                name="code"
                value={values.code}
                onChangeText={handleChange('code')}
                onBlur={() => setFieldTouched('code')}
                placeholder="Code"
                touched={touched}
                errors={errors}
              />
              <Input
                name="password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                placeholder="Password"
                touched={touched}
                errors={errors}
                secureTextEntry
              />
              <Input
                name="passwordConfirmation"
                value={values.passwordConfirmation}
                onChangeText={handleChange('passwordConfirmation')}
                onBlur={() => setFieldTouched('passwordConfirmation')}
                placeholder="Password confirm"
                touched={touched}
                errors={errors}
                secureTextEntry
              />
              {error !== '' && <TextError title={error} textStyle={{ alignSelf: 'center' }} />}
              <Space height={30} />
              <Button title="Confirm" disabled={!isValid} onPress={handleSubmit} formik />
            </>
          )}
        </Formik>
      </AppContainer>
    </>
  )
}

export { ForgotPassSubmit }
```

where, after entering the code sent to the mail, the new password and confirming it, we call the password change method

```jsx
Auth.forgotPasswordSubmit(email, code, password)
```

whose success sends the user to the USER screen.

![Step13](/img/steps/13.png)
## Linking screens

We connect all created components in src/screens/Authenticator/index.js

```jsx
export * from './Hello'
export * from './User'
export * from './SignIn'
export * from './SignUp'
export * from './Forgot'
export * from './ForgotPassSubmit'
export * from './ConfirmSignUp'
```

![Step14](/img/steps/14.png)
## Udpate AppNavigator

Updating the navigation configuration file:

```jsx
import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Hello, SignUp, SignIn, ConfirmSignUp, User, Forgot, ForgotPassSubmit } from './screens/Authenticator'

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="HELLO"
    >
      <Stack.Screen name="HELLO" component={Hello} />
      <Stack.Screen name="SIGN_UP" component={SignUp} />
      <Stack.Screen name="SIGN_IN" component={SignIn} />
      <Stack.Screen name="FORGOT" component={Forgot} />
      <Stack.Screen name="FORGOT_PASSWORD_SUBMIT" component={ForgotPassSubmit} />
      <Stack.Screen name="CONFIRM_SIGN_UP" component={ConfirmSignUp} />
      <Stack.Screen name="USER" component={User} />
    </Stack.Navigator>
  )
}

export default AppNavigator
```

![Step15](/img/steps/15.png)
## Clean Up

Since we use a custom theme, we remove the components AmplifyTheme and Localei18n

![Step16](/img/steps/16.png)
## Debug

In order to understand what happens with tokens in your application, add in the root/index.js

```jsx
window.LOG_LEVEL = 'DEBUG'
```

We launch the application and get custom authentication.

## Done ✅

[![Become a Patron!](/img/logo/patreon.png)](https://www.patreon.com/bePatron?u=34467235)
