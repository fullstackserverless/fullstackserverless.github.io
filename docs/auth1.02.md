---
id: auth1-02
title: Authentication
sidebar_label: Custom setup
---

Firstly, the standard UI from Amplify does not always meet customer UX requirements

Secondly, in the [official documentation](https://docs.amplify.aws/lib/auth/manageusers/q/platform/js#managing-security-tokens) of Amplify it is stated that:

> Data is stored unencrypted when using standard storage adapters (localStorage in the browser and AsyncStorage on React Native). Amplify gives you the option to use your own storage object to persist data. With this, you could write a thin wrapper around libraries like:
> react-native-keychain
> react-native-secure-storage
> Expo’s secure store

This means that the authentication data is stored in an unencrypted form, and this is a risk
🕷 of information security with possible negative consequences 🕸.

Source code for this part is available on [GitHub](https://github.com/fullstackserverless/auth/tree/part2).

[![AWS Amplify](/img/auth/00.gif)](https://youtu.be/QMObthDaewQ)

![Step01](/img/steps/01.png)

## Clone the repository

Install the repository with the pre-installed [UI Kit](https://fullstackserverless.github.io/docs/unicorn00)

```bash
git clone https://github.com/fullstackserverless/auth.git
```

Go to the project folder

```bash
cd auth
```

Install dependencies

`yarn`

or

`npm install`

![Step02](/img/steps/02.png)

## Initializing AWS Amplify in a React Native Project

Initialize our AWS Amplify project in the root directory.

```bash
amplify init
```

Answer these questions:

![amplify init](/img/auth/auth02.png)

The project successfully initialized 🚀

![Step03](/img/steps/03.png)

## Connect authentication plugin

Now that the application is in the cloud, you can add some features, such as allowing users to register with our application and log in.

Use command:

```bash
amplify add auth
```

Connect the authentication function. Select the default configuration. This adds auth resource configurations locally to your ampify/backend/auth directory

<div class="alert alert--info" role="alert">
  📌 Select the profile we want to use. default. Enter and how users will log in. Email (write off money for SMS).
</div>

![amplify init](/img/auth/auth03.png)

Submit changes to the cloud 💭

```bash
amplify push
```

✔ All resources are updated in the cloud

![Step04](/img/steps/04.png)

## Connect AWS Amplify to React Native

Details can be found in [this](https://aws-amplify.github.io/docs/js/react) instruction 📃.In short, you can add these dependencies below to connect AWS Amplify:

```bash
yarn add aws-amplify @aws-amplify/core aws-amplify-react-native amazon-cognito-identity-js @react-native-community/netinfo
```

After installation, make sure to go to the ios folder and set the pods

```bash
cd ios && pod install && cd ..
```

![Step05](/img/steps/05.png)

## Add navigation

install react-navigation v5, based on this instruction [here](https://reactnavigation.org/docs/getting-started/)
(at the time of writing this article this is latest version of navigation)

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

![Step06](/img/steps/06.png)

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

configure src/index.tsx

```tsx
import React, { ReactElement } from 'react'
import Amplify from '@aws-amplify/core'
import * as Keychain from 'react-native-keychain'
import { useColorScheme } from 'react-native-appearance'
import ThemeProvider from './ThemeProvider'
import AppNavigator from './AppNavigator'
import awsconfig from '../aws-exports'

const DarkTheme = {
  dark: true,
  colors: {
    primary: '#50E3C2',
    background: '#1D1E1F',
    card: '#1D1E1F',
    text: '#ffffff',
    border: '#ff06f4'
  }
}

const LightTheme = {
  dark: false,
  colors: {
    primary: '#ff06f4',
    background: '#ffffff',
    card: '#1D1E1F',
    text: '#ffffff',
    border: '#ff06f4'
  }
}

const MEMORY_KEY_PREFIX = '@MyStorage:'
let dataMemory: any = {}
class MyStorage {
  static syncPromise = null

  static setItem(key: string, value: string): boolean {
    Keychain.setGenericPassword(MEMORY_KEY_PREFIX + key, value)
    dataMemory[key] = value
    return dataMemory[key]
  }

  static getItem(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(dataMemory, key) ? dataMemory[key] : undefined
  }

  static removeItem(key: string): boolean {
    Keychain.resetGenericPassword()
    return delete dataMemory[key]
  }

  static clear(): object {
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

const App = (): ReactElement => {
  /**
   * Subscribe to color scheme changes with a hook
   */
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

For client authorization AppSync supports API Keys, Amazon IAM credentials, Amazon Cognito User Pools, and 3rd party OIDC providers. This is inferred from the aws-exports.js file when you call Amplify.configure().

When using Authentication with AWS Amplify, you don’t need to refresh Amazon Cognito tokens manually. The tokens are automatically refreshed by the library when necessary.
Security Tokens like IdToken or AccessToken are stored in localStorage for the browser and in AsyncStorage for React Native. If you want to store those tokens in a more secure place or you are using Amplify in server side, then you can provide your own storage object to store those tokens.

![Step07](/img/steps/07.png)

## AppNavigator

Create a navigation configuration file for our custom authentication src/AppNavigator.tsx
Add a welcome screen to it.

```tsx
import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Hello } from './screens/Authenticator'

const Stack = createStackNavigator()

export type RootStackParamList = {
  HELLO: undefined
}

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

![Step08](/img/steps/08.png)

## Hello screen

Create an entry point for our authentication screens src/screens/Authenticator/index.ts

![Hello screen](/img/auth/auth1-04.png)

To begin with, let's connect welcome screen

```ts
export * from './Hello'
```

After we create it src/screens/Authenticator/Hello/index.tsx

In the useEffect hook, we check for a user token, where in the case of true we go to the User screen, and in the case of false, we remain on this screen.

```tsx
import React, { useEffect, useState, ReactElement } from 'react'
import { Auth } from 'aws-amplify'
import * as Keychain from 'react-native-keychain'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppContainer, Button, Space, Txt } from '../../../components'
import { onScreen } from '../../../constants'
import { RootStackParamList } from '../../../AppNavigator'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HELLO'>

type HelloT = {
  navigation: ProfileScreenNavigationProp
}

const Hello = ({ navigation }: HelloT): ReactElement => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const key = async (): Promise<void> => {
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
      <Space height={80} />
      <Button title="Sign In" onPress={onScreen('SIGN_IN', navigation)} />
      <Space height={10} />
      <Txt h6 title="or" textStyle={{ alignSelf: 'center' }} />
      <Space height={15} />
      <Button title="Sign Up" onPress={onScreen('SIGN_UP', navigation)} />
    </AppContainer>
  )
}

export { Hello }
```

Put together all changes and meet the welcome screen.

![Step09](/img/steps/09.png)

## SignUp screen

We create the registration screen SIGN_UP src/screens/Authenticator/SignUp/index.tsx, where for authentication we use the [Auth.signUp](https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js#sign-up) method.

![SignUp](/img/auth/auth1-05.png)

```tsx
import React, { useState, ReactElement } from 'react'
import { Auth } from 'aws-amplify'
import * as Keychain from 'react-native-keychain'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppContainer, Space, Button, Input, TextError } from '../../../components'
import { onScreen, goBack } from '../../../constants'
import { RootStackParamList } from '../../../AppNavigator'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SIGN_UP'>

type SignUpT = {
  navigation: ProfileScreenNavigationProp
}

const SignUp = ({ navigation }: SignUpT): ReactElement => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const _onPress = async (values: { email: string; password: string; passwordConfirmation: string }): Promise<void> => {
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
        <Formik
          initialValues={{ email: '', password: '', passwordConfirmation: '' }}
          onSubmit={(values): Promise<void> => _onPress(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required(),
            password: Yup.string()
              .min(6)
              .required(),
            passwordConfirmation: Yup.string()
              .min(6)
              .required()
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }): ReactElement => (
            <>
              <Input
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={(): void => setFieldTouched('email')}
                placeholder="E-mail"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
              />
              <Input
                name="password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={(): void => setFieldTouched('password')}
                placeholder="Password"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
                secureTextEntry
              />
              <Input
                name="passwordConfirmation"
                value={values.passwordConfirmation}
                onChangeText={handleChange('passwordConfirmation')}
                onBlur={(): void => setFieldTouched('passwordConfirmation')}
                placeholder="Password confirm"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
                secureTextEntry
              />
              <Space height={30} />
              {error !== '' && <TextError title={error} textStyle={{ alignSelf: 'center' }} />}
              <Button title="Sign Up" onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </AppContainer>
    </>
  )
}

export { SignUp }
```

![Step10](/img/steps/10.png)

## ConfirmSignUp screen

After a successful response from the server, we go to the confirmation screen and enter the code that came to our mail. To do this, create the screen CONFIRM_SIGN_UP src/screens/Authenticator/ConfirmSignUp/index.tsx

![ConfirmSignUp](/img/auth/auth1-06.png)

```jsx
import React, { useState, ReactElement } from 'react'
import { Auth } from 'aws-amplify'
import { Formik } from 'formik'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import * as Yup from 'yup'
import { AppContainer, Button, Space, ButtonLink, TextError, Input } from '../../../components'
import { onScreen, goBack } from '../../../constants'
import { RootStackParamList } from '../../../AppNavigator'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CONFIRM_SIGN_UP'>
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'CONFIRM_SIGN_UP'>

type ConfirmSignUpT = {
  navigation: ProfileScreenNavigationProp
  route: ProfileScreenRouteProp
}

const ConfirmSignUp = ({ route, navigation }: ConfirmSignUpT): ReactElement => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const _onPress = async (values: { code: string }): Promise<void> => {
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

  const _onResend = async (): Promise<void> => {
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
          onSubmit={(values): Promise<void> => _onPress(values)}
          validationSchema={Yup.object().shape({
            code: Yup.string().min(6).required()
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }): ReactElement => (
            <>
              <Space height={180} />
              <Input
                name="code"
                value={values.code}
                onChangeText={handleChange('code')}
                onBlur={(): void => setFieldTouched('code')}
                placeholder="Insert code"
                touched={touched}
                errors={errors}
              />
              <ButtonLink title="Resend code?" onPress={_onResend} textStyle={{ alignSelf: 'center' }} />
              {error !== 'Forgot Password?' && <TextError title={error} />}
              <Button title="Confirm" onPress={handleSubmit} />
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
To do this, we put Auth.resendSignUp(userInfo.email) on button Resend code.
In case of a successful method call

```jsx
Auth.confirmSignUp(email, code, { forceAliasCreation: true })
```

we must call the method

```jsx
Auth.signIn(email, password)
```

![Step11](/img/steps/11.png)

## User screen

Once it successfully done, go to the USER screen, which we create with the exit button for the application and clearing the src/screens/Authenticator/User/index.tsx tokens

![User screen](/img/auth/auth1-07.png)

```tsx
import React, { useState, useEffect, ReactElement } from 'react'
import { Auth } from 'aws-amplify'
import * as Keychain from 'react-native-keychain'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppContainer, Button } from '../../../components'
import { goHome } from '../../../constants'
import { RootStackParamList } from '../../../AppNavigator'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HELLO'>

type UserT = {
  navigation: ProfileScreenNavigationProp
}

const User = ({ navigation }: UserT): ReactElement => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkUser = async (): Promise<void> => {
      await Auth.currentAuthenticatedUser()
    }
    checkUser()
  }, [navigation])

  const _onPress = async (): Promise<void> => {
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

![Step12](/img/steps/12.png)

## SignIn screen

After the user is registered, we must provide the user with the opportunity to enter the application through login and password. To do this, we create the SIGN_IN src/screens/Authenticator/SignIn/index.tsx screen

![SignIn screen](/img/auth/auth1-08.png)

```tsx
import React, { useState, ReactElement } from 'react'
import { Auth } from 'aws-amplify'
import * as Keychain from 'react-native-keychain'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppContainer, Button, Space, ButtonLink, TextError, Input } from '../../../components'
import { onScreen, goBack } from '../../../constants'
import { RootStackParamList } from '../../../AppNavigator'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SIGN_IN'>

type SignUpT = {
  navigation: ProfileScreenNavigationProp
}

const SignIn = ({ navigation }: SignUpT): ReactElement => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const _onPress = async (values: { email: string; password: string }): Promise<void> => {
    setLoading(true)
    setError('')
    try {
      const { email, password } = values
      const user = await Auth.signIn(email, password)
      await Keychain.setInternetCredentials('auth', email, password)
      user && onScreen('USER', navigation)()
      setLoading(false)
    } catch ({ code }) {
      setLoading(false)
      if (code === 'UserNotConfirmedException') {
        setError('Account not verified yet')
      } else if (code === 'PasswordResetRequiredException') {
        setError('Existing user found. Please reset your password')
      } else if (code === 'NotAuthorizedException') {
        setUserInfo(values)
        setError('Forgot Password?')
      } else if (code === 'UserNotFoundException') {
        setError('User does not exist!')
      } else {
        setError(code)
      }
    }
  }

  return (
    <>
      <AppContainer onPress={goBack(navigation)} title="Sign In" loading={loading} message={error}>
        <Formik
          enableReinitialize
          initialValues={userInfo}
          onSubmit={(values): Promise<void> => _onPress(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required(),
            password: Yup.string()
              .min(6)
              .required()
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }): ReactElement => (
            <>
              <Space height={90} />
              <Input
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={(): void => setFieldTouched('email')}
                placeholder="E-mail"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
              />
              <Input
                name="password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={(): void => setFieldTouched('password')}
                placeholder="Password"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
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
              <Button title="Sign In" onPress={handleSubmit} />
              <Space height={130} />
            </>
          )}
        </Formik>
      </AppContainer>
    </>
  )
}

export { SignIn }
```

![Step13](/img/steps/13.png)

## Forgot password screen

If successful, we send the user to the USER screen, which we have already done, and if the user has forgotten or entered the password incorrectly, then we show the Forgot Password error and suggest resetting the password.

![Forgot password](/img/auth/auth1-09.png)

To do this, we create the FORGOT src/screens/Authenticator/Forgot/index.tsx screen

![Forgot password](/img/auth/auth1-10.png)

```tsx
import React, { useState, ReactElement } from 'react'
import { Auth } from 'aws-amplify'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { AppContainer, Button, Input, Space } from '../../../components'
import { onScreen, goBack } from '../../../constants'
import { RootStackParamList } from '../../../AppNavigator'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FORGOT'>
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'FORGOT'>

type ForgotT = {
  navigation: ProfileScreenNavigationProp
  route: ProfileScreenRouteProp
}

const Forgot = ({ route, navigation }: ForgotT): ReactElement => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const _onPress = async (values: { email: string }): Promise<void> => {
    setLoading(true)
    try {
      const { email } = values
      const user = await Auth.forgotPassword(email)
      user && onScreen('FORGOT_PASSWORD_SUBMIT', navigation, values)()
      setLoading(false)
    } catch (err) {
      setError(error)
    }
  }

  return (
    <>
      <AppContainer title="Forgot" onPress={goBack(navigation)} loading={loading} message={error}>
        <Formik
          initialValues={{ email: route.params.email || '' }}
          onSubmit={(values): Promise<void> => _onPress(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required()
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }): ReactElement => (
            <>
              <Input
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={(): void => setFieldTouched('email')}
                placeholder="E-mail"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
              />
              <Space height={30} />
              <Button title="Confirm" onPress={handleSubmit} />
              <Space height={100} />
            </>
          )}
        </Formik>
      </AppContainer>
    </>
  )
}

export { Forgot }
```

![Step14](/img/steps/14.png)

## Forgot password submit

After confirming the e-mail, we call the Auth.forgotPassword (email) method and if there is such a user, we send the user to the FORGOT_PASSWORD_SUBMIT src/screens/Authenticator/ForgotPassSubmit/index.tsx screen

![ForgotPassSubmit](/img/auth/auth1-11.png)

```tsx
import React, { useState, ReactElement } from 'react'
import { Auth } from 'aws-amplify'
import * as Keychain from 'react-native-keychain'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { AppContainer, Button, Space, Input, TextError } from '../../../components'
import { onScreen, goBack } from '../../../constants'
import { RootStackParamList } from '../../../AppNavigator'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FORGOT_PASSWORD_SUBMIT'>
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'FORGOT_PASSWORD_SUBMIT'>

type ForgotPassSubmitT = {
  navigation: ProfileScreenNavigationProp
  route: ProfileScreenRouteProp
}

const ForgotPassSubmit = ({ route, navigation }: ForgotPassSubmitT): ReactElement => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const _onPress = async (values: { email: string; password: string; code: string }): Promise<void> => {
    setLoading(true)
    try {
      const { email, code, password } = values
      await Auth.forgotPasswordSubmit(email, code, password)
      await Keychain.setInternetCredentials('auth', email, password)
      await Auth.signIn(email, password)
      onScreen('USER', navigation)()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(err.message)
    }
  }

  return (
    <>
      <AppContainer title="Confirmation" onPress={goBack(navigation)} loading={loading} message={error}>
        <Formik
          initialValues={{ email: route.params.email || '', code: '', password: '', passwordConfirmation: '' }}
          onSubmit={(values): Promise<void> => _onPress(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required(),
            code: Yup.string()
              .min(6)
              .required(),
            password: Yup.string()
              .min(6)
              .required(),
            passwordConfirmation: Yup.string()
              .min(6)
              .required()
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }): ReactElement => (
            <>
              <Input
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={(): void => setFieldTouched('email')}
                placeholder="E-mail"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
              />
              <Input
                name="code"
                value={values.code}
                onChangeText={handleChange('code')}
                onBlur={(): void => setFieldTouched('code')}
                placeholder="Code"
                touched={touched}
                errors={errors}
              />
              <Input
                name="password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={(): void => setFieldTouched('password')}
                placeholder="Password"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
                secureTextEntry
              />
              <Input
                name="passwordConfirmation"
                value={values.passwordConfirmation}
                onChangeText={handleChange('passwordConfirmation')}
                onBlur={(): void => setFieldTouched('passwordConfirmation')}
                placeholder="Password confirm"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
                secureTextEntry
              />
              {error !== '' && <TextError title={error} textStyle={{ alignSelf: 'center' }} />}
              <Space height={30} />
              <Button title="Confirm" onPress={handleSubmit} />
              <Space height={80} />
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

![Step15](/img/steps/15.png)

## Linking screens

We connect all created components in src/screens/Authenticator/index.ts

```ts
export * from './Hello'
export * from './User'
export * from './SignIn'
export * from './SignUp'
export * from './Forgot'
export * from './ForgotPassSubmit'
export * from './ConfirmSignUp'
```

![Step16](/img/steps/16.png)

## Udpate AppNavigator

Updating the navigation configuration file src/AppNavigator.tsx :

```jsx
import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Hello, SignUp, SignIn, ConfirmSignUp, User, Forgot, ForgotPassSubmit } from './screens/Authenticator'

const Stack = createStackNavigator()

export type RootStackParamList = {
  HELLO: undefined
  SIGN_UP: undefined
  SIGN_IN: undefined
  FORGOT: { email: string }
  FORGOT_PASSWORD_SUBMIT: { email: string }
  CONFIRM_SIGN_UP: { email: string; password: string }
  USER: undefined
}

const AppNavigator = (): React.ReactElement => {
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

![Step17](/img/steps/17.png)

## Debug

In order to understand what happens with tokens in your application, add in the root/index.js

```jsx
window.LOG_LEVEL = 'DEBUG'
```

We launch the application and get custom authentication.

## Done ✅

[![Become a Patron!](/img/logo/patreon.png)](https://www.patreon.com/bePatron?u=34467235)
