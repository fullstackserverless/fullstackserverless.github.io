---
id: amplify-02
title: What is GraphQL?
sidebar_label: GraphQL
---

Data modeling in AWS Amplify is carried out using the GraphQL query language - it is an API specification, a query language for the API and a runtime to execute these queries with your data. It has some similarities to REST and is the best replacement for REST.

![GraphQL](https://miro.medium.com/max/4800/1*CC4lauyfn1b2MdxqPrv1SA.png)

GraphQL was introduced by Facebook in 2015, although it has been used internally since 2012. GraphQL allows clients to determine the structure of the required data, and it is this structure that is returned from the server. Querying data in this way provides a much more efficient way for client-side applications to interact with APIs, reducing the number of incomplete samples and preventing excessive data samples.

# Main advantages:

## Efficient and Flexible Sample

The response returns only the requested data.

## Faster

You can shorten your query by selecting only the fields you want to query.

## Useful analytics

Since the client must indicate the fields explicitly in the request, the server knows exactly which fields are really needed. And this is important information for deprecation policy.

## Works on top of any data source and transport

It is important that GraphQL allows you to work on top of any data source and any transport. In this case, HTTP is not a panacea; GraphQL can also work through WebSocket.

## Fetching data with a single API call

The main difference between GraphQL and REST is that the latter are centered around individual endpoints, so the developer must combine several endpoints to collect all the necessary data. While GraphQL focuses on the task itself, in this case, the developer can request the necessary data with just one API call.

## No problems with over and under extraction

REST responses are known for containing too much data or not enough data, which creates a need for another request. GraphQL solves this performance problem by selecting accurate data in a single query.

## Check out of the box

The GraphQL introspection function allows you to navigate by type and determine the scheme so that applications request only what is possible and in the appropriate format. However, developers can see what the circuit can request and how the data is installed there. Based on this, they can easily add new fields to existing queries through the GraphQL IDE. There is no need to check the data format, as GraphQL will do it for you. Developers should only write resolvers - how the data will be received.

## Auto-generated documentation API

GraphQL synchronizes documentation with API changes. Because the GraphQL API is closely related to code, when a field, type, or query changes, documents change too. This is of direct benefit to developers as they have to spend less time documenting the API.

## API evolution without version control

The development of the API entails the problem of maintaining the old version until the developers move to a new one. So, with REST it is customary to offer several versions of the API. However, GraphQL eliminates the need for version control by abandoning the field-level API. Deprecated fields can later be removed from the schema without affecting existing queries. GraphQL makes this possible by creating a single API for the entire application, which is not limited to a specific storage engine.

## Using a single evolving version

GraphQL APIs provide applications with constant access to new features and help create more understandable and more maintainable server code.

## Code Sharing

In GraphQL, the fields used in several queries can be shared at a higher level of components for reuse. This function, called fragments, allows you to receive different data while maintaining the same field of the scheme.

## Detailed error messages

In REST, we simply check the HTTP headers for the status of the response, based on which we can determine what went wrong and how to deal with it. Conversely, if an error occurs while processing GraphQL queries, the server side will provide a detailed error message that includes all resolvers and refers to a specific part of the query in case of an error.
GraphQL error messages do not have a specific standard, so you can choose whether it is a stack trace, an error code for a specific application, or just text.

## Permissions

By creating a GraphQL schema, you choose which functions to expose and how they work. In turn, REST views are usually all or nothing. Thus, each view should have an idea of ​​what may and cannot be disclosed in various circumstances, which is not so simple to do. Otherwise, if the request contains some personal information, the REST architecture will not even open the open parts of the requested data.

## Additional operation

In REST, APIs perform CRUD operations with the following HTTP requests:

- CREATE: generate new entries using POST
- READ: get data based on input parameters using GET
- UPDATE: change records with PUT
- DELETE: erase the specified data with DELETE.

Thus, GraphQL introduces a new operation in the table - subscriptions, which allows clients to receive messages from the server in real time. GraphQL subscriptions can be used to automatically send notifications to a client when adding a new comment or data or receiving a message.

## Rapid Prototyping Applications

If the goal is to provide a prototype, CRUD operations can be time consuming. GraphQL accelerates this process by providing a single API endpoint that serves as a data proxy between the user interface and the data warehouse. In addition, the development speed is closely linked to the improved developer experience that GraphQL offers: simpler coding with data - next to the user interface, reusable fragments, less attention to error handling.

## References:

https://www.altexsoft.com/blog/engineering/graphql-core-features-architecture-pros-and-cons/

https://engineering.fb.com/core-data/graphql-a-data-query-language/

https://graphql.org/learn

[![Become a Patron!](/img/logo/patreon.png)](https://www.patreon.com/bePatron?u=34467235)
