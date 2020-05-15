---
id: auth1-00
title: Introduction 
sidebar_label: Introduction 
---
One of the most requested topics among the subscribers of my channel is 
authentication and authorization in the React Native application using AWS Amplify. Therefore, I decided to devote a separate post to this issue, and before we start coding, it is necessary to understand the definitions like Authentication and Authorization.

![cognito](/img/auth/01.png)

Support Patron [Chat](https://www.patreon.com/bePatron?u=34467235)

## Authentication
is about validating your credentials such as Username/User ID and 
password to verify your identity. 
## Authorization 
occurs after your identity is successfully authenticated by the system, which therefore 
 gives you full access to resources such as information, files, databases, funds, etc.

Authentication means confirming your own identity, 
whereas authorization means being allowed access to the system. Read [more](https://medium.com/datadriveninvestor/authentication-vs-authorization-716fea914d55)

At the end of this article, we will make this mobile application:

![cognito](/img/auth/00.png)

Authentication is an integral part of almost any application. Knowing who the user is, the unique identifier of the user, what permissions the user has, and whether they are logged in, allows your application to display the correct views and return the correct data for the current logged in user.

Most applications require mechanisms for registering users, logging in to the system, processing encryption and updating passwords, as well as many other tasks related to identity management. Modern applications often require things like OAUTH (open authentication), MFA (multi-factor authentication), and TOTP (time-based time passwords).

In the past, developers had to manually spin all of these authentication features from scratch. This task alone can take weeks or even months from the development team to do everything right and do it safely. Fortunately, today there are fully managed authentication services like Auth0, Okta and Amazon Cognito that handle all this for us.

In this article, you'll learn how to correctly and securely implement authentication in a React Native application using Amazon Cognito with AWS Amplify.

## Amazon Cognito
It is a fully managed authentication service from AWS. Cognito provides easy and secure user registration, logon, access control, token updates, and user identity management. Cognito scales to millions of users and also supports logging in with social network providers such as Facebook, Google and Amazon.

Cognito consists of two main parts: user pools and identity pools.

## User Pools
user pools provide a secure user directory that stores all of your users and scales to hundreds of millions of users. This is a fully managed service. Like serverless technology, user pools are easy to configure, without having to worry about supporting any infrastructure. User pools manage all the users who register and log in to the account and is the  main part that we will focus on in this article.

## Identity pools
identity pools allow you to authorize users who are logged into your application to access various other AWS services. Suppose you want to give a user access to a lambda function so that it can receive data from another API. You can specify this when creating the identity pool. User pools include the fact that the source of these identifiers may be the Cognito user pool, or even Facebook or Google.

A scenario where an Amazon Cognito user pool and an identity pool are used together.

See the diagram for a common Amazon Cognito script. The goal here is to authenticate your user and then give him access to another AWS service.

![cognito](/img/auth/auth00.png)

1. At the first stage, the user of your application enters the system through the user pool 
   and receives user pool tokens  after successful authentication.

2. Then your application exchanges user pool tokens for AWS credentials through the identity pool.

3. Finally, your application user can then use these AWS credentials to access other AWS services, such as Amazon S3 or DynamoDB.

Cognito User Pools allows your application to call various methods for a service to manage all aspects of user authentication, including things like:

+ User registration
+ User login
+ User Logout
+ Change user password
+ Reset user password
+ MFA Code Verification
+ Amazon Cognito Integration with AWS Amplify

AWS Amplify supports Amazon Cognito in a variety of ways. First of all, you can create and configure Amazon Cognito services directly from the AWS Amplify command-line interface. By creating an authentication service through the CLI, you can call various methods (for example, signUp, signIn and signOut) from a JavaScript application using the Amplify JavaScript client library.
Amplify also has pre-configured user interface components that allow you to build entire authentication 
flow in just a couple of lines of code for environments such as React, React Native, Vue, and Angular.

## How much does it all cost?
#### Pay only for what you use. No minimum fees.

Using Amazon Cognito Identity to create a user pool, you pay only for the number of active users per month (MAU). MAUs are users who have performed at least one identification operation during a calendar month: registration, authorization, token renewal, or password change. Subsequent sessions of active users and inactive users in this calendar month are not paid.

![cognito](/img/auth/auth01.png)

CODING TIME 👨🏼‍💻👩🏻‍💻

![cognito](https://media.giphy.com/media/836HiJc7pgzy8iNXCn/giphy.gif)

[![Become a Patron!](/img/logo/patreon.png)](https://www.patreon.com/bePatron?u=34467235)
