---
id: amplify-03
title: Amplify API - AppSync - CRUD (Create Read Update Delete)
sidebar_label: Amplify API  - AppSync
---
AWS AppSync simplifies application development by creating a universal API for securely accessing, modifying, and combining data from multiple sources. AppSync is a managed service that uses GraphQL so that applications can easily get only the data they need.

Using AppSync, you can create scalable applications, including those requiring real-time updates, using a variety of data sources, such as NoSQL data warehouses, relational databases, HTTP APIs, and native data sources with AWS Lambda. For mobile and web applications, AppSync also provides access to local data when devices go offline, and synchronizes data when you reconnect to the Internet. In this case, the client can adjust the conflict resolution procedure.

# Benefits:
## Easy start and development keeping up with the business
Get started in minutes with the selected IDE (e.g. Xcode, Android Studio, VS Code), and use the intuitive AWS AppSync or AWS Amplify CLI management console to automatically create your API and client code. AWS AppSync integrates with Amazon DynamoDB, Amazon Aurora, Amazon Elasticsearch, AWS Lambda, and other AWS services, allowing you to create sophisticated applications with virtually unlimited performance and memory that change depending on your business needs.

## Real-time Subscriptions and Offline Access
AWS AppSync provides real-time subscription to millions of devices, as well as offline access to application data. After reconnecting the device, AWS AppSync only synchronizes updates at the time the device was disconnected, not the entire database. AWS AppSync offers customizable, server-side conflict resolution and resolution.

## Unified and secure access to distributed data
Perform complex queries and generalizations across multiple data sources with a single network call using GraphQL. AWS AppSync allows you to easily protect the data of your application using several authentication modes at the same time, and also allows you to determine the degree of threat and perform detailed access control at the data definition level directly from your GraphQL scheme.

In this lesson, we will create the GraphQL API, which interacts with the DynamoDB NoSQL database to perform CRUD operations (create, read, update, delete).

![Step01](/img/steps/01.png)
## Connect the API plugin

```bash
amplify add api
```

![AWSAmplify](/img/dataStore/dataStore00.png)

![Step02](/img/steps/02.png)
## schema.graphql

After the selected items, the GraphQL schema will open in `amplify/backend/api/<datasourcename>/schema.graphql` where we insert this model:

```graphql
type Job
  @model
  @auth(
    rules: [
      {allow: owner, ownerField: "owner", operations: [create, update, delete]},
    ])
{
  id: ID!
  position: String!
  rate: String!
  description: String!
  owner: String
}
```
This is a GraphQL schema. GraphQL Transform provides an easy-to-use abstraction that helps you quickly create server parts for web and mobile applications in AWS. Using GraphQL Transform, you define the data model of your application using the GraphQL Schema Definition Language (SDL), and the library handles the conversion of the SDL definition to a set of fully descriptive AWS CloudFormation templates that implement your data model.

When used with tools such as the Amplify CLI, GraphQL Transform simplifies the process of developing, deploying, and supporting GraphQL APIs. With it, you define your API using the GraphQL Schema Definition Language (SDL) and then use automation to transform it into a fully descriptive cloud information template that implements the specification.
GraphQL is an API specification. It is an API query language and runtime for executing these queries with your data. It has some similarities to REST and is the best replacement for REST.

GraphQL was introduced by Facebook in 2015, although it has been used internally since 2012. GraphQL allows clients to determine the structure of the required data, and it is this structure that is returned from the server. Querying data in this way provides a much more efficient way for client-side applications to interact with APIs, reducing the number of incomplete samples and preventing excessive data samples.

More about GraphQL [here](https://fullstackserverless.github.io/docs/amplify-02)

Let us return to our scheme, where the main components of the GraphQL scheme are object types, which is a type of object that you can extract from your service:

- `Job` is a type of a GraphQL object (GraphQL Object Type), that is, a type with some fields. Most types in your schema will be object types.

- `id position rate description owner` - fields in type Job. This means that these are the only fields that can appear in any part of a GraphQL query that works with the Job type.

- `String` is one of the built-in scalar types - these are types that are resolved into a single scalar object and cannot have subselects in the query. We will look at scalar types later.

- `String!` - the field is not NULL, means that the GraphQL service promises to always give you a value when requesting this field. In general, this is a required field.


## Types
GraphQL comes with a set of default scalar types out of the box:

- `Int` 32-bit signed integer.

- `Float` floating point value with double precision.

- `String` character sequence UTF - 8.

- `Boolean` true or false.

- `ID` scalar type ID is a unique identifier, often used to retrieve an object or as a key for the cache. The type of identifier is serialized in the same way as a string; however, the definition of it as an identifier means that it is not intended for human perception.

## Directives

- `@model` - Object types marked with`@model` are top-level objects in the generated API. Objects marked with `@model` are stored in Amazon DynamoDB and can be protected with`@auth`, linked to other objects via `@connection`

- `@auth` - Authorization is required for the application to interact with your GraphQL API. API keys are best used for public APIs.
The `@auth` object types annotated by` @auth` are protected by a set of authorization rules that provide you with additional controls than top-level authorization in the API. You can use the `@auth` directive to define object types and fields in your project schema.
When using the `@auth` directive for definitions of object types, which are also annotated with`@model`, all recognition tools that return objects of this type will be protected.

Other directives and details are in [official documentation](https://aws-amplify.github.io/docs/cli-toolchain/graphql?sdk=js#directives).

Rules of the `@auth` directive


```jsx
@auth( rules: [ {allow: owner, ownerField: "owner", operations: [create, update, delete]} ])
```
mean that the operations CREATE, UPDATE, DELETE are allowed exclusively to the owner, and the READ operation is for everyone.

It's time to test it in practice! Therefore, we write the command in the console:

```bash
amplify mock api
```

![amplifyMockApi](/img/dataStore/dataStore01.png)

With this team, you can quickly test your achievements of the change without the need to allocate or update the cloud resources that you use at each stage. In this way, you can set up unit and integration tests that can run quickly without affecting your cloud backend.


# Three whales on which GraphQL stands:

## Query (READ)
Simply put, queries in GraphQL are how you intend to query data. You will receive exactly the data that you need. No more no less.

## Mutation (CREATE UPDATE DELETE)
Mutations in GraphQL are a way to change data on a server and get updated data back.

## Subscriptions
A way to maintain a connection to the server in real time. This means that whenever an event occurs on the server and when this event is called, the server will send the appropriate data to the client.

You can see all available methods of our created API by clicking on Docs (Documentation Explorer) in the upper right corner. The values ​​are clickable, so you can see all the possible queries.

![Docs](https://miro.medium.com/max/4800/1*wcYg4qmPXOdghWgS5P1RtQ.png)

## CREATE
We open our API at the address that it issued (each has its own) the result of the `amplify mock api` command and execute the CREATE request by pressing the play button.

```graphql
mutation Create {
  __typename
  createJob(input: {position: "React Native Developer", rate: 3000, description: "We are looking for a React Native developer (St. Petersburg) to develop from scratch a mobile version of the main cs.money platform  Our product is an international trading platform for the exchange of virtual items. (CS: GO, Dota 2) which is shared by more than 5 million users. The project has existed for more than 3 years. and takes a leading position in its field. The platform is used in more than 100 countries of the world.  Now we want to make a mobile application and decided to do it on React Native. You have to develop an application from scratch and this is a great opportunity to build a good architecture without resting on legacy.  Requirements:  Knowledge of react patterns Knowledge of SOLID principles Knowledge of the basics of mobile specifics (caching, working with the native API, rendering optimization) Knowledge of RN"}) {
    description
    id
    owner
    position
    rate
  }
}
```

![create](https://miro.medium.com/max/4800/1*GwJb9ZZVB6px_QI8xKwslQ.png)

To consolidate the material, create some more vacancies.

## READ
We get a list of all the vacancies. Insert request:

```graphql
query Read {
  __typename
  listJobs {
    items {
      description
      id
      owner
      position
      rate
    }
  }
}
```

![read](https://miro.medium.com/max/4800/1*ykTq1YUoBLn6G45fQ3eLXQ.png)


## UPDATE
To update, we need to take the vacancy ID (be sure to enter your own, and not from the example) and pass it to this request with the data changed. For example, update the `position` and` rate` fields

```graphql
mutation Update {
  __typename
  updateJob(input: {id: "1a8a763f-28b8-450a-96f0-73e0d1d8ac04", position: "Full Stack Serverless", rate: 5000}) {
    id
    description
    owner
    position
    rate
  }
}
```

![update](https://miro.medium.com/max/4800/1*IxfySd5he-V-lxJSyTsqNA.png)

## DELETE
To delete, as well as in the case of updating, we need to transfer the vacancy ID (be sure to enter your own, and not from the example).

```graphql
mutation Delete {
  __typename
  deleteJob(input: {id: "1a8a763f-28b8-450a-96f0-73e0d1d8ac04"}) {
    id
  }
}
```

![delete](https://miro.medium.com/max/4800/1*vqFyPU7VVMmulZeF_zd0mg.png)

## Permissions
Now let's check if our rules work, which we indicated in the scheme. Only the owner can update, delete and create.

```jsx
 @auth( rules: [ {allow: owner, ownerField: “owner”, operations: [create, update, delete]}, ])
 ```

To change the user, click on UpdateAuth in the main menu. Where we randomly update Username and Email.

![UpdateAuth](https://miro.medium.com/max/430/1*a89USnLuvHC0OXf3wdgYSA.png)

![authOptions](https://miro.medium.com/max/1400/1*BP6B8Wwe9Ldgugf2lUyyPA.png)

If we send a READ request, then it works, but if we send an UPDATE or DELETE request and we get an error.
The rules work, as required!

![](https://miro.medium.com/max/4800/1*NevLJXxyURK4JOx8qWyy4w.png)

Now that we have tested the functionality of the API, we can publish it to the cloud with the command:

```bash
amplify push
```

![](/img/dataStore/dataStore02.png)

After a few minutes, the model is uploaded to the AWS server, so we continue to the react native application.

[![Become a Patron!](/img/logo/patreon.png)](https://www.patreon.com/bePatron?u=34467235)
