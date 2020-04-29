---
id: amplify-01
title: Serverless
sidebar_label: Serverless
---
Creating a backend on AWS Amplify (DataStore + AppSync) is working with serverless technology, so before we continue to write code, we will understand what serverless computing is and what are their advantages over server computing.

Prediction of pundits from Berkeley University on how technology backend will evolve:

> By providing a simplified programming environment, serverless computing greatly simplifies the use of the cloud, thereby attracting more people who can and will use it. Serverless computing includes FaaS and BaaS offerings and marks an important stage in the development of cloud programming. This eliminates the need for manual resource management and optimization, which today's server computing imposes on application developers, which is like moving from assembly language to high-level languages ​​more than four decades ago.

> We predict that server-less usage will grow rapidly. We also predict that on-premises hybrid cloud applications will decline over time, although some deployments may persist due to regulatory restrictions and data management rules.

> Serverless computing will become the standard computing paradigm in the cloud era, largely replacing server computing and thereby closing the client-server era.

[Cloud Programming Simplified: A Berkeley View on Serverless Computing](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2019/EECS-2019-3.pdf)

If very simple, then Serverless means not the physical absence of servers, but the absence of a headache in managing the infrastructure and its maintenance.


# Advantages of serverless architecture:

Nowadays, there are many ways to create an application. The decisions that are made at an early stage can and will affect not only the application life cycle, but also the development teams and, ultimately, the company or organization. In this article, I advocate for and outline ways to build your applications using serverless technologies and methodologies. But what are the advantages of creating an application in this way, and why is serverlessness becoming so popular?


## One programming language

Using modern tools and methodologies such as AWS Amplify, one developer can use their existing set of skills and knowledge of a single platform and ecosystem (for example, JavaScript) to create scalable applications, complete with all the functions that a highly qualified backend team would need in the past DevOps programmers and engineers for assembly and maintenance.

## Less code

The only thing that has value is the function that the code provides, not the code itself. When you find ways to provide these functions, while limiting the amount of supported code and even completely abandoning the code, you reduce the overall complexity of your application.
The fewer difficulties, the less errors, easier for new engineers and generally less cognitive load for those who support and add new features.
A developer can connect to these services and implement functions without knowing the actual internal implementation, and with virtually no internal code.

## No need to manage servers

No need to allocate servers or maintain them. No installation, maintenance, or administration of software or runtime is required.

## Scalability

One of the main advantages of not having a server is scalability out of the box. When creating an application, you don’t need to worry about what happens if your application becomes extremely popular and you connect more new users and the cloud provider will handle it for you.
The cloud provider automatically scales your application by executing code in response to each interaction. In a serverless function, your code is executed in parallel and individually processes each trigger (in turn, it scales to fit the size of the workload).
No need to worry about scaling your servers and databases.

## Development speed

With fewer features, development speed increases. The ability to quickly deploy the types of functions that are typical for most applications (databases, authentication, storage, APIs), and with much less preliminary time, allows you to quickly start writing the basic functions and business logic for the function that you want to deliver to the final to the customer.

## Experiments
If you don't spend a lot of time creating repetitive functions, you can experiment more easily and with less risk.
When sending a new function, you often evaluate the risk (time and money associated with the creation of this function) with a possible return on investment (ROI). As the risk of trying new things is reduced, you can try out ideas that you might not have seen in the past.
We can also test different ideas much easier.

## Security and stability
Since the services you subscribe to are the core competency of the service provider, you get something much more refined and usually more secure than you could create yourself.
Imagine a company whose main business model is focused on providing primary authentication services and that has been using it for many years, solving and eliminating problems for thousands of companies and customers.
Now imagine that you are trying to reproduce such a service in your own team or organization. Although this is entirely possible and feasible, it is likely that the choice of a service created and maintained by people whose sole task is to create and maintain this exact thing is a safer and more reliable bet.
Another primary concern of these service providers is simply minimal downtime. This means that they take the burden of not only creating, deploying and maintaining these services, but also do everything possible to ensure their stability and sustainability.

## Automatic availability control
Serverless computing provides built-in high availability and fault tolerance. These features do not need to be specifically designed, since the services that run the application provide them by default.

## Cost
In the traditional approach, you often pay for computing resources, regardless

Read more about prices [here](https://aws.amazon.com/en/appsync/pricing/)

[![Become a Patron!](/img/logo/patreon.png)](https://www.patreon.com/bePatron?u=34467235)
