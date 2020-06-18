---
id: amplify-04
title: DataStore - CRUD (Create Read Update Delete)
sidebar_label: DataStore - CRUD
---

# Goodbye Redux, MobX, Apollo!

The line between the backend and the frontend is broken! An innovative step in the evolution of state managers.

![DataStore](/img/dataStore/00.png)

One of the most difficult tasks in developing web and mobile applications is to synchronize data between devices and perform offline operations. Ideally, when the device is offline, your customers should be able to continue to use your application not only to access data, but also to create and modify it. When the device returns online, the application must reconnect to the backend, synchronize the data and resolve conflicts, if any. Correct handling of all extreme cases requires a lot of undifferentiated code, even when using the AWS AppSync SDK cache on a device with autonomous mutations and delta synchronization.

Amplify DataStore provides persistent storage on the device for recording, reading and monitoring data changes if you are connected to the Internet or offline, and also makes it easy to synchronize data with the cloud and between devices.

Amplify DataStore allows developers to write applications using distributed data without writing additional code for an offline or online script.

You can use the Amplify DataStore for offline use in local-only mode without an AWS account or provide the entire backend using AWS AppSync and Amazon DynamoDB.

The DataStore includes Delta Sync using your GraphQL backend and several conflict resolution strategies.

## Advantages of AWS Amplify DataStore over Redux, MobX, Apollo, Relay, selectors:

Comparing AWS Amplify with Redux, MobX is not correct, since AWS Amplify is not only a state manager, but also a client-server, so in the client-server class we will compare it with Apollo and Relay.

## 1. Real time out of the box.

I don’t think that a business can be considered serious if his mobile application is not affected by subscription events implemented using web sockets technology.
And how many applications nowadays work on web sockets?
I think not, due to the fact that real time is an additional work of developers on the back and front-end.
For us, [fullStack serverless](https://fullstackserverless.github.io/docs/amplify-01) developers on AWS Amplify, real time goes out of the box, both on the front and on the back and we don’t we need to write an implementation code for integrating web sockets for each model, since it is generated automatically, as well as writing documentation for all of our generated code, implemented in our project based on the GraphQL schema instruction. In order not to scare with big words, I will show you an example from [the last lesson](https://fullstackserverless.github.io/docs/amplify-03), how Store is defined in AWS Amplify:

```graphql
type Job @model @auth(rules: [{ allow: owner, ownerField: "owner", operations: [create, update, delete] }]) {
  id: ID!
  position: String!
  rate: String!
  description: String!
  owner: String
}
```

This determines the model in the store, not only for the frontend, but also for the backend. One source of truth for frontend and backend. Yes, yes, I see that I will repeat it more than once in my life, since this is a killer feature and punch line vs Redux, MobX, Apollo, Relay.

It is this architecture, which is different from Redux, MobX, Apollo, that erases the line between the backend and frontend. And puts AWS Amplify DataStore over everyone

If you are from the backend, then you no longer need to write resolvers to the database and drag subscriptions to each data model.

Serverless - this is when the backend developers came to learn the frontend, as their services are needed exclusively for projects that do not keep up with the times, and from which they do not live real time.

## 2. Code generation.

What is code generation you can read without me on Wikipedia, unless of course you know its meaning, which in this punch reminds us of yourself.
Use fetch or axios?
By sending requests to the deep forest API, which we also write in conjunction with Redux, MobX, Apollo, Relay.
So here is another news of the day!
You no longer need to write these API calls, you only need to call them.
This means that you no longer need to create this rather big daddy with the server request code, since in AWS Amplify DataStore they are also generated in your project based on your store, defined by the very same GraphQL diagram of their first item. And this is filled with one command:

```bash
amplify codegen model
```

As a result, we get the models folder with the generated code.

![DataStore](/img/dataStore/dataStore09.png)

And the graphql folder after pushing to the server, with all the request in Flow, TS or vanilla JavaScript.

![DataStore](/img/dataStore/dataStore08.png)

## 3. Offline data & cloud sync

No need to write additional code to send a request to the server after the application is online.
Sometimes you find yourself in an unreliable situation, but you better wait longer than obviously fail the operation.
Apollo has apollo-link-retry which provides exponential rollback and server requests between default attempts. True, he (currently) does not handle retries for GraphQL errors in the response, only for network errors.
Redux, MobX, of course, does not have this solution under the hood, since they are not clients and you have to use third-party middleware, because REST is like a retired grandfather with the support of any grandchildren. Detailed analysis of [GraphQL vs REST](https://fullstackserverless.github.io/docs/amplify-02).
AWS Amplify DataStore has not only an analog of apollo-link-retry, but also a built-in and customizable familiar programming model with automatic version control, conflict detection and resolution in the cloud.

Among the disadvantages of AWS Amplify, I want to mention that Apollo hooks with its loading and error out of the box reduce the amount of code written on the front.

[Official documentation](https://aws-amplify.github.io/docs/js/datastore)

At the end of this lesson we will collect with you this mobile application using the Amplify DataStore:

![dataStore](/img/dataStore/dataStore07.png)

## How much does it all cost?

With AWS AppSync, you pay only for what you use with no minimum fees or mandatory service usage. You are billed separately for query and data modification operations, and for performing real-time updates on your data. This provides you with transparency and a low price regardless of your workload type, because you only pay for the specific AWS AppSync features you use.

Query and Data Modification Operations

Query Operations enable your app to fetch data and cache it locally. Data Modification Operations enable your app to create, update, and delete data.

4.00 dollars per million Query and Data Modification Operations\*

[Details](https://aws.amazon.com/appsync/pricing/)

# Go!

Our AWS Amplify support chat [Discord](https://discord.gg/Ntuttww)

The final code for this part can be found on [Github](https://github.com/fullstackserverless/startup/tree/datastore).

![Step01](/img/steps/01.png)

## Clone the repository

If you continue the last lesson, you can go directly to step 5.

```bash
git clone https://github.com/fullstackserverless/startup.git
```

Go to the project folder

```bash
cd startup
```

Install dependencies

`yarn`

or

`npm install`

![Step02](/img/steps/02.png)

## Register your AWS account

Step For Those Not Yet AWS Registered
We register according to [this](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start) instructions 📃 and by the video tutorial ем we check all 5 steps.

<div class="alert alert--warning" role="alert">
You need a bank card 💳, where should be more than 1$ 💵 
There we look and put the Amplify Command Line Interface (CLI)
</div>

![Step03](/img/steps/03.png)

## Initializing AWS Amplify in a React Native Project

Initialize our AWS Amplify project in the root directory of the React Native project.

```bash
amplify init
```

We answer the questions:
![amplify init](/img/auth/auth02.png)

The project was initialized 🚀

![Step04](/img/steps/04.png)

## Connect the authentication plugin

Now that the application is in the cloud, you can add some features, such as allowing users to register with our application and log in.

We connect the authentication function.

```bash
amplify add auth
```

![amplify init](/img/auth/auth03.png)

Submitting changes to the cloud 💭

```bash
amplify push
```

✔ All resources are updated in the cloud

We collect the project and check the operation of authentication.

![Hello screen](/img/auth/auth1-04.png)

![Step05](/img/steps/05.png)

## Installing dependencies

Detailed installation [here](https://aws-amplify.github.io/docs/js/datastore#setup)

If you have a React Native Cli, then

```bash
yarn add @aws-amplify/datastore @react-native-community/netinfo @react-native-community/async-storage
```

And if you use React Native> 0.60, then run the following command for iOS:

```bash
cd ios && pod install && cd ..
```

![Step06](/img/steps/06.png)

## Connecting the API plugin (App Sync)

If you connected it in [the last lesson](https://fullstackserverless.github.io/docs/amplify-03), then skip this step.
If not, connect the API plugin

```bash
amplify add api
```

![AWSAmplify](/img/dataStore/dataStore00.png)

After the selected items, the GraphQL schema will open in `amplify/backend/api/<datasourcename>/schema.graphql` where we insert this model:

```graphql
type Job @model @auth(rules: [{ allow: owner, ownerField: "owner", operations: [create, update, delete] }]) {
  id: ID!
  position: String!
  rate: String!
  description: String!
  owner: String
}
```

More about [here](https://fullstackserverless.github.io/docs/amplify-03#schemagraphql)

![Step07](/img/steps/07.png)

## Model generation

Modeling your data and creating the models used by the DataStore is the first step to getting started. GraphQL is used as a common language for JavaScript, iOS and Android for this process, and is also used as a network protocol when synchronizing with the cloud. GraphQL also supports some features, such as Automerge in AppSync.

> You do not need an AWS account to run it and use DataStore locally, however, if you want to synchronize with the cloud, it is recommended to install and configure Amplify CLI as in the last lesson

Since we described the circuit in the last lesson, now it’s enough for us to run the command

```bash
amplify codegen model
```

and get the generated model in the src/models folder

![Step08](/img/steps/08.png)

## Updating API

We include DataStore for all API

```bash
amplify update api
```

![amplify update api](/img/dataStore/dataStore03.png)

Submitting changes to the cloud 💭

```bash
amplify push
```

✔ All resources are updated in the cloud

![Step09](/img/steps/09.png)

## READ

Create the JobsMain src/screens/Jobs/JobsMain.js screen

![READ](/img/dataStore/dataStore04.png)

On this screen, we will make a Query query, with the pagination option, where the number is through the useQuery hook and it will return an array to us, which we will send to Flatlist.

```jsx
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { Auth } from 'aws-amplify'
import { AppContainer, CardVacancies, Space, Header } from 'react-native-unicorn-uikit'
import { DataStore } from '@aws-amplify/datastore'
import { Job } from '../../models'
import { goBack, onScreen } from '../../constants'

const JobsMain = ({ navigation }) => {
  const [data, updateJobs] = useState([])

  const fetchJobs = async () => {
    const mess = await DataStore.query(Job)
    updateJobs(mess)
  }

  useEffect(() => {
    fetchJobs()
    const subscription = DataStore.observe(Job).subscribe(() => fetchJobs())
    return () => {
      subscription.unsubscribe()
    }
  }, [data])

  const _renderItem = ({ item }) => {
    const owner = Auth.user.attributes.sub
    const check = owner === item.owner
    return (
      <>
        <CardVacancies obj={item} onPress={onScreen(check ? 'JOB_ADD' : 'JOB_DETAIL', navigation, item)} />
        <Space height={20} />
      </>
    )
  }

  const _keyExtractor = obj => obj.id.toString()

  return (
    <AppContainer onPress={goBack(navigation)} flatlist>
      <FlatList
        scrollEventThrottle={16}
        data={data}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <Header
            onPress={goBack(navigation)}
            onPressRight={onScreen('JOB_ADD', navigation)}
            iconLeft="angle-dobule-left"
            iconRight="plus-a"
          />
        }
        stickyHeaderIndices={[0]}
      />
    </AppContainer>
  )
}

export { JobsMain }
```

To disclose the details of the vacancy, create the screen JobDetail src/screens/Jobs/JobDetail.js

![](/img/dataStore/dataStore05.png)

```jsx
import React from 'react'
import { Platform } from 'react-native'
import { AppContainer, CardVacancies, Space, Header } from 'react-native-unicorn-uikit'
import { goBack } from '../../constants'

const JobDetail = ({ route, navigation }) => {
  return (
    <AppContainer>
      <Header onPress={goBack(navigation)} iconLeft="angle-dobule-left" />
      <CardVacancies obj={route.params} detail />
      <Space height={Platform.OS === 'ios' ? 100 : 30} />
    </AppContainer>
  )
}

export { JobDetail }
```

![Step10](/img/steps/10.png)

## CREATE UPDATE DELETE

Create the screen JobAdd src/screens/Jobs/JobAdd.js, where we perform the functions CREATE UPDATE DELETE

![](/img/dataStore/dataStore06.png)

```jsx
import React, { useState, useEffect, useRef } from 'react'
import { AppContainer, Input, Space, Button, Header, ButtonLink } from 'react-native-unicorn-uikit'
import { DataStore } from '@aws-amplify/datastore'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Job } from '../../models'
import { goBack } from '../../constants'

const JobAdd = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [check, setOwner] = useState(false)
  const [error, setError] = useState('')

  const [input, setJob] = useState({
    id: '',
    position: '',
    rate: '',
    description: ''
  })

  const formikRef = useRef()

  useEffect(() => {
    const obj = route.params
    if (typeof obj !== 'undefined') {
      setOwner(true)
      setJob(obj)
      const { setFieldValue } = formikRef.current
      const { position, rate, description } = obj
      setFieldValue('position', position)
      setFieldValue('rate', rate)
      setFieldValue('description', description)
    }
  }, [route.params])

  const createJob = async values => (await DataStore.save(new Job({ ...values }))) && goBack(navigation)()

  const updateJob = async ({ position, rate, description }) => {
    try {
      setLoading(true)
      const original = await DataStore.query(Job, input.id)
      const update = await DataStore.save(
        Job.copyOf(original, updated => {
          updated.position = position
          updated.rate = rate
          updated.description = description
        })
      )
      update && goBack(navigation)()
      setLoading(false)
    } catch (err) {
      setError(err)
    }
  }

  const deleteJob = async () => {
    try {
      setLoading(true)
      const job = await DataStore.query(Job, input.id)
      const del = await DataStore.delete(job)
      del && goBack(navigation)()
      setLoading(false)
    } catch (err) {
      setError(err)
    }
  }

  return (
    <AppContainer onPress={goBack(navigation)} loading={loading} error={error}>
      <Header onPress={goBack(navigation)} iconLeft="angle-dobule-left" />
      <Space height={20} />
      <Formik
        innerRef={formikRef}
        initialValues={input}
        onSubmit={values => (check ? updateJob(values) : createJob(values))}
        validationSchema={Yup.object().shape({
          position: Yup.string()
            .min(3)
            .required(),
          rate: Yup.string()
            .min(3)
            .required(),
          description: Yup.string()
            .min(3)
            .required()
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <>
            <Input
              name="position"
              value={values.position}
              onChangeText={handleChange('position')}
              onBlur={() => setFieldTouched('position')}
              placeholder="Position"
              touched={touched}
              errors={errors}
            />
            <Input
              name="rate"
              keyboardType="numeric"
              value={`${values.rate}`}
              onChangeText={handleChange('rate')}
              onBlur={() => setFieldTouched('rate')}
              placeholder="Rate"
              touched={touched}
              errors={errors}
            />
            <Input
              name="description"
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={() => setFieldTouched('description')}
              placeholder="Description"
              touched={touched}
              errors={errors}
              multiline
              numberOfLines={5}
            />
            <Space height={40} />
            <Button title={check ? 'Update' : 'Create'} disabled={!isValid} onPress={handleSubmit} formik />
            {check && (
              <>
                <Space height={10} />
                <ButtonLink title="or" textStyle={{ alignSelf: 'center' }} />
                <Space height={15} />
                <Button title="DELETE" onPress={deleteJob} cancel />
              </>
            )}
          </>
        )}
      </Formik>
      <Space height={100} />
    </AppContainer>
  )
}

export { JobAdd }
```

and in screens/Jobs/index.js we export screens

```jsx
export * from './JobsMain'
export * from './JobDetail'
export * from './JobAdd'
```

![Step11](/img/steps/11.png)

## Navigation

Add import of Jobs screens and connect them to StackNavigator

```jsx
import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens' // eslint-disable-line
import { Hello, SignUp, SignIn, ConfirmSignUp, User, Forgot, ForgotPassSubmit } from './screens/Authenticator'
import { JobsMain, JobDetail, JobAdd } from './screens/Jobs'

enableScreens()

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
      <Stack.Screen name="JOBS_MAIN" component={JobsMain} />
      <Stack.Screen name="JOB_DETAIL" component={JobDetail} />
      <Stack.Screen name="JOB_ADD" component={JobAdd} />
    </Stack.Navigator>
  )
}

export default AppNavigator
```

![Step12](/img/steps/12.png)

## Jobs Button

Editing the User screen in screens/Authenticator/User/index.js

```jsx
import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import * as Keychain from 'react-native-keychain'
import { AppContainer, Button } from 'react-native-unicorn-uikit'
import { goHome, onScreen } from '../../../constants'

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

  const _onPressJob = () => onScreen('JOBS_MAIN', navigation)() // переход на экран JOBS_MAIN

  return (
    <AppContainer message={error} loading={loading}>
      <Button title="Sign Out" onPress={_onPress} />
      <Button title="Jobs" onPress={_onPressJob} />
    </AppContainer>
  )
}

export { User }
```

Build the application and test

## Done ✅

## References:

https://aws-amplify.github.io

https://learning.oreilly.com/library/view/full-stack-serverless/9781492059882/

https://www.altexsoft.com/blog/engineering/graphql-core-features-architecture-pros-and-cons/

https://engineering.fb.com/core-data/graphql-a-data-query-language/

https://graphql.org/learn

[![Become a Patron!](/img/logo/patreon.png)](https://www.patreon.com/bePatron?u=34467235)
